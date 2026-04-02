'use client';

import { useState, useEffect, useCallback } from 'react';
import { Download, X } from 'lucide-react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || ('standalone' in navigator && (navigator as unknown as { standalone: boolean }).standalone);
    setIsStandalone(!!standalone);

    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(ios);
    const safari = ios && /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua);
    setIsSafari(safari);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  }, [isIOS, deferredPrompt]);

  if (isStandalone) return null;
  if (!isIOS && !deferredPrompt) return null;

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg px-6 h-11 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg inline-flex items-center justify-center gap-2 border border-white/10"
      >
        <Download className="h-4 w-4" />
        Instalar App
      </button>

      {showIOSModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setShowIOSModal(false)}
        >
          <div
            className="bg-[#1a1a1a] rounded-2xl w-[85vw] max-w-xs max-h-[80vh] flex flex-col overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-white/10 shrink-0">
              <h3 className="text-base font-bold text-white">Como instalar o app</h3>
              <button
                onClick={() => setShowIOSModal(false)}
                className="text-white/60 hover:text-white transition-colors p-1.5 -mr-1 rounded-full hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-3 overflow-y-auto">
              <p className="text-sm text-text-muted mb-3">
                Siga o tutorial abaixo para adicionar o atalho na tela inicial do seu iPhone
                {isSafari ? ' pelo Safari' : ' pelo Chrome'}:
              </p>
              <div className="rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={isSafari ? '/ios-install-tutorial-safari.gif' : '/ios-install-tutorial.gif'}
                  alt="Tutorial para adicionar atalho no iOS"
                  width={280}
                  height={480}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
            <div className="p-3 border-t border-white/10 shrink-0">
              <button
                onClick={() => setShowIOSModal(false)}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg h-10 transition-colors text-sm"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
