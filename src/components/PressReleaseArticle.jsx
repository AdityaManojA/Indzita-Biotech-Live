import React, { useEffect, useState } from 'react';
import { pressArticleData, companyData } from '../data/indzitaData';
import { 
  ArrowLeft, 
  Share2, 
  Printer, 
  Check, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Award, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Activity, 
  ChevronRight,
  Play
} from 'lucide-react';

export default function PressReleaseArticle({ onBackToHome, onOpenSimulator }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const originalTitle = document.title;
    document.title = `${pressArticleData.headline} — IndZita Biotech Press`;
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: pressArticleData.headline,
        text: pressArticleData.subheadline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="article-page" id="press-release-article" itemScope itemType="https://schema.org/NewsArticle">
      {/* Top Header Sticky Bar / Breadcrumb */}
      <div className="article-topbar">
        <div className="container article-topbar-inner">
          <button 
            onClick={onBackToHome} 
            className="article-back-btn" 
            id="btn-article-back"
            aria-label="Return to IndZita Homepage"
          >
            <ArrowLeft size={15} />
            <span>Return to Platform</span>
          </button>

          <nav className="article-breadcrumbs" aria-label="Breadcrumb">
            <span onClick={onBackToHome} style={{ cursor: 'pointer' }}>Home</span>
            <ChevronRight size={12} />
            <span>Press Desk</span>
            <ChevronRight size={12} />
            <span className="current">MAHA MedTech Grant</span>
          </nav>

          <div className="article-topbar-actions">
            <button 
              onClick={handleShare} 
              className="btn btn-secondary btn-sm"
              title="Share Press Release"
              id="btn-share-article"
            >
              {copied ? <Check size={13} color="#10b981" /> : <Share2 size={13} />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
            <button 
              onClick={() => window.print()} 
              className="btn btn-secondary btn-sm"
              title="Print Article"
              id="btn-print-article"
            >
              <Printer size={13} />
              <span>Print</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container article-main-container">
        {/* Category & Grant Tag Header */}
        <header className="article-header">
          <div className="article-meta-tags">
            <span className="article-tag-primary">BREAKING NEWS // GRANT DISCLOSURE</span>
            <span className="article-tag-secondary">MAHA MEDTECH MISSION</span>
            <span className="article-tag-secondary">ANRF • ICMR • GATES FOUNDATION</span>
          </div>

          <h1 className="article-h1" itemProp="headline">
            {pressArticleData.headline}
          </h1>

          <p className="article-lead-p" itemProp="description">
            {pressArticleData.subheadline}
          </p>

          <div className="article-byline-strip">
            <div className="byline-item">
              <MapPin size={14} className="byline-icon" />
              <span itemProp="contentLocation">{pressArticleData.dateline}</span>
            </div>
            <div className="byline-item">
              <Calendar size={14} className="byline-icon" />
              <time dateTime={pressArticleData.isoDate} itemProp="datePublished">{pressArticleData.date}</time>
            </div>
            <div className="byline-item">
              <Clock size={14} className="byline-icon" />
              <span>{pressArticleData.readTime}</span>
            </div>
            <div className="byline-item">
              <Award size={14} className="byline-icon" />
              <span style={{ fontWeight: 700, color: 'var(--text-ink)' }}>{pressArticleData.grantAmount} Granted</span>
            </div>
          </div>
        </header>

        {/* Highlight Metrics Strip */}
        <section className="article-stats-grid" aria-label="Key Milestone Metrics">
          {pressArticleData.stats.map((stat, idx) => (
            <div key={idx} className="article-stat-card">
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-desc">{stat.desc}</div>
            </div>
          ))}
        </section>

        {/* Lead Quote Editorial Block */}
        <div className="article-quote-block">
          <p className="quote-text">{pressArticleData.leadQuote}</p>
          <div className="quote-author">— {pressArticleData.leadQuoteAuthor}</div>
        </div>

        {/* Article Body Content */}
        <div className="article-body-prose" itemProp="articleBody">
          <p className="article-p drop-cap">
            <strong>THIRUVANANTHAPURAM:</strong> A simple blood test that can flag early signs of cervical
            cancer within minutes without the need for a biopsy or a trained technician is being
            developed by researchers at the <strong>BRIC-Rajiv Gandhi Centre for Biotechnology (BRIC-RGCB)</strong> here,
            in a project that has bagged a <strong>₹7 crore grant</strong> from the prestigious <strong>MAHA MedTech Mission</strong> launched
            jointly by the <strong>Anusandhan National Research Foundation (ANRF)</strong>, the <strong>Indian Council of Medical Research (ICMR)</strong>,
            and the <strong>Bill &amp; Melinda Gates Foundation</strong>.
          </p>

          <p className="article-p">
            The project is being carried out at BRIC-RGCB in multi-stakeholder collaboration with start-up
            <strong> IndZita Biotech Private Limited</strong>, Thiruvananthapuram, and <strong>Karkinos Healthcare Private Limited</strong>,
            Mumbai, uniting academic discovery with advanced biomedical device fabrication and nationwide clinical oncology trial infrastructure.
          </p>

          <h2 className="article-h2">Nanoscale Nanopore Sensing: How the Automated Blood Test Works</h2>

          <p className="article-p">
            The fully automated device works by detecting a novel <strong>piRNA-based biomarker in peripheral blood</strong>,
            and measuring it using cutting-edge <strong>nanopore technology</strong>—a highly sensitive method capable of resolving
            individual molecules at the nanoscale through discrete electrical resistive-pulse signatures.
          </p>

          <p className="article-p">
            Unlike conventional screening methods such as Pap smears, pelvic examinations, or invasive surgical biopsies,
            the process requires only a routine blood sample and <strong>zero specialized clinical or technical training to operate</strong>.
            The point-of-care station automates fluid handling, biomarker isolation, and nanoscale optical and electrical readout in a self-contained, hermetically sealed cartridge.
          </p>

          <div className="article-quote-block" style={{ margin: '36px 0' }}>
            <p className="quote-text">{pressArticleData.secondQuote}</p>
            <div className="quote-author">— {pressArticleData.secondQuoteAuthor}</div>
          </div>

          <h2 className="article-h2">Solving India's Cervical Cancer Screening Crisis</h2>

          <p className="article-p">
            Cervical cancer remains among the most common and fatal malignancies affecting women across India,
            claiming over 77,000 lives annually. Oncologists and public health specialists emphasize that <strong>early detection
            drastically improves 5-year survival rates to over 90%</strong>. However, uptake of existing screening protocols remains critically low:
          </p>

          <ul className="article-feature-list">
            <li>
              <strong>Eliminating Invasive Barriers:</strong> Conventional Pap smears and pelvic examinations cause significant discomfort, pain, and socio-cultural hesitation, preventing millions of asymptomatic women from seeking routine screening.
            </li>
            <li>
              <strong>Decentralizing Outside Tier-1 Hospitals:</strong> Conventional cytopathology demands qualified gynecologists, certified cytopathologists, and complex laboratory cold-chains—resources virtually absent in primary health centers (PHCs) and rural communities.
            </li>
            <li>
              <strong>Rapid Point-of-Care Turnaround:</strong> While traditional laboratory biopsies require 3 to 14 days for histology review, the IndZita-RGCB nanopore automated platform yields verified diagnostic outputs within minutes.
            </li>
          </ul>

          {/* Comparative Table: Conventional vs IndZita */}
          <h2 className="article-h2">Diagnostic Paradigm Shift: Conventional vs. Nanopore Blood Test</h2>
          
          <div className="article-table-container">
            <table className="article-comparison-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Parameter</th>
                  <th style={{ width: '37%' }}>Conventional Screening (Pap / Biopsy)</th>
                  <th style={{ width: '38%' }}>IndZita &amp; RGCB Nanopore Platform</th>
                </tr>
              </thead>
              <tbody>
                {pressArticleData.comparisonTable.map((row, i) => (
                  <tr key={i}>
                    <td className="param-cell">{row.parameter}</td>
                    <td className="conv-cell">{row.conventional}</td>
                    <td className="indzita-cell">
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span>{row.indzita}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="article-h2">Patent Status, Preclinical Validation &amp; Prototype Development</h2>

          <p className="article-p">
            The core molecular detection and nanopore integration technologies have been <strong>patented</strong>.
            The assay has completed rigorous lab-scale validation in human cell cultures and animal models, and a <strong>pilot study using
            human blood samples has already been successfully concluded at laboratory scale</strong>, the researchers confirmed.
          </p>

          <p className="article-p">
            With the ₹7 crore funding from the MAHA MedTech Mission, work on an early-stage automated clinical prototype of the diagnostic device
            is now vigorously under way in Thiruvananthapuram, transitioning the breakthrough from bench to bedside.
          </p>

          <h2 className="article-h2">Principal Investigators &amp; Institutional Consortium</h2>

          <p className="article-p">
            The collaborative project brings together leading scientific institutions and industry pioneers:
          </p>

          <div className="article-team-cards">
            {pressArticleData.investigators.map((inv, i) => (
              <div key={i} className="article-team-card">
                <div className="team-monogram">{inv.name.replace('Dr. ', '').split(' ').map(p => p[0]).join('').substring(0, 2)}</div>
                <div>
                  <h3 className="team-name">{inv.name}</h3>
                  <div className="team-role">{inv.role}</div>
                  <div className="team-spec">{inv.specialty}</div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="article-h3" style={{ marginTop: '36px' }}>Consortium Partners</h3>
          <div className="article-partners-strip">
            {pressArticleData.consortium.map((part, i) => (
              <a key={i} href={part.url} target="_blank" rel="noreferrer" className="article-partner-badge">
                <div>
                  <div className="partner-name">{part.name}</div>
                  <div className="partner-role">{part.role} • {part.location}</div>
                </div>
                <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Interactive CTA Strip */}
        <footer className="article-cta-box">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
              INTERACTIVE DEMONSTRATION
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-ink)', marginBottom: '6px' }}>
              Experience the Automated Molecular Pipeline
            </h3>
            <p style={{ color: 'var(--text-body)', fontSize: '0.88rem', maxWidth: '520px' }}>
              Simulate raw specimen loading, microfluidic cassette docking, and real-time qPCR curve telemetry inside our Virtual Lab.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              onClick={onOpenSimulator} 
              className="btn btn-primary"
              id="btn-article-launch-sim"
            >
              <Play size={13} fill="currentColor" />
              <span>Launch Virtual Lab</span>
            </button>
            <button 
              onClick={onBackToHome} 
              className="btn btn-secondary"
            >
              <span>Explore All Hardware</span>
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
}
