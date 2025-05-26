'use client';
import React from 'react';
import { Avatar, Image } from 'antd';
import { motion } from 'framer-motion';
import { CheckOutlined, CheckCircleOutlined } from '@ant-design/icons';

const ChatMessages = ({
  messages,
  currentUserId,
  messagesEndRef,
  formatTime,
  activeChat
}) => {
  const renderMessageStatus = (message) => {
    if (message.sender === currentUserId) {
      switch (message.status) {
        case 'sent':
          return <CheckOutlined className="text-gray-400" />;
        case 'delivered':
          return (
            <div className="flex">
              <CheckOutlined className="text-blue-500" />
              <CheckOutlined className="text-blue-500 -ml-1" />
            </div>
          );
        case 'read':
          return <CheckCircleOutlined className="text-blue-500" />;
        default:
          return null;
      }
    }
    return null;
  };

  const renderMessage = (message, index, messages) => {
    const isMe = message.sender === currentUserId;
    const showAvatar = index === 0 || messages[index - 1].sender !== message.sender;
    const showTime = index === 0 || 
      new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() > 300000;

    return (
      <motion.div
        key={message.id || message.tempId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`flex ${isMe ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[80%]`}>
          {/* Avatar */}
          {!isMe && showAvatar && (
            <Avatar
              size={32}
              src={message.sender_avatar}
              className="mb-1 mr-2"
            >
              {message.sender_name?.[0]}
            </Avatar>
          )}

          <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
            {/* Timestamp */}
            {showTime && (
              <div className="text-xs text-gray-500 mb-1">
                {formatTime(message.timestamp)}
              </div>
            )}

            {/* Message Content */}
            <div
              className={`
                rounded-2xl px-4 py-2 max-w-full break-words
                ${isMe 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }
              `}
            >
              {message.photo_url ? (
                <div className="mb-1">
                  <Image
                    src={message.photo_url}
                    alt="Shared photo"
                    className="rounded-lg max-w-[200px]"
                    preview={{
                      mask: <div className="text-sm">View Photo</div>
                    }}
                  />
                </div>
              ) : null}
              
              {message.message && (
                <p className="whitespace-pre-wrap">{message.message}</p>
              )}
            </div>

            {/* Message Status */}
            {isMe && (
              <div className="text-xs mt-1 flex items-center gap-1">
                {renderMessageStatus(message)}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message, index, messages) => 
        renderMessage(message, index, messages)
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages; 