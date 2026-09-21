import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MoveRight, Zap, Activity, Layers, RotateCw, Play } from 'lucide-react';

export default function MolecularAtlasGrid() {
  // =========================================================================
  // Cell 01: Non-Invasive Blood Screening — Chromatogram Size Fractionation
  // =========================================================================
  const [scanActive, setScanActive] = useState(false);
  const [scanOffset, setScanOffset] = useState(0);

  const triggerChromatogramScan = () => {
    if (scanActive) return;
    setScanActive(true);
    setScanOffset(0);

    const interval = setInterval(() => {
      setScanOffset(prev => {
        if (prev >= 200) {
          clearInterval(interval);
          setScanActive(false);
          return 0;
        }
        return prev + 10;
      });
    }, 40);
  };

  // Periodic ambient pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setScanActive(true);
      setTimeout(() => setScanActive(false), 800);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // =========================================================================
  // Cell 02: Proprietary piRNA Isolation Kit — Magnetic Binding Kinetics Trace
  // =========================================================================
  const [magneticPullActive, setMagneticPullActive] = useState(false);
  const [bindingYield, setBindingYield] = useState(99.4);

  const triggerMagneticPull = () => {
    setMagneticPullActive(true);
    setBindingYield(99.8);
    setTimeout(() => {
      setMagneticPullActive(false);
      setBindingYield(99.4);
    }, 1200);
  };

  // =========================================================================
  // Cell 03: Nanopore Single-Molecule Sensing — Resistive Pulse Translocation
  // =========================================================================
  const [pulseActive, setPulseActive] = useState(false);
  const [poreCurrent, setPoreCurrent] = useState(120.0);
  const [pulseCount, setPulseCount] = useState(156);

  const triggerNanoporePulse = () => {
    if (pulseActive) return;
    setPulseActive(true);
    setPoreCurrent(84.8);
    setPulseCount(prev => prev + 1);

    setTimeout(() => {
      setPoreCurrent(120.0);
      setPulseActive(false);
    }, 450);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setPoreCurrent(84.8);
      setPulseActive(true);
      setPulseCount(prev => prev + 1);
      setTimeout(() => {
        setPoreCurrent(120.0);
        setPulseActive(false);
      }, 400);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  // =========================================================================
  // Cell 04: 12-Well Organoid Bioreactor — Rotational Shear & Laminar Flow Trace
  // =========================================================================
  const [bioreactorRpm, setBioreactorRpm] = useState(65);
  const [wavePhase, setWavePhase] = useState(0);

  const cycleRpm = () => {
    if (bioreactorRpm === 40) setBioreactorRpm(65);
    else if (bioreactorRpm === 65) setBioreactorRpm(90);
    else setBioreactorRpm(40);
  };

  useEffect(() => {
    const step = bioreactorRpm === 90 ? 0.35 : bioreactorRpm === 65 ? 0.22 : 0.12;
    const timer = setInterval(() => {
      setWavePhase(prev => (prev + step) % (Math.PI * 2));
    }, 50);
    return () => clearInterval(timer);
  }, [bioreactorRpm]);

  // =========================================================================
  // Cell 05: Automated Diagnostic Platform — Dual-Panel Optical Emission Trace
  // =========================================================================
  const [activePanel, setActivePanel] = useState('cervical');
  const [assayRunning, setAssayRunning] = useState(false);
  const [signalIntensity, setSignalIntensity] = useState(4.6);
  const [laserScanX, setLaserScanX] = useState(0);

  const runPanelAssay = () => {
    if (assayRunning) return;
    setAssayRunning(true);
    setSignalIntensity(1.0);
    setLaserScanX(15);

    const interval = setInterval(() => {
      setLaserScanX(prev => {
        if (prev >= 230) {
          clearInterval(interval);
          return 0;
        }
        return prev + 14;
      });
    }, 40);

    setTimeout(() => {
      setSignalIntensity(activePanel === 'cervical' ? 4.6 : 3.8);
      setAssayRunning(false);
    }, 850);
  };

  return (
    <section className="section" id="atlas" style={{ borderBottom: '1px solid var(--border-hairline)' }}>
      <div className="container">
        {/* Section Heading with motion.dev style index lockup */}
        <div className="fresh-section-heading">
          <div className="fresh-section-index">
            <span>03</span>
            <span>Technology Architecture</span>
          </div>
          <div className="fresh-section-copy">
            <h2>Translating piRNA Biomarkers into Early Non-Invasive Diagnostics</h2>
            <p>
              A proprietary clinical and engineering ecosystem combining non-invasive liquid biopsy, single-molecule nanopore detection, speed-controlled organoid bioreactors, and sample-to-answer automation.
            </p>
          </div>
        </div>

        {/* The 5-Cell Bento Atlas Grid — All Interactive Scientific Instruments */}
        <div className="home-features-atlas">

          {/* ========================================================= */}
          {/* Cell 01: Non-Invasive Blood Screening (Chromatogram Trace) */}
          {/* ========================================================= */}
          <article className="home-feat-cell" id="atlas-cell-blood-sample">
            <div className="home-feat-cell-stage">
              <div className="atlas-stage-container">
                <div className="atlas-oscilloscope-box">
                  <div className="atlas-trace-top">
                    <span style={{ color: '#a1a1aa' }}>CHROMATOGRAM: 26–32 nt FRACTION</span>
                    <span style={{ color: scanActive ? '#38bdf8' : '#10b981', fontWeight: 700 }}>
                      {scanActive ? 'SCANNING PEAK...' : 'PURITY: >99.2%'}
                    </span>
                  </div>

                  <svg width="100%" height="64" viewBox="0 0 240 64" preserveAspectRatio="none">
                    {/* Baseline Voltage / Absorption Grid */}
                    <line x1="0" y1="20" x2="240" y2="20" stroke="#27272a" strokeDasharray="3" />
                    <line x1="0" y1="52" x2="240" y2="52" stroke="#27272a" strokeDasharray="3" />

                    {/* Chromatogram Peaks: Noise -> miRNA (21nt) -> Sharp piRNA Peak (26-32nt) */}
                    <path
                      d="M 10 52 L 40 52 Q 55 52, 60 44 Q 65 52, 80 52 Q 105 52, 120 12 Q 135 52, 160 52 L 230 52"
                      fill="none"
                      stroke={scanActive ? "#38bdf8" : "#a1a1aa"}
                      strokeWidth="2"
                      style={{ transition: 'stroke 0.2s ease' }}
                    />

                    {/* Highlighted piRNA Target Peak Fill */}
                    <path
                      d="M 105 52 Q 120 12, 135 52 Z"
                      fill={scanActive ? "rgba(56, 189, 248, 0.3)" : "rgba(16, 185, 129, 0.2)"}
                    />

                    {/* Peak Marker Text */}
                    <text x="120" y="26" fill={scanActive ? "#38bdf8" : "#10b981"} fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">
                      piRNA (26–32 nt)
                    </text>

                    {/* Real-time Scanning Vertical Reticle */}
                    {scanActive && (
                      <line 
                        x1={20 + scanOffset} 
                        y1="10" 
                        x2={20 + scanOffset} 
                        y2="55" 
                        stroke="#38bdf8" 
                        strokeWidth="1.5" 
                        opacity="0.85" 
                      />
                    )}
                  </svg>

                  <div className="atlas-trace-bottom">
                    <span>SAMPLE: 5 mL WHOLE BLOOD</span>
                    <span>BIOPSY: ZERO INVASIVE</span>
                  </div>
                </div>

                <button 
                  className="atlas-trigger-btn"
                  onClick={triggerChromatogramScan}
                  title="Simulate Chromatogram Optical Scan of 26-32 nt piRNA"
                >
                  <Activity size={11} color="#38bdf8" />
                  <span>Scan 26–32 nt Fraction (Zero Biopsy)</span>
                </button>
              </div>
            </div>

            <div className="home-feat-cell-content">
              <span className="home-feat-cell-index">01 // LIQUID BIOPSY PROTOCOL</span>
              <h3>
                <a href="#pipeline" className="home-feat-cell-title">
                  <span>Non-Invasive Blood Screening</span>
                  <MoveRight size={16} className="home-feat-cell-title-arrow" />
                </a>
              </h3>
              <p className="home-feat-cell-blurb">
                Flags early signs of cervical cancer within minutes from a standard peripheral blood draw. Completely eliminates the need for invasive cervical biopsies, speculums, or specialized technician training.
              </p>

              <div className="atlas-specs-row">
                <span className="atlas-spec-badge">
                  <strong>Sample:</strong> Whole Blood (5 mL)
                </span>
                <span className="atlas-spec-badge">
                  <strong>Biopsy:</strong> None Required
                </span>
                <span className="atlas-spec-badge">
                  <strong>Speed:</strong> Minutes
                </span>
              </div>
            </div>
          </article>

          {/* ========================================================= */}
          {/* Cell 02: Proprietary piRNA Isolation Kit (Binding Kinetics) */}
          {/* ========================================================= */}
          <article className="home-feat-cell" id="atlas-cell-isolation-kit">
            <div className="home-feat-cell-stage">
              <div className="atlas-stage-container">
                <div className="atlas-oscilloscope-box">
                  <div className="atlas-trace-top">
                    <span style={{ color: '#a1a1aa' }}>MAGNETIC BINDING KINETICS</span>
                    <span style={{ color: magneticPullActive ? '#c084fc' : '#a1a1aa', fontWeight: 700 }}>
                      YIELD: {bindingYield.toFixed(1)}% {magneticPullActive && '(PULL ACTIVE)'}
                    </span>
                  </div>

                  <svg width="100%" height="64" viewBox="0 0 240 64" preserveAspectRatio="none">
                    {/* Grid Lines */}
                    <line x1="0" y1="18" x2="240" y2="18" stroke="#27272a" strokeDasharray="3" />
                    <line x1="0" y1="46" x2="240" y2="46" stroke="#27272a" strokeDasharray="3" />

                    {/* Sigmoidal Binding Curve */}
                    <path
                      d={magneticPullActive
                        ? "M 10 50 Q 60 50, 90 20 L 230 20"
                        : "M 10 50 Q 80 50, 120 22 L 230 22"}
                      fill="none"
                      stroke={magneticPullActive ? "#c084fc" : "#a855f7"}
                      strokeWidth="2.2"
                      style={{ transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />

                    {/* Kinetic Nanobead Nodes along the curve */}
                    <circle cx="50" cy="50" r="2.5" fill="#a855f7" />
                    <circle cx="80" cy={magneticPullActive ? "38" : "44"} r="3" fill="#c084fc" />
                    <circle cx="110" cy={magneticPullActive ? "20" : "26"} r="3.5" fill="#a855f7" />
                    <circle cx="160" cy={magneticPullActive ? "20" : "22"} r="3" fill="#c084fc" />
                    <circle cx="210" cy={magneticPullActive ? "20" : "22"} r="3" fill="#c084fc" />
                  </svg>

                  <div className="atlas-trace-bottom">
                    <span>PURITY: A260/A280 ≥ 1.95</span>
                    <span>TARGET: 26–32 nt piRNA</span>
                  </div>
                </div>

                <button 
                  className="atlas-trigger-btn"
                  onClick={triggerMagneticPull}
                  title="Simulate Paramagnetic Bead Capture & Kinetics"
                >
                  <Layers size={11} color="#c084fc" />
                  <span>Snap Magnetic Bead Pull (26–32 nt)</span>
                </button>
              </div>
            </div>

            <div className="home-feat-cell-content">
              <span className="home-feat-cell-index">02 // SMALL RNA BIOCHEMISTRY</span>
              <h3>
                <a href="#pipeline" className="home-feat-cell-title">
                  <span>Proprietary piRNA Isolation Kit</span>
                  <MoveRight size={16} className="home-feat-cell-title-arrow" />
                </a>
              </h3>
              <p className="home-feat-cell-blurb">
                Custom-formulated molecular isolation reagents engineered specifically to isolate fragile 26–32 nucleotide small non-coding RNAs from patient blood without sample degradation or RNA loss.
              </p>

              <div className="atlas-specs-row">
                <span className="atlas-spec-badge">
                  <strong>Target:</strong> 26–32 nt piRNA
                </span>
                <span className="atlas-spec-badge">
                  <strong>Purity:</strong> A260/A280 ≥ 1.95
                </span>
                <span className="atlas-spec-badge">
                  <strong>Integrity:</strong> Lab Tested
                </span>
              </div>
            </div>
          </article>

          {/* ========================================================= */}
          {/* Cell 03: Nanopore Single-Molecule Sensing (The Gold Standard) */}
          {/* ========================================================= */}
          <article className="home-feat-cell" id="atlas-cell-nanopore">
            <div className="home-feat-cell-stage">
              <div className="stage-nanopore-sensor">
                <div className="nanopore-oscilloscope-box">
                  <div className="nanopore-trace-top">
                    <span style={{ color: '#a1a1aa' }}>NANOPORE SENSING TRACE</span>
                    <span style={{ color: pulseActive ? '#10b981' : '#f4f4f5', fontWeight: 700 }}>
                      I: {poreCurrent.toFixed(1)} pA {pulseActive && '(ΔI = -35.2 pA)'}
                    </span>
                  </div>

                  <svg width="100%" height="64" viewBox="0 0 240 64" preserveAspectRatio="none">
                    <line x1="0" y1="18" x2="240" y2="18" stroke="#27272a" strokeDasharray="3" />
                    <line x1="0" y1="46" x2="240" y2="46" stroke="#27272a" strokeDasharray="3" />

                    <path
                      d={pulseActive 
                        ? "M 10 20 L 70 20 L 80 20 L 90 48 L 125 48 L 135 20 L 230 20" 
                        : "M 10 20 L 80 20 L 120 20 L 160 20 L 200 20 L 230 20"}
                      fill="none"
                      stroke={pulseActive ? "#10b981" : "#a1a1aa"}
                      strokeWidth="2"
                      style={{ transition: 'all 0.12s cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                  </svg>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#71717a', marginTop: '4px' }}>
                    <span>BASELINE: 120 pA</span>
                    <span>PULSES: {pulseCount} DETECTED</span>
                  </div>
                </div>

                <button 
                  className="nanopore-pulse-trigger-btn"
                  onClick={triggerNanoporePulse}
                  title="Simulate Single-Molecule RNA Translocation Pulse"
                >
                  <Zap size={11} color="#10b981" />
                  <span>Pulse Translocation (Single Molecule)</span>
                </button>
              </div>
            </div>

            <div className="home-feat-cell-content">
              <span className="home-feat-cell-index">03 // MAHA MEDTECH MISSION // ₹7 CR GRANT</span>
              <h3>
                <a href="#news" className="home-feat-cell-title">
                  <span>Nanopore Single-Molecule Sensing</span>
                  <MoveRight size={16} className="home-feat-cell-title-arrow" />
                </a>
              </h3>
              <p className="home-feat-cell-blurb">
                Detects individual piRNA molecules by measuring nanoscale electrical resistive pulses as they translocate through pores. Backed by a ₹7 Crore grant from the MAHA MedTech Mission (ANRF / ICMR / Gates Foundation).
              </p>

              <div className="atlas-specs-row">
                <span className="atlas-spec-badge">
                  <strong>Modality:</strong> Resistive Pulse
                </span>
                <span className="atlas-spec-badge">
                  <strong>Resolution:</strong> Single-Molecule
                </span>
                <span className="atlas-spec-badge">
                  <strong>Grant:</strong> ₹7 Cr ANRF/ICMR
                </span>
              </div>
            </div>
          </article>

          {/* ========================================================= */}
          {/* Cell 04: Speed-Controlled 12-Well Organoid Bioreactor */}
          {/* ========================================================= */}
          <article className="home-feat-cell" id="atlas-cell-bioreactor">
            <div className="home-feat-cell-stage">
              <div className="atlas-stage-container">
                <div className="atlas-oscilloscope-box">
                  <div className="atlas-trace-top">
                    <span style={{ color: '#a1a1aa' }}>STIRRING DYNAMICS &amp; SHEAR TRACE</span>
                    <span style={{ color: '#f59e0b', fontWeight: 700 }}>
                      {bioreactorRpm} RPM CONSTANT
                    </span>
                  </div>

                  <svg width="100%" height="64" viewBox="0 0 240 64" preserveAspectRatio="none">
                    {/* Baseline Velocity Lines */}
                    <line x1="0" y1="20" x2="240" y2="20" stroke="#27272a" strokeDasharray="3" />
                    <line x1="0" y1="48" x2="240" y2="48" stroke="#27272a" strokeDasharray="3" />

                    {/* Smooth Harmonic Laminar Velocity Wave (Zero Turbulent Spikes) */}
                    <path
                      d={`M 10 ${34 + Math.sin(wavePhase) * 14} 
                          Q 50 ${34 + Math.sin(wavePhase + 1.2) * 14}, 90 ${34 + Math.sin(wavePhase + 2.4) * 14} 
                          T 170 ${34 + Math.sin(wavePhase + 4.0) * 14} 
                          T 230 ${34 + Math.sin(wavePhase + 5.2) * 14}`}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />

                    {/* Laminar Fluid Indicator */}
                    <text x="120" y="16" fill="#fbbf24" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">
                      LAMINAR SHEAR: 0.018 Pa
                    </text>
                  </svg>

                  <div className="atlas-trace-bottom">
                    <span>VESSEL: 12-WELL CULTURE PLATE</span>
                    <span>MOTOR HEAT: 0.0°C (INCUBATOR SAFE)</span>
                  </div>
                </div>

                <div className="atlas-controls-subrow">
                  <div className="atlas-mini-pills">
                    {[40, 65, 90].map(rpm => (
                      <button
                        key={rpm}
                        className={`atlas-mini-pill ${bioreactorRpm === rpm ? 'active' : ''}`}
                        onClick={() => setBioreactorRpm(rpm)}
                      >
                        {rpm} RPM
                      </button>
                    ))}
                  </div>

                  <button 
                    className="atlas-trigger-btn"
                    onClick={cycleRpm}
                    title="Cycle Stirring Speed"
                  >
                    <RotateCw size={11} color="#f59e0b" />
                    <span>Cycle Speed ({bioreactorRpm} RPM)</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="home-feat-cell-content">
              <span className="home-feat-cell-index">04 // CUSTOM DESIGNING &amp; PRODUCTION</span>
              <h3>
                <a href="#bioreactor" className="home-feat-cell-title">
                  <span>Organoid Bioreactor for 12-Well Plates</span>
                  <MoveRight size={16} className="home-feat-cell-title-arrow" />
                </a>
              </h3>
              <p className="home-feat-cell-blurb">
                Custom-engineered bioreactor featuring a speed-controlled constant stirring mechanism designed specifically for 12-well culture plates. Chemically resistant, incubator-compatible, and lab-tested for extended continuous run hours.
              </p>

              <div className="atlas-specs-row">
                <span className="atlas-spec-badge">
                  <strong>Vessel:</strong> 12-Well Plates
                </span>
                <span className="atlas-spec-badge">
                  <strong>Mechanism:</strong> Speed-Controlled
                </span>
                <span className="atlas-spec-badge">
                  <strong>Specs:</strong> Chemically Resistant
                </span>
                <span className="atlas-spec-badge">
                  <strong>Environment:</strong> Incubators
                </span>
              </div>
            </div>
          </article>

          {/* ========================================================= */}
          {/* Cell 05: Automated Sample-to-Answer Diagnostic Platform */}
          {/* ========================================================= */}
          <article className="home-feat-cell" id="atlas-cell-platform">
            <div className="home-feat-cell-stage">
              <div className="atlas-stage-container">
                <div className="atlas-oscilloscope-box">
                  <div className="atlas-trace-top">
                    <span style={{ color: '#a1a1aa' }}>DUAL-PANEL OPTICAL EMISSION TRACE</span>
                    <span style={{ color: activePanel === 'cervical' ? '#38bdf8' : '#10b981', fontWeight: 700 }}>
                      {assayRunning 
                        ? 'ACQUIRING FLUORESCENCE...' 
                        : `SIGNAL: +${signalIntensity}x ${activePanel === 'cervical' ? 'CC-piRNA' : 'PD-piRNA'}`}
                    </span>
                  </div>

                  <svg width="100%" height="64" viewBox="0 0 240 64" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="cell05CervicalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="cell05ParkinsonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Baseline Noise Lines */}
                    <line x1="0" y1="18" x2="240" y2="18" stroke="#27272a" strokeDasharray="3" />
                    <line x1="0" y1="48" x2="240" y2="48" stroke="#27272a" strokeDasharray="3" />

                    {/* Baseline Axis */}
                    <line x1="10" y1="48" x2="230" y2="48" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

                    {/* Cervical Panel: piRNA-142 Peak (λ 520nm, FAM channel) */}
                    {activePanel === 'cervical' && (
                      <g>
                        {/* Reference Channel Trace (RNU6 internal control) */}
                        <path
                          d="M 168 48 C 174 48, 178 48, 181 38 C 183 33, 184 30, 185 30 C 186 30, 187 33, 189 38 C 192 48, 196 48, 202 48"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.35)"
                          strokeWidth="1.2"
                          strokeDasharray="3 2"
                        />
                        <text x="185" y="25" fill="rgba(255, 255, 255, 0.45)" fontSize="5.5" fontFamily="var(--font-mono)" textAnchor="middle">
                          REF RNU6
                        </text>

                        {/* Peak Fill Area */}
                        <path 
                          d={assayRunning 
                            ? "M 75 48 C 98 48, 116 48, 126 26 C 130 16, 133 11, 135 11 C 137 11, 140 16, 144 26 C 154 48, 172 48, 195 48 Z" 
                            : "M 75 48 C 98 48, 116 48, 126 30 C 130 22, 133 17, 135 17 C 137 17, 140 22, 144 30 C 154 48, 172 48, 195 48 Z"} 
                          fill="url(#cell05CervicalGrad)"
                          style={{ transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
                        />

                        {/* Main Smooth Gaussian Fluorescence Emission Curve */}
                        <path
                          d={assayRunning 
                            ? "M 10 48 L 75 48 C 98 48, 116 48, 126 26 C 130 16, 133 11, 135 11 C 137 11, 140 16, 144 26 C 154 48, 172 48, 195 48 L 230 48"
                            : "M 10 48 L 75 48 C 98 48, 116 48, 126 30 C 130 22, 133 17, 135 17 C 137 17, 140 22, 144 30 C 154 48, 172 48, 195 48 L 230 48"}
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2.2"
                          style={{ transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
                        />

                        {/* Peak Dropdown Hairline & Apex Dot */}
                        <line x1="135" y1={assayRunning ? 11 : 17} x2="135" y2="48" stroke="rgba(56, 189, 248, 0.35)" strokeDasharray="2 2" />
                        <circle cx="135" cy={assayRunning ? 11 : 17} r="2.5" fill="#38bdf8" />

                        {/* Peak Label Positioned Cleanly Above Curve */}
                        <text x="135" y="8" fill="#38bdf8" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">
                          piRNA-142 (λ 520nm)
                        </text>
                      </g>
                    )}

                    {/* Parkinson's Panel: piRNA-708 Peak (λ 560nm, HEX channel) */}
                    {activePanel === 'parkinson' && (
                      <g>
                        {/* Reference Channel Trace (GAPDH internal control) */}
                        <path
                          d="M 68 48 C 74 48, 78 48, 81 38 C 83 33, 84 30, 85 30 C 86 30, 87 33, 89 38 C 92 48, 96 48, 102 48"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.35)"
                          strokeWidth="1.2"
                          strokeDasharray="3 2"
                        />
                        <text x="85" y="25" fill="rgba(255, 255, 255, 0.45)" fontSize="5.5" fontFamily="var(--font-mono)" textAnchor="middle">
                          GAPDH REF
                        </text>

                        {/* Peak Fill Area */}
                        <path 
                          d={assayRunning 
                            ? "M 90 48 C 112 48, 130 48, 140 26 C 144 16, 147 11, 150 11 C 153 11, 156 16, 160 26 C 170 48, 188 48, 210 48 Z" 
                            : "M 90 48 C 112 48, 130 48, 140 30 C 144 22, 147 17, 150 17 C 153 17, 156 22, 160 30 C 170 48, 188 48, 210 48 Z"} 
                          fill="url(#cell05ParkinsonGrad)"
                          style={{ transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
                        />

                        {/* Main Smooth Gaussian Fluorescence Emission Curve */}
                        <path
                          d={assayRunning 
                            ? "M 10 48 L 90 48 C 112 48, 130 48, 140 26 C 144 16, 147 11, 150 11 C 153 11, 156 16, 160 26 C 170 48, 188 48, 210 48 L 230 48"
                            : "M 10 48 L 90 48 C 112 48, 130 48, 140 30 C 144 22, 147 17, 150 17 C 153 17, 156 22, 160 30 C 170 48, 188 48, 210 48 L 230 48"}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.2"
                          style={{ transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}
                        />

                        {/* Peak Dropdown Hairline & Apex Dot */}
                        <line x1="150" y1={assayRunning ? 11 : 17} x2="150" y2="48" stroke="rgba(16, 185, 129, 0.35)" strokeDasharray="2 2" />
                        <circle cx="150" cy={assayRunning ? 11 : 17} r="2.5" fill="#10b981" />

                        {/* Peak Label Positioned Cleanly Above Curve */}
                        <text x="150" y="8" fill="#10b981" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">
                          piRNA-708 (λ 560nm)
                        </text>
                      </g>
                    )}

                    {/* Active Laser Scanning Sweep */}
                    {laserScanX > 0 && (
                      <g>
                        <line
                          x1={laserScanX}
                          y1="6"
                          x2={laserScanX}
                          y2="54"
                          stroke={activePanel === 'cervical' ? '#38bdf8' : '#10b981'}
                          strokeWidth="1.5"
                          opacity="0.9"
                        />
                        <rect
                          x={Math.max(10, laserScanX - 12)}
                          y="6"
                          width="12"
                          height="48"
                          fill={activePanel === 'cervical' ? '#38bdf8' : '#10b981'}
                          opacity="0.16"
                        />
                      </g>
                    )}
                  </svg>

                  <div className="atlas-trace-bottom">
                    <span>PANEL: {activePanel === 'cervical' ? 'CERVICAL (ONCO-PANEL)' : "PARKINSON'S (NEURO-PANEL)"}</span>
                    <span>CARRYOVER: ZERO CONTAMINATION</span>
                  </div>
                </div>

                <div className="atlas-controls-subrow">
                  <div className="atlas-mini-pills">
                    <button
                      className={`atlas-mini-pill ${activePanel === 'cervical' ? 'active' : ''}`}
                      onClick={() => { setActivePanel('cervical'); setSignalIntensity(4.6); }}
                    >
                      Cervical Panel
                    </button>
                    <button
                      className={`atlas-mini-pill ${activePanel === 'parkinson' ? 'active' : ''}`}
                      onClick={() => { setActivePanel('parkinson'); setSignalIntensity(3.8); }}
                    >
                      Parkinson's Panel
                    </button>
                  </div>

                  <button 
                    className="atlas-trigger-btn"
                    onClick={runPanelAssay}
                    title="Simulate Automated Assay Processing"
                  >
                    <Play size={11} color={activePanel === 'cervical' ? '#38bdf8' : '#10b981'} fill={activePanel === 'cervical' ? '#38bdf8' : '#10b981'} />
                    <span>Run {activePanel === 'cervical' ? 'Cervical' : "Parkinson's"} Scan</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="home-feat-cell-content">
              <span className="home-feat-cell-index">05 // AI POWERED AUTOMATION // CLINICAL PLATFORM</span>
              <h3>
                <a href="#platform" className="home-feat-cell-title">
                  <span>Automated Platform for Non-Invasive Diagnosis</span>
                  <MoveRight size={16} className="home-feat-cell-title-arrow" />
                </a>
              </h3>
              <p className="home-feat-cell-blurb">
                Fully integrated clinical instrument integrating intelligent liquid handling, dedicated Buffers Chamber, and Sample/Cassette Port for contamination-free, rapid non-invasive diagnosis of Cervical Cancer and Parkinson’s Disease.
              </p>

              <div className="atlas-specs-row">
                <span className="atlas-spec-badge">
                  <strong>Indications:</strong> Cervical Cancer &amp; Parkinson’s
                </span>
                <span className="atlas-spec-badge">
                  <strong>Hardware Callouts:</strong> Buffers Chamber • Sample Port
                </span>
                <span className="atlas-spec-badge">
                  <strong>Format:</strong> Closed Cassette Liquid Biopsy
                </span>
                <span className="atlas-spec-badge">
                  <strong>Contamination:</strong> Zero Carryover
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
