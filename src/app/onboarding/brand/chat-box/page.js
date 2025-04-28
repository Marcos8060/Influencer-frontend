"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, List, Avatar } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    { id: 1, content: 'Hello! How can I help you today?', sender: 'Bot', isCurrentUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'You',
      isCurrentUser: true
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot reply after 1 second
    setTimeout(() => {
      const botReply = {
        id: messages.length + 2,
        content: 'Thanks for your message! This is a simulated reply.',
        sender: 'Bot',
        isCurrentUser: false
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '500px',
      border: '1px solid #d9d9d9',
      borderRadius: '8px',
      overflow: 'hidden'
    }}>
      {/* Messages display area */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        backgroundColor: '#fafafa'
      }}>
        <List
          dataSource={messages}
          renderItem={msg => (
            <div style={{
              display: 'flex',
              justifyContent: msg.isCurrentUser ? 'flex-end' : 'flex-start',
              marginBottom: '12px'
            }}>
              <div style={{
                maxWidth: '80%',
                padding: '8px 12px',
                borderRadius: '8px',
                background: msg.isCurrentUser ? '#1890ff' : '#f0f0f0',
                color: msg.isCurrentUser ? '#fff' : '#333',
                wordBreak: 'break-word'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                  {msg.sender}
                </div>
                <div>{msg.content}</div>
              </div>
            </div>
          )}
        />
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div style={{
        padding: '12px',
        borderTop: '1px solid #d9d9d9',
        backgroundColor: '#fff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input.TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            style={{ flex: 1, marginRight: '8px' }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            style={{ height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;