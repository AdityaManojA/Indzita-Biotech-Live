import React from 'react';
import { institutionalPartners } from '../data/indzitaData';
import { ArrowUpRight } from 'lucide-react';

export default function InstitutionalNetwork() {
  return (
    <section className="section" id="partners" style={{ borderBottom: '1px solid var(--border-hairline)' }}>
      <div className="container">
        {/* Section Lead */}
        <div className="section-lead">
          <div className="index-tag">05 // Institutional Network</div>
          <h2>Institutional Collaborators</h2>
          <p>
            Engaged in clinical cohorts, biomarker discovery, and multi-center clinical trial validation with India's premier medical research bodies.
          </p>
        </div>

        {/* 3-Column Minimalist Gallery Grid */}
        <div className="partners-gallery-grid">
          {institutionalPartners.map((partner, idx) => (
            <a 
              key={idx}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-gallery-item"
              id={`partner-card-${idx}`}
              title={`Visit ${partner.name} Official Portal`}
            >
              <div className="partner-logo-container">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} Logo`}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '6px' }}>
                INSTITUTION 0{idx + 1}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{partner.name}</h3>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-ink)', marginBottom: '12px', fontWeight: 600 }}>
                {partner.role}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                {partner.highlight}
              </p>

              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-ink)', fontWeight: 600 }}>
                <span>VISIT PORTAL</span>
                <ArrowUpRight size={13} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
