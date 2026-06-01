import { useState, useEffect, useMemo } from 'react';
import { ArrowRightLeft, Loader2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CurrencyConverter() {
  const { t } = useTranslation();
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState<number | ''>(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        // Using open.er-api.com, a free exchange rate API without API key
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setRates(data.rates);
        setLastUpdate(new Date(data.time_last_update_utc).toLocaleString());
      } catch (err) {
        setError(t('tools.currency-converter.errors.failed_fetch'));
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const currencies = useMemo(() => {
    return Object.keys(rates).sort();
  }, [rates]);

  const convertedAmount = useMemo(() => {
    if (!amount || Object.keys(rates).length === 0) return 0;
    const rateFrom = rates[fromCurrency];
    const rateTo = rates[toCurrency];
    if (!rateFrom || !rateTo) return 0;
    
    // First convert 'from' to USD (base), then USD to 'to'
    const valueInUSD = Number(amount) / rateFrom;
    return valueInUSD * rateTo;
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#151515] rounded-[24px] border border-white/10 p-6 flex flex-col min-h-[460px] relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="mb-6 relative z-10">
          <h2 className="m-0 text-[20px] font-bold text-white">{t('tools.currency-converter.name')}</h2>
          <p className="mt-1 text-[#888] text-[13px]">{t('tools.currency-converter.desc')}</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 relative z-10">
            <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#F59E0B] gap-4 relative z-10">
            <Loader2 size={32} className="animate-spin" />
            <span className="text-[13px] font-medium">{t('tools.currency-converter.fetching')}</span>
          </div>
        ) : (
          <div className="flex flex-col flex-1 relative z-10">
            <div className="mb-4">
              <label className="block text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">{t('tools.currency-converter.amount')}</label>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={e => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-[#222] border border-[#333] p-3 rounded-[10px] text-white font-sans text-[14px] focus:outline-none focus:border-[#F59E0B] transition-colors"
                placeholder="0"
              />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <label className="block text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">{t('tools.currency-converter.from')}</label>
                <select
                  value={fromCurrency}
                  onChange={e => setFromCurrency(e.target.value)}
                  className="w-full appearance-none bg-[#222] border border-[#333] p-3 rounded-[10px] text-white font-sans text-[14px] focus:outline-none focus:border-[#F59E0B] cursor-pointer transition-colors"
                >
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="absolute right-3 top-[34px] pointer-events-none text-[#888] text-[10px]">▼</div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleSwap}
                  className="p-2 mt-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#F59E0B] transition-colors flex-shrink-0 cursor-pointer"
                  aria-label="Swap currencies"
                >
                  <ArrowRightLeft size={16} />
                </button>
              </div>

              <div className="flex-1 relative">
                <label className="block text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">{t('tools.currency-converter.to')}</label>
                <select
                  value={toCurrency}
                  onChange={e => setToCurrency(e.target.value)}
                  className="w-full appearance-none bg-[#222] border border-[#333] p-3 rounded-[10px] text-white font-sans text-[14px] focus:outline-none focus:border-[#F59E0B] cursor-pointer transition-colors"
                >
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="absolute right-3 top-[34px] pointer-events-none text-[#888] text-[10px]">▼</div>
              </div>
            </div>

            <div className="bg-[#1E293B] border border-[#F59E0B] rounded-[16px] p-4 mt-auto">
              <div className="text-[11px] uppercase tracking-[0.05em] text-[#94A3B8] mb-1">{t('common.result')}</div>
              <div className="text-[24px] font-bold text-[#F59E0B]">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: toCurrency,
                }).format(convertedAmount)}
              </div>
              
              <div className="flex justify-between mt-4 text-[12px] text-[#94A3B8]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500/50"></span>
                  {t('tools.currency-converter.last_updated')}
                </div>
                <div className="text-right">
                  <span className="text-white">{lastUpdate}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
