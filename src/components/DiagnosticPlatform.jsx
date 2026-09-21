import React, { useState } from 'react';
import { diagnosticPlatformData } from '../data/indzitaData';
import { Check, Target } from 'lucide-react';

export default function DiagnosticPlatform() {
  const [activeHotspot, setActiveHotspot] = useState(diagnosticPlatformData.subsystems[1].hotspots[0]);

  return (
    <section className="section" id="platform" style={{ borderBottom: '1px solid var(--border-hairline)' }}>
      <div className="container">
        {/* Section Lead */}
        <div className="section-lead">
          <div className="index-tag">04 // Automated Diagnostic Instrumentation</div>
          <h2>
            Automated Platform for Non-Invasive Diagnosis of Cervical Cancer &amp; Parkinson’s
          </h2>
          <p>{diagnosticPlatformData.subtitle}</p>
        </div>

        {/* 2-Column Split Minimalist Duo */}
        <div className="platform-minimalist-duo">
          {/* Module 1: Compact Diagnostic System */}
          <div className="platform-card-editorial" id="diag-compact-station">
            <div className="platform-img-viewport">
              <img 
                src={diagnosticPlatformData.subsystems[0].image} 
                alt={diagnosticPlatformData.subsystems[0].title}
                onError={(e) => { e.currentTarget.src = '/images/sample.png'; }}
              />
            </div>

            <div style={{ padding: '32px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                HARDWARE STATION
              </div>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '10px' }}>{diagnosticPlatformData.subsystems[0].title}</h3>
              <p style={{ color: 'var(--text-body)', fontSize: '0.94rem', lineHeight: '1.65', marginBottom: '24px' }}>
                {diagnosticPlatformData.subsystems[0].desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {diagnosticPlatformData.subsystems[0].specs.map((sp, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-body)' }}>
                    <Check size={14} color="var(--text-ink)" style={{ flexShrink: 0 }} />
                    <span>{sp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Module 2: Intelligent Sample Processing */}
          <div className="platform-card-editorial" id="diag-processing-station">
            <div className="platform-img-viewport">
              <img 
                src={diagnosticPlatformData.subsystems[1].image} 
                alt={diagnosticPlatformData.subsystems[1].title}
                onError={(e) => { e.currentTarget.src = '/images/sample.png'; }}
              />

              {/* Minimalist Crosshair Pin 1: Buffers Chamber */}
              <button 
                className="crosshair-pill-clean"
                style={{ top: '24px', left: '24px' }}
                onClick={() => setActiveHotspot(diagnosticPlatformData.subsystems[1].hotspots[0])}
                id="pin-buffers-chamber"
                title="Inspect Buffers Chamber"
              >
                <Target size={13} />
                <span>[PORT 1: BUFFERS]</span>
              </button>

              {/* Minimalist Crosshair Pin 2: Sample / Cassette Port */}
              <button 
                className="crosshair-pill-clean"
                style={{ bottom: '24px', right: '24px' }}
                onClick={() => setActiveHotspot(diagnosticPlatformData.subsystems[1].hotspots[1])}
                id="pin-cassette-port"
                title="Inspect Sample / Cassette Port"
              >
                <Target size={13} />
                <span>[PORT 2: CASSETTE]</span>
              </button>
            </div>

            <div style={{ padding: '32px 32px 20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                MICROFLUIDIC AUTOMATION
              </div>
              <h3 style={{ fontSize: '1.45rem', marginBottom: '10px' }}>{diagnosticPlatformData.subsystems[1].title}</h3>
              <p style={{ color: 'var(--text-body)', fontSize: '0.94rem', lineHeight: '1.65' }}>
                {diagnosticPlatformData.subsystems[1].desc}
              </p>
            </div>

            {/* Active Telemetry Drawer */}
            <div className="drawer-editorial">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-ink)', fontWeight: 700 }}>
                  [TARGET: {activeHotspot.name.toUpperCase()}]
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {activeHotspot.position}
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-ink)', marginBottom: '6px', fontWeight: 500 }}>
                {activeHotspot.summary}
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {activeHotspot.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
