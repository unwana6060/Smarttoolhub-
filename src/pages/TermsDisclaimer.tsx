import React from 'react';
import { ShieldCheck, Scale, HelpCircle } from 'lucide-react';

export default function TermsDisclaimer() {
  const lastUpdated = "June 2, 2026";

  return (
    <div id="terms-disclaimer" className="max-w-4xl mx-auto space-y-10 py-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Scale size={14} />
          <span>Legal Conditions</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          Terms of Service & Disclaimer
        </h1>
        <p className="text-zinc-400 text-sm">
          Last Updated: {lastUpdated} • Certified Web Content Studio of Unwana Peter Otung
        </p>
      </div>

      {/* Main Content Body */}
      <div className="bg-[#151515] border border-white/10 rounded-[28px] p-6 md:p-10 space-y-8 text-zinc-300 text-sm leading-relaxed">
        
        {/* Section 1: Agreement to Terms */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            1. Agreement to Terms
          </h2>
          <p>
            By accessing and using <strong>SmartTools Hub</strong>, you agree to be bound by these Terms of Service. If you do not accept these terms or conditions, you must immediately cease using the application. All tools are offered for free educational, development, and personal utility purposes.
          </p>
        </section>

        {/* Section 2: Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            2. Intellectual Property and Creator Rights
          </h2>
          <p>
            All website design headers, code structures, functional scripts, graphics, custom translation mappings, layouts, and logos are the property of certified lead designer <strong>Unwana Peter Otung</strong> ("we," "our," or "us"). You may not scrape, frame, reproduce, redistribute, or monetize the tool codebases without explicit written authorization from <strong>Unwana Peter Otung</strong> (unwanaotung@gmail.com).
          </p>
        </section>

        {/* Section 3: Professional Calculations Disclaimer */}
        <section className="space-y-4 bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 text-indigo-400">
            <HelpCircle size={18} />
            3. Accuracy and Disclaimer of Liability
          </h2>
          <p className="text-zinc-300">
            SmartTools Hub compiles physical, mathematical, financial, SEO, and document calculations. We make no warranty or representation, express or implied, regarding the accuracy, completeness, or suitability of the outputs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-zinc-400 pt-1">
            <div className="p-3 bg-black/40 rounded-xl">
              <strong className="text-white block mb-0.5">EMI & Currency:</strong>
              Financial estimates are for illustrative planning only. Consult certified banking institutions or financial advisors before executing financial obligations.
            </div>
            <div className="p-3 bg-black/40 rounded-xl">
              <strong className="text-white block mb-0.5">BMI Calculator:</strong>
              Body Mass Index is an overall statistical score and should not override professional clinical evaluations or dietitian advice.
            </div>
          </div>
          <p className="text-zinc-300">
            In no event shall the developer, administrator, or hosting service of this application be held liable under any legal theory for any direct or indirect damages arising out of the use, execution, or inability to execute these utilities.
          </p>
        </section>

        {/* Section 4: External Advertisement Networks */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            4. Third-Party Advertisement Disclosure
          </h2>
          <p>
            This site uses Google AdSense and affiliated services to deliver digital banner advertisements to maintain the platform's hosting costs. We do not monitor or control the advertising targets selected by third parties on our pages. By interacting with any visual banners, you acknowledge the terms of the third-party advertisers.
          </p>
        </section>

        {/* Section 5: Governing Law & Updates */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
            5. Changes to the Terms
          </h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms and Disclaimer statements at any time. Your continued use of the web portal after updates are deployed confirms your voluntary consent to those changes.
          </p>
        </section>

        {/* Bottom Representation */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-zinc-500">
          <div>
            <p className="font-bold text-zinc-400">SmartTools Hub Lead Administrator</p>
            <p>Developer Email: unwanaotung@gmail.com</p>
          </div>
          <div className="flex items-center gap-2 text-blue-400 font-semibold bg-blue-500/5 border border-blue-500/10 px-3 py-1.5 rounded-lg">
            <ShieldCheck size={14} />
            <span>Official Admin Verified</span>
          </div>
        </div>

      </div>
    </div>
  );
}
