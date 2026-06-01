import { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdInterstitial({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(5); // 5 sec forced ad viewing

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center p-4">
      {/* Fake Interstitial Ad Content */}
      <div className="w-full max-w-sm aspect-[3/4] bg-[#111] border border-white/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 pointer-events-none"></div>
        <div className="text-center p-6 flex flex-col items-center gap-4 z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 bg-black/50 px-2 py-1 rounded">{t('ads.interstitial.tag')}</span>
          <h2 className="text-2xl font-bold text-white mt-4">{t('ads.interstitial.title')}</h2>
          <p className="text-zinc-400 text-sm">{t('ads.interstitial.subtitle')}</p>
        </div>
      </div>
      
      {/* Controls */}
      <div className="absolute top-6 right-6">
        {countdown > 0 ? (
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-zinc-300 text-sm">
            <Loader2 size={16} className="animate-spin" />
            <span>{t('ads.interstitial.skip', { count: countdown })}</span>
          </div>
        ) : (
          <button 
            onClick={onClose}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white text-sm transition-colors"
          >
            <X size={16} />
            <span>{t('ads.interstitial.close')}</span>
          </button>
        )}
      </div>
    </div>
  );
}
