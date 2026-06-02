import React from 'react';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "June 2, 2026";

  return (
    <div id="privacy-policy" className="max-w-4xl mx-auto space-y-10 py-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Shield size={14} />
          <span>Security & Compliance</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-zinc-400 text-sm">
          Last Updated: {lastUpdated} • Compliance Manager: Unwana Peter Otung
        </p>
      </div>

      {/* Main content body in elegant styled typography */}
      <div className="bg-[#151515] border border-white/10 rounded-[28px] p-6 md:p-10 space-y-8 text-zinc-300 text-sm leading-relaxed">
        {/* Intro Section */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            Introduction
          </h2>
          <p>
            At <strong>SmartTools Hub</strong>, accessible via our dynamic web portal, safeguarding your online privacy is our highest priority. This Privacy Policy outlines the types of user data we collect, store, and process. It describes how Google AdSense delivers tailored advertisements and how you can manage your advertising preferences.
          </p>
          <p>
            If you have additional questions or require more information about this privacy policy, please drop a message to our official administrator, <strong>Unwana Peter Otung</strong>, at <strong>unwanaotung@gmail.com</strong>.
          </p>
        </section>

        {/* 1. Log Files */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            Log Files and Hosting
          </h2>
          <p>
            SmartTools Hub follows standard procedures for utilizing server log files. These files automatically log visitors when they access our web portal. The information compiled includes Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and number of button clicks.
          </p>
          <p>
            These logs are purely used to analyze user patterns, track usage distribution, prevent security anomalies, and diagnose mobile device responsiveness. <strong>No personally identifiable information is linked to these hosting logs.</strong>
          </p>
        </section>

        {/* 2. Google AdSense & Cookies */}
        <section className="space-[#111] bg-black/30 border border-white/5 rounded-2xl p-5 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 text-blue-400">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2045c0-.6382-.0573-1.2519-.1637-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2582h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.4673-.8059 5.9564-2.1805l-2.9087-2.2582c-.8059.54-1.8368.8591-3.0477.8591-2.344 0-4.3282-1.5832-5.036-3.7104H1.0567v2.3318C2.5364 15.9818 5.539 18 9 18z" fill="#34A853"/>
            </svg>
            Google DoubleClick DART Cookies & AdSense
          </h2>
          <p className="text-zinc-300">
            Google is a certified third-party vendor on our web pages. It uses cookies, specifically known as <strong>DART cookies</strong>, to serve advertisements to our tool site's visitors based upon their visits to smart utilities or other sites across the internet.
          </p>
          <p className="text-zinc-300">
            Visitors may choose to decline the use of DART cookies by visiting the official Google Ad and Content Network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://policies.google.com/technologies/ads</a>.
          </p>
        </section>

        {/* 3. Advertising Partners */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            Our Advertising Partners
          </h2>
          <p>
            Some of the advertisers on our web utility platform may use cookies and web beacons. Our advertising network integrations include:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li>
              <strong>Google AdSense</strong> (Privacy Policy available at: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noreferrer" className="text-[#3B82F6] hover:underline">Google Privacy & Terms</a>)
            </li>
          </ul>
          <p>
            These third-party ad networks use technology to construct advertisement blocks and link tracks that appear directly inside SmartTools Hub, which are dispatched straight onto your browser. They automatically retrieve your device IP addresses to measure the effectiveness of their advertising campaigns and/or customize the display headers you see on web pages.
          </p>
        </section>

        {/* 4. Local App Processing */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            Local-First Performance and File Processing
          </h2>
          <p>
            A high portion of calculations, conversions, and document actions inside SmartTools Hub (for instance, the PDF Suite, Image Compressor, Password Generator, and JSON Code Formatter) is processed **entirely locally on your client browser**.
          </p>
          <div className="flex items-start gap-3 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 text-xs">
            <Lock className="text-blue-400 shrink-0 mt-0.5" size={16} />
            <div>
              <strong className="text-white block mb-0.5">Zero Server Data Leaks</strong>
              Your text outputs, financial data, loan conditions, BMI values, and uncompressed original image files are never uploaded, analyzed on external server clusters, or transmitted. Your visual and numerical payloads are completely secure.
            </div>
          </div>
        </section>

        {/* 5. Consent and Managing Cookies */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            User Consent
          </h2>
          <p>
            By using our tools, you hereby consent to this Privacy Policy and agree to its official terms. You can choose to disable cookies through your individual browser preferences. Detailed information about cookie management with specific web browsers can be found in the browsers' respective documentation.
          </p>
        </section>

        {/* 6. Legal Representative Details */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-zinc-500">
          <div>
            <p className="font-bold text-zinc-400">Lead Administrator: Unwana Peter Otung</p>
            <p>Official Email: unwanaotung@gmail.com</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5 rounded-lg">
            <CheckCircle size={14} />
            <span>AdSense Compliant 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
