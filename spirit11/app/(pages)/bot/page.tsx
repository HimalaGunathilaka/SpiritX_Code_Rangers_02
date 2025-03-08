'use client';

import React, { useState } from 'react';

interface Message {
    role: 'user' | 'bot';
    content: string;
}

export default function ChatbotPage() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'bot',
            content: 'Hello! I\'m Spiriter, your fantasy cricket AI assistant. How can I help you today with your team?'
        }
    ]);

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add user message
        setMessages([...messages, { role: 'user', content: input }]);
        console.log(input);
        // Send request to the bot API
        const response = await fetch('http://localhost:3000/api/bot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: input })
        });

        const data = await response.json();
        console.log(data);

        // Add bot response
        setMessages(prevMessages => [...prevMessages, { role: 'bot', content: data.response }]);

        // Clear input
        setInput('');
    };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-black">Spiriter AI Assistant</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)] flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-lg font-bold text-black">Chat with Spiriter</h2>
                <p className="text-sm text-gray-700">Get personalized advice for your fantasy cricket team</p>
              </div>
              <div className="flex flex-col h-[calc(100%-5rem)] p-4">
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          {message.role === "bot" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                          <span className="font-medium">{message.role === "bot" ? "Spiriter" : "You"}</span>
                        </div>
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about players, strategies, or team composition..."
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button 
                    onClick={handleSend}
                    className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">How Spiriter Can Help</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Player Recommendations</p>
                      <p className="text-sm text-gray-500">
                        Get insights on which players to pick based on form and matchups
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Captain Suggestions</p>
                      <p className="text-sm text-gray-500">Find the best captain and vice-captain for maximum points</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <line x1="12" x2="12" y1="2" y2="22" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Budget Optimization</p>
                      <p className="text-sm text-gray-500">Learn how to maximize your $10,000 budget effectively</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <line x1="12" x2="12" y1="20" y2="10" />
                        <line x1="18" x2="18" y1="20" y2="4" />
                        <line x1="6" x2="6" y1="20" y2="16" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Performance Analysis</p>
                      <p className="text-sm text-gray-500">Get detailed stats and analysis on any player</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  Suggested Questions
                </h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {[
                    "Who is the best batsman to pick right now?",
                    "Which bowlers should I include in my team?",
                    "Who should I pick as my captain?",
                    "How should I manage my budget?",
                    "What's the best strategy to win?"
                  ].map((question, index) => (
                    <button
                      key={index}
                      className="w-full text-left border border-gray-300 rounded-md p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                      onClick={() => {
                        setInput(question);
                        setTimeout(() => handleSend(), 100);
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}