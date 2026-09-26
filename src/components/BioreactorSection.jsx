import React, { useState } from 'react';
import { bioreactorData } from '../data/indzitaData';
import { RotateCw, Check, Maximize2, X } from 'lucide-react';

export default function BioreactorSection() {
  const [rpm, setRpm] = useState(65);
  const [isRunning, setIsRunning] = useState(true);
  const [inspectModal, setInspectModal] = useState(null);

  const getFluidStatus = (val) => {
    if (val < 40) return "Gentle Micro-Perfusion (Low Shear)";
    if (val <= 120) return "Optimal Organoid Suspension (Standard)";
    return "High-Velocity Perfusion Agitation";
  };

  return (
    <section className="section" id="bioreactor" style={{ borderBottom: '1px solid var(--border-hairline)' }}>
      <div className="container">
        {/* Section Lead */}
        <div className="section-lead">
          <div className="index-tag">03 // Custom Hardware Engineering</div>
          <h2>{bioreactorData.title}</h2>
          <p>{bioreactorData.description}</p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="bioreactor-editorial-grid">
          {/* Unit 1: Controller Unit */}
          <div className="bioreactor-unit-card" id="hardware-controller-card">
            <div 
              className="bioreactor-unit-photo" 
              onClick={() => setInspectModal(bioreactorData.hardware[0])}
              title="Click to inspect full hardware image"
            >
              <div className="photo-zoom-chip">
                <Maximize2 size={11} />
                <span>FULL VIEW</span>
              </div>
              <img 
                src={bioreactorData.hardware[0].image} 
                alt={bioreactorData.hardware[0].name}
                onError={(e) => { e.currentTarget.src = '/images/sample.png'; }}
              />
            </div>
            <div className="bioreactor-unit-info">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                MODULE 01
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>{bioreactorData.hardware[0].name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {bioreactorData.hardware[0].features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: 'var(--text-body)' }}>
                    <Check size={14} color="var(--text-ink)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: Validated Specifications Sheet */}
          <div className="bioreactor-center-specs" id="hardware-specs-sheet">
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Engineering Tolerance
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
                {bioreactorData.mechanism}
              </h3>
              <div className="clean-spec-list">
                {bioreactorData.specs.map((spec, i) => (
                  <div key={i} className="clean-spec-card">
                    <div className="title">{spec.title}</div>
                    <div className="desc">{spec.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-hairline)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>VESSEL STANDARD:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-ink)' }}>12-WELL PLATES / CUSTOM DESIGNED PLATES</span>
            </div>
          </div>

          {/* Unit 2: Docking Matrix Vessel */}
          <div className="bioreactor-unit-card" id="hardware-matrix-card">
            <div 
              className="bioreactor-unit-photo" 
              onClick={() => setInspectModal(bioreactorData.hardware[1])}
              title="Click to inspect full hardware image"
            >
              <div className="photo-zoom-chip">
                <Maximize2 size={11} />
                <span>FULL VIEW</span>
              </div>
              <img 
                src={bioreactorData.hardware[1].image} 
                alt={bioreactorData.hardware[1].name}
                onError={(e) => { e.currentTarget.src = '/images/sample.png'; }}
              />
            </div>
            <div className="bioreactor-unit-info">
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                MODULE 02
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>{bioreactorData.hardware[1].name}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {bioreactorData.hardware[1].features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: 'var(--text-body)' }}>
                    <Check size={14} color="var(--text-ink)" style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Minimalist RPM Rate Console */}
        <div className="rpm-rate-console" id="rpm-rate-console">
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-ink)', textTransform: 'uppercase' }}>
              Stirring Rate Calibration
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Microfluidic shear stress controller across plate-based incubator nests:
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>10 RPM</span>
              <input 
                type="range" 
                min="10" 
                max="250" 
                step="5"
                value={rpm} 
                onChange={(e) => setRpm(Number(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--text-ink)', height: '4px', cursor: 'pointer' }}
                id="rpm-range-slider"
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>250 RPM</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="rpm-gauge-editorial">
              <div className="value">{rpm} <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>RPM</span></div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {getFluidStatus(rpm)}
              </div>
            </div>

            <button 
              className={`btn btn-sm ${isRunning ? 'btn-secondary' : 'btn-primary'}`}
              onClick={() => setIsRunning(!isRunning)}
              id="rpm-toggle-power-btn"
            >
              <RotateCw size={13} style={{ animation: isRunning ? `spin ${Math.max(0.4, 250 / rpm)}s linear infinite` : 'none' }} />
              <span>{isRunning ? 'Drive Online' : 'Halt Drive'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* High-Resolution Hardware Inspection Modal */}
      {inspectModal && (
        <div 
          className="modal-backdrop-clean" 
          onClick={() => setInspectModal(null)}
          style={{ zIndex: 2500 }}
        >
          <div 
            className="modal-window-clean" 
            style={{ maxWidth: '820px' }} 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-topbar-clean">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', background: 'var(--bg-subtle)', padding: '3px 8px', border: '1px solid var(--border-hairline)', borderRadius: '2px' }}>
                  HARDWARE INSPECTION // {inspectModal.id.toUpperCase()}
                </span>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{inspectModal.name}</span>
              </div>
              <button 
                onClick={() => setInspectModal(null)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-ink)', display: 'flex', alignItems: 'center', padding: '4px' }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            <div style={{ background: '#ffffff', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '420px', borderBottom: '1px solid var(--border-hairline)' }}>
              <img 
                src={inspectModal.image} 
                alt={inspectModal.name} 
                style={{ maxWidth: '100%', maxHeight: '520px', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block', margin: 'auto' }} 
              />
            </div>
            <div style={{ padding: '24px 28px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase' }}>
                Verified Specifications &amp; Engineering Tolerances
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {inspectModal.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: 'var(--text-body)' }}>
                    <Check size={14} color="var(--text-ink)" style={{ flexShrink: 0, marginTop: '3px' }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
