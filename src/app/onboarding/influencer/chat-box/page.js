"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
  Suspense,
} from "react";
import {
  Input,
  Button,
  List,
  Avatar,
  Badge,
  Dropdown,
  Menu,
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
import "../../../../app/chat.css";
import { authContext } from "@/assets/context/use-context";
import { useAuth } from "@/assets/hooks/use-auth";

const InfluencerChat = () => {
  // State management
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const auth = useAuth();

  const { user } = useContext(authContext);
  const userId = user?.user_id;

  // Helper functions

  const formatTime = useCallback((timestamp) => {
    try {
      if (!timestamp) return "Just now";

      const normalizedTimestamp = timestamp.endsWith("+00:00")
        ? timestamp.replace("+00:00", "Z")
        : timestamp;

      const date = new Date(normalizedTimestamp);
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", timestamp);
        return "Just now";
      }
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting time:", error, timestamp);
      return "Just now";
    }
  }, []);

  const createNewChat = useCallback(
    (id, name, messages) => {
      return {
        id,
        name,
        avatar: name.charAt(0),
        lastMessage: messages[0]?.message || "",
        time: messages[0]?.timestamp
          ? formatTime(messages[0].timestamp)
          : "Just now",
        unread: 0,
        messages: [], // Start with empty messages, will be populated after chat.join
      };
    },
    [formatTime]
  );

  // Handle all chats response
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
            avatar: chatGroup.user.user_name?.charAt(0) || "U",
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

  // Chat history handler for a specific chat
  const handleChatHistory = useCallback(
    (historyData) => {
      console.log("Processing chat history:", historyData);
      if (!historyData.messages?.length) {
        console.log("No messages in chat history");
        return;
      }
      // Sort messages by timestamp (oldest first)
      const sortedMessages = [...historyData.messages].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      // Update the messages for the active chat
      setSelectedChatMessages(sortedMessages);

      // Update last message in sidebar
      setChats((prevChats) => {
        return prevChats.map((chat) => {
          console.log("CHAT ", chat);
          console.log("HISTORY ", historyData);
          if (chat.id === historyData.messages[0].recipient) {
            return {
              ...chat,
              lastMessage:
                sortedMessages[sortedMessages.length - 1]?.message || "",
              time: sortedMessages[sortedMessages.length - 1]?.timestamp
                ? formatTime(
                    sortedMessages[sortedMessages.length - 1].timestamp
                  )
                : "Just now",
              messages: sortedMessages, // Add the messages to the chat object
            };
          }
          return chat;
        });
      });
    },
    [formatTime]
  );

  const handleChatSelect = useCallback((chatId) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      antdMessage.warning("Connection not ready. Please try again.");
      return;
    }

    setActiveChat(chatId);
    setSelectedChatMessages([]);

    const joinChatRequest = {
      type: "chat.join",
      user_id: chatId, // Using the user_id directly
    };

    console.log("Sending chat join:", joinChatRequest);
    socketRef.current.send(JSON.stringify(joinChatRequest));
  }, []);

  // New message handler
  const handleNewMessage = useCallback(
    (messageData) => {
      console.log("Processing new message:", messageData);

      // For new messages, the structure might be different - check if there's a body property
      const messageBody = messageData.body || messageData;

      // Add safety checks for sender/recipient
      if (!messageBody.sender || !messageBody.recipient) {
        console.error("Message missing sender/recipient:", messageBody);
        return;
      }

      const isMe = messageBody.sender === userId;
      const chatId = isMe ? messageBody.recipient : messageBody.sender;
      const chatName = isMe
        ? messageBody.recipient_name
        : messageBody.sender_name;

      // Add message to selectedChatMessages if it belongs to the active chat
      if (activeChat === chatId) {
        setSelectedChatMessages((prev) => [...prev, messageBody]);
      }

      setChats((prevChats) => {
        const chatExists = prevChats.some((chat) => chat.id === chatId);
        if (!chatExists) {
          return [
            ...prevChats,
            {
              id: chatId,
              name: chatName || `User ${chatId.slice(0, 4)}`,
              avatar: (chatName || "U").charAt(0),
              lastMessage: messageBody.message,
              time: formatTime(messageBody.timestamp),
              unread: isMe ? 0 : 1,
              messages: [messageBody],
            },
          ];
        }

        return prevChats.map((chat) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              lastMessage: messageBody.message,
              time: formatTime(messageBody.timestamp),
              unread: isMe ? 0 : chat.unread + 1,
              // Update the messages array with the new message
              messages: [...(chat.messages || []), messageBody],
            };
          }
          return chat;
        });
      });
    },
    [formatTime, userId, activeChat]
  );

  // WebSocket initialization with auth in headers
  const initWebSocket = useCallback(() => {
    if (!userId || !auth) {
      antdMessage.warning("Please log in to access your chats");
      return;
    }

    // Clean up any existing connection
    if (socketRef.current) {
      socketRef.current.onopen = null;
      socketRef.current.onmessage = null;
      socketRef.current.onerror = null;
      socketRef.current.onclose = null;
      socketRef.current.close();
      socketRef.current = null;
    }

    // Clear any pending reconnection attempts
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    const wsUrl = `ws://147.78.141.96:8075/nexus/?token=${auth}`;
    setConnectionStatus("connecting");
    console.log("Attempting to connect to WebSocket with auth token in URL");

    try {
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected successfully");
        setConnectionStatus("connected");
        setReconnectAttempts(0);
        antdMessage.success("Connected to chat server");

        // First request: Get all chats for current user
        const allChatsRequest = {
          type: "chats.all",
        };
        ws.send(JSON.stringify(allChatsRequest));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received message:", data);

          switch (data.type) {
            case "connection.success":
              antdMessage.success(data.message);
              break;
            case "chats.all":
              handleAllChats(data);
              break;
            case "chat.history":
              handleChatHistory(data);
              break;
            case "chat.message":
              handleNewMessage(data);
              break;
            case "chat.join.success":
              console.log("Successfully joined chat:", data);
              break;
            default:
              console.warn("Unknown message type:", data.type);
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error event:", error);
        setConnectionStatus("disconnected");
        antdMessage.error("Connection error. Please check your network.");

        // Try to reconnect if this was an unexpected error
        const MAX_RECONNECT_ATTEMPTS = 5;
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          const delay = Math.min(1000 * 2 ** reconnectAttempts, 30000);
          antdMessage.warning(
            `Connection error. Reconnecting in ${delay / 1000} seconds...`
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(
              `Attempting to reconnect (${
                reconnectAttempts + 1
              }/${MAX_RECONNECT_ATTEMPTS})...`
            );
            setReconnectAttempts((prev) => prev + 1);
            initWebSocket();
          }, delay);
        }
      };

      ws.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason);
        setConnectionStatus("disconnected");

        if (event.code !== 1000) {
          // 1000 is normal closure
          const MAX_RECONNECT_ATTEMPTS = 5;
          if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
            const delay = Math.min(1000 * 2 ** reconnectAttempts, 30000);
            antdMessage.warning(
              `Connection lost. Reconnecting in ${delay / 1000} seconds...`
            );

            reconnectTimeoutRef.current = setTimeout(() => {
              console.log(
                `Attempting to reconnect (${
                  reconnectAttempts + 1
                }/${MAX_RECONNECT_ATTEMPTS})...`
              );
              setReconnectAttempts((prev) => prev + 1);
              initWebSocket();
            }, delay);
          } else {
            antdMessage.error(
              "Failed to connect after multiple attempts. Please refresh the page."
            );
          }
        }
      };
    } catch (error) {
      console.error("WebSocket initialization error:", error);
      antdMessage.error("Failed to initialize connection");
      setConnectionStatus("disconnected");
    }
  }, [
    auth,
    handleAllChats,
    handleChatHistory,
    handleNewMessage,
    reconnectAttempts,
    userId,
  ]);

  // Initialize WebSocket connection
  useEffect(() => {
    if (auth) {
      initWebSocket();
    }

    return () => {
      // Clean up WebSocket connection
      if (socketRef.current) {
        socketRef.current.onopen = null;
        socketRef.current.onmessage = null;
        socketRef.current.onerror = null;
        socketRef.current.onclose = null;
        socketRef.current.close(1000, "Component unmounted");
        socketRef.current = null;
      }
      // Clear any pending reconnection attempts
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };
  }, [initWebSocket, auth]);

  // Join chat when active chat changes
  useEffect(() => {
    if (activeChat && socketRef.current?.readyState === WebSocket.OPEN) {
      const joinChatRequest = {
        type: "chat.join",
        user_id: activeChat,
      };
      socketRef.current.send(JSON.stringify(joinChatRequest));
    }
  }, [activeChat]);

  // Send message handler
  const handleSendMessage = () => {
    if (!inputMessage.trim()) {
      antdMessage.warning("Message cannot be empty");
      return;
    }

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      antdMessage.warning("Cannot send message - connection not ready");
      return;
    }

    if (!activeChat) {
      antdMessage.warning("Please select a chat to send message");
      return;
    }

    const message = {
      type: "chat.message",
      user_id: activeChat,
      message: inputMessage,
    };

    try {
      socketRef.current.send(JSON.stringify(message));
      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      antdMessage.error("Failed to send message");
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  // Filter chats based on search text
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Connection status text
  const connectionStatusText = {
    connecting: "Connecting...",
    connected: "Online",
    disconnected: "Offline",
  }[connectionStatus];

  return (
    <div className="whatsapp-container">
      {/* Chat list sidebar */}
      <div className="chat-list p-2">
        <div className="chat-list-header">
          <div className="user-avatar">
            <Avatar size="large" className="bg-primary">
              {user?.firstName?.charAt(0) || "ME"}
            </Avatar>
          </div>
          <div className="chat-list-actions p-2">
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
                onClick={() => handleChatSelect(chat.id)}
              >
                <List.Item.Meta
                  avatar={
                    <Badge count={chat.unread} offset={[-10, 0]}>
                      <Avatar size="large">{chat.avatar}</Avatar>
                    </Badge>
                  }
                  title={
                    <div className="chat-title">
                      <span>{chat.name}</span>
                      <span className="chat-time">{chat.time}</span>
                    </div>
                  }
                  description={
                    <div className="chat-description">
                      <span>{chat.lastMessage}</span>
                      {chat.unread > 0 && (
                        <span className="unread-badge bg-primary" />
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </div>

      {/* Main chat window */}
      {activeChat ? (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-info">
              <Avatar size="large">
                {chats.find((c) => c.id === activeChat)?.name.charAt(0) || "U"}
              </Avatar>
              <div className="chat-details">
                <h3>
                  {chats.find((c) => c.id === activeChat)?.name || "User"}
                </h3>
                <p>{connectionStatusText}</p>
              </div>
            </div>
            <div className="chat-actions">
              <Button type="text" icon={<SearchOutlined />} />
            </div>
          </div>
          {/* Messages area */}
          <div className="chat-messages">
            {selectedChatMessages.map((message, index) => {
              // Direct access to message properties without body
              const isMe = message.sender === userId;

              return (
                <div
                  key={message.id || index}
                  className={`message ${isMe ? "sent" : "received"}`}
                >
                  {!isMe && (
                    <Avatar className="message-avatar">
                      {chats
                        .find((c) => c.id === message.sender)
                        ?.name.charAt(0) || "U"}
                    </Avatar>
                  )}
                  <div className="message-content">
                    <div className="message-text text-sm">
                      {message.message}
                    </div>
                    <div className="message-meta">
                      <span className="message-time">
                        {formatTime(message.timestamp)}
                      </span>
                      {isMe && (
                        <span className="message-status">
                          {message.status === "read" ? (
                            <CheckCircleOutlined style={{ color: "#53bdeb" }} />
                          ) : message.status === "delivered" ? (
                            <CheckCircleOutlined />
                          ) : (
                            <CheckOutlined />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          {/* Message input area */}
          <div className="chat-input">
            <div className="input-actions">
              <Button type="text" icon={<SmileOutlined />} />
              <Button type="text" icon={<PaperClipOutlined />} />
            </div>
            <Input.TextArea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message"
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="message-input"
              disabled={connectionStatus !== "connected"}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={
                !inputMessage.trim() || connectionStatus !== "connected"
              }
              className="send-button"
            />
          </div>
        </div>
      ) : (
        <div className="empty-chat">
          <div className="empty-content">
            <Avatar size={100} icon={<UserOutlined />} />
            <h2>Influencer Platform</h2>
            <p>
              {connectionStatus === "connected"
                ? chats.length > 0
                  ? "Select a chat to start messaging"
                  : "You have no chats yet"
                : connectionStatusText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function TikTokCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="p-4 text-center">Loading Influencer chat...</div>
      }
    >
      <InfluencerChat />
    </Suspense>
  );
}
