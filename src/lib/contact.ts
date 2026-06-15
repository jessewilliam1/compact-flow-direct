export const PHONE_DISPLAY = "(49) 3199-3922";
export const WHATSAPP_URL =
  "https://wa.me/554931993922?text=" +
  encodeURIComponent("Olá! Vi o site e quero um orçamento para estação de tratamento de efluentes.");

/** Dispara o evento de conversão do Google Ads ao clicar em qualquer botão/link de WhatsApp. */
export function trackWhatsappConversion() {
  (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag?.(
    "event",
    "conversion",
    { send_to: "AW-18204450552/o5Y2CNnC0LwcEPi9x-hD" },
  );
}
