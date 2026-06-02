import { Link, Outlet, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Info, FileSpreadsheet, ShieldAlert, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AdBanner from './AdBanner';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';

export default function Layout() {
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const currentYear = new Date().getFullYear();

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
          
          {/* Quick Header Nav Links for high AdSense accessibility */}
          <nav className="hidden md:flex items-center gap-4 ml-6 border-l border-white/10 pl-6 text-sm text-zinc-400">
            <Link to="/about" className="hover:text-[#3B82F6] transition-colors">{t('footer.about', 'About Us')}</Link>
            <Link to="/contact" className="hover:text-[#3B82F6] transition-colors">{t('footer.contact', 'Contact')}</Link>
            <Link to="/privacy-policy" className="hover:text-[#3B82F6] transition-colors">{t('footer.privacy', 'Privacy Policy')}</Link>
            <Link to="/terms-disclaimer" className="hover:text-[#3B82F6] transition-colors">{t('footer.terms', 'Terms & Disclaimer')}</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-[12px] text-[#888]">
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

      {/* Corporate compliant AdSense footer with dynamic links and contact mapping */}
      <footer className="bg-[#0F0F0F] border-t border-white/10 mt-auto shrink-0">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Brand and creator recognition */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold text-[#3B82F6]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="text-white">{t('app_name')}</span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              SmartTools Hub is a professional, high-performance web utility workspace designed and managed by <strong>Unwana Peter Otung</strong>, a professional web designer and content creator. Our tools run locally for peak data safety and speed.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-semibold tracking-wide uppercase bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg w-max">
              <Sparkles size={12} className="text-[#3B82F6]" />
              <span>Lead Designer Unwana Peter Otung</span>
            </div>
          </div>

          {/* Middle Block: Explicit site map representing "How to use" pages */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-bold font-mono">Resources</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-zinc-400 hover:text-[#3B82F6] transition-colors flex items-center gap-1.5">
                  <Info size={13} />
                  <span>About & How to Use</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-zinc-400 hover:text-[#3B82F6] transition-colors flex items-center gap-1.5">
                  <Mail size={13} />
                  <span>Contact Creator</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Block: Compliance Legal requirements (Required for Google AdSense Audit) */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-bold font-mono">Legal Compliance</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy-policy" className="text-zinc-400 hover:text-[#3B82F6] transition-colors flex items-center gap-1.5">
                  <ShieldAlert size={13} />
                  <span>Privacy Policy & Cookies</span>
                </Link>
              </li>
              <li>
                <Link to="/terms-disclaimer" className="text-zinc-400 hover:text-[#3B82F6] transition-colors flex items-center gap-1.5">
                  <FileSpreadsheet size={13} />
                  <span>Terms Of Service & Disclaimer</span>
                </Link>
              </li>
            </ul>
            <p className="text-[11px] text-zinc-500 pt-1">
              Need technical help? Write to admin at <a href="mailto:unwanaotung@gmail.com" className="text-blue-500 hover:underline">unwanaotung@gmail.com</a>.
            </p>
          </div>
        </div>

        {/* Global Google AdSense placement Banner */}
        <div className="py-4 border-t border-white/5 bg-black/40 flex flex-col items-center justify-center gap-3 px-4">
          <AdBanner />
          <div className="text-[10px] text-zinc-600 text-center tracking-wide">
            &copy; {currentYear} SmartTools Hub • Created and Programmed by Unwana Peter Otung • All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
