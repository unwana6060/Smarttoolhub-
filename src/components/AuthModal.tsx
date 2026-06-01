import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User as UserIcon, X, Loader2, LogIn, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIsSignUp?: boolean;
  initialError?: string;
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  initialIsSignUp = false, 
  initialError = '' 
}: AuthModalProps) {
  const { t } = useTranslation();
  const [isSignUp, setIsSignUp] = useState(initialIsSignUp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(initialError);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setIsSignUp(initialIsSignUp);
      setError(initialError);
      setEmail('');
      setPassword('');
      setName('');
    }
  }, [isOpen, initialIsSignUp, initialError]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setLoading(false);
        return;
      }
      if (err.code === 'auth/unauthorized-domain') {
        setError(t('auth.unauthorized'));
      } else {
        setError(err.message || 'Failed to sign in with Google');
      }
      console.error('Google Auth Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (isSignUp && !name) {
      setError('Please enter your name');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // Sign Up Flow
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
          displayName: name
        });
      } else {
        // Sign In Flow
        await signInWithEmailAndPassword(auth, email, password);
      }
      resetForm();
      onClose();
    } catch (err: any) {
      console.error('Email Authentication Error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already in use.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak.');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else {
        setError(err.message || 'An error occurred during authentication.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="auth-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            id="auth-modal-card"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-md bg-[#151515] border border-white/10 rounded-[24px] p-6 shadow-2xl z-10 overflow-hidden"
          >
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-52 h-52 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header */}
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <LogIn className="text-[#3B82F6]" size={20} />
                <span>{isSignUp ? t('auth.sign_up', 'Sign Up') : t('auth.sign_in', 'Sign In')}</span>
              </h3>
              <button
                id="auth-modal-close-btn"
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2.5 text-red-400 text-xs"
              >
                <AlertCircle size={15} className="shrink-0 mt-0.5" />
                <span className="leading-normal">{error}</span>
              </motion.div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              {isSignUp && (
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-bold">
                    {t('auth.display_name', 'Full Name')}
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <input
                      id="auth-input-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      disabled={loading}
                      required={isSignUp}
                      className="w-full bg-[#222] border border-[#333] pl-10 pr-4 py-3 rounded-[12px] text-white font-sans text-sm focus:outline-none focus:border-[#3B82F6] transition-colors disabled:opacity-55"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-bold">
                  {t('auth.email', 'Email Address')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input
                    id="auth-input-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    disabled={loading}
                    required
                    className="w-full bg-[#222] border border-[#333] pl-10 pr-4 py-3 rounded-[12px] text-white font-sans text-sm focus:outline-none focus:border-[#3B82F6] transition-colors disabled:opacity-55"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-zinc-500 mb-1.5 font-bold">
                  {t('auth.password', 'Password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input
                    id="auth-input-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    required
                    className="w-full bg-[#222] border border-[#333] pl-10 pr-4 py-3 rounded-[12px] text-white font-sans text-sm focus:outline-none focus:border-[#3B82F6] transition-colors disabled:opacity-55"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="auth-btn-submit"
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-[12px] bg-[#3B82F6] hover:bg-blue-600 active:scale-[0.98] text-white text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <LogIn size={16} />
                )}
                <span>
                  {loading 
                    ? t('auth.loading', 'Processing...') 
                    : isSignUp 
                      ? t('auth.submit_sign_up', 'Create Account') 
                      : t('auth.submit_sign_in', 'Sign In')}
                </span>
              </button>
            </form>

            {/* Separator */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="border-t border-white/5 w-full absolute" />
              <span className="relative bg-[#151515] px-3.5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest z-10">
                {t('auth.or_separator', 'OR')}
              </span>
            </div>

            {/* Google Login Provider */}
            <button
              id="auth-btn-google"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3 rounded-[12px] border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2045c0-.6382-.0573-1.2519-.1637-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2582h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.4673-.8059 5.9564-2.1805l-2.9087-2.2582c-.8059.54-1.8368.8591-3.0477.8591-2.344 0-4.3282-1.5832-5.036-3.7104H1.0567v2.3318C2.5364 15.9818 5.539 18 9 18z" fill="#34A853"/>
                <path d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2822-1.71V4.9582H1.0567C.4459 6.1773.0909 7.5559.0909 9s.355 2.8227.9658 4.0418l2.9073-2.3318z" fill="#FBBC05"/>
                <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.3459l2.5813-2.5814C13.4632.8918 11.4259 0 9 0 5.539 0 2.5364 2.0182 1.0567 4.9582L3.964 7.29C4.6718 5.1627 6.656 3.5795 9 3.5795z" fill="#EA4335"/>
              </svg>
              <span>{t('auth.btn', 'Sign in with Google')}</span>
            </button>

            {/* Toggle Sign In / Sign Up Mode */}
            <div className="mt-6 text-center">
              <button
                id="auth-toggle-mode-btn"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                }}
                disabled={loading}
                className="text-xs text-[#3B82F6] hover:underline font-medium cursor-pointer"
              >
                {isSignUp 
                  ? t('auth.already_account', 'Already have an account? Sign In') 
                  : t('auth.no_account', "Don't have an account? Sign Up")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
