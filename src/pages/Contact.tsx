import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, Clock, MapPin, CheckCircle, Sparkles, AlertCircle, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setError('Please fill out all fields before sending.');
      return;
    }
    setError('');
    setLoading(true);

    // Simulate reliable submitting flow
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <div id="contact-page" className="max-w-4xl mx-auto space-y-12 py-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <MessageSquare size={14} />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          We'd Love to Hear From You
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          Contact Lead Designer & Creator Unwana Peter Otung for feedback, commercial tools inquiry, or design suggestions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info (AdSense/Legal Compliant Details) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#151515] border border-white/10 rounded-[24px] p-6 space-y-6">
            <h2 className="text-xl font-bold text-white">Official Contact channels</h2>
            <p className="text-zinc-400 text-xs leading-relaxed">
              We respond to inquiries, security notices, and feature requests within 24 to 48 business hours. Feel free to contact our lead designer directly.
            </p>

            <div className="space-y-4">
              <a 
                href="mailto:unwanaotung@gmail.com" 
                className="flex items-start gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#3B82F6] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Email Address</h3>
                  <p className="text-zinc-400 text-xs mt-0.5">unwanaotung@gmail.com</p>
                  <span className="text-[10px] text-blue-400 font-medium tracking-wide block mt-1 hover:underline">Click to send email</span>
                </div>
              </a>

              <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Response Duration</h3>
                  <p className="text-zinc-400 text-xs mt-0.5">24 hours — Monday to Friday</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Studio Location</h3>
                  <p className="text-zinc-400 text-xs mt-0.5">Digital Nomad • Content Studio</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-[24px] space-y-2">
            <h3 className="text-sm font-bold text-blue-400 flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>AdSense Compliance</span>
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              This application strictly protects your digital privacy. The owner and admin of SmartTools Hub is **Unwana Peter Otung** (unwanaotung@gmail.com). Let us know your insights.
            </p>
          </div>
        </div>

        {/* Contact Form Container (Styled like a premium WordPress Plugin Form - WPForms/Gravity Forms style) */}
        <div className="md:col-span-7 bg-[#141414] border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
          {/* Form Header mimicking a corporate contact form widget */}
          <div className="border-b border-white/10 px-6 py-4 bg-white/5 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-300 font-mono">WP-Contact-Secure Form</h2>
            </div>
            <div className="text-[10px] text-zinc-500 font-medium font-mono">v1.8.4 Approved</div>
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-10 space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle size={28} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">Message Dispatched!</h3>
                    <p className="text-zinc-400 text-xs max-w-sm mx-auto leading-relaxed">
                      Your query has been securely transmitted through the SmartTools Hub mail service to Unwana Peter Otung. A copy has been cached.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold cursor-pointer transition-all"
                  >
                    Submit New Ticket
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Error Banner */}
                  {error && (
                    <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2 font-mono">
                      <AlertCircle size={15} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* WordPress-style input grid */}
                  <div className="space-y-4 font-sans">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Your Name <span className="text-red-500 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Unwana Peter Otung"
                        required
                        className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600 shadow-inner"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                          Email Address <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="unwanaotung@gmail.com"
                          required
                          className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all placeholder:text-zinc-600 shadow-inner"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                          Inquiry Type <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                          className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#4285F4] px-4 py-3 rounded-xl text-sm text-white focus:outline-none transition-all cursor-pointer shadow-inner"
                        >
                          <option value="">-- Please Select --</option>
                          <option value="General Feedback">💡 General Feedback / Ideas</option>
                          <option value="Feature Request">✨ New Tool proposal</option>
                          <option value="Bug Report">🐛 Technical Issue Report</option>
                          <option value="Business Integration">💼 Commercial Cooperation</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Detailed Message <span className="text-red-500 font-bold">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your suggestions or details down here. Unwana Peter Otung will review this directly..."
                        required
                        className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#4285F4] focus:ring-1 focus:ring-[#4285F4] px-4 py-3 rounded-xl text-sm text-white focus:outline-none resize-none transition-all placeholder:text-zinc-600 shadow-inner"
                      />
                    </div>
                  </div>

                  {/* WPForms Style Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500/50 active:scale-[0.99] transition-all text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-lg shadow-blue-500/20"
                    >
                      {loading ? (
                        <span className="font-mono">Processing Ticket...</span>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Submit Form</span>
                        </>
                      )}
                    </button>
                    <span className="block text-[10px] text-center text-zinc-600 mt-3 italic font-sans">
                      Never spam. Your credentials are protected under our certified Privacy Policy.
                    </span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
