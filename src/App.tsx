import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import PdfTool from './pages/PdfTool';
import EmiCalculator from './pages/EmiCalculator';
import ImageCompressor from './pages/ImageCompressor';
import WordCounter from './pages/WordCounter';
import CurrencyConverter from './pages/CurrencyConverter';
import SeoAnalyzer from './pages/SeoAnalyzer';
import PasswordGenerator from './pages/PasswordGenerator';
import JsonFormatter from './pages/JsonFormatter';
import AgeCalculator from './pages/AgeCalculator';
import BmiCalculator from './pages/BmiCalculator';
import AdInterstitial from './components/AdInterstitial';

// Mock interstitial manager
function RouteHandler({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [showAd, setShowAd] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== prevPath) {
      // Show interstitial ad on tool change (except going home directly, or adjust as needed)
      setShowAd(true);
    }
    setPrevPath(location.pathname);
  }, [location.pathname]);

  if (showAd) {
    return <AdInterstitial onClose={() => setShowAd(false)} />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteHandler>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="pdf-tool" element={<PdfTool />} />
            <Route path="emi-calculator" element={<EmiCalculator />} />
            <Route path="image-compressor" element={<ImageCompressor />} />
            <Route path="word-counter" element={<WordCounter />} />
            <Route path="currency-converter" element={<CurrencyConverter />} />
            <Route path="seo-analyzer" element={<SeoAnalyzer />} />
            <Route path="password-generator" element={<PasswordGenerator />} />
            <Route path="json-formatter" element={<JsonFormatter />} />
            <Route path="age-calculator" element={<AgeCalculator />} />
            <Route path="bmi-calculator" element={<BmiCalculator />} />
          </Route>
        </Routes>
      </RouteHandler>
    </BrowserRouter>
  );
}
