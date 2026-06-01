import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'US', flag: '🇺🇸', name: 'English' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
  { code: 'de', label: 'DE', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'zh', label: 'CN', flag: '🇨🇳', name: '中文' },
  { code: 'ja', label: 'JP', flag: '🇯🇵', name: '日本語' },
  { code: 'pt', label: 'BR', flag: '🇧🇷', name: 'Português' },
  { code: 'hi', label: 'IN', flag: '🇮🇳', name: 'हिन्दी' }
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer group"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium text-zinc-400 group-hover:text-white uppercase">{currentLang.label}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in duration-200">
            <div className="px-4 py-2 border-b border-white/5 mb-1">
              <div className="flex items-center gap-2 text-[10px] text-[#888] uppercase tracking-widest font-bold">
                <Globe size={10} />
                {t('common.select_language')}
              </div>
            </div>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors cursor-pointer ${
                  i18n.language === lang.code ? 'text-[#3B82F6] bg-blue-500/5' : 'text-zinc-300'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
                {i18n.language === lang.code && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
