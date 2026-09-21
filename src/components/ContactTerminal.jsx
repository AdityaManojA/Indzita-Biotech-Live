import React, { useState } from 'react';
import { Mail, Check, Copy, Send } from 'lucide-react';
import { companyData } from '../data/indzitaData';

export default function ContactTerminal() {
  const [copied, setCopied] = useState(false);
  const [inquiryType, setInquiryType] = useState('Research Collaboration');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(companyData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[IndZita Inquiry] ${inquiryType}`);
    const body = encodeURIComponent(
      `Hello IndZita Biotech Team,\n\nI am contacting your team regarding: ${inquiryType}.\n\nLooking forward to discussing clinical validation or equipment procurement.\n\nBest regards,`
    );
    return `mailto:${companyData.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="section" id="contact" style={{ borderBottom: '1px solid var(--border-hairline)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <div className="editorial-card contact-terminal-card" style={{ textAlign: 'center' }}>
          <div className="index-tag" style={{ margin: '0 auto 16px' }}>
            Direct Communications Gateway
          </div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '14px', letterSpacing: '-0.03em' }}>
            Partner with IndZita Biotech
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto 32px', fontSize: '1.02rem', lineHeight: 1.7 }}>
            For inquiries regarding clinical diagnostic trials, multi-center oncology screening cohorts, or custom 12-well organoid bioreactor engineering:
          </p>

          {/* Clean Category Selector */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {['Research Collaboration', 'Bioreactor Procurement', 'Clinical Trial Participation', 'Investor Relations'].map((type) => (
              <button
                key={type}
                className={`btn btn-sm ${inquiryType === type ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setInquiryType(type)}
                style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="contact-actions-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <a 
              href={getMailtoUrl()}
              className="btn btn-primary"
              id="btn-mailto-cta"
            >
              <Send size={15} />
              <span>Connect via Email</span>
            </a>

            <button 
              className="btn btn-secondary" 
              onClick={handleCopyEmail}
              id="btn-copy-email"
              title="Copy direct email address"
            >
              {copied ? <Check size={15} color="var(--text-ink)" /> : <Copy size={15} />}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem' }}>
                {copied ? 'COPIED TO CLIPBOARD' : companyData.email}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
