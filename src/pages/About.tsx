import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, User, Mail, Sparkles, FileText, Calculator, Image as ImageIcon, Type, DollarSign, Globe, KeyRound, Braces, CalendarDays, Activity } from 'lucide-react';

const TOOLS_INSTR = [
  {
    icon: FileText,
    name: "PDF Tools - Word to PDF & Compress",
    desc: "A fully responsive PDF suite for converting, merging, and compressing document files locally with high performance.",
    use: "Drag and drop any compatible document format, select the action (convert, merge, compress), and retrieve your optimized file directly."
  },
  {
    icon: Calculator,
    name: "EMI Calculator",
    desc: "Provides real-time loan interest and principal calculations.",
    use: "Enter the principal loan amount, interest rate per annum, and tenure in months or years. Instantly analyze your monthly payments, total payable interest, and graphical amortization schedule."
  },
  {
    icon: ImageIcon,
    name: "Image Compressor",
    desc: "Reduces modern image file sizes (JPEG, PNG, WEBP) right inside your browser without quality compromises.",
    use: "Upload your photos, pick your desired quality slider value (e.g., 80% to maintain visual fidelity while losing bulk bytes), and click Compress to download instantly."
  },
  {
    icon: Type,
    name: "Word Counter",
    desc: "Interactive visual text analytics suite listing word count, characters, estimated reading time, and reading level.",
    use: "Paste or write content directly onto the workspace. Text statistics are updated instantaneously as you type."
  },
  {
    icon: DollarSign,
    name: "Currency Converter",
    desc: "Converts values between international currencies.",
    use: "Key in the currency amount, pick source and destination currency tags, and read the real-time calculated exchange rates."
  },
  {
    icon: Globe,
    name: "SEO Analyzer",
    desc: "Performs full on-page SEO diagnostics on search accessibility, performance metadata, metadata headers, and keyword weight.",
    use: "Input your website domain URL address and preview a list of actionable optimizations, structural recommendations, and search performance scores."
  },
  {
    icon: KeyRound,
    name: "Password Generator",
    desc: "Generate secure cryptographic passwords offline to secure your digital footprint.",
    use: "Toggle standard criteria controls like uppercase, lowercase letters, symbols, digits, set length scale, and copy the safe outcome to your clipboard."
  },
  {
    icon: Braces,
    name: "JSON Formatter",
    desc: "Clean, parse, format, and debug malformed JSON notation with syntax highlighters.",
    use: "Input raw strings, hit Format, and copy the correctly aligned results or inspect validation error diagnostics."
  },
  {
    icon: CalendarDays,
    name: "Age Calculator",
    desc: "A dynamic layout to count calendar durations, age, and milestone countdowns.",
    use: "Pick your birth date and present date to see age broken down to absolute years, months, and days with direct next-birthday countdown alerts."
  },
  {
    icon: Activity,
    name: "BMI Calculator",
    desc: "Tracks body mass index in Imperial and Metric systems.",
    use: "Input your weight and height values. Receive instant feedback showing your official medical bracket with custom wellness advisory warnings."
  }
];

export default function About() {
  return (
    <div id="about-page" className="max-w-4xl mx-auto space-y-12 py-6 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <BookOpen size={14} />
          <span>About SmartTools Hub</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Simplifying Web Tools for Everyone
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
          SmartTools Hub is a professional, high-performance web utility suite dedicated to document conversion, financial planning, visual compression, and developer analysis — optimized for instant local computing and fluid responsive control.
        </p>
      </div>

      {/* Developer Profile Section */}
      <div className="bg-[#151515] border border-white/10 rounded-[28px] p-8 relative overflow-hidden">
        {/* Decorative ambient elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/10">
            <User size={48} className="text-white" />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold text-white">Unwana Peter Otung</h2>
              <p className="text-[#3B82F6] text-sm font-semibold tracking-wider uppercase mt-1">Lead Web Designer & Content Creator</p>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl">
              Greetings! I'm Unwana Peter Otung, a web designer and content creator with an intense passion for building accessible, ultra-fast, offline-first utilities. SmartTools Hub is born out of my pursuit to deliver clean productivity software without intrusive subscriptions or loading speeds. Each tool in this hub is individually optimized for zero bundle bloat and responsive multi-screen control.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <a 
                href="mailto:unwanaotung@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all text-white text-xs font-semibold cursor-pointer"
              >
                <Mail size={14} className="text-zinc-400" />
                <span>unwanaotung@gmail.com</span>
              </a>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-xs font-semibold">
                <Sparkles size={14} />
                <span>Certified Designer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use the Tools Segment */}
      <div className="space-y-6">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">How to Use our Tools</h2>
          <p className="text-zinc-400 text-sm">Follow these simple steps to perform daily operations on our secure web platform:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOOLS_INSTR.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div key={index} className="bg-[#151515] border border-white/5 rounded-[20px] p-6 space-y-4 hover:border-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[10px] bg-blue-500/10 flex items-center justify-center text-[#3B82F6]">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-bold text-white">{tool.name}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    <strong className="text-zinc-300">Purpose:</strong> {tool.desc}
                  </p>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    <strong className="text-[#3B82F6]">Step-by-step Use:</strong> {tool.use}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Prompt */}
      <div className="text-center p-8 bg-gradient-to-b from-[#151515] to-[#0A0A0A] border border-white/5 rounded-[24px] space-y-4">
        <h3 className="text-lg font-bold text-white">Have feedback or feature requests?</h3>
        <p className="text-zinc-400 text-xs max-w-md mx-auto">
          We constantly optimize SmartTools Hub for designers, creators, and developers worldwide. Drop Unwana Peter Otung a quick mail to submit user requests.
        </p>
        <a 
          href="mailto:unwanaotung@gmail.com"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-xl text-xs font-bold cursor-pointer"
        >
          <Mail size={14} />
          <span>Contact Lead Designer</span>
        </a>
      </div>
    </div>
  );
}
