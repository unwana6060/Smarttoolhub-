import { useTranslation } from 'react-i18next';

export default function AdBanner() {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-[728px] h-[50px] sm:h-[90px] bg-[#1A1A1A] border border-dashed border-white/10 rounded-xl flex items-center justify-center text-[9px] sm:text-[10px] text-[#666] uppercase tracking-[2px] mx-auto transition-all">
      {t('ads.banner.text')}
    </div>
  );
}
