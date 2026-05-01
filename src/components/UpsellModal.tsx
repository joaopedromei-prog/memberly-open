'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

const UPSELL_URL =
  'https://typebot-pied.vercel.app/?src=area&utm_source=area';

export default function UpsellModal() {
  const [open, setOpen] = useState(false);

  // Show shortly after mount so the page has time to render
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 250);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll + Esc to close while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop with blur — clicking it closes */}
      <button
        type="button"
        aria-label="Fechar pop-up"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="relative"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fechar"
          className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-110"
        >
          <X className="h-5 w-5" />
        </button>

        {/* GIF as a clickable link */}
        <a
          href={UPSELL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 transition-transform hover:scale-[1.02]"
        >
          {/* Use a plain <img> so the GIF animates (next/image freezes GIFs) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/raiox.gif"
            alt="Quer ter mais resultado? Adquira agora um Raio-X personalizado"
            className="block max-h-[80vh] w-auto max-w-[90vw] sm:max-w-md"
          />
        </a>
      </motion.div>
    </motion.div>
  );
}
