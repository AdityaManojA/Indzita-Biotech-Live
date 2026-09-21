import React from 'react';
import { Play, ArrowRight, ChevronRight, Dna, ShieldCheck, Sparkles } from 'lucide-react';
import { companyData } from '../data/indzitaData';
import GenomicAsciiCanvas from './GenomicAsciiCanvas';
import { motion } from 'motion/react';

export default function Hero({ onOpenSimulator }) {
  const promiseItems = [
    {
      title: 'Non-Invasive',
      desc: 'Painless liquid biopsy preserving fragile 26–32nt small RNAs without surgical biopsy.'
    },
    {
      title: 'Dual Panels',
      desc: 'Simultaneously profiles early biomarkers for Cervical Cancer and Parkinson’s disease.'
    },
    {
      title: 'Organoid Culture',
      desc: 'Speed-controlled constant micro-stirring custom-engineered for 12-well culture plates.'
    },
    {
      title: 'Closed Automated',
      desc: 'Proprietary magnetic bead & silica membrane purification with zero carryover.'
    },
    {
      title: 'Clinical AI',
      desc: 'Cycle threshold (Ct) quantification validated against multi-center cohorts.'
    }
  ];

  return (
    <section className="fresh-hero-section" id="overview">
      {/* Interactive Generative ASCII Genomic Backdrop (motion.dev signature) */}
      <GenomicAsciiCanvas />

      <div className="hero-content-layer">
        <div className="container">
          {/* Header Metadata Ribbon */}
          <div className="fresh-hero-meta-row">
            <div className="meta-tag-pill">
              <span className="meta-dot"></span>
              <span>CLINICAL PARTNERS: RGCB • KARKINOS • NIMHANS</span>
            </div>
            <div className="meta-version-tag">
              <span>piRNA PLATFORM // EST. 2026</span>
            </div>
          </div>

          {/* Motion.dev style Stark Hero Title */}
          <div className="fresh-hero-title-group">
            <h1 className="fresh-hero-h1">
              <em>IndZita.</em>
              <span className="fresh-hero-h1-subline">
                Translating piRNA Biomarkers <br />
                into Early Non-Invasive Diagnostics.
              </span>
            </h1>

            <p className="fresh-hero-dek">
              {companyData.heroDescription}
            </p>

            {/* Dual CTA Actions with Motion.dev Signature Rolling Text Effect */}
            <div className="fresh-hero-cta-row">
              <button 
                className="fresh-primary-action" 
                onClick={onOpenSimulator}
                id="hero-launch-sim-btn"
              >
                <span className="fresh-rolling-text">
                  <span className="fresh-rolling-text-copy">
                    <Play size={13} fill="currentColor" style={{ marginRight: '8px', verticalAlign: '-1px' }} />
                    Launch Virtual Lab
                  </span>
                  <span className="fresh-rolling-text-copy fresh-rolling-text-copy--incoming">
                    <Play size={13} fill="currentColor" style={{ marginRight: '8px', verticalAlign: '-1px' }} />
                    Launch Virtual Lab
                  </span>
                </span>
                <ChevronRight size={14} className="fresh-action-arrow" />
              </button>

              <a 
                href="#pipeline" 
                className="fresh-secondary-action" 
                id="hero-explore-btn"
              >
                <span className="fresh-rolling-text">
                  <span className="fresh-rolling-text-copy">
                    Browse 3D Spline Pipeline
                  </span>
                  <span className="fresh-rolling-text-copy fresh-rolling-text-copy--incoming">
                    Browse 3D Spline Pipeline
                  </span>
                </span>
                <ArrowRight size={14} className="fresh-action-arrow" />
              </a>
            </div>
          </div>

          {/* motion.dev 5-Column Technical Rule Grid */}
          <dl className="fresh-rule-grid home-promise-grid" data-columns="5">
            {promiseItems.map((item, idx) => (
              <div key={idx} className="promise-grid-cell">
                <dt>
                  <span className="promise-num">0{idx + 1}</span>
                  {item.title}
                </dt>
                <dd>{item.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
