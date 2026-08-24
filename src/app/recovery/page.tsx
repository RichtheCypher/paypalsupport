'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { 
  Lock, Shield, Smartphone, KeyRound, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, Mail, RefreshCw
} from 'lucide-react';

export default function RecoveryPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [issueType, setIssueType] = useState('forgot_password');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1000);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Header Banner */}
      <section className="bg-white text-slate-900 border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0066cc] text-xs font-semibold border border-blue-100">
            <Lock className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>PayPal Automated Security Portal</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Account Recovery & Security Wizard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Restore access to your account, reset 2FA devices, or report compromised credentials securely.
          </p>
        </div>
      </section>

      {/* Recovery Wizard Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-8">
          
          {/* Progress Indicator */}
          {!isComplete && (
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              {[
                { stepNum: 1, label: 'Account Identification' },
                { stepNum: 2, label: 'Identity Verification' },
                { stepNum: 3, label: 'Access Restored' }
              ].map((s) => (
                <div key={s.stepNum} className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    step >= s.stepNum
                      ? 'bg-[#0066cc] text-white shadow-md'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {s.stepNum}
                  </div>
                  <span className={`hidden sm:inline text-xs font-semibold ${
                    step >= s.stepNum ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Step 1 Form */}
          {step === 1 && !isComplete && (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Select your recovery scenario</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Choose the option that best matches your situation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'forgot_password', label: 'Forgot Password', icon: KeyRound, desc: 'Reset password via email/SMS code.' },
                  { id: 'unauthorized', label: 'Unauthorized Access', icon: Shield, desc: 'Lock account & review recent logins.' },
                  { id: '2fa_lost', label: 'Lost 2FA Phone', icon: Smartphone, desc: 'Bypass authenticator via photo ID.' }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setIssueType(item.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        issueType === item.id
                          ? 'border-[#0066cc] bg-blue-50/80 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-[#0066cc] mb-2" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{item.label}</h4>
                        <p className="text-[10px] text-slate-500 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Primary PayPal Email Address or Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="e.g. user@example.com or +1 (555) 019-2834"
                  className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !emailOrPhone.trim()}
                  className="px-6 py-3 rounded-xl bg-[#0066cc] hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center space-x-2 transition-colors shadow-md"
                >
                  <span>{isSubmitting ? 'Verifying Account...' : 'Send Verification Code'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2 Form */}
          {step === 2 && !isComplete && (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0066cc] flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Check your device</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We sent a 6-digit security code to <strong className="text-slate-900">{emailOrPhone}</strong>.
                </p>
              </div>

              {/* 6 Digit Code Input */}
              <div className="flex justify-center space-x-2 sm:space-x-3 py-4">
                {verificationCode.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`code-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(idx, e.target.value)}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center font-extrabold text-base bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                >
                  ← Back to Step 1
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || verificationCode.some(c => !c)}
                  className="px-6 py-3 rounded-xl bg-[#0066cc] hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center space-x-2 transition-colors shadow-md"
                >
                  <span>{isSubmitting ? 'Authenticating...' : 'Verify Security Code'}</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Completion View */}
          {isComplete && (
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">Identity Verified & Secured!</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  A temporary password reset link has been dispatched to {emailOrPhone}. All active sessions on untrusted devices have been logged out.
                </p>
              </div>

              <div className="pt-4 flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setIsComplete(false);
                    setStep(1);
                    setVerificationCode(['', '', '', '', '', '']);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  Start New Recovery
                </button>
                <a
                  href="/"
                  className="px-5 py-2.5 rounded-xl bg-[#0066cc] hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-md"
                >
                  Return to Support Home
                </a>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
