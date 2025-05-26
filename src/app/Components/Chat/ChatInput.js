'use client';
import React, { useRef } from 'react';
import { Input, Button, Tooltip } from 'antd';
import { 
  SendOutlined, 
  PaperClipOutlined,
  SmileOutlined,
  LoadingOutlined,
  CloseCircleOutlined 
} from '@ant-design/icons';

const ChatInput = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  handleFileUpload,
  selectedPhoto,
  handleCancelPhoto,
  isUploading,
  activeChat
}) => {
  const fileInputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-input bg-white">
      {/* Selected Photo Preview */}
      {selectedPhoto && (
        <div className="mb-4 relative inline-block">
          <img
            src={URL.createObjectURL(selectedPhoto)}
            alt="Selected"
            className="h-20 w-20 object-cover rounded-lg border border-input"
          />
          <Button
            type="text"
            icon={<CloseCircleOutlined />}
            className="absolute -top-2 -right-2 bg-white rounded-full shadow-md"
            onClick={handleCancelPhoto}
          />
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2">
        <div className="flex-1 bg-gray-50 rounded-2xl">
          <Input.TextArea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            className="!border-0 !bg-transparent !shadow-none"
            disabled={!activeChat}
          />

          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2">
              {/* File Upload */}
              <Tooltip title="Attach file">
                <Button
                  type="text"
                  icon={isUploading ? <LoadingOutlined /> : <PaperClipOutlined />}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!activeChat || isUploading}
                  className="!border-0"
                />
              </Tooltip>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={!activeChat}
              />

              {/* Emoji Picker */}
              <Tooltip title="Add emoji">
                <Button
                  type="text"
                  icon={<SmileOutlined />}
                  disabled={!activeChat}
                  className="!border-0"
                />
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Send Button */}
        <Tooltip title="Send message">
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            disabled={!activeChat || (!inputMessage && !selectedPhoto)}
            className="!rounded-full !h-10 !w-10 flex items-center justify-center"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default ChatInput; 