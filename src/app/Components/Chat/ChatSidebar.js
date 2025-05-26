'use client';
import React from 'react';
import { Input, Badge, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const ChatSidebar = ({
  chats,
  activeChat,
  onChatSelect,
  searchText,
  onSearchChange,
  currentUserId
}) => {
  return (
    <>
      {/* Search Header */}
      <div className="p-4 border-b border-input">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search conversations..."
          value={searchText}
          onChange={e => onSearchChange(e.target.value)}
          className="rounded-full bg-gray-50"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats
          .filter(chat => 
            chat.name.toLowerCase().includes(searchText.toLowerCase()) ||
            chat.lastMessage?.toLowerCase().includes(searchText.toLowerCase())
          )
          .map(chat => (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`
                flex items-center gap-3 p-4 cursor-pointer transition-all
                hover:bg-gray-50
                ${activeChat === chat.id ? 'bg-primary/5 border-r-4 border-primary' : ''}
                ${chat.unread > 0 ? 'bg-blue-50/50' : ''}
              `}
            >
              <div className="relative">
                <Avatar
                  size={48}
                  src={chat.avatar}
                  className="bg-primary text-white"
                >
                  {chat.name[0].toUpperCase()}
                </Avatar>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {chat.time}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 truncate">
                    {chat.lastMessage || 'Start a conversation'}
                  </p>
                  {chat.unread > 0 && (
                    <Badge 
                      count={chat.unread}
                      className="ml-2"
                      style={{ 
                        backgroundColor: '#3b82f6',
                        boxShadow: 'none'
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ChatSidebar; 