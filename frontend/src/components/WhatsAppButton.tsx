import { MessageCircle } from 'lucide-react';

/**
 * WhatsApp Chat Button Component
 * Takes user directly to WhatsApp chat with portfolio owner
 * Positioned in block/row format with chat widget
 */
export function WhatsAppButton() {
  const phoneNumber = '+234818346382';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=Hi%20Peter4Tech!%20I%20would%20like%20to%20discuss%20a%20project`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 z-40 p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={20} className="group-hover:animate-bounce" />
    </a>
  );
}

export default WhatsAppButton;
