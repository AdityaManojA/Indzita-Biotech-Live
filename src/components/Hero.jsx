import React from 'react';
import { Play, ArrowRight, ChevronRight, Dna, ShieldCheck, Sparkles } from 'lucide-react';
import { companyData } from '../data/indzitaData';
import GenomicAsciiCanvas from './GenomicAsciiCanvas';
import { motion } from 'motion/react';

export default function Hero({ onOpenSimulator }) {
  return (
    <section className="fresh-hero-section" id="overview">
      {/* Interactive Generative ASCII Genomic Backdrop (motion.dev signature) */}
      <GenomicAsciiCanvas />

      <div className="hero-content-layer">
        <div className="container">
          {/* Header Metadata Ribbon */}
          <div className="fresh-hero-meta-row">
            <div className="meta-version-tag">
              <span>BIOMARKER PLATFORM // EST. 2026</span>
            </div>
          </div>

          {/* Motion.dev style Stark Hero Title */}
          <div className="fresh-hero-title-group">
            <h1 className="fresh-hero-h1">
              <em>IndZita</em>
              <span className="fresh-hero-h1-subline">
                Translating Biomarkers <br />
                into Early Non-Invasive Diagnostics
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
                    Launch Diagnostic Simulator
                  </span>
                  <span className="fresh-rolling-text-copy fresh-rolling-text-copy--incoming">
                    <Play size={13} fill="currentColor" style={{ marginRight: '8px', verticalAlign: '-1px' }} />
                    Launch Diagnostic Simulator
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
                    Explore Detection Pipeline
                  </span>
                  <span className="fresh-rolling-text-copy fresh-rolling-text-copy--incoming">
                    Explore Detection Pipeline
                  </span>
                </span>
                <ArrowRight size={14} className="fresh-action-arrow" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}