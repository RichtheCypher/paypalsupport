'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ChevronRight, FileText, ArrowRight, Eye } from 'lucide-react';
import { POPULAR_HELP_TOPICS, HelpTopic } from '@/data/supportData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState<HelpTopic[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setFilteredTopics(POPULAR_HELP_TOPICS);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (!value.trim()) {
      setFilteredTopics(POPULAR_HELP_TOPICS);
      return;
    }
    const q = value.toLowerCase();
    const results = POPULAR_HELP_TOPICS.filter(
      t => t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q) || t.category.includes(q)
    );
    setFilteredTopics(results);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50/80">
          <Search className="w-5 h-5 text-[#0066cc] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search help, disputes, or security topics..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-base focus:outline-hidden"
          />
          {query && (
            <button 
              onClick={() => { setQuery(''); setFilteredTopics(POPULAR_HELP_TOPICS); }}
              className="p-1 text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-slate-500 bg-slate-200 rounded-lg hover:bg-slate-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Quick Tag Suggestions */}
        <div className="px-4 py-2 bg-slate-100/60 border-b border-slate-200/60 flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-slate-500 shrink-0 font-medium">Popular Tags:</span>
          {['Refund', 'Dispute', 'Unauthorized', 'Locked Account', 'Subscription'].map(tag => (
            <button
              key={tag}
              onClick={() => {
                setQuery(tag);
                const q = tag.toLowerCase();
                setFilteredTopics(POPULAR_HELP_TOPICS.filter(t => t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q)));
              }}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-[#0066cc] transition-colors shrink-0"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-4 space-y-3">
          {filteredTopics.length === 0 ? (
            <div className="text-center py-10">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 font-medium">No direct matching articles found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for broader keywords like &quot;Dispute&quot; or &quot;Password&quot;
              </p>
              <Link
                href="/disputes"
                onClick={onClose}
                className="inline-flex items-center space-x-2 mt-4 px-4 py-2 rounded-xl bg-[#0066cc] text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
              >
                <span>Go to Resolution Center</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={onClose}
                className="group p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-3">
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-100 text-blue-700 mb-1.5">
                      {topic.category}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#0066cc] transition-colors">
                      {topic.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {topic.summary}
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0 space-y-1">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transform group-hover:translate-x-0.5 transition-all" />
                    <span className="text-[10px] text-slate-400 flex items-center space-x-0.5">
                      <Eye className="w-3 h-3 mr-0.5" />
                      {(topic.views / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Need to file a transaction claim?</span>
          <Link 
            href="/disputes"
            onClick={onClose}
            className="text-[#0066cc] font-bold hover:underline flex items-center space-x-1"
          >
            <span>Open Dispute Manager</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
