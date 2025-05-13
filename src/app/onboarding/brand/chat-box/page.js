"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
  Suspense
} from "react";
import {
  Input,
  Button,
  List,
  Avatar,
  Badge,
  message as antdMessage,
} from "antd";
import {
  SearchOutlined,
  MoreOutlined,
  PaperClipOutlined,
  SmileOutlined,
  SendOutlined,
  CheckOutlined,
  CheckCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import { authContext } from "@/assets/context/use-context";
import { useAuth } from "@/assets/hooks/use-auth";
import "../../../../app/chat.css";

const BrandChat = () => {
  // State management
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const { user } = useContext(authContext);
  const userId = user?.user_id;
  const auth = useAuth();

  // Get parameters from URL
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("userId");
  const recipientName = searchParams.get("fullName");

  // Format time helper
  const formatTime = useCallback((timestamp) => {
    if (!timestamp) return "Just now";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, []);

  // Initialize chat with recipient from URL params
  useEffect(() => {
    if (recipientId && recipientName) {
      const existingChat = chats.find((chat) => chat.id === recipientId);
      if (!existingChat) {
        const newChat = {
          id: recipientId,
          name: recipientName,
          avatar: recipientName.charAt(0),
          lastMessage: "",
          time: "Just now",
          unread: 0,
          messages: [],
        };
        setChats((prev) => [...prev, newChat]);
        setActiveChat(recipientId);
      } else {
        setActiveChat(recipientId);
      }
    }
  }, [recipientId, recipientName]);

  // WebSocket message handlers
  const handleChatHistory = useCallback(
    (data) => {
      if (!data.messages?.length) return;

      const sortedMessages = [...data.messages].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === recipientId) {
            const lastMessage = sortedMessages[sortedMessages.length - 1];
            return {
              ...chat,
              messages: sortedMessages,
              lastMessage: lastMessage?.message || "",
              time: lastMessage?.timestamp
                ? formatTime(lastMessage.timestamp)
                : "Just now",
            };
          }
          return chat;
        })
      );
    },
    [recipientId, formatTime]
  );

  const handleNewMessage = useCallback(
    (data) => {
      const messageData = data.body || data;
      const isMe = messageData.sender === userId;

      setChats((prev) =>
        prev.map((chat) => {
          if (
            chat.id ===
            (messageData.recipient === userId
              ? messageData.sender
              : messageData.recipient)
          ) {
            return {
              ...chat,
              lastMessage: messageData.message,
              time: formatTime(messageData.timestamp),
              messages: [...chat.messages, messageData],
              unread: isMe ? 0 : chat.unread + 1,
            };
          }
          return chat;
        })
      );

      // Auto-scroll to new message
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    [userId, formatTime]
  );

  const handleAllChats = useCallback(
    (allChatsData) => {
      console.log("Processing all chats:", allChatsData);

      if (!allChatsData.messages?.length) {
        antdMessage.info("You have no chat history yet");
        return;
      }

      const formattedChats = allChatsData.messages
        .map((chatGroup) => {
          // Skip if no user data
          if (!chatGroup.user) {
            console.warn("Chat group missing user data:", chatGroup);
            return null;
          }

          return {
            id: chatGroup.user.user_id, // user_id will be used for chat.join
            name: chatGroup.user.user_name, // Display name in sidebar
            chatGroupId: chatGroup.chatGroupId, // Store for reference
            avatar:
              chatGroup.user.user_photo ||
              chatGroup.user.user_name?.charAt(0) ||
              "U",
            lastMessage: "",
            time: formatTime(chatGroup.created_at),
            unread: 0,
            messages: [],
          };
        })
        .filter((chat) => chat !== null); // Remove any null entries

      setChats(formattedChats);
    },
    [formatTime]
  );

  // WebSocket connection management
  const initWebSocket = useCallback(() => {
    if (!userId || !auth) return;

    if (socketRef.current) {
      socketRef.current.close();
    }

    const wsUrl = `ws://147.78.141.96:8075/nexus/?token=${auth}`;
    setConnectionStatus("connecting");

    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      setConnectionStatus("connected");
      antdMessage.success("Connected to chat server");

      // Join the chat with the recipient
      if (recipientId) {
        ws.send(
          JSON.stringify({
            type: "chat.join",
            user_id: recipientId,
          })
        );
      }
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket message:", data);

        switch (data.type) {
          case "chat.history":
            handleChatHistory(data);
            break;
          case "chat.message":
            handleNewMessage(data);
            break;
          case "connection.success":
            // Connection already established
            break;
          case "chats.all":
            handleAllChats(data);
            break;
          default:
            console.warn("Unhandled message type:", data.type);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("disconnected");
      antdMessage.error("Connection error");
    };

    // ws.onclose = () => {
    //   setConnectionStatus("disconnected");
    //   setTimeout(() => initWebSocket(), 5000);
    // };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [auth, handleChatHistory, handleNewMessage, recipientId, userId,handleAllChats]);

  // Initialize WebSocket connection
  useEffect(() => {
    initWebSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [initWebSocket]);

  // Send message handler
  const handleSendMessage = () => {
    if (
      !inputMessage.trim() ||
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN
    ) {
      antdMessage.warning(
        connectionStatus !== "connected"
          ? "Cannot send message - connection not ready"
          : "Message cannot be empty"
      );
      return;
    }

    const message = {
      type: "chat.message",
      user_id: recipientId,
      message: inputMessage,
    };

    socketRef.current.send(JSON.stringify(message));
    setInputMessage("");
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  // Filter chats based on search text
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Get current chat messages
  const currentChat = chats.find((chat) => chat.id === activeChat);
  const currentMessages = currentChat?.messages || [];

  return (
    <div className="whatsapp-container">
      {/* Chat list sidebar */}
      <div className="chat-list">
        <div className="chat-list-header">
          <Avatar size="large" className="bg-primary">
            {user?.firstName?.charAt(0) || "ME"}
          </Avatar>
          <div className="chat-list-actions">
            <Button type="text" icon={<SearchOutlined />} />
            <Button type="text" icon={<MoreOutlined />} />
          </div>
        </div>

        <div className="chat-search">
          <Input
            placeholder="Search or start new chat"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="chat-items">
          <List
            dataSource={filteredChats}
            renderItem={(chat) => (
              <List.Item
                className={`chat-item ${
                  activeChat === chat.id ? "active" : ""
                }`}
                onClick={() => setActiveChat(chat.id)}
              >
                <List.Item.Meta
                  avatar={
                    <Badge count={chat.unread} offset={[-10, 0]}>
                      <Avatar size="large">{chat.avatar}</Avatar>
                    </Badge>
                  }
                  title={<span>{chat.name}</span>}
                  description={
                    <div className="chat-description">
                      <span>{chat.lastMessage || "No messages yet"}</span>
                      {chat.unread > 0 && <span className="unread-badge" />}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>

      {/* Main chat area */}
      {activeChat ? (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-info">
              <Avatar size="large">{currentChat?.name.charAt(0) || "U"}</Avatar>
              <div>
                <h3>{currentChat?.name || "User"}</h3>
                <p>{connectionStatus === "connected" ? "Online" : "Offline"}</p>
              </div>
            </div>
            <Button type="text" icon={<SearchOutlined />} />
          </div>

          <div className="chat-messages">
            {currentMessages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === userId ? "sent" : "received"
                }`}
              >
                <div className="message-content">
                  <div className="message-text text-sm">{message.message}</div>
                  <div className="message-meta">
                    <span className="message-time">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.sender === userId && (
                      <span className="message-status">
                        {message.status === "read" ? (
                          <CheckCircleOutlined className="read-icon" />
                        ) : (
                          <CheckOutlined />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <Button type="text" icon={<SmileOutlined />} />
            <Button type="text" icon={<PaperClipOutlined />} />
            <Input.TextArea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type a message"
              autoSize={{ minRows: 1, maxRows: 4 }}
              disabled={connectionStatus !== "connected"}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={
                !inputMessage.trim() || connectionStatus !== "connected"
              }
            />
          </div>
        </div>
      ) : (
        <div className="empty-chat bg-input text-color">
          <h2>No Chat Selected </h2>
          <p>Please select a user to start chatting</p>
        </div>
      )}
    </div>
  );
};



export default function BrandChatPage() {
  return (
    <Suspense
      fallback={
        <div className="p-4 text-center">Loading Brand chat...</div>
      }
    >
      <BrandChat />
    </Suspense>
  );
}
