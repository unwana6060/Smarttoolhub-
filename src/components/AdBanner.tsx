import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function AdBanner() {
  useEffect(() => {
    try {
      // Trigger Google AdSense to push and render the ad inside this unit
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error on initialization:', e);
    }
  }, []);

  return (
    <div className="w-full max-w-[728px] mx-auto my-4 overflow-hidden flex justify-center">
      {/* HTML Ad Unit */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-9053242421835515"
        data-ad-slot="YOUR_AD_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}