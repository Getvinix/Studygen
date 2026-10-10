import React from 'react';

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.815.814 2.796.815 3.18 0 5.767-2.587 5.768-5.766.001-3.181-2.587-5.768-5.768-5.768zm0 10.518c-.854 0-1.611-.252-2.327-.714l-.167-.107-1.724.452.46-1.681-.109-.174c-.456-.726-.697-1.503-.697-2.527.001-2.617 2.13-4.746 4.564-4.746 2.434 0 4.563 2.129 4.564 4.746-.001 2.618-2.13 4.751-4.691 4.751zM19.05 4.91C17.18 3.037 14.69 2 12.04 2c-5.52 0-10.01 4.49-10.01 10.01 0 1.76.46 3.48 1.34 5l-1.42 5.19 5.31-1.39c1.47.8 3.13 1.22 4.78 1.22h.01c5.52 0 10.01-4.49 10.01-10.01 0-2.67-1.04-5.18-2.92-7.11z" />
  </svg>
);

export const TelegramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
  </svg>
);

export const WHATSAPP_NUMBER = '254732884645';
export const WHATSAPP_DISPLAY = '+254 732 884 645';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const TELEGRAM_NUMBER = '254769363976';
export const TELEGRAM_DISPLAY = '+254 769 363 976';
export const TELEGRAM_LINK = `https://t.me/+${TELEGRAM_NUMBER}`;

/**
 * Creates a pre-filled WhatsApp share link for questions or notes
 */
export function getWhatsAppShareLink(text: string, url: string = window.location.href): string {
  const message = encodeURIComponent(`${text}\n\nStudy free notes & standard exams on OpenLearn:\n${url}`);
  return `https://wa.me/?text=${message}`;
}

/**
 * Creates a pre-filled Telegram share link for questions or notes
 */
export function getTelegramShareLink(text: string, url: string = window.location.href): string {
  const message = encodeURIComponent(text);
  const targetUrl = encodeURIComponent(url);
  return `https://t.me/share/url?url=${targetUrl}&text=${message}`;
}
