import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, Calculator, Image as ImageIcon, Type, DollarSign, Globe, KeyRound, Braces, CalendarDays, Activity, History, LogIn } from 'lucide-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signInWithGoogle } from '../lib/firebase';

const LANGUAGES = [
  { code: 'en', flag: '🇺🇸' },
  { code: 'fr', flag: '🇫🇷' },
  { code: 'es', flag: '🇪🇸' },
  { code: 'de', flag: '🇩🇪' },
  { code: 'zh', flag: '🇨🇳' },
  { code: 'ja', flag: '🇯🇵' },
  { code: 'pt', flag: '🇧🇷' },
  { code: 'hi', flag: '🇮🇳' }
];

const TOOLS = [
  {
    id: 'pdf-tool',
    icon: FileText,
    iconColor: 'text-[#EF4444]',
    iconBg: 'bg-[#EF4444]/10',
    colSpan: 'md:col-span-2',
    hoverBorder: 'hover:border-[#EF4444]',
    translateKey: 'pdf-tool'
  },
  {
    id: 'emi-calculator',
    icon: Calculator,
    iconColor: 'text-[#3B82F6]',
    iconBg: 'bg-[#3B82F6]/10',
    colSpan: 'md:col-span-1',
    hoverBorder: 'hover:border-[#3B82F6]',
    translateKey: 'emi-calculator'
  },
  {
    id: 'image-compressor',
    icon: ImageIcon,
    iconColor: 'text-[#10B981]',
    iconBg: 'bg-[#10B981]/10',
    colSpan: 'md:col-span-1',
    hoverBorder: 'hover:border-[#10B981]',
    translateKey: 'image-compressor'
  },
  {
    id: 'word-counter',
    icon: Type,
    iconColor: 'text-[#8B5CF6]',
    iconBg: 'bg-[#8B5CF6]/10',
    colSpan: 'md:col-span-1',
    hoverBorder: 'hover:border-[#8B5CF6]',
    translateKey: 'word-counter'
  },
  {
    id: 'currency-converter',
    icon: DollarSign,
    iconColor: 'text-[#F59E0B]',
    iconBg: 'bg-[#F59E0B]/10',
    colSpan: 'md:col-span-1',
    hoverBorder: 'hover:border-[#F59E0B]',
    translateKey: 'currency-converter'
  },
  {
    id: 'seo-analyzer',
    icon: Globe,
    iconColor: 'text-[#FACC15]',
    iconBg: 'bg-[#FACC15]/10',
    colSpan: 'md:col-span-1',
    hoverBorder: 'hover:border-[#FACC15]',
    translateKey: 'seo-analyzer'
  },
  {
    id: 'password-generator',
    icon: KeyRound,
    iconColor: 'text-[#A855F7]',
    iconBg: 'bg-[#A855F7]/10',
    colSpan: 'md:col-span-1',
    hoverBorder: 'hover:border-[#A855F7]',
    translateKey: 'password-generator'
  },
  {
    id: 'json-formatter',
    icon: Braces,
    iconColor: 'text-[#0EA5E9]',
    iconBg: 'bg-[#0EA5E9]/10',
    colSpan: 'md:col-span-1',
    hoverBorder: 'hover:border-[#0EA5E9]',
    translateKey: 'json-formatter'
  },
  {
    id: 'age-calculator',
    icon: CalendarDays,
    iconColor: 'text-[#F43F5E]',
    iconBg: 'bg-[#F43F5E]/10',
    colSpan: 'md:col-span-2',
    hoverBorder: 'hover:border-[#F43F5E]',
    translateKey: 'age-calculator'
  },
  {
    id: 'bmi-calculator',
    icon: Activity,
    iconColor: 'text-[#06B6D4]',
    iconBg: 'bg-[#06B6D4]/10',
    colSpan: 'md:col-span-1',
    hoverBorder: 'hover:border-[#06B6D4]',
    translateKey: 'bmi-calculator'
  },
];

export default function Home() {
  const { t, i18n } = useTranslation();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') return;
      if (error.code === 'auth/unauthorized-domain') {
        alert('Unauthorized domain. Please add this URL to Firebase Console > Auth > Settings.');
      }
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Intro Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          {t('home_title')}
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
          {t('home_subtitle')}
        </p>
        
        {/* Sign In CTA */}
        {!user && (
          <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <History size={20} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{t('auth.title')}</p>
                <p className="text-xs text-blue-400/80">{t('auth.subtitle')}</p>
              </div>
            </div>
            <button 
              onClick={handleLogin}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all text-white text-sm font-bold cursor-pointer shrink-0"
            >
              <LogIn size={16} />
              {t('auth.btn')}
            </button>
          </div>
        )}
        
        {/* Quick Language Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                i18n.language === lang.code 
                  ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 ring-2 ring-blue-500/20' 
                  : 'bg-[#1A1A1A] border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm font-medium uppercase tracking-wider">{lang.code}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
        {TOOLS.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              to={`/${tool.id}`}
              className={`bg-[#1A1A1A] border border-white/5 rounded-[20px] p-5 flex flex-col justify-between transition-colors duration-200 cursor-pointer group ${tool.colSpan} hover:bg-[#1F1F1F] ${tool.hoverBorder}`}
            >
              <div>
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center mb-4 ${tool.iconBg} ${tool.iconColor}`}>
                  <Icon size={20} />
                </div>
                <div className="text-[16px] font-semibold mb-1 text-white">{t(`tools.${tool.translateKey}.name`)}</div>
                <div className="text-[12px] text-[#888] leading-[1.4]">
                  {t(`tools.${tool.translateKey}.desc`)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
