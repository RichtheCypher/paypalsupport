'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import ChatWidget from '@/components/ChatWidget';
import DisputeWizard from '@/components/DisputeWizard';
import { 
  ShieldAlert, Clock, CheckCircle2, AlertCircle, FileText, ChevronRight, 
  MessageSquare, PlusCircle, ArrowLeft, RefreshCw, Upload, FileCheck
} from 'lucide-react';
import { MOCK_DISPUTES, DisputeCase, MOCK_TRANSACTIONS, Transaction } from '@/data/supportData';

export default function DisputesPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [disputes, setDisputes] = useState<DisputeCase[]>(MOCK_DISPUTES);
  const [activeCase, setActiveCase] = useState<DisputeCase | null>(disputes[0] || null);
  const [selectedTxForWizard, setSelectedTxForWizard] = useState<Transaction | null>(null);
  
  // Interactive response state
  const [userResponseText, setUserResponseText] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [responseSubmitted, setResponseSubmitted] = useState(false);

  const handleResponseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userResponseText.trim() || !activeCase) return;
    setIsResponding(true);
    
    setTimeout(() => {
      setIsResponding(false);
      setResponseSubmitted(true);
      
      // Update case status locally
      setDisputes(prev => prev.map(c => {
        if (c.id === activeCase.id) {
          return {
            ...c,
            status: 'Under Review',
            steps: c.steps.map((s, idx) => idx === 2 ? { ...s, completed: true, date: 'Submitted Today' } : s)
          };
        }
        return c;
      }));

      setActiveCase(prev => prev ? {
        ...prev,
        status: 'Under Review',
        steps: prev.steps.map((s, idx) => idx === 2 ? { ...s, completed: true, date: 'Submitted Today' } : s)
      } : null);

    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Header */}
      <section className="bg-white text-slate-900 border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#0066cc] uppercase tracking-widest block mb-1">
              Resolution Center
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Claims & Dispute Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Track open case progress, submit merchant responses, or file new claims for unauthorized purchases.
            </p>
          </div>
          <button
            onClick={() => setSelectedTxForWizard(MOCK_TRANSACTIONS[0])}
            className="px-5 py-2.5 rounded-xl bg-[#0066cc] text-white font-bold text-xs hover:bg-blue-700 transition-all flex items-center space-x-2 shadow-sm self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report New Transaction</span>
          </button>
        </div>
      </section>

      {/* Main Resolution Center Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Active Cases Sidebar */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>Your Active Cases ({disputes.length})</span>
              </h2>
              <span className="text-xs text-slate-500">Updated Real-Time</span>
            </div>

            <div className="space-y-3">
              {disputes.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveCase(c);
                    setResponseSubmitted(false);
                    setUserResponseText('');
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    activeCase?.id === c.id
                      ? 'border-[#0066cc] bg-white shadow-lg ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 font-bold">{c.id}</span>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">{c.merchant}</h3>
                    </div>
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                      c.status === 'Action Required' ? 'bg-amber-100 text-amber-800' :
                      c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {c.status}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2.5">
                    <span>Filed: {c.dateFiled}</span>
                    <span className="font-extrabold text-slate-900">{c.amount}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Buyer Protection Guarantee Notice */}
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 text-xs space-y-2">
              <h4 className="font-bold text-blue-950 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>PayPal Buyer Protection Active</span>
              </h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                If your purchase was unauthorized or never delivered, you are covered up to full purchase price plus original shipping costs.
              </p>
            </div>
          </div>

          {/* Case Detailed Inspector Panel */}
          <div className="lg:col-span-7">
            {activeCase ? (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-6">
                
                {/* Case Header Details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 font-mono">Case Reference #{activeCase.id}</span>
                    <h2 className="text-xl font-black text-slate-900">{activeCase.merchant}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Reason: {activeCase.reason}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-2xl font-black text-[#0066cc]">{activeCase.amount}</p>
                    <p className="text-[11px] text-slate-400">Est. Resolution: {activeCase.estimatedResolution}</p>
                  </div>
                </div>

                {/* Progress Steps Timeline */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Case Timeline & Status</h3>
                  
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                    {activeCase.steps.map((step, idx) => (
                      <div key={idx} className="relative flex items-start space-x-3">
                        <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                          step.completed
                            ? 'bg-[#0066cc] text-white ring-4 ring-blue-100'
                            : 'bg-slate-200 text-slate-400'
                        }`}>
                          {step.completed ? '✓' : idx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className={`text-xs font-bold ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                            {step.title}
                          </h4>
                          {step.date && (
                            <p className="text-[11px] text-slate-400 mt-0.5">{step.date}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Required Box if status is Action Required */}
                {activeCase.status === 'Action Required' && !responseSubmitted && (
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-amber-900">Clarification Needed from Buyer</h4>
                        <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                          The merchant states the package was dropped off at local carrier. Please specify if you checked with neighbors or need us to contact carrier directly.
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleResponseSubmit} className="space-y-3 pt-2">
                      <textarea
                        rows={3}
                        required
                        value={userResponseText}
                        onChange={(e) => setUserResponseText(e.target.value)}
                        placeholder="Provide details or tracking updates for PayPal claims agent..."
                        className="w-full px-3 py-2 text-xs bg-white border border-amber-300 rounded-xl text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isResponding || !userResponseText.trim()}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-xs shadow-md transition-colors"
                        >
                          {isResponding ? 'Sending Response...' : 'Submit Clarification'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {responseSubmitted && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Your response has been added to Case #{activeCase.id}. Our specialists will review within 24 hours.</span>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
                <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-500">Select a case from the sidebar to inspect details</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <DisputeWizard 
        transaction={selectedTxForWizard} 
        onClose={() => setSelectedTxForWizard(null)}
        onSubmitted={(newCaseId) => {
          setSelectedTxForWizard(null);
          // Add new case dynamically
          const newCase: DisputeCase = {
            id: newCaseId,
            transactionId: selectedTxForWizard?.id || 'PP-CUSTOM',
            merchant: selectedTxForWizard?.merchant || 'Disputed Merchant',
            amount: `$${selectedTxForWizard?.amount.toFixed(2) || '0.00'} USD`,
            dateFiled: 'Today',
            status: 'Under Review',
            reason: 'Unauthorized Transaction',
            estimatedResolution: 'Within 7 business days',
            steps: [
              { title: 'Case Opened', completed: true, date: 'Today' },
              { title: 'Merchant Notified', completed: true, date: 'Today' },
              { title: 'PayPal Review in Progress', completed: false },
              { title: 'Final Resolution', completed: false }
            ]
          };
          setDisputes(prev => [newCase, ...prev]);
          setActiveCase(newCase);
        }}
      />
      <ChatWidget />
    </div>
  );
}
