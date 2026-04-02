import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
  if (!phoneNumber) {
    return null;
  }

  const normalizedPhoneNumber = phoneNumber.replace(/\D/g, '');

  if (!normalizedPhoneNumber) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${normalizedPhoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-3 rounded-[18px] border border-amber-300/20 bg-[#12171c]/94 px-4 py-3 text-left text-amber-50 shadow-[0_18px_38px_rgba(0,0,0,0.32)] backdrop-blur-xl transition hover:translate-y-[-2px] hover:border-amber-200/40 md:right-6"
      title="Open WhatsApp"
      aria-label="Open WhatsApp"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#b7791f] text-white">
        <MessageCircle size={17} />
      </span>
      <span className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.22em] text-amber-100/70">
          Direct
        </span>
        <span className="text-sm font-semibold">WhatsApp</span>
      </span>
    </a>
  );
}

export default WhatsAppButton;
