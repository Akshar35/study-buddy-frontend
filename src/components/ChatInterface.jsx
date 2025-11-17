import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';

const ChatInterface = ({ onSendMessage, messages, loading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    await onSendMessage(userMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-semibold">Chat with Your Notes</h2>
        <p className="text-sm text-blue-100">
          Ask questions about your uploaded study material
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <p className="text-lg mb-2">👋 Upload a PDF to get started!</p>
            <p className="text-sm">
              Once uploaded, you can ask questions about your notes
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <Message key={index} message={msg.content} isUser={msg.isUser} />
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 p-4 rounded-2xl rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about your notes..."
            disabled={loading}
            className="flex-1 p-3 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg
              hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed
              transition font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;