import React, { useState, useRef, useEffect } from 'react';

const ChatPanel = ({ onNewSandboxUrl }) => {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: 'Hello! I am your AI assistant. What would you like to build today? (e.g. "Create a todo application")' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate backend processing and sandbox generation
    setTimeout(() => {
      const isReactApp = userMessage.content.toLowerCase().includes('react');
      
      const aiResponse = { 
        id: Date.now() + 1, 
        role: 'assistant', 
        content: `I've created your application based on your prompt: "${userMessage.content}". The sandbox should be visible on the right.` 
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Provide a dummy sandbox link. In a real app, this comes from the backend.
      // We'll use CodeSandbox templates as a dummy proxy.
      const dummyUrl = isReactApp 
        ? 'https://codesandbox.io/embed/new?codemirror=1&template=create-react-app' 
        : 'https://codesandbox.io/embed/vanilla?codemirror=1';
        
      onNewSandboxUrl(dummyUrl);
    }, 1500);
  };

  return (
    <div className="chat-panel glass-panel">
      <div className="chat-header">
        <h2>AI Assistant</h2>
      </div>
      
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message-wrapper ${msg.role}`}>
            <div className={`message-bubble ${msg.role}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message-wrapper assistant">
            <div className="message-bubble assistant typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-area">
        <textarea
          className="input-field chat-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me to create or update an app..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <button type="submit" className="btn-primary send-btn" disabled={!input.trim() || isTyping}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
