import React, { useState } from 'react';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { auth } from '../lib/firebase';
import AuthModal from './AuthModal';

export default function UserMenu() {
  const { t } = useTranslation();
  const [user, setUser] = React.useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => auth.signOut();

  if (!user) {
    return (
      <>
        <button
          onClick={() => setIsAuthOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#3B82F6] hover:bg-blue-600 transition-colors text-white text-sm font-medium cursor-pointer"
        >
          <LogIn size={16} />
          <span className="hidden sm:inline">{t('auth.sign_in')}</span>
        </button>

        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg pl-1.5 pr-3 py-1">
        {user.photoURL ? (
          <img src={user.photoURL} alt="" className="w-6 h-6 rounded-md flex-shrink-0" />
        ) : (
          <div className="w-6 h-6 rounded-md bg-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
            <UserIcon size={14} />
          </div>
        )}
        <span className="text-xs font-medium text-white max-w-[80px] truncate">{user.displayName || 'User'}</span>
        {user.email === 'unwanaotung@gmail.com' && (
          <span className="text-[9px] font-bold text-yellow-500 bg-yellow-500/10 px-1 py-0.5 rounded border border-yellow-500/20 uppercase tracking-tighter">
            {t('auth.admin')}
          </span>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 pr-3 pl-2 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-[#888] hover:text-[#EF4444] cursor-pointer group"
      >
        <LogOut size={16} />
        <span className="text-xs font-medium">{t('auth.sign_out')}</span>
      </button>
    </div>
  );
}
