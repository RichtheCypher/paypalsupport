import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-slate-200 text-center md:text-left">
          <div className="flex items-start space-x-3 justify-center md:justify-start">
            <ShieldCheck className="w-6 h-6 text-[#0066cc] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-slate-900 text-sm font-semibold">PayPal Buyer Protection</h4>
              <p className="text-xs text-slate-500 mt-0.5">Covering eligible purchases if an item doesn&apos;t arrive or match the description.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 justify-center md:justify-start">
            <Lock className="w-6 h-6 text-[#0066cc] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-slate-900 text-sm font-semibold">256-Bit Bank Level Encryption</h4>
              <p className="text-xs text-slate-500 mt-0.5">Your financial credentials and personal information are never shared with sellers.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 justify-center md:justify-start">
            <PhoneCall className="w-6 h-6 text-[#0066cc] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-slate-900 text-sm font-semibold">24/7 Security & Fraud Protection</h4>
              <p className="text-xs text-slate-500 mt-0.5">Automated engines continuously monitor for unauthorized activity and claims.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Support & Resolution</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/" className="hover:text-[#0066cc] transition-colors">Help Center Home</Link></li>
              <li><Link href="/disputes" className="hover:text-[#0066cc] transition-colors">Resolution Center</Link></li>
              <li><Link href="/recovery" className="hover:text-[#0066cc] transition-colors">Account Security & Recovery</Link></li>
              <li><Link href="/disputes" className="hover:text-[#0066cc] transition-colors">Report Transaction Issue</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Common Dispute Claims</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/disputes" className="hover:text-[#0066cc] transition-colors">Dispute Unauthorized Charge</Link></li>
              <li><Link href="/recovery" className="hover:text-[#0066cc] transition-colors">Reset Password & 2FA</Link></li>
              <li><Link href="/disputes" className="hover:text-[#0066cc] transition-colors">Item Not Received Claim</Link></li>
              <li><Link href="/disputes" className="hover:text-[#0066cc] transition-colors">Item Not As Described Claim</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Security & Safety</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/recovery" className="hover:text-[#0066cc] transition-colors">Security Portal</Link></li>
              <li><a href="#" className="hover:text-[#0066cc] transition-colors">Report Phishing & Spoof Emails</a></li>
              <li><a href="#" className="hover:text-[#0066cc] transition-colors">Buyer Protection Terms</a></li>
              <li><a href="#" className="hover:text-[#0066cc] transition-colors">Security Verification</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">PayPal Legal</h5>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-[#0066cc] transition-colors">Privacy Statement</a></li>
              <li><a href="#" className="hover:text-[#0066cc] transition-colors">User Agreement</a></li>
              <li><a href="#" className="hover:text-[#0066cc] transition-colors">Cookie Preferences</a></li>
              <li><a href="#" className="hover:text-[#0066cc] transition-colors">Accessibility Statement</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <span className="font-extrabold text-[#0066cc] text-base"><i>P</i>ayPal</span>
            <span>© 1999-2026 PayPal Inc. All rights reserved.</span>
          </div>
          <p className="text-center sm:text-right">
            Support Portal: Dedicated exclusively to transaction issues, claims, and security.
          </p>
        </div>

      </div>
    </footer>
  );
}
