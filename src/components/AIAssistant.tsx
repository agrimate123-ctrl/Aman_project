import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

const suggestions = [
  {
    trigger: ['combo', 'deal', 'offer'],
    response: 'Best combo: Wash + Iron for ₹249! Save ₹49 with this bundle.',
  },
  {
    trigger: ['shoe', 'shoes'],
    response: 'Try our quick shoe cleaning service this weekend! Special price: ₹99',
  },
  {
    trigger: ['price', 'cost', 'how much'],
    response: 'Our services range from ₹99 to ₹299. Laundry: ₹199, Ironing: ₹99, Shoe Clean: ₹149, Dry Clean: ₹299',
  },
  {
    trigger: ['eco', 'environment', 'green'],
    response: 'Every booking earns you eco-points! We use eco-friendly detergents and save water with our efficient process.',
  },
  {
    trigger: ['pickup', 'delivery', 'time'],
    response: 'We offer 3 pickup slots: 10:00 AM, 2:00 PM, and 6:00 PM. Free pickup and delivery!',
  },
];

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
    { text: 'Hi! I\'m your AI laundry assistant. Ask me about our services, combo offers, or eco-benefits!', isBot: true },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages((prev) => [...prev, userMessage]);

    const lowerInput = input.toLowerCase();
    let response = 'I\'m here to help! Try asking about our combo deals, pricing, eco-benefits, or pickup times.';

    for (const suggestion of suggestions) {
      if (suggestion.trigger.some((trigger) => lowerInput.includes(trigger))) {
        response = suggestion.response;
        break;
      }
    }

    setTimeout(() => {
      const botMessage = { text: response, isBot: true };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInput('');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="text-white" size={24} />
                <div>
                  <h3 className="text-white font-bold">AI Assistant</h3>
                  <p className="text-white/80 text-xs">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                        : 'bg-teal-500 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleSend}
                  className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-lg transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-full shadow-lg z-40"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  );
};

export default AIAssistant;
