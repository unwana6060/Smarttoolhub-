import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function AgeCalculator() {
  const { t } = useTranslation();
  const [dob, setDob] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = () => {
    if (!dob) return;
    
    const birthDate = new Date(dob);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    
    if (days < 0) {
      months -= 1;
      // Get the number of days in the previous month
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    
    setAge({ years, months, days });
  };

  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#151515] rounded-[24px] border border-white/10 p-6 flex flex-col min-h-[460px]">
        <div className="mb-6">
          <h2 className="m-0 text-[20px] font-bold text-white">{t('tools.age-calculator.name')}</h2>
          <p className="mt-1 text-[#888] text-[13px]">{t('tools.age-calculator.desc')}</p>
        </div>

        <div className="mb-6">
          <label className="block text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">{t('tools.age-calculator.dob')}</label>
          <input
            type="date"
            value={dob}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDob(e.target.value)}
            className="w-full bg-[#222] border border-[#333] p-3 rounded-[10px] text-white font-sans text-[14px] focus:outline-none focus:border-[#F43F5E] transition-colors cursor-pointer"
          />
        </div>

        <button 
          onClick={calculateAge}
          disabled={!dob}
          className="w-full py-3 rounded-[12px] bg-[#F43F5E] hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors cursor-pointer text-[14px] mb-8"
        >
          {t('common.calculate')}
        </button>

        {age && (
          <div className="bg-[#1E293B] border border-[#F43F5E] rounded-[16px] p-6 mt-auto">
            <div className="text-[11px] uppercase tracking-[0.05em] text-[#94A3B8] mb-4 text-center">{t('tools.age-calculator.age_is')}</div>
            
            <div className="flex items-center justify-around text-center">
              <div>
                <div className="text-[32px] font-bold text-[#F43F5E] leading-none mb-1">{age.years}</div>
                <div className="text-[12px] text-[#94A3B8]">{t('tools.age-calculator.years')}</div>
              </div>
              <div className="w-[1px] h-[30px] bg-white/10"></div>
              <div>
                <div className="text-[32px] font-bold text-white leading-none mb-1">{age.months}</div>
                <div className="text-[12px] text-[#94A3B8]">{t('tools.age-calculator.months')}</div>
              </div>
              <div className="w-[1px] h-[30px] bg-white/10"></div>
              <div>
                <div className="text-[32px] font-bold text-[#CCC] leading-none mb-1">{age.days}</div>
                <div className="text-[12px] text-[#94A3B8]">{t('tools.age-calculator.days')}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
