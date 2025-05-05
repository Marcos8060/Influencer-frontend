"use client";
import React, { useState, useRef, useEffect, useContext, useCallback, Suspense } from "react";
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
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/assets/hooks/use-auth";

const WhatsAppChat = () => {
  // State management
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const auth = useAuth();

  // Get parameters from URL
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("userId");
  const influencerFullName = searchParams.get("fullName");
  const { user } = useContext(authContext);
  const userId = user?.user_id;

  // Initialize chat with recipient from URL params
  useEffect(() => {
    if (recipientId && influencerFullName && chats.length === 0) {
      const newChat = createNewChat(recipientId, influencerFullName, []);
      setChats([newChat]);
      setActiveChat(recipientId);
    }
  }, [recipientId, influencerFullName]);

  // Helper functions
  const createNewChat = useCallback((id, name, messages) => {
    return {
      id,
      name,
      avatar: name.charAt(0),
      lastMessage: messages[0]?.message || "",
      time: messages[0]?.timestamp ? formatTime(messages[0].timestamp) : "Just now",
      unread: 0,
      messages,
    };
  }, []);

  const formatTime = useCallback((timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, []);

  // Chat history handler
  const handleChatHistory = useCallback((historyData) => {
    if (!historyData.messages?.length) {
      return;
    }

    // Sort messages by timestamp (oldest first)
    const sortedMessages = [...historyData.messages].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === recipientId) {
          return {
            ...chat,
            messages: sortedMessages,
            lastMessage: sortedMessages[sortedMessages.length - 1]?.message || "",
            time: sortedMessages[sortedMessages.length - 1]?.timestamp 
              ? formatTime(sortedMessages[sortedMessages.length - 1].timestamp)
              : "Just now"
          };
        }
        return chat;
      });
    });
  }, [recipientId, formatTime]);

  // New message handler
  const handleNewMessage = useCallback((messageData) => {
    setChats(prevChats => {
      const isMe = messageData.sender === userId;
      
      return prevChats.map(chat => {
        if (chat.id === recipientId) {
          return {
            ...chat,
            lastMessage: messageData.message,
            time: formatTime(messageData.timestamp),
            messages: [...chat.messages, messageData],
            unread: isMe ? 0 : chat.unread + 1,
          };
        }
        return chat;
      });
    });
  }, [formatTime, recipientId, userId]);

  // WebSocket initialization with auth in headers
  const initWebSocket = useCallback(() => {
    if (!userId || !recipientId || !auth) {
      antdMessage.warning("Please log in and select a user to chat with");
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
          type: "chats.all"
        };
        ws.send(JSON.stringify(allChatsRequest));
        
        // Second request: Join specific chat
        const joinChatRequest = {
          type: "chat.join",
          user_id: recipientId
        };
        ws.send(JSON.stringify(joinChatRequest));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Received message:", data);

          switch (data.type) {
            case "connection.success":
              antdMessage.success(data.message);
              break;
            case "chat.history":
              handleChatHistory(data);
              break;
            case "chat.message":
              handleNewMessage(data);
              break;
            case "chats.all":
              // Handle the response for all chats if needed
              console.log("Received all chats data:", data);
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
          const delay = Math.min(1000 * (2 ** reconnectAttempts), 30000);
          antdMessage.warning(`Connection error. Reconnecting in ${delay/1000} seconds...`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(`Attempting to reconnect (${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS})...`);
            setReconnectAttempts(prev => prev + 1);
            initWebSocket();
          }, delay);
        }
      };

      ws.onclose = (event) => {
        console.log("WebSocket closed:", event.code, event.reason);
        setConnectionStatus("disconnected");
        
        if (event.code !== 1000) { // 1000 is normal closure
          const MAX_RECONNECT_ATTEMPTS = 5;
          if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
            const delay = Math.min(1000 * (2 ** reconnectAttempts), 30000);
            antdMessage.warning(`Connection lost. Reconnecting in ${delay/1000} seconds...`);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              console.log(`Attempting to reconnect (${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS})...`);
              setReconnectAttempts(prev => prev + 1);
              initWebSocket();
            }, delay);
          } else {
            antdMessage.error("Failed to connect after multiple attempts. Please refresh the page.");
          }
        }
      };

    } catch (error) {
      console.error("WebSocket initialization error:", error);
      antdMessage.error("Failed to initialize connection");
      setConnectionStatus("disconnected");
    }
  }, [auth, handleChatHistory, handleNewMessage, reconnectAttempts, recipientId, userId]);

  // Initialize WebSocket connection
  useEffect(() => {
    if (recipientId && auth) {
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
  }, [initWebSocket, recipientId, auth]);

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

    const message = {
      type: "chat.message",
      user_id: activeChat, // Using activeChat as the user_id
      message: inputMessage
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

  // Render empty state if no recipient selected
  if (!recipientId) {
    return (
      <div className="empty-chat">
        <div className="empty-content">
          <Avatar size={100} icon={<UserOutlined />} />
          <h2>No Chat Selected</h2>
          <p>Please select a user to start chatting</p>
        </div>
      </div>
    );
  }

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
                className={`chat-item ${activeChat === chat.id ? "active" : ""}`}
                onClick={() => setActiveChat(chat.id)}
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
                      {chat.unread > 0 && <span className="unread-badge bg-primary" />}
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
                {chats.find(c => c.id === activeChat)?.name.charAt(0) || "U"}
              </Avatar>
              <div className="chat-details">
                <h3>{chats.find(c => c.id === activeChat)?.name || "User"}</h3>
                <p>{connectionStatusText}</p>
              </div>
            </div>
            <div className="chat-actions">
              <Button type="text" icon={<SearchOutlined />} />
            </div>
          </div>

          {/* Messages area */}
          <div className="chat-messages">
            {chats.find(chat => chat.id === activeChat)?.messages.map((message, index) => (
              <div
                key={message.id || index}
                className={`message ${message.sender === userId ? "sent" : "received"}`}
              >
                <div className="message-content">
                  <div className="message-text text-sm">{message.message}</div>
                  <div className="message-meta">
                    <span 
                      className="message-time" 
                      style={{ 
                        color: message.sender === userId ? 'white' : 'black' 
                      }}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                    {message.sender === userId && (
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
            ))}
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
              disabled={!inputMessage.trim() || connectionStatus !== "connected"}
              className="send-button"
            />
          </div>
        </div>
      ) : (
        <div className="empty-chat">
          <div className="empty-content">
            <Avatar size={100} icon={<UserOutlined />} />
            <h2>WhatsApp Web</h2>
            <p>
              {connectionStatus === "connected"
                ? "Select a chat to start messaging"
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
    <Suspense fallback={<div className="p-4 text-center">Loading Brand chat...</div>}>
      <WhatsAppChat />
    </Suspense>
  )
}