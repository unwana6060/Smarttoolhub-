import React, { useState } from 'react';
import { Loader2, AlertCircle, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SeoResult {
  title: string;
  description: string;
  keywords: string;
  score: number;
  suggestions: string[];
}

export default function SeoAnalyzer() {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SeoResult | null>(null);
  const [error, setError] = useState('');

  const analyzeUrl = async () => {
    if (!url) return;
    try {
      setLoading(true);
      setError('');
      setResult(null);

      let targetUrl = url;
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl;
      }

      // Using allorigins as a simple free CORS proxy
      // We encode the URL to fetch its HTML
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) throw new Error('Network error');
      
      const data = await response.json();
      
      if (!data.contents) {
        throw new Error('Failed to fetch content');
      }

      const html = data.contents;
      
      // Simple parsing using DOMParser (browser environment)
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const title = doc.querySelector('title')?.textContent || '';
      const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      let keywords = doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
      
      let score = 100;
      const suggestions: string[] = [];

      if (!title) {
        score -= 30;
        suggestions.push(t('tools.seo-analyzer.suggestions.missing_title'));
      } else if (title.length < 30 || title.length > 60) {
        score -= 10;
        suggestions.push(t('tools.seo-analyzer.suggestions.title_length'));
      }

      if (!description) {
        score -= 30;
        suggestions.push(t('tools.seo-analyzer.suggestions.missing_desc'));
      } else if (description.length < 50 || description.length > 160) {
        score -= 10;
        suggestions.push(t('tools.seo-analyzer.suggestions.desc_length'));
      }

      const h1Count = doc.querySelectorAll('h1').length;
      if (h1Count === 0) {
        score -= 10;
        suggestions.push(t('tools.seo-analyzer.suggestions.missing_h1'));
      } else if (h1Count > 1) {
        score -= 5;
        suggestions.push(t('tools.seo-analyzer.suggestions.multiple_h1'));
      }

      const imgCount = doc.querySelectorAll('img').length;
      const imgWithoutAlt = Array.from(doc.querySelectorAll('img')).filter(img => !img.getAttribute('alt')).length;
      if (imgWithoutAlt > 0) {
        score -= Math.min(15, imgWithoutAlt * 2);
        suggestions.push(t('tools.seo-analyzer.suggestions.missing_alt', { count: imgWithoutAlt }));
      }

      setResult({
        title,
        description,
        keywords,
        score: Math.max(0, score),
        suggestions
      });

    } catch (err) {
      setError(t('tools.seo-analyzer.errors.failed_analysis'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#151515] rounded-[24px] border border-white/10 p-6 flex flex-col min-h-[460px]">
        <div className="mb-6">
          <h2 className="m-0 text-[20px] font-bold text-white">{t('tools.seo-analyzer.name')}</h2>
          <p className="mt-1 text-[#888] text-[13px]">{t('tools.seo-analyzer.desc')}</p>
        </div>

        <div className="flex gap-3 mb-8">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]">
              <Globe size={18} />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. example.com or https://google.com"
              className="w-full bg-[#222] border border-[#333] pl-11 pr-4 py-3 rounded-[12px] text-white font-sans text-[14px] focus:outline-none focus:border-[#FACC15] transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && analyzeUrl()}
            />
          </div>
          <button 
            onClick={analyzeUrl}
            disabled={!url || loading}
            className="px-6 py-3 rounded-[12px] bg-[#FACC15] hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed text-black font-medium transition-colors cursor-pointer text-[14px] flex items-center justify-center min-w-[120px]"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : t('tools.seo-analyzer.analyze')}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        {result && (
          <div className="grid md:grid-cols-[1fr_250px] gap-6 flex-1">
            <div className="space-y-6">
              <div className="bg-[#1A1A1A] p-5 rounded-[16px] border border-white/5">
                <div className="text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">{t('tools.seo-analyzer.title')}</div>
                <div className="text-[15px] text-[#3B82F6] font-medium leading-snug">{result.title || <span className="text-[#888] italic">{t('tools.seo-analyzer.not_found')}</span>}</div>
                <div className="text-[12px] text-[#888] mt-2">{t('common.length')}: {result.title.length} {t('tools.word-counter.stats.chars')}</div>
              </div>

              <div className="bg-[#1A1A1A] p-5 rounded-[16px] border border-white/5">
                <div className="text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">{t('tools.seo-analyzer.description')}</div>
                <div className="text-[14px] text-white leading-relaxed">{result.description || <span className="text-[#888] italic">{t('tools.seo-analyzer.not_found')}</span>}</div>
                <div className="text-[12px] text-[#888] mt-2">{t('common.length')}: {result.description.length} {t('tools.word-counter.stats.chars')}</div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-[#1E293B] border border-[#FACC15] rounded-[16px] p-6 text-center flex-shrink-0">
                <div className="text-[11px] uppercase tracking-[0.05em] text-[#94A3B8] mb-1">{t('tools.seo-analyzer.score')}</div>
                <div className={`text-[48px] font-bold leading-none ${result.score >= 80 ? 'text-[#10B981]' : result.score >= 50 ? 'text-[#FACC15]' : 'text-[#EF4444]'}`}>
                  {result.score}
                </div>
                <div className="text-[12px] text-[#94A3B8] mt-2">{t('tools.seo-analyzer.out_of_100')}</div>
              </div>

              {result.suggestions.length > 0 && (
                <div className="bg-[#1A1A1A] border border-[#EF4444]/30 rounded-[16px] p-5 flex-1">
                  <div className="text-[11px] uppercase tracking-[0.05em] text-[#EF4444] mb-3 font-semibold">{t('tools.seo-analyzer.suggestions_title')}</div>
                  <ul className="space-y-3">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="text-[13px] text-[#CCC] flex items-start gap-2">
                        <span className="text-[#EF4444] mt-0.5">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
