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
import ChatLayout from "@/app/Components/Chat/ChatLayout";
import ChatSidebar from "@/app/Components/Chat/ChatSidebar";
import ChatMessages from "@/app/Components/Chat/ChatMessages";
import ChatInput from "@/app/Components/Chat/ChatInput";
import useWindowSize from "@/assets/hooks/use-window-size";
import AuthGuard from "@/assets/hooks/authGuard";

const InfluencerChat = () => {
  // State management
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const { user } = useContext(authContext);
  const userId = user?.user_id;
  const auth = useAuth();
  const { width } = useWindowSize();
  const isMobile = width < 768;

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

  // WebSocket connection management
  useEffect(() => {
    if (!userId || !auth) return;

    const connectWebSocket = () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) return;

      const wsUrl = `ws://147.78.141.96:8075/nexus/?token=${auth}`;
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus("connected");
        antdMessage.success("Connected to chat server");

        // Request all chats on connection
        ws.send(JSON.stringify({ type: "chats.all" }));

        // Join specific chat if active
        if (activeChat) {
          ws.send(
            JSON.stringify({
              type: "chat.join",
              user_id: activeChat,
            })
          );
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleWebSocketMessage(data);
        } catch (error) {
          console.error("Error parsing message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setConnectionStatus("disconnected");
        antdMessage.error("Connection error");
      };

      ws.onclose = () => {
        setConnectionStatus("disconnected");
        setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, [userId, auth, activeChat]);

  // WebSocket message handler
  const handleWebSocketMessage = useCallback((data) => {
    switch (data.type) {
      case "chat.history":
        handleChatHistory(data);
        break;
      case "chat.message":
        handleNewMessage(data);
        break;
      case "chats.all":
        handleAllChats(data);
        break;
      default:
        console.warn("Unhandled message type:", data.type);
    }
  }, []);

  // Message handlers
  const handleChatHistory = useCallback(
    (data) => {
      if (!data.messages?.length) return;

      const sortedMessages = [...data.messages].sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      setSelectedChatMessages(sortedMessages);

      // Update last message in chat list
      const lastMessage = sortedMessages[sortedMessages.length - 1];
      setChats((prev) =>
        prev.map((chat) => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              lastMessage: lastMessage.message,
              time: formatTime(lastMessage.timestamp),
            };
          }
          return chat;
        })
      );

      // Scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    [activeChat, formatTime]
  );

  const handleNewMessage = useCallback(
    (data) => {
      const messageData = data.body || data;

      // Skip if message is invalid
      if (!messageData.sender || !messageData.recipient) {
        console.error("Invalid message format:", messageData);
        return;
      }

      const isMe = messageData.sender === userId;
      const chatId = isMe ? messageData.recipient : messageData.sender;

      // Update messages if this is the active chat
      if (chatId === activeChat) {
        setSelectedChatMessages((prev) => {
          // Check for duplicates
          const isDuplicate = prev.some(
            (m) =>
              (m.id && m.id === messageData.id) ||
              (m.tempId &&
                messageData.temp_id &&
                m.tempId === messageData.temp_id)
          );

          if (isDuplicate) {
            return prev.map((m) => {
              if (
                (m.tempId && m.tempId === messageData.temp_id) ||
                m.id === messageData.id
              ) {
                return { ...m, status: "delivered", id: messageData.id };
              }
              return m;
            });
          }

          return [
            ...prev,
            {
              ...messageData,
              status: isMe ? "delivered" : "received",
            },
          ];
        });
      }

      // Update chat list
      setChats((prev) => {
        const existingChat = prev.find((chat) => chat.id === chatId);

        if (!existingChat) {
          // New chat
          return [
            ...prev,
            {
              id: chatId,
              name: isMe ? messageData.recipient_name : messageData.sender_name,
              avatar:
                (isMe
                  ? messageData.recipient_name
                  : messageData.sender_name
                )?.charAt(0) || "U",
              lastMessage: messageData.message,
              time: formatTime(messageData.timestamp),
              unread: isMe ? 0 : 1,
            },
          ];
        }

        // Existing chat
        return prev.map((chat) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              lastMessage: messageData.message,
              time: formatTime(messageData.timestamp),
              unread: isMe || activeChat === chatId ? 0 : chat.unread + 1,
            };
          }
          return chat;
        });
      });

      // Scroll to bottom for new messages in active chat
      if (chatId === activeChat) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    },
    [userId, activeChat, formatTime]
  );

  const handleAllChats = useCallback(
    (data) => {
      if (!data.messages?.length) {
        antdMessage.info("No chat history yet");
        return;
      }

      const formattedChats = data.messages
        .map((chatGroup) => {
          if (!chatGroup.user) return null;

          return {
            id: chatGroup.user.user_id,
            name: chatGroup.user.user_name,
            chatGroupId: chatGroup.chatGroupId,
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
        .filter((chat) => chat !== null);

      setChats(formattedChats);
    },
    [formatTime]
  );

  // Chat actions
  const handleChatSelect = useCallback(
    (chatId) => {
      if (
        !socketRef.current ||
        socketRef.current.readyState !== WebSocket.OPEN
      ) {
        antdMessage.warning("Connection not ready. Please try again.");
        return;
      }

      setActiveChat(chatId);
      setSelectedChatMessages([]);
      if (isMobile) setShowSidebar(false);

      socketRef.current.send(
        JSON.stringify({
          type: "chat.join",
          user_id: chatId,
        })
      );
    },
    [isMobile]
  );

  const handleSendMessage = useCallback(() => {
    if (!activeChat || (!inputMessage && !selectedPhoto)) return;

    if (socketRef.current?.readyState !== WebSocket.OPEN) {
      antdMessage.error("Connection lost. Please try again.");
      return;
    }

    const tempId = Date.now().toString();
    const messageData = {
      type: "chat.message",
      user_id: activeChat,
      message: inputMessage,
      temp_id: tempId,
      sender: userId,
      sender_name: user?.firstName || "Me",
      recipient: activeChat,
      recipient_name: chats.find((c) => c.id === activeChat)?.name || "User",
      timestamp: new Date().toISOString(),
    };

    // Add message to UI immediately
    const tempMessage = {
      id: tempId,
      sender: userId,
      recipient: activeChat,
      message: inputMessage,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    setSelectedChatMessages((prev) => [...prev, tempMessage]);
    socketRef.current.send(JSON.stringify(messageData));

    setInputMessage("");
    if (selectedPhoto) setSelectedPhoto(null);

    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [activeChat, inputMessage, selectedPhoto, userId, user, chats]);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedPhoto(file);
    setIsUploading(true);

    // TODO: Implement file upload logic
    setTimeout(() => {
      setIsUploading(false);
    }, 1000);
  }, []);

  const handleCancelPhoto = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  return (
    <ChatLayout
      sidebar={
        <ChatSidebar
          chats={chats}
          activeChat={activeChat}
          onChatSelect={handleChatSelect}
          searchText={searchText}
          onSearchChange={setSearchText}
          currentUserId={userId}
        />
      }
      mainContent={
        <div className="flex flex-col h-full">
          {activeChat ? (
            <>
              <ChatMessages
                messages={selectedChatMessages}
                currentUserId={userId}
                messagesEndRef={messagesEndRef}
                formatTime={formatTime}
                activeChat={activeChat}
              />
              <ChatInput
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
                handleFileUpload={handleFileUpload}
                selectedPhoto={selectedPhoto}
                handleCancelPhoto={handleCancelPhoto}
                isUploading={isUploading}
                activeChat={activeChat}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      }
      isMobile={isMobile}
      showSidebar={showSidebar}
      onToggleSidebar={() => setShowSidebar(!showSidebar)}
    />
  );
};

export default function InfluencerChatPage() {
  return (
    <AuthGuard>
      <Suspense
        fallback={
          <div className="p-4 text-center">Loading InfluencerChat chat...</div>
        }
      >
        <InfluencerChat />
      </Suspense>
    </AuthGuard>
  );
}
