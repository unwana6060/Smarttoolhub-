import React, { useState } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { saveToolUsage } from '../lib/firebase';

export default function PasswordGenerator() {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = async () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    if (chars === '') {
      setPassword(t('tools.password-generator.select_option'));
      return;
    }
    
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }
    
    setPassword(newPassword);
    setCopied(false);

    // Save to Firestore
    await saveToolUsage('password-generator', 'Password Generator', { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols }, { success: true });
  };

  const copyToClipboard = () => {
    if (!password || password === t('tools.password-generator.select_option')) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate on first render
  React.useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#151515] rounded-[24px] border border-white/10 p-6 flex flex-col min-h-[460px]">
        <div className="mb-6">
          <h2 className="m-0 text-[20px] font-bold text-white">{t('tools.password-generator.name')}</h2>
          <p className="mt-1 text-[#888] text-[13px]">{t('tools.password-generator.desc')}</p>
        </div>

        <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-[16px] mb-6 relative group flex items-center justify-between">
          <div className="text-[20px] font-mono text-white truncate mr-4">
            {password}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={copyToClipboard}
              className="p-2 rounded-[8px] bg-[#222] hover:bg-[#333] transition-colors text-[#888] hover:text-white cursor-pointer"
            >
              {copied ? <Check size={18} className="text-[#10B981]" /> : <Copy size={18} />}
            </button>
            <button 
              onClick={generatePassword}
              className="p-2 rounded-[8px] bg-[#222] hover:bg-[#333] transition-colors text-[#888] hover:text-white cursor-pointer"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-6 flex-1">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-[11px] uppercase tracking-[0.05em] text-[#888]">{t('common.length')}</label>
              <span className="text-[14px] text-white font-mono">{length}</span>
            </div>
            <input 
              type="range" 
              min="8" max="64" 
              value={length} 
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
            />
          </div>

          <div className="space-y-3 pt-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={includeUppercase} 
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-5 h-5 rounded border-[#333] bg-[#222] text-[#10B981] focus:ring-[#10B981] focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-[14px] text-[#CCC] group-hover:text-white transition-colors">{t('tools.password-generator.uppercase')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={includeLowercase} 
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-5 h-5 rounded border-[#333] bg-[#222] text-[#10B981] focus:ring-[#10B981] focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-[14px] text-[#CCC] group-hover:text-white transition-colors">{t('tools.password-generator.lowercase')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={includeNumbers} 
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-5 h-5 rounded border-[#333] bg-[#222] text-[#10B981] focus:ring-[#10B981] focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-[14px] text-[#CCC] group-hover:text-white transition-colors">{t('tools.password-generator.numbers')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={includeSymbols} 
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-5 h-5 rounded border-[#333] bg-[#222] text-[#10B981] focus:ring-[#10B981] focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-[14px] text-[#CCC] group-hover:text-white transition-colors">{t('tools.password-generator.symbols')}</span>
            </label>
          </div>
        </div>

        <button 
          onClick={generatePassword}
          className="w-full mt-auto py-3 rounded-[12px] bg-[#10B981] hover:bg-emerald-600 text-white font-medium transition-colors cursor-pointer text-[14px]"
        >
          {t('tools.password-generator.generate')}
        </button>
      </div>
    </div>
  );
}
