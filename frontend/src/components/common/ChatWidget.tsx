import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle, Minimize2, Maximize2 } from 'lucide-react';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'visitor' | 'system';
  timestamp: Date;
  isAutomated: boolean;
}

interface ChatWidgetProps {
  onStartChat?: (name: string, email: string, message: string) => void;
  onSendMessage?: (conversationId: string, message: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function ChatWidget({
  onStartChat,
  onSendMessage,
  isOpen: externalIsOpen,
  onClose,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(externalIsOpen ?? false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [step, setStep] = useState<'welcome' | 'chat'>('welcome');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStartChat = () => {
    if (!visitorName || !visitorEmail || !inputValue) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const initialMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'visitor',
      timestamp: new Date(),
      isAutomated: false,
    };

    setMessages([initialMessage]);
    onStartChat?.(visitorName, visitorEmail, inputValue);
    setConversationId(Date.now().toString());
    setStep('chat');
    setInputValue('');
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !conversationId) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'visitor',
      timestamp: new Date(),
      isAutomated: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    onSendMessage?.(conversationId, inputValue);
    setInputValue('');
    setIsLoading(true);

    // Simulate a small delay for bot response
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleClose = () => {
    setIsOpen(false);
    setStep('welcome');
    setMessages([]);
    setVisitorName('');
    setVisitorEmail('');
    setConversationId(null);
    onClose?.();
  };

  return (
    <>
      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 w-96 max-h-[600px] bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm">Peter4Tech</p>
                  <p className="text-xs opacity-80">
                    {step === 'welcome' ? 'Start a conversation' : 'Chat assistant'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            {!isMinimized && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {step === 'welcome' ? (
                  // Welcome Form
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-300">
                        Hi! 👋 Let's start a conversation. Tell me a bit about yourself.
                      </p>

                      <input
                        type="text"
                        placeholder="Your name"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none text-sm"
                      />

                      <input
                        type="email"
                        placeholder="Your email"
                        value={visitorEmail}
                        onChange={(e) => setVisitorEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none text-sm"
                      />

                      <textarea
                        placeholder="What's on your mind?"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none text-sm resize-none"
                      />
                    </div>

                    <button
                      onClick={handleStartChat}
                      disabled={isLoading}
                      className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                    >
                      {isLoading ? 'Starting...' : 'Start Chat'}
                    </button>
                  </div>
                ) : (
                  // Chat Messages
                  <>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${
                            message.sender === 'visitor' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                              message.sender === 'visitor'
                                ? 'bg-cyan-500 text-white'
                                : 'bg-gray-800 text-gray-300 border border-gray-700'
                            }`}
                          >
                            {message.content}
                          </div>
                        </motion.div>
                      ))}
                      {isLoading && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 rounded-lg flex gap-1">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-gray-700 p-4 flex gap-2">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none text-sm"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isLoading}
                        className="p-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white rounded-full flex items-center justify-center shadow-lg z-40 cursor-pointer"
        >
          <MessageCircle size={28} />
        </motion.button>
      )}
    </>
  );
}

export default ChatWidget;
