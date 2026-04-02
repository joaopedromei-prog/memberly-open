"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "5562920021379";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20uma%20d%C3%BAvida!`;

export default function WhatsAppButton() {
  const [showClose, setShowClose] = useState(false);
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      onMouseEnter={() => setShowClose(true)}
      onMouseLeave={() => setShowClose(false)}
    >
      {showClose && (
        <button
          onClick={() => setHidden(true)}
          className="w-8 h-8 rounded-full bg-neutral-600 hover:bg-neutral-500 text-white flex items-center justify-center text-sm shadow-lg transition-all"
          aria-label="Fechar botão do WhatsApp"
        >
          ✕
        </button>
      )}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Fale conosco no WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="w-8 h-8 fill-white">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.335 22.594c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.826-6.81-8.064-7.124-.23-.314-1.928-2.566-1.928-4.894s1.22-3.472 1.654-3.946c.39-.428 1.028-.64 1.64-.64.198 0 .376.01.536.018.47.02.706.048 1.016.788.39.926 1.338 3.254 1.454 3.492.118.238.236.556.078.874-.15.324-.282.468-.52.74-.238.272-.464.48-.702.772-.216.256-.46.53-.194.996.264.46 1.178 1.942 2.53 3.146 1.736 1.546 3.198 2.026 3.654 2.252.39.192.856.156 1.13-.138.348-.374.778-.994 1.216-1.606.312-.438.706-.494 1.13-.312.43.176 2.724 1.284 3.192 1.518.47.236.78.35.896.546.114.198.114 1.14-.276 2.24z" />
        </svg>
      </a>
    </div>
  );
}
