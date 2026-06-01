import { Link, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AdBanner from './AdBanner';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';

export default function Layout() {
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-blue-500/30 flex flex-col font-sans">
      {/* Sticky Header */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#0F0F0F] z-10 sticky top-0">
        <div className="flex items-center gap-3">
          {!isHome && (
            <Link
              to="/"
              className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
              aria-label={t('back_home')}
            >
              <ArrowLeft size={20} />
            </Link>
          )}
          <Link autoFocus={false} to="/" className="flex items-center gap-2 group text-[20px] font-bold text-[#3B82F6] tracking-[-0.02em]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span className="text-white">{t('app_name')}</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-[12px] text-[#888]">
            v2.4.0 • Premium
          </div>
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-5 lg:p-8">
        <Outlet />
      </main>

      {/* Persistent Ad Banner at the bottom */}
      <footer className="py-4 bg-[#0F0F0F] flex items-center justify-center border-t border-white/10 mt-auto shrink-0 px-4">
        <AdBanner />
      </footer>
    </div>
  );
}
