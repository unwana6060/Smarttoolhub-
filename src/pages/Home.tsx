import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, Calculator, Image as ImageIcon, Type, DollarSign, Globe, KeyRound, Braces, CalendarDays, Activity, History, LogIn, Mail } from 'lucide-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, signInWithGoogle } from '../lib/firebase';
import AuthModal from '../components/AuthModal';

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
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [initialIsSignUp, setInitialIsSignUp] = useState(false);
  const [initialError, setInitialError] = useState('');

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleEmailSignInClick = () => {
    setInitialIsSignUp(false);
    setInitialError('');
    setIsAuthOpen(true);
  };

  const handleGoogleSignInClick = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        return;
      }
      let errorMsg = error.message || 'Failed to sign in with Google';
      if (error.code === 'auth/unauthorized-domain') {
        errorMsg = t('auth.unauthorized');
      }
      setInitialIsSignUp(false);
      setInitialError(errorMsg);
      setIsAuthOpen(true);
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
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <button 
                onClick={handleEmailSignInClick}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all text-white text-xs font-bold cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail size={14} />
                <span>{t('auth.sign_in_email')}</span>
              </button>
              <button 
                onClick={handleGoogleSignInClick}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-white text-xs font-bold cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2045c0-.6382-.0573-1.2519-.1637-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2582h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z" fill="white"/>
                  <path d="M9 18c2.43 0 4.4673-.8059 5.9564-2.1805l-2.9087-2.2582c-.8059.54-1.8368.8591-3.0477.8591-2.344 0-4.3282-1.5832-5.036-3.7104H1.0567v2.3318C2.5364 15.9818 5.539 18 9 18z" fill="white"/>
                  <path d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2822-1.71V4.9582H1.0567C.4459 6.1773.0909 7.5559.0909 9s.355 2.8227.9658 4.0418l2.9073-2.3318z" fill="white"/>
                  <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.3459l2.5813-2.5814C13.4632.8918 11.4259 0 9 0 5.539 0 2.5364 2.0182 1.0567 4.9582L3.964 7.29C4.6718 5.1627 6.656 3.5795 9 3.5795z" fill="white"/>
                </svg>
                <span>{t('auth.btn')}</span>
              </button>
            </div>
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

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialIsSignUp={initialIsSignUp}
        initialError={initialError}
      />
    </div>
  );
}
