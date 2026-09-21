import React, { useState } from 'react';
import { workflowSteps } from '../data/indzitaData';
import { ArrowLeft, ArrowRight, Play, Compass, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import SplinePhaseBrowser from './SplinePhaseBrowser';
import { PhaseCurveThumb, PhaseCurveViewer } from './PhaseGraphicCurves';

export default function MolecularPipeline({ onOpenSimulator }) {
  const [viewMode, setViewMode] = useState('3d'); // '3d' (Spline space) or '2d' (Editorial specs)
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = workflowSteps[activeStepIndex];

  return (
    <section className="section" id="pipeline" style={{ borderBottom: '1px solid var(--border-hairline)' }}>
      <div className="container">
        {/* Section Lead & View Mode Switch */}
        <div className="pipeline-header-row">
          <div className="section-lead" style={{ marginBottom: 0 }}>
            <div className="index-tag">02 // Molecular Workflow Pipeline</div>
            <h2>
              Translating piRNA Biomarkers into Early Non-Invasive Diagnostics
            </h2>
            <p>
              An end-to-end clinical workflow engineered to isolate, amplify, and quantify 26–32 nucleotide small non-coding RNA without requiring invasive tissue biopsy.
            </p>
          </div>

          {/* View Mode Toggle: 3D Spline vs 2D Editorial */}
          <div className="view-mode-toggle" id="pipeline-view-mode-toggle">
            <button
              className={`view-mode-btn ${viewMode === '3d' ? 'active' : ''}`}
              onClick={() => setViewMode('3d')}
              id="btn-view-3d-spline"
              title="Explore 5 phases in 3D Spline Space"
            >
              <Compass size={14} />
              <span>3D Spline Space</span>
            </button>
            <button
              className={`view-mode-btn ${viewMode === '2d' ? 'active' : ''}`}
              onClick={() => setViewMode('2d')}
              id="btn-view-2d-specs"
              title="View clinical spec sheet and photography"
            >
              <FileText size={14} />
              <span>2D Editorial View</span>
            </button>
          </div>
        </div>

        {/* 3D Spline Phase Browser Mode */}
        {viewMode === '3d' ? (
          <SplinePhaseBrowser 
            activeStepIndex={activeStepIndex}
            setActiveStepIndex={setActiveStepIndex}
            onOpenSimulator={onOpenSimulator}
          />
        ) : (
          /* 2D Editorial Spec Mode */
          <div>
            {/* Mobile View: Single Current Phase Navigator */}
            <div className="mobile-phase-current-bar">
              <button 
                className="mobile-phase-arrow-btn"
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                aria-label="Previous Phase"
                id="mobile-2d-phase-prev"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="mobile-phase-info">
                <span className="mobile-phase-count">PHASE 0{activeStepIndex + 1} OF 05</span>
                <span className="mobile-phase-title">{activeStep.title}</span>
                <div className="mobile-phase-dots">
                  {workflowSteps.map((_, dotIdx) => (
                    <span 
                      key={dotIdx} 
                      className={`mobile-phase-dot ${activeStepIndex === dotIdx ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>

              <button 
                className="mobile-phase-arrow-btn"
                disabled={activeStepIndex === workflowSteps.length - 1}
                onClick={() => setActiveStepIndex(prev => Math.min(workflowSteps.length - 1, prev + 1))}
                aria-label="Next Phase"
                id="mobile-2d-phase-next"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Minimalist 5-Step Rail with Phase Thumbnails (Desktop only, hidden on mobile) */}
            <div className="pipeline-step-rail" role="tablist">
              {workflowSteps.map((step, idx) => (
                <button
                  key={step.id}
                  role="tab"
                  aria-selected={activeStepIndex === idx}
                  className={`pipeline-step-tab ${activeStepIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveStepIndex(idx)}
                  id={`pipeline-step-tab-${idx + 1}`}
                >
                  <div className="step-rail-thumb">
                    <PhaseCurveThumb phaseIndex={idx} isActive={activeStepIndex === idx} />
                  </div>
                  <div className="step-index-mono">PHASE 0{idx + 1}</div>
                  <div className="step-label">{step.title}</div>
                </button>
              ))}
            </div>

            {/* Editorial Viewer Grid */}
            <div className="pipeline-viewer-grid" id="pipeline-viewer-grid">
              <div className="pipeline-img-frame">
                <PhaseCurveViewer phaseIndex={activeStepIndex} isPip={false} />
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {activeStep.category}
                </div>
                <h3 style={{ fontSize: '2rem', marginBottom: '14px', color: 'var(--text-ink)' }}>{activeStep.title}</h3>
                <p style={{ color: 'var(--text-body)', fontSize: '1.02rem', lineHeight: '1.75' }}>
                  {activeStep.fullDesc}
                </p>

                {/* Clean Editorial Table for Metrics */}
                <table className="spec-sheet-table">
                  <tbody>
                    {activeStep.keyMetrics.map((km, i) => (
                      <tr key={i}>
                        <td className="label-cell">{km.label}</td>
                        <td className="val-cell">{km.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Stepper Navigation Controls */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="btn btn-secondary btn-sm"
                      disabled={activeStepIndex === 0}
                      onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                      style={{ opacity: activeStepIndex === 0 ? 0.3 : 1 }}
                      id="pipeline-prev-btn"
                    >
                      <ArrowLeft size={14} />
                      <span>Previous</span>
                    </button>

                    <button 
                      className="btn btn-secondary btn-sm"
                      disabled={activeStepIndex === workflowSteps.length - 1}
                      onClick={() => setActiveStepIndex(prev => Math.min(workflowSteps.length - 1, prev + 1))}
                      style={{ opacity: activeStepIndex === workflowSteps.length - 1 ? 0.3 : 1 }}
                      id="pipeline-next-btn"
                    >
                      <span>Next Phase</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={onOpenSimulator}
                    id="pipeline-sim-trigger-btn"
                  >
                    <Play size={12} fill="currentColor" />
                    <span>Simulate Phase in Lab</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
