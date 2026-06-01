import React, { useState, useRef } from 'react';
import imageCompression from 'browser-image-compression';
import { UploadCloud, Image as ImageIcon, Download, Loader2, ArrowRight } from 'lucide-react';
import { saveToolUsage } from '../lib/firebase';
import { useTranslation } from 'react-i18next';

export default function ImageCompressor() {
  const { t } = useTranslation();
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [originalUrl, setOriginalUrl] = useState('');
  const [compressedUrl, setCompressedUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG/PNG).');
      return;
    }

    setOriginalFile(file);
    setOriginalUrl(URL.createObjectURL(file));
    setCompressedFile(null);
    setCompressedUrl('');
  };

  const compressImage = async () => {
    if (!originalFile) return;

    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: 1, // Max size 1MB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      const compressed = await imageCompression(originalFile, options);
      setCompressedFile(compressed);
      setCompressedUrl(URL.createObjectURL(compressed));

      // Save usage
      await saveToolUsage('image-compressor', 'Image Compressor', 
        { originalSize: originalFile.size, type: originalFile.type }, 
        { compressedSize: compressed.size, savings: calculateSavings() }
      );
    } catch (error) {
      console.error(error);
      alert('Failed to compress image.');
    } finally {
      setIsCompressing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateSavings = () => {
    if (!originalFile || !compressedFile) return 0;
    const diff = originalFile.size - compressedFile.size;
    const percentage = (diff / originalFile.size) * 100;
    return percentage > 0 ? percentage.toFixed(1) : 0;
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#151515] rounded-[24px] border border-white/10 p-6 flex flex-col">
        <div className="mb-6">
          <h2 className="m-0 text-[20px] font-bold text-white">{t('tools.image-compressor.name')}</h2>
          <p className="mt-1 text-[#888] text-[13px]">{t('tools.image-compressor.desc')}</p>
        </div>

        <div className="space-y-6">
        
        {/* Upload Area */}
        {!originalFile && (
          <div 
            className="bg-[#222] border border-[#333] border-dashed hover:border-[#10B981]/50 rounded-[16px] p-12 text-center transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[300px]"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              accept="image/jpeg, image/png, image/webp" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <div className="w-16 h-16 bg-[#10B981]/10 rounded-[12px] flex items-center justify-center mb-4 text-[#10B981]">
              <UploadCloud size={32} />
            </div>
            <p className="text-[16px] text-white font-medium mb-1">{t('common.drop_file')}</p>
            <p className="text-[#888] text-[13px]">{t('common.or_click')} (JPG, PNG, WebP)</p>
          </div>
        )}

        {/* Action Area */}
        {originalFile && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Original Image */}
              <div className="flex-1 w-full bg-[#1A1A1A] rounded-[16px] p-4 border border-white/5 text-center">
                <h3 className="text-[11px] uppercase tracking-[0.05em] text-[#888] mb-3">Original</h3>
                <div className="h-48 rounded-[12px] overflow-hidden bg-black/50 mb-3 flex items-center justify-center">
                  <img src={originalUrl} alt="Original" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="text-[18px] text-white font-bold">{formatSize(originalFile.size)}</div>
              </div>

              {/* Arrow */}
              <div className="shrink-0 text-[#10B981] md:rotate-0 rotate-90">
                <ArrowRight size={24} />
              </div>

              {/* Compressed Image */}
              <div className="flex-1 w-full bg-[#1e293b] rounded-[16px] p-4 border border-[#10B981] text-center relative overflow-hidden">
                {!compressedFile && !isCompressing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1A1A1A] z-10 p-4 border border-white/5 rounded-[16px]">
                    <button
                      onClick={compressImage}
                      className="w-full py-3 rounded-[12px] bg-[#10B981] hover:bg-emerald-600 text-white font-medium transition-colors cursor-pointer"
                    >
                      {t('tools.image-compressor.compress')}
                    </button>
                  </div>
                )}
                
                {isCompressing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1A1A1A]/80 backdrop-blur z-10 border border-white/5 rounded-[16px]">
                    <Loader2 size={32} className="animate-spin text-[#10B981] mb-2" />
                    <span className="text-[#10B981] font-medium text-[13px]">{t('tools.image-compressor.compressing')}</span>
                  </div>
                )}

                <h3 className="text-[11px] uppercase tracking-[0.05em] text-[#10B981] mb-3">Compressed</h3>
                <div className="h-48 rounded-[12px] overflow-hidden bg-black/50 mb-3 flex items-center justify-center border border-white/5">
                  {compressedUrl ? (
                    <img src={compressedUrl} alt="Compressed" className="max-h-full max-w-full object-contain" />
                  ) : (
                     <ImageIcon size={48} className="text-zinc-800" />
                  )}
                </div>
                <div className="text-[18px] text-[#10B981] font-bold">
                  {compressedFile ? formatSize(compressedFile.size) : '???'}
                </div>
              </div>
            </div>

            {/* Results and Download */}
            {compressedFile && (
              <div className="flex flex-col sm:flex-row items-center justify-between bg-[#10B981]/10 border border-[#10B981]/20 p-5 rounded-[16px] gap-4">
                <div className="text-center sm:text-left">
                  <span className="block text-[#10B981] text-[12px]">{t('tools.image-compressor.you_saved')}</span>
                  <span className="text-[20px] font-bold text-white">{calculateSavings()}% {t('tools.image-compressor.space')}</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setOriginalFile(null);
                      setCompressedFile(null);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-[10px] bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer text-[14px]"
                  >
                    {t('common.start_over')}
                  </button>
                  <a
                    href={compressedUrl}
                    download={`compressed_${originalFile.name}`}
                    className="flex items-center justify-center gap-2 flex-1 sm:flex-none px-6 py-2.5 rounded-[10px] bg-[#10B981] hover:bg-emerald-600 font-medium text-white transition-colors cursor-pointer text-[14px]"
                  >
                    <Download size={18} />
                    {t('common.download')}
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
