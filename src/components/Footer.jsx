import React from 'react';
import { companyData } from '../data/indzitaData';
import { Mail, ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenArticle }) {
  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div style={{ maxWidth: '440px' }}>
            <div style={{ fontFamily: 'var(--font-brand)', fontSize: '1.75rem', color: 'var(--text-ink)', marginBottom: '12px' }}>
              {companyData.name}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.7 }}>
              Translating biomarker molecular signatures into early non-invasive diagnostics for Cervical Cancer, alongside microfluidic bioreactor systems.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-ink)', marginBottom: '16px', fontWeight: 700, textTransform: 'uppercase' }}>
              System Technology
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><a href="#pipeline" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Molecular Pipeline</a></li>
              <li><a href="#bioreactor" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>12-Well Organoid Bioreactor</a></li>
              <li><a href="#platform" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Automated Diagnostic Station</a></li>
              <li>
                <a 
                  href="#news" 
                  onClick={(e) => {
                    if (onOpenArticle) {
                      e.preventDefault();
                      onOpenArticle();
                    }
                  }}
                  style={{ color: 'var(--text-ink)', fontWeight: 600, textDecoration: 'none' }}
                >
                  ₹7 Cr Grant Press Release →
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Network Column */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-ink)', marginBottom: '16px', fontWeight: 700, textTransform: 'uppercase' }}>
              Institutional Network
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li><a href="https://rgcb.res.in" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>BRIC - RGCB</a></li>
              <li><a href="https://www.karkinos.in" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Karkinos Healthcare</a></li>
                            <li><a href="#team" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Leadership &amp; Advisory</a></li>
            </ul>
          </div>

          {/* Direct Communications */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-ink)', marginBottom: '16px', fontWeight: 700, textTransform: 'uppercase' }}>
              Direct Gateway
            </div>
            <a
              href={`mailto:${companyData.email}`}
              className="btn btn-secondary btn-sm"
              id="footer-email-btn"
              style={{ display: 'inline-flex' }}
            >
              <Mail size={13} />
              <span>{companyData.email}</span>
              <ArrowUpRight size={13} />
            </a>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '14px' }}>
              ENTITY: {companyData.legalName}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '14px' }}>
              Contact Number: +91 9940292503
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>{companyData.copyright}</p>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--text-ink)', fontWeight: 600 }}>
              RESEARCH GRADE CLINICAL COMPLIANCE
            </span>
            <span>SYSTEM ID: IZB-IND-2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
