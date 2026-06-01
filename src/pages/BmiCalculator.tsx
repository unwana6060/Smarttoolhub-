import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function BmiCalculator() {
  const { t } = useTranslation();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h) return;

    let bmiValue = 0;
    
    if (unitSystem === 'metric') {
      // height is in cm
      const heightInMeters = h / 100;
      bmiValue = w / (heightInMeters * heightInMeters);
    } else {
      // weight in lbs, height in inches
      bmiValue = 703 * (w / (h * h));
    }

    setBmi(parseFloat(bmiValue.toFixed(1)));

    if (bmiValue < 18.5) {
      setCategory('underweight');
    } else if (bmiValue < 24.9) {
      setCategory('normal');
    } else if (bmiValue < 29.9) {
      setCategory('overweight');
    } else {
      setCategory('obese');
    }
  };

  const getColor = (cat: string) => {
    switch (cat) {
      case 'underweight': return 'text-[#FBBF24] border-[#FBBF24]';
      case 'normal': return 'text-[#10B981] border-[#10B981]';
      case 'overweight': return 'text-[#F97316] border-[#F97316]';
      case 'obese': return 'text-[#EF4444] border-[#EF4444]';
      default: return 'text-white border-white/20';
    }
  };

  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#151515] rounded-[24px] border border-white/10 p-6 flex flex-col min-h-[460px]">
        <div className="mb-6">
          <h2 className="m-0 text-[20px] font-bold text-white">{t('tools.bmi-calculator.name')}</h2>
          <p className="mt-1 text-[#888] text-[13px]">{t('tools.bmi-calculator.desc')}</p>
        </div>

        <div className="flex gap-2 mb-6 bg-[#1A1A1A] p-1 rounded-[12px] border border-white/5 w-fit">
          <button
            onClick={() => { setUnitSystem('metric'); setWeight(''); setHeight(''); setBmi(null); }}
            className={`px-6 py-2 text-[13px] font-medium rounded-[8px] transition-colors cursor-pointer ${unitSystem === 'metric' ? 'bg-[#06B6D4]/10 text-[#06B6D4]' : 'text-[#888] hover:text-white'}`}
          >
            {t('tools.bmi-calculator.metric')}
          </button>
          <button
            onClick={() => { setUnitSystem('imperial'); setWeight(''); setHeight(''); setBmi(null); }}
            className={`px-6 py-2 text-[13px] font-medium rounded-[8px] transition-colors cursor-pointer ${unitSystem === 'imperial' ? 'bg-[#06B6D4]/10 text-[#06B6D4]' : 'text-[#888] hover:text-white'}`}
          >
            {t('tools.bmi-calculator.imperial')}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">
            {t('tools.bmi-calculator.weight')} ({unitSystem === 'metric' ? t('tools.bmi-calculator.units.kg') : t('tools.bmi-calculator.units.lbs')})
          </label>
          <input
            type="number"
            min="0"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-[#222] border border-[#333] p-3 rounded-[10px] text-white font-sans text-[14px] focus:outline-none focus:border-[#06B6D4] transition-colors"
          />
        </div>

        <div className="mb-6">
          <label className="block text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">
            {t('tools.bmi-calculator.height')} ({unitSystem === 'metric' ? t('tools.bmi-calculator.units.cm') : t('tools.bmi-calculator.units.inches')})
          </label>
          <input
            type="number"
            min="0"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-[#222] border border-[#333] p-3 rounded-[10px] text-white font-sans text-[14px] focus:outline-none focus:border-[#06B6D4] transition-colors"
          />
        </div>

        <button 
          onClick={calculateBmi}
          disabled={!weight || !height}
          className="w-full py-3 rounded-[12px] bg-[#06B6D4] hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors cursor-pointer text-[14px] mb-8"
        >
          {t('common.calculate')}
        </button>

        {bmi && (
          <div className={`bg-[#1E293B] border rounded-[16px] p-6 mt-auto text-center ${getColor(category).split(' ')[1]}`}>
            <div className="text-[11px] uppercase tracking-[0.05em] text-[#94A3B8] mb-1">{t('common.result')}</div>
            <div className={`text-[36px] font-bold leading-none mb-2 ${getColor(category).split(' ')[0]}`}>{bmi}</div>
            <div className="inline-block px-3 py-1 bg-white/5 rounded-full text-[13px] font-medium text-white">
              {t(`tools.bmi-calculator.${category}`)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
