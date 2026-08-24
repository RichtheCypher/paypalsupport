'use client';

import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, FileCheck, Upload } from 'lucide-react';
import { Transaction } from '@/data/supportData';

interface DisputeWizardProps {
  transaction: Transaction | null;
  onClose: () => void;
  onSubmitted: (caseId: string) => void;
}

export default function DisputeWizard({ transaction, onClose, onSubmitted }: DisputeWizardProps) {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState('unauthorized');
  const [description, setDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!transaction) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedCaseId = `CASE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      onSubmitted(generatedCaseId);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#0066cc]" />
            <h3 className="font-bold text-slate-900 text-base">File a Dispute / Claim</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Transaction Summary Card */}
        <div className="mx-6 mt-4 p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{transaction.avatar}</span>
            <div>
              <p className="text-xs font-semibold text-blue-950">{transaction.merchant}</p>
              <p className="text-[11px] text-slate-500">ID: {transaction.id} • {transaction.date}</p>
            </div>
          </div>
          <span className="font-bold text-sm text-slate-900">
            ${transaction.amount.toFixed(2)} {transaction.currency}
          </span>
        </div>

        {/* Multi-step Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-900">
                1. What issue are you experiencing with this payment?
              </h4>
              
              <div className="space-y-2.5">
                {[
                  { id: 'unauthorized', label: 'I did not authorize this purchase', desc: 'Someone else may have accessed your account without permission.' },
                  { id: 'not_received', label: 'I did not receive the item or service', desc: 'The merchant has not delivered the order or provided tracking.' },
                  { id: 'not_as_described', label: 'Item is significantly not as described', desc: 'The item arrived damaged, defective, or missing components.' },
                  { id: 'duplicate', label: 'Duplicate charge or wrong amount', desc: 'You were charged twice or billed more than agreed.' }
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-start p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      reason === opt.id
                        ? 'border-[#0066cc] bg-blue-50/80 ring-1 ring-blue-500/50'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="dispute_reason"
                      checked={reason === opt.id}
                      onChange={() => setReason(opt.id)}
                      className="mt-1 text-[#0066cc] focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <p className="text-xs font-semibold text-slate-900">{opt.label}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-[#0066cc] hover:bg-blue-700 text-white font-semibold text-xs flex items-center space-x-1.5 transition-colors shadow-md"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-900">
                2. Provide additional context & optional proof
              </h4>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Describe what happened (required)
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain why you are disputing this transaction. Include details like order attempts, merchant communications, or receipts."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              {/* Upload simulation */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Attach Screenshots or Receipts (optional)
                </label>
                <div 
                  onClick={() => setUploadedFile('Receipt_Screenshot_Aug2026.png')}
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center cursor-pointer hover:border-[#0066cc] transition-colors bg-slate-50/50"
                >
                  {uploadedFile ? (
                    <div className="flex items-center justify-center space-x-2 text-xs text-emerald-600 font-semibold">
                      <FileCheck className="w-4 h-4" />
                      <span>{uploadedFile} Attached</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <Upload className="w-5 h-5 text-slate-400" />
                      <span className="text-xs text-slate-600">Click to attach image or PDF file</span>
                      <span className="text-[10px] text-slate-400">Max size 10MB</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !description.trim()}
                  className="px-6 py-2.5 rounded-xl bg-[#0066cc] hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs flex items-center space-x-1.5 transition-colors shadow-md"
                >
                  {isSubmitting ? (
                    <span>Submitting Claim...</span>
                  ) : (
                    <>
                      <span>Submit Claim to PayPal</span>
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

      </div>
    </div>
  );
}
