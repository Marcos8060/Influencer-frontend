"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, List, Avatar, Badge, Tabs, Dropdown, Menu } from 'antd';
import { 
  SearchOutlined, 
  MoreOutlined, 
  PaperClipOutlined, 
  SmileOutlined, 
  SendOutlined, 
  CheckOutlined,
  CheckCircleOutlined,
  UserOutlined
} from '@ant-design/icons';
import '../../../../app/chat.css'; // Create this CSS file for custom styles

const WhatsAppChat = () => {
  // Sample chat data
  const [chats, setChats] = useState([
    {
      id: '1',
      name: 'John Doe',
      avatar: 'JD',
      lastMessage: 'Hey, how are you?',
      time: '10:30 AM',
      unread: 2,
      messages: [
        { id: '1', text: 'Hey there!', sender: 'them', time: '10:20 AM', status: 'read' },
        { id: '2', text: 'How are you doing?', sender: 'them', time: '10:21 AM', status: 'read' },
        { id: '3', text: "I'm good, thanks!", sender: 'me', time: '10:25 AM', status: 'read' },
        { id: '4', text: 'Hey, how are you?', sender: 'them', time: '10:30 AM', status: 'delivered' }
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'JS',
      lastMessage: 'Meeting at 3pm',
      time: '9:15 AM',
      unread: 0,
      messages: [
        { id: '1', text: 'Hi Jane!', sender: 'me', time: '9:00 AM', status: 'read' },
        { id: '2', text: 'Meeting at 3pm', sender: 'them', time: '9:15 AM', status: 'read' }
      ]
    },
    {
      id: '3',
      name: 'Work Group',
      avatar: 'WG',
      lastMessage: 'Alice: I sent the files',
      time: 'Yesterday',
      unread: 5,
      messages: [
        { id: '1', text: 'Bob: Has everyone reviewed the proposal?', sender: 'them', time: 'Yesterday', status: 'read' },
        { id: '2', text: "I'll review it today", sender: 'me', time: 'Yesterday', status: 'read' },
        { id: '3', text: 'Alice: I sent the files', sender: 'them', time: 'Yesterday', status: 'delivered' }
      ]
    }
  ]);

  const [activeChat, setActiveChat] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [searchText, setSearchText] = useState('');
  const messagesEndRef = useRef(null);

  // Set first chat as active by default
  useEffect(() => {
    if (chats.length > 0 && !activeChat) {
      setActiveChat(chats[0].id);
    }
  }, [chats, activeChat]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat, chats]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    const updatedChats = chats.map(chat => {
      if (chat.id === activeChat) {
        return {
          ...chat,
          lastMessage: inputMessage,
          time: 'Just now',
          messages: [...chat.messages, newMessage]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setInputMessage('');

    // Simulate reply after 1-3 seconds
    setTimeout(() => {
      const replyMessage = {
        id: Date.now().toString(),
        text: `Reply to: "${inputMessage}"`,
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered'
      };

      setChats(prevChats => 
        prevChats.map(chat => {
          if (chat.id === activeChat) {
            return {
              ...chat,
              lastMessage: replyMessage.text,
              time: 'Just now',
              messages: [...chat.messages, replyMessage]
            };
          }
          return chat;
        })
      );
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const activeChatData = chats.find(chat => chat.id === activeChat);

  const menu = (
    <Menu>
      <Menu.Item key="1">View contact</Menu.Item>
      <Menu.Item key="2">Mute notifications</Menu.Item>
      <Menu.Item key="3">Clear messages</Menu.Item>
      <Menu.Item key="4">Delete chat</Menu.Item>
    </Menu>
  );

  return (
    <div className="whatsapp-container">
      {/* Left sidebar - Chat list */}
      <div className="chat-list p-2">
        <div className="chat-list-header">
          <div className="user-avatar">
            <Avatar size="large" className='bg-primary'>ME</Avatar>
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
            renderItem={chat => (
              <List.Item
                className={`chat-item ${activeChat === chat.id ? 'active' : ''}`}
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
                      <span className="chat-time text-color">{chat.time}</span>
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

      {/* Right side - Active chat */}
      {activeChatData ? (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-info">
              <Avatar size="large">{activeChatData.avatar}</Avatar>
              <div className="chat-details">
                <h3>{activeChatData.name}</h3>
                <p>Online</p>
              </div>
            </div>
            <div className="chat-actions">
              <Button type="text" icon={<SearchOutlined />} />
              <Button type="text" icon={<MoreOutlined />} />
            </div>
          </div>
          
          <div className="chat-messages">
            {activeChatData.messages.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'me' ? 'sent' : 'received'}`}
              >
                <div className="message-content">
                  <div className="message-text text-sm">{message.text}</div>
                  <div className="message-meta">
                    <span className="message-time text-white">{message.time}</span>
                    {message.sender === 'me' && (
                      <span className="message-status">
                        {message.status === 'read' ? (
                          <CheckCircleOutlined style={{ color: '#ffffff' }} />
                        ) : message.status === 'delivered' ? (
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
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-primary"
            />
          </div>
        </div>
      ) : (
        <div className="empty-chat">
          <div className="empty-content">
            <Avatar size={100} icon={<UserOutlined />} />
            <h2>WhatsApp Web</h2>
            <p>Select a chat to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppChat;