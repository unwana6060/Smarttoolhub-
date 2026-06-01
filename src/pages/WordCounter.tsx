import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { saveToolUsage } from '../lib/firebase';

export default function WordCounter() {
  const { t } = useTranslation();
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;

    // Reading time calculation (avg 200 words per min)
    const readingTimeMins = words / 200;
    const readingTime = readingTimeMins < 1 
      ? `${Math.ceil(readingTimeMins * 60)} ${t('tools.word-counter.units.sec')}` 
      : `${Math.round(readingTimeMins)} ${t('tools.word-counter.units.mins')}`;

    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime };
  }, [text]);

  // Debounced save to Firestore
  useEffect(() => {
    if (!text.trim()) return;
    
    const timer = setTimeout(() => {
      saveToolUsage('word-counter', 'Word Counter', { textLength: text.length }, stats);
    }, 5000);

    return () => clearTimeout(timer);
  }, [text, stats]);

  const clearText = () => setText('');

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#151515] rounded-[24px] border border-white/10 p-6 flex flex-col">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="m-0 text-[20px] font-bold text-white">{t('tools.word-counter.name')}</h2>
            <p className="mt-1 text-[#888] text-[13px]">{t('tools.word-counter.desc')}</p>
          </div>
          <button 
            onClick={clearText}
            className="text-[12px] bg-white/5 hover:bg-white/10 text-[#888] hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-white/5 cursor-pointer"
          >
            {t('common.clear')}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-[16px] text-center">
            <div className="text-[24px] font-bold text-[#8B5CF6] mb-1 leading-none">{stats.words}</div>
            <div className="text-[10px] text-[#888] uppercase tracking-[0.05em]">{t('tools.word-counter.stats.words')}</div>
          </div>
          <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-[16px] text-center">
            <div className="text-[24px] font-bold text-white mb-1 leading-none">{stats.chars}</div>
            <div className="text-[10px] text-[#888] uppercase tracking-[0.05em]">{t('tools.word-counter.stats.chars')}</div>
          </div>
          <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-[16px] text-center">
            <div className="text-[24px] font-bold text-[#CCC] mb-1 leading-none">{stats.charsNoSpace}</div>
            <div className="text-[10px] text-[#888] uppercase tracking-[0.05em]">{t('tools.word-counter.stats.chars_no_space')}</div>
          </div>
          <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-[16px] text-center">
            <div className="text-[24px] font-bold text-[#CCC] mb-1 leading-none">{stats.sentences}</div>
            <div className="text-[10px] text-[#888] uppercase tracking-[0.05em]">{t('tools.word-counter.stats.sentences')}</div>
          </div>
          <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-[16px] text-center">
            <div className="text-[24px] font-bold text-[#CCC] mb-1 leading-none">{stats.paragraphs}</div>
            <div className="text-[10px] text-[#888] uppercase tracking-[0.05em]">{t('tools.word-counter.stats.paragraphs')}</div>
          </div>
          <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-[16px] text-center">
            <div className="text-[18px] font-bold text-[#10B981] mb-1 leading-none mt-1">{stats.readingTime}</div>
            <div className="text-[10px] text-[#888] uppercase tracking-[0.05em] mt-2">{t('tools.word-counter.stats.reading_time')}</div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 w-full bg-[#222] border border-[#333] rounded-[16px] overflow-hidden flex flex-col min-h-[300px]">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('tools.word-counter.placeholder')}
            className="flex-1 w-full bg-transparent text-white p-5 resize-none focus:outline-none placeholder-[#666] leading-relaxed text-[14px]"
          />
        </div>
      </div>
    </div>
  );
}
