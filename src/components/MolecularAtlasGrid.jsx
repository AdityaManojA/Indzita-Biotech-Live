import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MoveRight, Zap, Activity, Layers, RotateCw, Play, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function MolecularAtlasGrid() {
  // -------------------------------------------------------------
  // Cell 01: Centrifugal Blood Fractionation State (Zero Biopsy)
  // -------------------------------------------------------------
  const [bloodSpinning, setBloodSpinning] = useState(false);
  const [bloodSeparated, setBloodSeparated] = useState(true);

  const triggerBloodCentrifuge = () => {
    if (bloodSpinning) return;
    setBloodSpinning(true);
    setBloodSeparated(false);
    setTimeout(() => {
      setBloodSeparated(true);
      setBloodSpinning(false);
    }, 1200);
  };

  // Periodic subtle spin re-check
  useEffect(() => {
    const timer = setInterval(() => {
      if (!bloodSpinning) {
        setBloodSpinning(true);
        setTimeout(() => {
          setBloodSpinning(false);
          setBloodSeparated(true);
        }, 1000);
      }
    }, 6200);
    return () => clearInterval(timer);
  }, [bloodSpinning]);

  // -------------------------------------------------------------
  // Cell 02: Magnetic Bead piRNA Size Capture (26-32 nt)
  // -------------------------------------------------------------
  const [magneticCaptured, setMagneticCaptured] = useState(true);
  const [beadYield, setBeadYield] = useState(99.1);

  const toggleMagneticCapture = () => {
    setMagneticCaptured(prev => !prev);
    setBeadYield(prev => (prev === 99.1 ? 99.4 : 99.1));
  };

  // -------------------------------------------------------------
  // Cell 03: Nanopore Single-Molecule Pulse Simulation
  // -------------------------------------------------------------
  const [pulseActive, setPulseActive] = useState(false);
  const [poreCurrent, setPoreCurrent] = useState(120.0);
  const [pulseCount, setPulseCount] = useState(152);

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

  // -------------------------------------------------------------
  // Cell 04: Bioreactor Dynamic Micro-Stirring RPM
  // -------------------------------------------------------------
  const [bioreactorRpm, setBioreactorRpm] = useState(65);
  const [vortexAngle, setVortexAngle] = useState(0);

  const cycleRpm = () => {
    if (bioreactorRpm === 40) setBioreactorRpm(65);
    else if (bioreactorRpm === 65) setBioreactorRpm(90);
    else setBioreactorRpm(40);
  };

  useEffect(() => {
    const intervalTime = bioreactorRpm === 90 ? 30 : bioreactorRpm === 65 ? 45 : 70;
    const timer = setInterval(() => {
      setVortexAngle(prev => (prev + 10) % 360);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [bioreactorRpm]);

  // -------------------------------------------------------------
  // Cell 05: Closed Cassette Fluidic Dual Panel Runner
  // -------------------------------------------------------------
  const [activePanel, setActivePanel] = useState('cervical');
  const [assayRunning, setAssayRunning] = useState(false);
  const [fluidPulsePos, setFluidPulsePos] = useState(220);

  const runPanelAssay = () => {
    if (assayRunning) return;
    setAssayRunning(true);
    setFluidPulsePos(40);

    setTimeout(() => {
      setFluidPulsePos(130);
    }, 500);

    setTimeout(() => {
      setFluidPulsePos(210);
      setAssayRunning(false);
    }, 1100);
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

        {/* The 5-Cell Bento Atlas Grid */}
        <div className="home-features-atlas">

          {/* ========================================================= */}
          {/* Cell 01: Non-Invasive Blood Screening (Centrifugal Liquid Biopsy) */}
          {/* ========================================================= */}
          <article className="home-feat-cell" id="atlas-cell-blood-sample">
            <div className="home-feat-cell-stage">
              <div className="atlas-stage-container">
                <div className="atlas-oscilloscope-box">
                  <div className="atlas-trace-top">
                    <span style={{ color: '#a1a1aa' }}>BLOOD FRACTIONATION TRACE</span>
                    <span style={{ color: bloodSpinning ? '#38bdf8' : '#10b981', fontWeight: 700 }}>
                      {bloodSpinning ? 'SPINNING: 2,000 x g' : 'CELL-FREE PLASMA READY'}
                    </span>
                  </div>

                  <svg width="100%" height="64" viewBox="0 0 240 64" preserveAspectRatio="none">
                    {/* Centrifuge Separation Chamber / Micro-Tube Tube Outline */}
                    <rect x="20" y="16" width="200" height="32" rx="16" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />

                    {bloodSeparated ? (
                      <>
                        {/* Erythrocyte Packed Cellular Layer (Left/Bottom) */}
                        <path d="M 20 16 L 95 16 L 95 48 L 20 48 Z" fill="#7f1d1d" opacity="0.9" />
                        
                        {/* Buffy Coat Interface Line (Leukocytes / Platelets) */}
                        <line x1="95" y1="16" x2="95" y2="48" stroke="#fef08a" strokeWidth="3" opacity="0.85" />

                        {/* Supernatant Plasma Layer containing intact 26-32 nt piRNA */}
                        <path d="M 98 16 L 204 16 A 16 16 0 0 1 220 32 A 16 16 0 0 1 204 48 L 98 48 Z" fill="#0284c7" opacity="0.35" />

                        {/* Floating piRNA Biomarker Particles */}
                        <circle cx="125" cy="30" r="2.5" fill="#38bdf8" />
                        <circle cx="150" cy="24" r="2" fill="#38bdf8" />
                        <circle cx="170" cy="36" r="2.5" fill="#38bdf8" />
                        <circle cx="195" cy="28" r="2" fill="#38bdf8" />
                      </>
                    ) : (
                      /* Whole Unfractionated Blood during vortex mixing */
                      <rect x="20" y="16" width="200" height="32" rx="16" fill="#991b1b" opacity="0.95">
                        <animate attributeName="opacity" values="0.75;1;0.75" dur="0.3s" repeatCount="indefinite" />
                      </rect>
                    )}

                    {/* Measurement Graduation Markings */}
                    <line x1="60" y1="20" x2="60" y2="28" stroke="#71717a" strokeWidth="1" />
                    <line x1="100" y1="20" x2="100" y2="28" stroke="#71717a" strokeWidth="1" />
                    <line x1="140" y1="20" x2="140" y2="28" stroke="#71717a" strokeWidth="1" />
                    <line x1="180" y1="20" x2="180" y2="28" stroke="#71717a" strokeWidth="1" />
                  </svg>

                  <div className="atlas-trace-bottom">
                    <span>SAMPLE: 5 mL WHOLE BLOOD</span>
                    <span>FRACTION: PLASMA &amp; piRNA</span>
                  </div>
                </div>

                <button 
                  className="atlas-trigger-btn"
                  onClick={triggerBloodCentrifuge}
                  title="Simulate Centrifugal Separation of Plasma piRNA"
                >
                  <Activity size={11} color="#38bdf8" />
                  <span>Run Fractionation (Zero Biopsy)</span>
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
          {/* Cell 02: Proprietary piRNA Isolation Kit (Magnetic Bead Capture) */}
          {/* ========================================================= */}
          <article className="home-feat-cell" id="atlas-cell-isolation-kit">
            <div className="home-feat-cell-stage">
              <div className="atlas-stage-container">
                <div className="atlas-oscilloscope-box">
                  <div className="atlas-trace-top">
                    <span style={{ color: '#a1a1aa' }}>MAGNETIC BEAD piRNA BINDING</span>
                    <span style={{ color: magneticCaptured ? '#c084fc' : '#a1a1aa', fontWeight: 700 }}>
                      {magneticCaptured ? 'MAGNETIC PINCH (26–32 nt)' : 'DIFFUSE SUSPENSION'}
                    </span>
                  </div>

                  <svg width="100%" height="64" viewBox="0 0 240 64" preserveAspectRatio="none">
                    {/* Isolation Micro-Column Wall */}
                    <rect x="20" y="14" width="165" height="36" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
                    
                    {/* Neodymium Magnetic Pole Block (Right) */}
                    <rect x="195" y="12" width="25" height="40" rx="3" fill="#2e1065" stroke="#7c3aed" strokeWidth="1.5" />
                    <text x="207" y="36" fill="#c084fc" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">N</text>

                    {/* Magnetic Flux Lines when active */}
                    {magneticCaptured && (
                      <>
                        <path d="M 195 20 C 175 14, 155 14, 135 20" fill="none" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                        <path d="M 195 44 C 175 50, 155 50, 135 44" fill="none" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                      </>
                    )}

                    {/* Paramagnetic Nanobeads with Bound piRNA */}
                    {magneticCaptured ? (
                      /* Concentrated Magnetic Bead Band Snapped to Wall */
                      <g style={{ transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        <circle cx="172" cy="22" r="3.5" fill="#a855f7" />
                        <circle cx="178" cy="28" r="4.5" fill="#c084fc" />
                        <circle cx="173" cy="35" r="4" fill="#a855f7" />
                        <circle cx="180" cy="42" r="3.5" fill="#c084fc" />
                        <circle cx="166" cy="28" r="3" fill="#9333ea" />
                        <circle cx="168" cy="39" r="3" fill="#9333ea" />
                        {/* Unbound Waste Particles Washing Out */}
                        <circle cx="60" cy="32" r="1.5" fill="#52525b" />
                        <circle cx="85" cy="26" r="1.5" fill="#52525b" />
                      </g>
                    ) : (
                      /* Diffuse suspension before magnetic pull */
                      <g style={{ transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                        <circle cx="50" cy="24" r="3.5" fill="#a855f7" />
                        <circle cx="85" cy="38" r="4.5" fill="#c084fc" />
                        <circle cx="120" cy="22" r="4" fill="#a855f7" />
                        <circle cx="145" cy="36" r="3.5" fill="#c084fc" />
                        <circle cx="100" cy="44" r="3" fill="#9333ea" />
                      </g>
                    )}
                  </svg>

                  <div className="atlas-trace-bottom">
                    <span>PURITY: A260/A280 ≥ 1.95</span>
                    <span>SIZE TARGET: 26–32 nt</span>
                  </div>
                </div>

                <button 
                  className="atlas-trigger-btn"
                  onClick={toggleMagneticCapture}
                  title="Toggle Magnetic Separation Field"
                >
                  <Layers size={11} color="#c084fc" />
                  <span>{magneticCaptured ? 'Release Beads' : 'Snap Magnetic Field (26–32 nt)'}</span>
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
          {/* Cell 03: Nanopore Single-Molecule Pulse Translocation */}
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
                    <span style={{ color: '#a1a1aa' }}>12-WELL VORTEX STIRRING</span>
                    <span style={{ color: '#f59e0b', fontWeight: 700 }}>
                      {bioreactorRpm} RPM CONSTANT
                    </span>
                  </div>

                  <svg width="100%" height="64" viewBox="0 0 240 64" preserveAspectRatio="none">
                    {/* Culture Plate Row Baseline */}
                    <rect x="10" y="8" width="220" height="48" rx="6" fill="#141417" stroke="#27272a" strokeWidth="1" />

                    {/* 6 Visible Organoid Wells along the front row */}
                    {[28, 65, 102, 138, 175, 212].map((cx, i) => (
                      <g key={i}>
                        {/* Well Aperture */}
                        <circle cx={cx} cy="32" r="14" fill="#1f1f23" stroke="#3f3f46" strokeWidth="1" />
                        
                        {/* Stirring Vortex Streamlines */}
                        <ellipse 
                          cx={cx} 
                          cy="32" 
                          rx="9" 
                          ry="7" 
                          fill="none" 
                          stroke="#f59e0b" 
                          strokeWidth="1.2" 
                          strokeDasharray="5 3"
                          transform={`rotate(${vortexAngle * (i % 2 === 0 ? 1 : -1)}, ${cx}, 32)`}
                        />

                        {/* Center Organoid Spheroid */}
                        <circle cx={cx} cy="32" r="3" fill="#fbbf24" opacity="0.9" />
                      </g>
                    ))}
                  </svg>

                  <div className="atlas-trace-bottom">
                    <span>SHEAR: 0.018 Pa (SAFE)</span>
                    <span>INCUBATOR COMPATIBLE</span>
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
                    <span style={{ color: '#a1a1aa' }}>CLOSED CASSETTE FLUIDIC LOGIC</span>
                    <span style={{ color: '#06b6d4', fontWeight: 700 }}>
                      PANEL: {activePanel === 'cervical' ? 'CERVICAL CANCER' : "PARKINSON'S"}
                    </span>
                  </div>

                  <svg width="100%" height="64" viewBox="0 0 240 64" preserveAspectRatio="none">
                    {/* Buffers Chamber Reservoir (Left) */}
                    <rect x="15" y="16" width="36" height="32" rx="3" fill="#164e63" stroke="#0891b2" strokeWidth="1" />
                    <text x="33" y="35" fill="#67e8f9" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle">BUFFERS</text>

                    {/* Microfluidic Connecting Channel */}
                    <path 
                      d="M 51 32 L 85 32 L 85 22 L 135 22 L 135 32 L 175 32" 
                      fill="none" 
                      stroke="#27272a" 
                      strokeWidth="3" 
                    />
                    
                    {/* Moving Reagent / Sample Pulse */}
                    <circle cx={fluidPulsePos} cy={fluidPulsePos < 85 ? 32 : fluidPulsePos < 135 ? 22 : 32} r="4" fill="#06b6d4">
                      {assayRunning && (
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="0.2s" repeatCount="indefinite" />
                      )}
                    </circle>

                    {/* Cassette Reaction Chamber (Right) */}
                    <rect x="175" y="14" width="50" height="36" rx="4" fill="#155e75" stroke="#06b6d4" strokeWidth="1.2" />
                    <text x="200" y="30" fill="#cffafe" fontSize="7" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="bold">
                      {activePanel === 'cervical' ? 'CC-piRNA' : 'PD-piRNA'}
                    </text>
                    <text x="200" y="42" fill="#a5f3fc" fontSize="6" fontFamily="var(--font-mono)" textAnchor="middle">
                      {assayRunning ? 'ANALYZING...' : 'QC VALIDATED'}
                    </text>
                  </svg>

                  <div className="atlas-trace-bottom">
                    <span>CARRIER: CLOSED CASSETTE</span>
                    <span>CONTAMINATION: ZERO CARRYOVER</span>
                  </div>
                </div>

                <div className="atlas-controls-subrow">
                  <div className="atlas-mini-pills">
                    <button
                      className={`atlas-mini-pill ${activePanel === 'cervical' ? 'active' : ''}`}
                      onClick={() => setActivePanel('cervical')}
                    >
                      Cervical Panel
                    </button>
                    <button
                      className={`atlas-mini-pill ${activePanel === 'parkinson' ? 'active' : ''}`}
                      onClick={() => setActivePanel('parkinson')}
                    >
                      Parkinson's Panel
                    </button>
                  </div>

                  <button 
                    className="atlas-trigger-btn"
                    onClick={runPanelAssay}
                    title="Simulate Automated Assay Processing"
                  >
                    <Play size={11} color="#06b6d4" fill="#06b6d4" />
                    <span>Run {activePanel === 'cervical' ? 'Cervical' : "Parkinson's"} Assay</span>
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
