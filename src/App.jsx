import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ChatInterface from './components/ChatInterface';
import { uploadFile, sendMessage } from './services/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleUpload = async (file) => {
    const result = await uploadFile(file);
    setFileUploaded(true);
    setMessages([
      {
        content: `✅ File uploaded: ${result.fileName}\n\nYou can now ask questions about your notes!`,
        isUser: false,
      },
    ]);
  };

  const handleSendMessage = async (userMessage) => {
    if (!fileUploaded) {
      alert('Please upload a PDF file first!');
      return;
    }

    // Add user message
    setMessages((prev) => [...prev, { content: userMessage, isUser: true }]);
    setLoading(true);

    try {
      const response = await sendMessage(userMessage);

      // Add AI response
      setMessages((prev) => [
        ...prev,
        { content: response.reply, isUser: false },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          content: 'Error: ' + (error.response?.data?.error || error.message),
          isUser: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎓 AI Study Buddy
          </h1>
          <p className="text-gray-600">
            Upload your notes and chat with AI to learn smarter
          </p>
        </div>

        {/* File Upload */}
        <FileUpload onUploadSuccess={handleUpload} />

        {/* Chat Interface */}
        <ChatInterface
          messages={messages}
          onSendMessage={handleSendMessage}
          loading={loading}
        />

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Built with React, Spring Boot & Groq AI</p>
        </div>
      </div>
    </div>
  );
}

export default App;