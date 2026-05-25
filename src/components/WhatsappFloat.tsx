import { WHATSAPP_URL } from "@/lib/contact";
import mascotPhone from "@/assets/mascot-phone.png";

export function WhatsappFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--whatsapp)] shadow-brand pulse-ring hover:scale-105 transition-transform"
    >
      <img src={mascotPhone} alt="Atendimento Compacto" className="h-24 w-24 -mt-3 object-contain drop-shadow-lg" />
    </a>
  );
}
