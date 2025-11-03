'use client';

import { useState, useEffect } from 'react';
import { useChat } from '@ai-sdk/react';

export default function ChatPage() {
  const { messages, status, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const isLoading = status !== 'ready';

  useEffect(() => {
    console.log('=== FRONTEND UPDATE ===');
    console.log('Messages:', messages);
    console.log('Status:', status);
    console.log('Messages count:', messages.length);
    messages.forEach((msg: any, idx: number) => {
      console.log(`Message ${idx}:`, {
        id: msg.id,
        role: msg.role,
        parts: msg.parts,
      });
    });
  }, [messages, status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      console.log('=== SENDING MESSAGE ===');
      console.log('Input:', input);
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">AI Customer Service Bot</h1>
        <p className="text-sm text-gray-600 mt-1">Test your AI assistant</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg">👋 Welcome! Ask me anything.</p>
            <p className="text-sm mt-2">I'm here to help with your questions.</p>
          </div>
        )}

        {messages.map((message: any) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              {message.parts?.map((part: any, idx: number) => {
                if (part.type === 'text') {
                  console.log(`Rendering text part ${idx}:`, part.text);
                  return (
                    <p key={idx} className="whitespace-pre-wrap">{part.text}</p>
                  );
                }
                return null;
              })}
              {!message.parts && message.content && (
                <p className="whitespace-pre-wrap">{message.content}</p>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
