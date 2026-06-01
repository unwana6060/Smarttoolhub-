import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function EmiCalculator() {
  const { t } = useTranslation();
  const [principal, setPrincipal] = useState<number | ''>(50000);
  const [currency, setCurrency] = useState('USD');
  const [rate, setRate] = useState<number | ''>(8.5);
  const [tenure, setTenure] = useState<number | ''>(5); // In years by default
  const [availableCurrencies, setAvailableCurrencies] = useState<string[]>(['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD']);

  React.useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setAvailableCurrencies(Object.keys(data.rates).sort());
        }
      })
      .catch(() => {
        // Fallback to defaults already set
      });
  }, []);

  const { emi, totalPayment, totalInterest } = useMemo(() => {
    const p = Number(principal);
    const r = Number(rate) / (12 * 100); // monthly interest rate
    const n = Number(tenure) * 12; // number of months

    if (!p || !Number(rate) || !n) {
      return { emi: 0, totalPayment: 0, totalInterest: 0 };
    }

    const emiCalc = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPmt = emiCalc * n;
    const totalInt = totalPmt - p;

    return {
      emi: emiCalc,
      totalPayment: totalPmt,
      totalInterest: totalInt,
    };
  }, [principal, rate, tenure]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#151515] rounded-[24px] border border-white/10 p-6 flex flex-col min-h-[460px]">
        <div className="mb-6">
          <h2 className="m-0 text-[20px] font-bold text-white">{t('tools.emi-calculator.name')}</h2>
          <p className="mt-1 text-[#888] text-[13px]">{t('tools.emi-calculator.desc')}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="col-span-2">
            <label className="block text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">{t('tools.emi-calculator.loan_amount')}</label>
            <input
              type="number"
              min="0"
              value={principal}
              onChange={e => setPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full bg-[#222] border border-[#333] p-3 rounded-[10px] text-white font-sans text-[14px] focus:outline-none focus:border-[#3B82F6] transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">Currency</label>
            <select
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              className="w-full bg-[#222] border border-[#333] p-3 rounded-[10px] text-white font-sans text-[14px] focus:outline-none focus:border-[#3B82F6] transition-colors appearance-none cursor-pointer"
            >
              {availableCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">{t('tools.emi-calculator.interest_rate')} ({t('tools.emi-calculator.units.percent')})</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={rate}
            onChange={e => setRate(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full bg-[#222] border border-[#333] p-3 rounded-[10px] text-white font-sans text-[14px] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">{t('tools.emi-calculator.tenure')} ({t('tools.emi-calculator.units.years')})</label>
          <input
            type="number"
            min="0"
            step="1"
            value={tenure}
            onChange={e => setTenure(e.target.value === '' ? '' : Number(e.target.value))}
            className="w-full bg-[#222] border border-[#333] p-3 rounded-[10px] text-white font-sans text-[14px] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>

        <div className="bg-[#1E293B] border border-[#3B82F6] rounded-[16px] p-4 mt-auto">
          <div className="text-[11px] uppercase tracking-[0.05em] text-[#94A3B8] mb-1">{t('tools.emi-calculator.monthly_emi')}</div>
          <div className="text-[24px] font-bold text-[#3B82F6]">{formatCurrency(emi)}</div>
          
          <div className="flex justify-between mt-4 text-[12px] text-[#94A3B8]">
            <div className="text-left">
              {t('tools.emi-calculator.total_interest')}<br/>
              <span className="text-white">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="text-right">
              {t('tools.emi-calculator.total_payment')}<br/>
              <span className="text-white">{formatCurrency(totalPayment)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
