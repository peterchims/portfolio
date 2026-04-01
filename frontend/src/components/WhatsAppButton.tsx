import { MessageCircle } from 'lucide-react';

/**
 * WhatsApp Chat Button Component
 * Takes user directly to WhatsApp chat with portfolio owner
 */
export function WhatsAppButton() {
  const phoneNumber = '+234818346382';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=Hi%20Peter4Tech!%20I%20would%20like%20to%20discuss%20a%20project`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={24} />
      <span className="hidden group-hover:inline-block text-sm font-semibold pr-2 animate-pulse">
        Chat with me
      </span>
    </a>
  );
}

export default WhatsAppButton;
