import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUp, File, Trash2, Download, AlertCircle, Loader2 } from 'lucide-react';
import { saveToolUsage } from '../lib/firebase';
import { useTranslation } from 'react-i18next';

export default function PdfTool() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'merge' | 'split'>('merge');
  
  // Merge State
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  
  // Split State
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [pageRange, setPageRange] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const mergeFileInputRef = useRef<HTMLInputElement>(null);
  const splitFileInputRef = useRef<HTMLInputElement>(null);

  const handleMergeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter((f: File) => f.type === 'application/pdf');
      setMergeFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeMergeFile = (index: number) => {
    setMergeFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSplitFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]?.type === 'application/pdf') {
      setSplitFile(e.target.files[0]);
    }
  };

  const processMerge = async () => {
    if (mergeFiles.length < 2) {
      setError(t('tools.pdf-tool.errors.at_least_two'));
      return;
    }
    setError('');
    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of mergeFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const pdfBytes = await mergedPdf.save();
      downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'merged.pdf');
      
      // Save usage
      await saveToolUsage('pdf-tool', 'PDF Merge', { fileCount: mergeFiles.length }, { success: true });
    } catch (err) {
      setError(t('tools.pdf-tool.errors.failed_merge'));
    } finally {
      setIsProcessing(false);
    }
  };

  const processSplit = async () => {
    if (!splitFile || !pageRange) {
      setError(t('tools.pdf-tool.errors.upload_pdf_range'));
      return;
    }
    
    // Parse range (e.g. "1-3" or "2")
    const match = pageRange.match(/^(\d+)(?:-(\d+))?$/);
    if (!match) {
      setError(t('tools.pdf-tool.errors.invalid_range'));
      return;
    }
    
    const startObj = parseInt(match[1]);
    const endObj = match[2] ? parseInt(match[2]) : startObj;
    
    if (startObj < 1 || endObj < startObj) {
      setError(t('tools.pdf-tool.errors.invalid_values'));
      return;
    }

    setError('');
    setIsProcessing(true);
    try {
      const arrayBuffer = await splitFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const totalPages = pdf.getPageCount();
      
      if (startObj > totalPages || endObj > totalPages) {
        setError(t('tools.pdf-tool.errors.pages_limit', { count: totalPages }));
        setIsProcessing(false);
        return;
      }
      
      const newPdf = await PDFDocument.create();
      const indicesToCopy = [];
      for (let i = startObj - 1; i < endObj; i++) {
        indicesToCopy.push(i);
      }
      
      const copiedPages = await newPdf.copyPages(pdf, indicesToCopy);
      copiedPages.forEach((page) => newPdf.addPage(page));
      
      const pdfBytes = await newPdf.save();
      downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'split.pdf');

      // Save usage
      await saveToolUsage('pdf-tool', 'PDF Split', { fileName: splitFile.name, range: pageRange }, { success: true });
    } catch (err) {
      setError(t('tools.pdf-tool.errors.failed_split'));
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#151515] rounded-[24px] border border-white/10 p-6 sm:p-8 flex flex-col">
        <div className="mb-6">
          <h2 className="m-0 text-[20px] font-bold text-white">{t('tools.pdf-tool.name')}</h2>
          <p className="mt-1 text-[#888] text-[13px]">{t('tools.pdf-tool.desc')}</p>
        </div>

        <div className="flex gap-2 mb-6 bg-[#1A1A1A] p-1 rounded-[12px] border border-white/5 w-fit">
          <button
            onClick={() => { setMode('merge'); setError(''); }}
            className={`px-6 py-2 text-[13px] font-medium rounded-[8px] transition-colors cursor-pointer ${mode === 'merge' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'text-[#888] hover:text-white'}`}
          >
            {t('tools.pdf-tool.merge')}
          </button>
          <button
            onClick={() => { setMode('split'); setError(''); }}
            className={`px-6 py-2 text-[13px] font-medium rounded-[8px] transition-colors cursor-pointer ${mode === 'split' ? 'bg-[#EF4444]/10 text-[#EF4444]' : 'text-[#888] hover:text-white'}`}
          >
            {t('tools.pdf-tool.split')}
          </button>
        </div>

        <div className="">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          {mode === 'merge' ? (
            <div className="space-y-6">
              <div 
                className="bg-[#222] border border-[#333] border-dashed hover:border-[#EF4444]/50 rounded-[16px] p-8 text-center transition-colors cursor-pointer"
                onClick={() => mergeFileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  multiple 
                  accept="application/pdf" 
                  className="hidden" 
                  ref={mergeFileInputRef}
                  onChange={handleMergeFiles}
                />
                <FileUp size={32} className="mx-auto text-[#888] mb-3" />
                <p className="text-white font-medium text-[14px]">{t('common.click_to_upload')}</p>
                <p className="text-[12px] text-[#888] mt-1">{t('common.select_multiple')}</p>
              </div>

              {mergeFiles.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-[11px] uppercase tracking-[0.05em] text-[#888] mb-3">{t('common.selected_files')}</h3>
                  <div className="grid gap-2">
                  {mergeFiles.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-[12px] border border-white/5">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <File size={16} className="text-[#EF4444] shrink-0" />
                        <span className="text-[13px] text-white truncate">{f.name}</span>
                      </div>
                      <button onClick={() => removeMergeFile(i)} className="text-[#888] hover:text-[#EF4444] p-1 cursor-pointer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  </div>
                </div>
              )}

              <button
                disabled={mergeFiles.length < 2 || isProcessing}
                onClick={processMerge}
                className="w-full py-3 rounded-[12px] bg-[#EF4444] hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                {isProcessing ? t('tools.pdf-tool.merging') : t('tools.pdf-tool.merge_download')}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div 
                className="bg-[#222] border border-[#333] border-dashed hover:border-[#EF4444]/50 rounded-[16px] p-8 text-center transition-colors cursor-pointer"
                onClick={() => splitFileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  accept="application/pdf" 
                  className="hidden" 
                  ref={splitFileInputRef}
                  onChange={handleSplitFile}
                />
                <FileUp size={32} className="mx-auto text-[#888] mb-3" />
                {splitFile ? (
                  <p className="text-white font-medium text-[14px]">{splitFile.name}</p>
                ) : (
                  <>
                    <p className="text-white font-medium text-[14px]">{t('common.click_to_upload')}</p>
                    <p className="text-[12px] text-[#888] mt-1">{t('common.select_one')}</p>
                  </>
                )}
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.05em] text-[#888] mb-2">{t('tools.pdf-tool.range')} (e.g. 1-3 or 5)</label>
                <input
                  type="text"
                  placeholder="e.g. 1-3"
                  value={pageRange}
                  onChange={e => setPageRange(e.target.value)}
                  className="w-full bg-[#222] border border-[#333] p-3 rounded-[10px] text-white font-sans text-[14px] focus:outline-none focus:border-[#EF4444] transition-colors"
                />
              </div>

              <button
                disabled={!splitFile || !pageRange || isProcessing}
                onClick={processSplit}
                className="w-full py-3 rounded-[12px] bg-[#EF4444] hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                {isProcessing ? t('tools.pdf-tool.splitting') : t('tools.pdf-tool.split_download')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
