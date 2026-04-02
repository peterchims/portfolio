import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Loader2,
  Maximize2,
  MessageCircle,
  Minimize2,
  Send,
  X,
} from 'lucide-react';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'visitor' | 'system';
  timestamp: Date;
  isAutomated: boolean;
}

export interface ChatConversationResult {
  id: string;
  messages: ChatMessage[];
}

interface ChatWidgetProps {
  brandName: string;
  onStartChat?: (
    name: string,
    email: string,
    message: string
  ) => Promise<ChatConversationResult>;
  onSendMessage?: (
    conversationId: string,
    message: string
  ) => Promise<ChatConversationResult>;
  isOpen?: boolean;
  onClose?: () => void;
}

export function ChatWidget({
  brandName,
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
  const [errorMessage, setErrorMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const openWidget = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const closeWidget = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setStep('welcome');
    setMessages([]);
    setInputValue('');
    setVisitorName('');
    setVisitorEmail('');
    setConversationId(null);
    setErrorMessage('');
    onClose?.();
  };

  const handleStartChat = async () => {
    if (!visitorName.trim() || !visitorEmail.trim() || !inputValue.trim()) {
      setErrorMessage('Enter your name, email, and project brief.');
      return;
    }

    if (!onStartChat) {
      setErrorMessage('Chat is not available right now.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await onStartChat(
        visitorName.trim(),
        visitorEmail.trim(),
        inputValue.trim()
      );

      setConversationId(result.id);
      setMessages(result.messages);
      setStep('chat');
      setInputValue('');
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to start the conversation right now.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !conversationId) {
      return;
    }

    if (!onSendMessage) {
      setErrorMessage('Chat is not available right now.');
      return;
    }

    const nextMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await onSendMessage(conversationId, nextMessage);
      setMessages(result.messages);
      setConversationId(result.id);
    } catch (error) {
      setInputValue(nextMessage);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send your message right now.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 right-4 z-50 flex w-[min(22.5rem,calc(100vw-1.25rem))] max-h-[37rem] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0f1317]/96 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:bottom-28 md:right-6"
          >
            <div className="border-b border-white/8 bg-[#17120c] px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-stone-100">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{brandName}</p>
                    <p className="text-[11px] text-slate-300/80">
                      {step === 'welcome' ? 'Project intake chat' : 'Conversation active'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMinimized((value) => !value)}
                    className="rounded-xl border border-white/10 bg-white/6 p-2 text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                    aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                  >
                    {isMinimized ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
                  </button>
                  <button
                    type="button"
                    onClick={closeWidget}
                    className="rounded-xl border border-white/10 bg-white/6 p-2 text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                    aria-label="Close chat"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized ? (
              <div className="flex flex-1 flex-col overflow-hidden">
                {step === 'welcome' ? (
                  <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="space-y-2">
                      <p className="text-sm text-slate-200">
                        Share a short project brief and I will route it into the backend-backed
                        conversation flow.
                      </p>
                      <p className="text-xs leading-5 text-slate-400">
                        Keep it short: what you need, what feels weak, and what outcome you want.
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={visitorName}
                        onChange={(event) => setVisitorName(event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-300/60 focus:outline-none"
                      />

                      <input
                        type="email"
                        placeholder="Your email"
                        value={visitorEmail}
                        onChange={(event) => setVisitorEmail(event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-300/60 focus:outline-none"
                      />

                      <textarea
                        placeholder="Project brief"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        rows={4}
                        className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-300/60 focus:outline-none"
                      />
                    </div>

                    {errorMessage ? (
                      <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                        {errorMessage}
                      </p>
                    ) : null}

                    <button
                      type="button"
                      onClick={handleStartChat}
                      disabled={isLoading}
                      className="mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-amber-300/20 bg-[#b7791f] px-4 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:border-amber-200/40 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Starting chat
                        </>
                      ) : (
                        <>
                          Start project chat
                          <Send size={16} />
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 space-y-3 overflow-y-auto p-4">
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
                            className={`max-w-[83%] rounded-[18px] px-4 py-3 text-sm leading-6 ${
                              message.sender === 'visitor'
                                ? 'bg-[#b7791f] text-white shadow-[0_16px_32px_rgba(120,53,15,0.25)]'
                                : 'border border-white/8 bg-white/[0.04] text-slate-200'
                            }`}
                          >
                            {message.content}
                          </div>
                        </motion.div>
                      ))}

                      {isLoading ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="flex items-center gap-2 rounded-[18px] border border-white/8 bg-white/[0.04] px-4 py-3 text-xs text-slate-300">
                            <Loader2 size={14} className="animate-spin" />
                            Generating reply
                          </div>
                        </motion.div>
                      ) : null}

                      {errorMessage ? (
                        <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                          {errorMessage}
                        </p>
                      ) : null}

                      <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-white/8 bg-black/10 p-4">
                      <div className="flex items-end gap-2">
                        <textarea
                          placeholder="Type your message"
                          value={inputValue}
                          onChange={(event) => setInputValue(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' && !event.shiftKey) {
                              event.preventDefault();
                              void handleSendMessage();
                            }
                          }}
                          rows={1}
                          className="max-h-28 min-h-12 flex-1 resize-y rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-300/60 focus:outline-none"
                        />

                        <button
                          type="button"
                          onClick={() => void handleSendMessage()}
                          disabled={!inputValue.trim() || isLoading}
                          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/20 bg-[#b7791f] text-white transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-60"
                          aria-label="Send message"
                        >
                          <Send size={17} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!isOpen ? (
        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={openWidget}
          className="fixed bottom-[5.5rem] right-4 z-40 inline-flex min-h-12 items-center gap-3 rounded-[18px] border border-white/10 bg-[#12171c]/94 px-4 py-3 text-left text-slate-100 shadow-[0_18px_38px_rgba(0,0,0,0.32)] backdrop-blur-xl transition hover:border-amber-300/30 md:right-6"
          title="Open chat"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#b7791f] text-white">
            <MessageCircle size={17} />
          </span>
          <span className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400">
              Live
            </span>
            <span className="text-sm font-semibold">Project chat</span>
          </span>
        </motion.button>
      ) : null}
    </>
  );
}

export default ChatWidget;
