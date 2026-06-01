import React, { useState } from 'react';
import { Copy, AlertCircle, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function JsonFormatter() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJson = () => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }
    
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError('');
    } catch (err: any) {
      setError(`${t('tools.json-formatter.invalid')}: ${err.message}`);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col md:flex-row gap-4 h-[calc(100vh-160px)] min-h-[500px]">
      
      {/* Input Section */}
      <div className="flex-1 bg-[#151515] rounded-[24px] border border-white/10 p-5 flex flex-col h-full">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="m-0 text-[18px] font-bold text-white">{t('tools.json-formatter.name')}</h2>
            <p className="mt-1 text-[#888] text-[12px]">{t('tools.json-formatter.desc')}</p>
          </div>
          <button 
            onClick={clearAll}
            className="text-[12px] bg-white/5 hover:bg-white/10 text-[#888] hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-white/5 cursor-pointer"
          >
            {t('common.clear')}
          </button>
        </div>
        
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError('');
          }}
          placeholder={t('tools.json-formatter.placeholder')}
          className="flex-1 w-full bg-[#222] border border-[#333] rounded-[12px] p-4 text-white font-mono text-[13px] resize-none focus:outline-none focus:border-[#3B82F6] transition-colors"
        />
        
        <button 
          onClick={formatJson}
          className="w-full mt-4 py-3 rounded-[12px] bg-[#3B82F6] hover:bg-blue-600 text-white font-medium transition-colors cursor-pointer text-[14px]"
        >
          {t('tools.json-formatter.beautify')}
        </button>
      </div>

      {/* Output Section */}
      <div className="flex-1 bg-[#151515] rounded-[24px] border border-white/10 p-5 flex flex-col h-full relative">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="m-0 text-[14px] font-bold text-[#888] uppercase tracking-[0.05em]">{t('common.result')}</h3>
          {output && (
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 text-[12px] bg-[#222] hover:bg-[#333] text-[#888] hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-[#333] cursor-pointer"
            >
              {copied ? <Check size={14} className="text-[#10B981]" /> : <Copy size={14} />}
              {copied ? t('common.copied') : t('common.copy')}
            </button>
          )}
        </div>
        
        {error ? (
          <div className="flex-1 border border-red-500/20 bg-red-500/5 rounded-[12px] p-4 flex flex-col gap-3">
            <div className="flex items-start gap-2 text-[#EF4444]">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span className="font-medium text-[14px]">{t('common.error')}</span>
            </div>
            <div className="text-[13px] text-red-200/70 font-mono break-all bg-[#000]/20 p-3 rounded-[8px]">
              {error}
            </div>
          </div>
        ) : (
          <textarea
            value={output}
            readOnly
            placeholder={t('tools.json-formatter.output_placeholder')}
            className="flex-1 w-full bg-[#1A1A1A] border border-white/5 rounded-[12px] p-4 text-[#3B82F6] font-mono text-[13px] resize-none focus:outline-none"
          />
        ) }
      </div>

    </div>
  );
}
