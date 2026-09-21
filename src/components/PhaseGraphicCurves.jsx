import React, { useState, useEffect } from 'react';

/**
 * PhaseCurveThumb: Compact, elegant vector line/curve thumbnail for phase step buttons
 * Fits 100% width and 52px height inside .spline-step-thumb and .step-rail-thumb
 */
export function PhaseCurveThumb({ phaseIndex, isActive }) {
  const strokeColor = isActive ? '#38bdf8' : 'var(--text-ink, #f4f4f5)';
  const mutedColor = isActive ? 'rgba(56, 189, 248, 0.45)' : 'rgba(255, 255, 255, 0.25)';
  const gridColor = 'rgba(255, 255, 255, 0.05)';
  const accentFill = isActive ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.05)';

  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
        background: isActive ? '#0d1117' : '#08080a',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'all 0.25s ease'
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 160 52"
        preserveAspectRatio="none"
        style={{ display: 'block' }}
      >
        {/* Subtle Horizontal & Vertical Coordinate Grid */}
        <line x1="0" y1="13" x2="160" y2="13" stroke={gridColor} strokeDasharray="3,3" />
        <line x1="0" y1="26" x2="160" y2="26" stroke={gridColor} strokeDasharray="3,3" />
        <line x1="0" y1="39" x2="160" y2="39" stroke={gridColor} strokeDasharray="3,3" />
        <line x1="40" y1="0" x2="40" y2="52" stroke={gridColor} strokeDasharray="2,3" />
        <line x1="80" y1="0" x2="80" y2="52" stroke={gridColor} strokeDasharray="2,3" />
        <line x1="120" y1="0" x2="120" y2="52" stroke={gridColor} strokeDasharray="2,3" />

        {/* Phase 01: Sample Collection — Venous Laminar Stream & Capillary Pressure Wave */}
        {phaseIndex === 0 && (
          <g>
            <path
              d="M 0 26 Q 20 12, 40 26 T 80 26 T 120 26 T 160 26"
              fill="none"
              stroke={strokeColor}
              strokeWidth={isActive ? '2' : '1.5'}
            />
            <path
              d="M 0 26 Q 20 36, 40 26 T 80 26 T 120 26 T 160 26"
              fill="none"
              stroke={mutedColor}
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            {/* Dynamic flow pulses */}
            <circle cx={isActive ? 80 : 40} cy="26" r="3" fill={strokeColor} />
            <circle cx={isActive ? 120 : 100} cy="26" r="2" fill={mutedColor} />
          </g>
        )}

        {/* Phase 02: piRNA Isolation Kit — Size Fractionation Cutoff Peak (26–32 nt) */}
        {phaseIndex === 1 && (
          <g>
            {/* Cutoff boundary window */}
            <rect x="62" y="6" width="36" height="42" fill={accentFill} />
            <line x1="62" y1="6" x2="62" y2="48" stroke={mutedColor} strokeDasharray="2,2" />
            <line x1="98" y1="6" x2="98" y2="48" stroke={mutedColor} strokeDasharray="2,2" />
            {/* Chromatogram Peak */}
            <path
              d="M 6 42 L 42 42 Q 54 42, 62 34 Q 72 8, 80 8 Q 88 8, 98 34 Q 106 42, 120 42 L 154 42"
              fill="none"
              stroke={strokeColor}
              strokeWidth={isActive ? '2' : '1.5'}
            />
            <circle cx="80" cy="8" r="2.5" fill={strokeColor} />
          </g>
        )}

        {/* Phase 03: piRNA Amplification — Exponential Sigmoidal Real-time S-Curves */}
        {phaseIndex === 2 && (
          <g>
            {/* Ct Threshold horizontal line */}
            <line x1="6" y1="26" x2="154" y2="26" stroke={mutedColor} strokeDasharray="3,2" />
            {/* Baseline flat control */}
            <line x1="6" y1="44" x2="154" y2="44" stroke={mutedColor} strokeWidth="1" strokeDasharray="2,2" />
            {/* Sigmoidal curve 1 (Target) */}
            <path
              d="M 6 44 C 45 44, 65 44, 82 34 S 106 10, 154 10"
              fill="none"
              stroke={strokeColor}
              strokeWidth={isActive ? '2' : '1.5'}
            />
            {/* Sigmoidal curve 2 (Secondary Target) */}
            <path
              d="M 6 44 C 55 44, 75 44, 94 36 S 118 16, 154 16"
              fill="none"
              stroke={mutedColor}
              strokeWidth="1.2"
            />
            {/* Ct intercept dot */}
            <circle cx="88" cy="26" r="2.5" fill={strokeColor} />
          </g>
        )}

        {/* Phase 04: QPCR Analysis — Fluorometric Multi-Channel & Melting Curve (-dF/dT) */}
        {phaseIndex === 3 && (
          <g>
            {/* Optical baseline */}
            <line x1="6" y1="44" x2="154" y2="44" stroke={gridColor} />
            {/* FAM Primary Melt Peak */}
            <path
              d="M 6 42 L 50 42 Q 74 42, 86 10 Q 98 42, 122 42 L 154 42"
              fill="none"
              stroke={strokeColor}
              strokeWidth={isActive ? '2' : '1.5'}
            />
            {/* HEX Secondary Melt Peak */}
            <path
              d="M 6 42 L 62 42 Q 86 42, 98 22 Q 110 42, 134 42 L 154 42"
              fill="none"
              stroke={mutedColor}
              strokeWidth="1.2"
              strokeDasharray="4,2"
            />
            <circle cx="86" cy="10" r="2.5" fill={strokeColor} />
          </g>
        )}

        {/* Phase 05: Clinical Report — Multi-Biomarker Risk Stratification Distribution */}
        {phaseIndex === 4 && (
          <g>
            {/* Clinical Decision Threshold Line */}
            <line x1="95" y1="6" x2="95" y2="46" stroke={isActive ? '#ef4444' : mutedColor} strokeDasharray="2,2" strokeWidth="1.2" />
            {/* Negative/Normal Distribution Bell Curve */}
            <path
              d="M 6 44 Q 38 44, 52 14 Q 66 44, 95 44"
              fill={accentFill}
              stroke={strokeColor}
              strokeWidth={isActive ? '2' : '1.5'}
            />
            {/* Detected Sample Shift Curve */}
            <path
              d="M 95 44 Q 114 44, 126 24 Q 138 44, 154 44"
              fill="none"
              stroke={mutedColor}
              strokeWidth="1"
            />
            <circle cx="52" cy="14" r="2.5" fill={strokeColor} />
          </g>
        )}

        {/* Technical Monospace Tag in Corner */}
        <text
          x="8"
          y="10"
          fill={isActive ? strokeColor : 'rgba(255, 255, 255, 0.4)'}
          fontSize="6.5"
          fontFamily="var(--font-mono, monospace)"
          fontWeight="600"
          letterSpacing="0.04em"
        >
          {phaseIndex === 0 && 'FLOW // LAMINAR'}
          {phaseIndex === 1 && 'FRAC // 26-32nt'}
          {phaseIndex === 2 && 'AMP // Ct 24.2'}
          {phaseIndex === 3 && 'MELT // 78.4°C'}
          {phaseIndex === 4 && 'RISK // <0.15'}
        </text>
      </svg>
    </div>
  );
}

/**
 * PhaseCurveViewer: Full-size, high-fidelity animated vector scientific instrument
 * Replaces clinical specimen photos in .phase-focal-img-frame, .pipeline-img-frame, and .spline-canvas-pip
 */
export function PhaseCurveViewer({ phaseIndex, isPip = false }) {
  const [sweepX, setSweepX] = useState(20);

  // Sweep animation loop
  useEffect(() => {
    let animId;
    let pos = 20;
    const maxX = isPip ? 220 : 440;
    const minX = 20;
    const speed = isPip ? 1.8 : 2.5;

    const animate = () => {
      pos += speed;
      if (pos > maxX) pos = minX;
      setSweepX(pos);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isPip]);

  // Phase metadata for the instrument readout
  const phaseMetadata = [
    {
      code: 'PHASE 01',
      title: 'SAMPLE COLLECTION',
      channel: 'STABILIZATION DYNAMICS',
      metricA: 'FLOW: 1.2 mL/min',
      metricB: 'BUFFER: RNA SHIELD',
      metricC: 'PURITY: 100%',
      xAxis: 'TIME (s): 0s, 10s, 20s, 30s, 40s',
      yAxis: 'VOL (mL)'
    },
    {
      code: 'PHASE 02',
      title: 'piRNA ISOLATION',
      channel: 'SIZE-EXCLUSION CHROMATOGRAPHY',
      metricA: 'FRACTION: 26–32 nt',
      metricB: 'YIELD: >99.4%',
      metricC: 'A260/280: 2.01',
      xAxis: 'NUCLEOTIDE LENGTH (nt): 15, 21, 26, 32, 45, 60',
      yAxis: 'ABS (mAU)'
    },
    {
      code: 'PHASE 03',
      title: 'piRNA AMPLIFICATION',
      channel: 'REAL-TIME KINETIC PCR',
      metricA: 'Ct VALUE: 24.2',
      metricB: 'EFFICIENCY: 99.1%',
      metricC: 'SLOPE: -3.34',
      xAxis: 'CYCLE NUMBER: 5, 10, 15, 20, 25, 30, 35, 40',
      yAxis: 'RFU × 10³'
    },
    {
      code: 'PHASE 04',
      title: 'QPCR ANALYSIS',
      channel: 'FLUOROMETRIC MELT DERIVATIVE (-dF/dT)',
      metricA: 'Tm PEAK: 78.4°C',
      metricB: 'SNR: 42.6 dB',
      metricC: 'CHANNELS: FAM / HEX',
      xAxis: 'TEMPERATURE (°C): 60°, 65°, 70°, 75°, 80°, 85°, 90°',
      yAxis: '-dF/dT'
    },
    {
      code: 'PHASE 05',
      title: 'CLINICAL REPORT',
      channel: 'AI RISK STRATIFICATION INDEX',
      metricA: 'RISK SCORE: 0.08',
      metricB: 'CUTOFF: 0.50',
      metricC: 'STATUS: NORMAL / NEGATIVE',
      xAxis: 'CONFIDENCE INTERVAL: 0.00, 0.25, 0.50, 0.75, 1.00',
      yAxis: 'PROBABILITY'
    }
  ];

  const meta = phaseMetadata[phaseIndex] || phaseMetadata[0];
  const viewBoxWidth = isPip ? 240 : 480;
  const viewBoxHeight = isPip ? 110 : 200;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#070709',
        borderRadius: isPip ? '2px' : 'var(--radius-xs, 2px)',
        border: '1px solid var(--border-hairline, rgba(255, 255, 255, 0.08))',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Oscilloscope Header Telemetry Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isPip ? '4px 8px' : '8px 14px',
          background: 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: isPip ? '0.58rem' : '0.68rem',
          color: 'var(--text-muted, #a1a1aa)',
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 6px #10b981'
            }}
          />
          <span style={{ color: '#f4f4f5', fontWeight: 700, letterSpacing: '0.04em' }}>
            {meta.code} // {meta.channel}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: isPip ? '6px' : '12px' }}>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>{meta.metricA}</span>
          {!isPip && <span style={{ color: '#10b981', fontWeight: 600 }}>{meta.metricB}</span>}
          {!isPip && <span style={{ color: '#e4e4e7' }}>{meta.metricC}</span>}
        </div>
      </div>

      {/* SVG Instrument Display Space */}
      <div style={{ flex: 1, position: 'relative', width: '100%', minHeight: 0 }}>
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          preserveAspectRatio="none"
          style={{ display: 'block' }}
        >
          <defs>
            {/* Glowing Linear Gradients for Waveforms */}
            <linearGradient id="phaseCyanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="phaseGreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="phasePurpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Coordinate Hairline Grid Lines */}
          {[0.25, 0.5, 0.75].map((pct, i) => (
            <line
              key={`h-${i}`}
              x1="20"
              y1={viewBoxHeight * pct}
              x2={viewBoxWidth - 20}
              y2={viewBoxHeight * pct}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeDasharray="4,4"
            />
          ))}
          {[0.2, 0.4, 0.6, 0.8].map((pct, i) => (
            <line
              key={`v-${i}`}
              x1={viewBoxWidth * pct}
              y1="10"
              x2={viewBoxWidth * pct}
              y2={viewBoxHeight - 20}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeDasharray="4,4"
            />
          ))}

          {/* Bottom Baseline Axis */}
          <line
            x1="20"
            y1={viewBoxHeight - 20}
            x2={viewBoxWidth - 20}
            y2={viewBoxHeight - 20}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />

          {/* Left Y Axis */}
          <line
            x1="20"
            y1="10"
            x2="20"
            y2={viewBoxHeight - 20}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />

          {/* Phase 01: Sample Collection — Dual Fluid Wave & Pulsing Capillary Nodes */}
          {phaseIndex === 0 && (
            <g>
              <path
                d={
                  isPip
                    ? "M 20 60 Q 55 20, 90 60 T 160 60 T 220 60"
                    : "M 20 110 Q 75 40, 130 110 T 240 110 T 350 110 T 460 110"
                }
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />
              <path
                d={
                  isPip
                    ? "M 20 60 Q 55 95, 90 60 T 160 60 T 220 60"
                    : "M 20 110 Q 75 175, 130 110 T 240 110 T 350 110 T 460 110"
                }
                fill="none"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
              {/* Harmonic Shading */}
              <path
                d={
                  isPip
                    ? "M 20 60 Q 55 20, 90 60 T 160 60 T 220 60 L 220 90 L 20 90 Z"
                    : "M 20 110 Q 75 40, 130 110 T 240 110 T 350 110 T 460 110 L 460 180 L 20 180 Z"
                }
                fill="url(#phaseCyanGrad)"
              />
              {/* Pulsing sampling points */}
              <circle cx={isPip ? 90 : 130} cy={isPip ? 60 : 110} r="4" fill="#38bdf8" />
              <circle cx={isPip ? 160 : 240} cy={isPip ? 60 : 110} r="4" fill="#10b981" />
            </g>
          )}

          {/* Phase 02: piRNA Isolation Kit — Chromatographic Size Cutoff Zone (26–32 nt) */}
          {phaseIndex === 1 && (
            <g>
              {/* Target Cutoff Shaded Envelope (26–32 nt) */}
              <rect
                x={isPip ? 85 : 170}
                y={isPip ? 15 : 25}
                width={isPip ? 55 : 110}
                height={isPip ? 75 : 155}
                fill="url(#phaseGreenGrad)"
                stroke="rgba(16, 185, 129, 0.4)"
                strokeDasharray="3,3"
              />
              {/* Chromatogram Trace: Pre-noise -> miRNA 21nt -> sharp piRNA peak -> large RNA drop */}
              <path
                d={
                  isPip
                    ? "M 20 90 L 55 90 Q 70 90, 75 75 Q 85 90, 95 90 Q 105 18, 115 18 Q 125 90, 140 90 L 220 90"
                    : "M 20 180 L 110 180 Q 140 180, 150 150 Q 170 180, 190 180 Q 215 35, 230 35 Q 245 180, 280 180 L 460 180"
                }
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
              />
              {/* Peak Marker Tag */}
              <text
                x={isPip ? 115 : 230}
                y={isPip ? 14 : 26}
                fill="#10b981"
                fontSize={isPip ? '7' : '10'}
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
                fontWeight="700"
              >
                piRNA PEAK (26–32 nt)
              </text>
            </g>
          )}

          {/* Phase 03: piRNA Amplification — Sigmoidal Amplification Curves & Threshold Intercept */}
          {phaseIndex === 2 && (
            <g>
              {/* Ct Threshold Line */}
              <line
                x1="20"
                y1={isPip ? 48 : 95}
                x2={viewBoxWidth - 20}
                y2={isPip ? 48 : 95}
                stroke="#ef4444"
                strokeDasharray="4,4"
                strokeWidth="1.2"
              />
              <text
                x={isPip ? 25 : 30}
                y={isPip ? 44 : 88}
                fill="#ef4444"
                fontSize={isPip ? '6' : '9'}
                fontFamily="var(--font-mono, monospace)"
                fontWeight="700"
              >
                Ct THRESHOLD LINE (Ct = 24.2)
              </text>

              {/* Baseline Flat Negative Control */}
              <line
                x1="20"
                y1={viewBoxHeight - 22}
                x2={viewBoxWidth - 20}
                y2={viewBoxHeight - 22}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeDasharray="3,3"
              />

              {/* Primary piRNA Target S-Curve */}
              <path
                d={
                  isPip
                    ? "M 20 90 C 70 90, 100 90, 125 65 S 155 20, 220 20"
                    : "M 20 180 C 140 180, 200 180, 245 130 S 310 40, 460 40"
                }
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />

              {/* Secondary Reference Curve */}
              <path
                d={
                  isPip
                    ? "M 20 90 C 85 90, 115 90, 140 70 S 175 30, 220 30"
                    : "M 20 180 C 170 180, 230 180, 275 140 S 350 60, 460 60"
                }
                fill="none"
                stroke="rgba(56, 189, 248, 0.5)"
                strokeWidth="1.5"
                strokeDasharray="5,3"
              />

              {/* Ct Intercept Marker */}
              <circle
                cx={isPip ? 135 : 265}
                cy={isPip ? 48 : 95}
                r="4.5"
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* Phase 04: QPCR Analysis — Fluorometric Melting Curves (-dF/dT) & Multi-Channel */}
          {phaseIndex === 3 && (
            <g>
              {/* FAM Channel Primary Melt Curve */}
              <path
                d={
                  isPip
                    ? "M 20 90 L 70 90 Q 110 90, 125 22 Q 140 90, 180 90 L 220 90"
                    : "M 20 180 L 140 180 Q 220 180, 250 40 Q 280 180, 360 180 L 460 180"
                }
                fill="url(#phasePurpleGrad)"
                stroke="#818cf8"
                strokeWidth="2.5"
              />

              {/* HEX Secondary Internal Control Channel */}
              <path
                d={
                  isPip
                    ? "M 20 90 L 90 90 Q 125 90, 145 42 Q 165 90, 195 90 L 220 90"
                    : "M 20 180 L 180 180 Q 250 180, 290 80 Q 330 180, 390 180 L 460 180"
                }
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.8"
                strokeDasharray="4,3"
              />

              {/* Melting Peak Annotation */}
              <circle cx={isPip ? 125 : 250} cy={isPip ? 22 : 40} r="4" fill="#818cf8" />
              <text
                x={isPip ? 125 : 250}
                y={isPip ? 16 : 28}
                fill="#818cf8"
                fontSize={isPip ? '7' : '10'}
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
                fontWeight="700"
              >
                Tm = 78.4°C (SPECIFICITY 100%)
              </text>
            </g>
          )}

          {/* Phase 05: Clinical Report — AI Risk Stratification Distribution & Boundary */}
          {phaseIndex === 4 && (
            <g>
              {/* Decision Boundary Line */}
              <line
                x1={isPip ? 130 : 260}
                y1="15"
                x2={isPip ? 130 : 260}
                y2={viewBoxHeight - 20}
                stroke="#f59e0b"
                strokeDasharray="3,3"
                strokeWidth="1.5"
              />
              <text
                x={isPip ? 134 : 266}
                y="26"
                fill="#f59e0b"
                fontSize={isPip ? '6' : '9'}
                fontFamily="var(--font-mono, monospace)"
                fontWeight="700"
              >
                DECISION CUTOFF (0.50)
              </text>

              {/* Patient Result Distribution (Healthy/Negative Zone) */}
              <path
                d={
                  isPip
                    ? "M 20 90 Q 60 90, 80 25 Q 100 90, 130 90"
                    : "M 20 180 Q 120 180, 160 50 Q 200 180, 260 180"
                }
                fill="url(#phaseGreenGrad)"
                stroke="#10b981"
                strokeWidth="2.5"
              />

              {/* Pathology Comparative Zone (Dashed) */}
              <path
                d={
                  isPip
                    ? "M 130 90 Q 160 90, 180 45 Q 200 90, 220 90"
                    : "M 260 180 Q 320 180, 360 85 Q 400 180, 460 180"
                }
                fill="none"
                stroke="rgba(239, 68, 68, 0.6)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />

              {/* Patient Indicator Callout */}
              <circle cx={isPip ? 80 : 160} cy={isPip ? 25 : 50} r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
              <text
                x={isPip ? 80 : 160}
                y={isPip ? 18 : 38}
                fill="#10b981"
                fontSize={isPip ? '6.5' : '9.5'}
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
                fontWeight="700"
              >
                PATIENT INDEX: 0.08 [NEGATIVE]
              </text>
            </g>
          )}

          {/* Real-time Oscilloscope Sweep Line */}
          <line
            x1={sweepX}
            y1="10"
            x2={sweepX}
            y2={viewBoxHeight - 20}
            stroke="#38bdf8"
            strokeWidth="1.5"
            opacity="0.75"
          />

          {/* Sweep Line Glow Trail */}
          <rect
            x={Math.max(20, sweepX - 16)}
            y="10"
            width="16"
            height={viewBoxHeight - 30}
            fill="url(#phaseCyanGrad)"
            opacity="0.35"
          />
        </svg>
      </div>

      {/* Axis Footer Labels */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isPip ? '2px 8px 4px' : '4px 14px 6px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: isPip ? '0.54rem' : '0.62rem',
          color: 'rgba(255, 255, 255, 0.35)',
          flexShrink: 0
        }}
      >
        <span>{meta.yAxis}</span>
        <span>{meta.xAxis}</span>
      </div>
    </div>
  );
}
