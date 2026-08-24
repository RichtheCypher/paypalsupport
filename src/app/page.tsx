'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import ChatWidget from '@/components/ChatWidget';
import DisputeWizard from '@/components/DisputeWizard';
import { 
  Search, ShieldAlert, Lock, ArrowRight, CheckCircle, 
  ChevronRight, Sparkles, FileText, ArrowUpRight, Check, AlertCircle, RefreshCw
} from 'lucide-react';
import { POPULAR_HELP_TOPICS, MOCK_TRANSACTIONS, Transaction } from '@/data/supportData';

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredTopics = activeTab === 'all' 
    ? POPULAR_HELP_TOPICS 
    : POPULAR_HELP_TOPICS.filter(t => t.category === activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0f172a] selection:bg-blue-100">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Success Notification Banner */}
      {submittedCaseId && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 text-center text-xs font-semibold flex items-center justify-center space-x-2 animate-in slide-in-from-top duration-200">
          <Check className="w-4 h-4" />
          <span>Dispute submitted successfully. Case Reference: <strong className="font-mono">{submittedCaseId}</strong></span>
          <Link href="/disputes" className="underline ml-2 hover:text-emerald-100 font-bold">
            View in Resolution Center &rarr;
          </Link>
        </div>
      )}

      {/* Main Spacious Container */}
      <main className="max-w-4xl mx-auto w-full px-6 pt-14 pb-24 space-y-16">
        
        {/* Emil Kowalski Style Hero Header */}
        <section className="text-center space-y-5 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100/90 text-slate-600 text-[11px] font-semibold tracking-tight border border-slate-200/80">
            <Sparkles className="w-3.5 h-3.5 text-[#0066cc]" />
            <span>PayPal Transaction Support & Resolution</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.12]">
            Transaction & Support Center
          </h1>

          <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto leading-relaxed">
            Report unauthorized payments, track open claims, or resolve account security issues.
          </p>

          {/* Precision Search Launcher Bar */}
          <div className="pt-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white hover:bg-slate-50/80 border border-slate-200/90 text-slate-400 text-sm transition-all shadow-xs group cursor-pointer"
            >
              <div className="flex items-center space-x-3 text-slate-600">
                <Search className="w-4 h-4 text-[#0066cc] group-hover:scale-110 transition-transform duration-200" />
                <span className="font-normal text-xs sm:text-sm text-slate-500">Search transaction IDs, disputes, or security guides...</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <kbd className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 rounded-md">
                  ⌘K
                </kbd>
              </div>
            </button>
          </div>
        </section>

        {/* Essential Action Cards: 100% Focused on Support & Transaction Issues */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Resolution Center',
              desc: 'Track and manage your 2 active dispute claims.',
              icon: ShieldAlert,
              link: '/disputes',
              badge: '2 Active',
              highlight: true
            },
            {
              title: 'Report Issue',
              desc: 'File a claim for unauthorized or missing orders.',
              icon: AlertCircle,
              link: '/disputes',
              badge: 'Report'
            },
            {
              title: 'Account Security',
              desc: 'Reset 2FA, password, or lock compromised card.',
              icon: Lock,
              link: '/recovery',
              badge: 'Security'
            },
            {
              title: 'Buyer Protection',
              desc: 'Check full refund eligibility and claim rules.',
              icon: FileText,
              link: '/disputes',
              badge: 'Policy'
            }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <Link
                key={idx}
                href={card.link}
                className="emil-card p-5 rounded-2xl flex flex-col justify-between space-y-6 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50/80 text-[#0066cc] flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      card.highlight 
                        ? 'bg-amber-100 text-amber-900 border-amber-200'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0066cc] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-xs font-bold text-[#0066cc] group-hover:translate-x-1 transition-transform">
                  <span>Launch Tool</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </section>

        {/* Recent Activity Dispute Launcher */}
        <section className="emil-card rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Transactions</h2>
              <p className="text-xs text-slate-500 mt-0.5">Select any transaction below to initiate a claim or refund dispute.</p>
            </div>
            <Link href="/disputes" className="text-xs font-bold text-[#0066cc] hover:underline flex items-center space-x-1">
              <span>Resolution Center</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {MOCK_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="py-3.5 flex items-center justify-between hover:bg-slate-50/70 px-3 rounded-xl transition-colors">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-lg shrink-0">
                    {tx.avatar}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">{tx.merchant}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{tx.date} • <span className="font-mono text-slate-400 font-semibold">{tx.id}</span></p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">${tx.amount.toFixed(2)}</span>
                  <button
                    onClick={() => setSelectedTx(tx)}
                    className="emil-button-secondary px-3 py-1.5 rounded-xl text-[#0066cc] text-xs transition-all cursor-pointer"
                  >
                    Report Issue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clean Knowledge Base Topics */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Verified Support Guides</h2>
              <p className="text-xs text-slate-500 mt-0.5">Official step-by-step resolution documentation.</p>
            </div>

            {/* Micro Tab Filters */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Guides' },
                { id: 'disputes', label: 'Disputes & Claims' },
                { id: 'payments', label: 'Payments' },
                { id: 'security', label: 'Security & 2FA' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setIsSearchOpen(true)}
                className="emil-card p-5 rounded-2xl cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-[#0066cc] border border-blue-100">
                    {topic.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">{(topic.views / 1000).toFixed(0)}k views</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0066cc] transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {topic.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <DisputeWizard 
        transaction={selectedTx} 
        onClose={() => setSelectedTx(null)}
        onSubmitted={(caseId) => {
          setSelectedTx(null);
          setSubmittedCaseId(caseId);
        }}
      />
      <ChatWidget />
    </div>
  );
}
