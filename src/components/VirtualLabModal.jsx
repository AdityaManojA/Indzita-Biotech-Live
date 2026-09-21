import React, { useState, useEffect } from 'react';
import { X, Play, RefreshCw, Check, ArrowRight, Printer, Download, Sliders } from 'lucide-react';
import { simulationPresets, companyData } from '../data/indzitaData';

export default function VirtualLabModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [selectedPanelKey, setSelectedPanelKey] = useState('cervical');
  const [sampleId, setSampleId] = useState('IZB-2026-CC-9042');
  const [currentStage, setCurrentStage] = useState(1);
  const [simCycle, setSimCycle] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [thresholdCt, setThresholdCt] = useState(24.0);

  const activePreset = simulationPresets[selectedPanelKey];

  const handleDownloadRecord = () => {
    const content = `=====================================================
INDZITA BIOTECH PRIVATE LIMITED
AUTOMATED MOLECULAR DIAGNOSTIC EVALUATION REPORT
=====================================================
Specimen ID:       ${sampleId}
Date / Timestamp:  ${new Date().toISOString()}
Validation Hub:    BRIC-Rajiv Gandhi Centre for Biotechnology (BRIC-RGCB)
Grant Reference:   MAHA MedTech Mission (ANRF / ICMR / Gates Foundation)
Assay Panel:       ${activePreset.panelName}
Sample Format:     ${activePreset.sampleType} (Non-Invasive Peripheral Blood)
Biomarker Target:  ${activePreset.biomarkerTarget} (26-32 nt small non-coding RNA)
Observed Ct:       ${activePreset.baselineCt}
Cutoff Reference:  < ${activePreset.cutOffCt}
Selected Threshold: Ct = ${thresholdCt.toFixed(1)}
Differential:      +4.6x Elevation over Healthy Baseline
QC Status:         PASS (Internal RNU6 Reference: 16.8)
Diagnostic Call:   ${activePreset.riskThreshold}
Clinical Guidance: ${activePreset.recommendation}
=====================================================
Instrumentation:   IndZita Automated Diagnostic Platform v2.6
Status:            CLINICALLY VERIFIED
=====================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IndZita-Report-${sampleId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    let timer;
    if (currentStage === 3 && isRunning && simCycle < 40) {
      timer = setTimeout(() => {
        setSimCycle(prev => prev + 1);
      }, 80);
    } else if (currentStage === 3 && simCycle >= 40) {
      setIsRunning(false);
      setTimeout(() => {
        setCurrentStage(4);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [currentStage, isRunning, simCycle]);

  const handleStartRun = () => {
    setCurrentStage(2);
    setTimeout(() => {
      setCurrentStage(3);
      setSimCycle(0);
      setIsRunning(true);
    }, 1500);
  };

  const handleReset = () => {
    setCurrentStage(1);
    setSimCycle(0);
    setIsRunning(false);
  };

  const getCurvePoints = (maxCycle) => {
    const points = [];
    const width = 640;
    const height = 180;
    
    for (let c = 1; c <= maxCycle; c++) {
      const x = (c / 40) * width;
      const steepness = selectedPanelKey === 'cervical' ? 0.45 : 0.4;
      const midpoint = selectedPanelKey === 'cervical' ? 24 : 25.5;
      const ampValue = 160 / (1 + Math.exp(-steepness * (c - midpoint)));
      const y = height - ampValue - 10;
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="modal-backdrop-clean" onClick={onClose}>
      <div className="modal-window-clean" onClick={(e) => e.stopPropagation()} id="virtual-lab-modal">
        {/* Minimalist Topbar */}
        <div className="modal-topbar-clean">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-ink)' }}>
              LABORATORY WORKSTATION // piRNA AUTOMATED ANALYZER
            </span>
          </div>
          <button 
            onClick={onClose} 
            aria-label="Close Workstation"
            id="btn-modal-close"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-clean">
          {/* Minimalist Stage Indicator */}
          <div className="sim-stage-nav">
            {['1. Assay Selection', '2. Cartridge Docking', '3. Thermal qPCR', '4. Diagnostic Readout'].map((st, i) => {
              const stageNum = i + 1;
              const isActive = currentStage === stageNum;
              const isCompleted = currentStage > stageNum;
              const isUpcoming = currentStage < stageNum;

              return (
                <div 
                  key={i}
                  className={`sim-stage-tab ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isUpcoming ? 'upcoming' : ''}`}
                  onClick={() => isCompleted && setCurrentStage(stageNum)}
                  title={isCompleted ? `Return to Stage ${stageNum}` : undefined}
                >
                  {isCompleted && <Check size={12} color="var(--text-ink)" style={{ flexShrink: 0 }} />}
                  <span>{st}</span>
                </div>
              );
            })}
          </div>

          {/* STAGE 1: Assay Setup */}
          {currentStage === 1 && (
            <div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Select Molecular Assay Panel</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Choose the clinical biomarker protocol to execute on the automated platform:
              </p>

              <div className="sim-panel-grid">
                <div 
                  onClick={() => {
                    setSelectedPanelKey('cervical');
                    setSampleId('IZB-2026-CC-9042');
                  }}
                  style={{
                    padding: '24px',
                    cursor: 'pointer',
                    background: selectedPanelKey === 'cervical' ? 'var(--bg-subtle)' : 'var(--bg-surface)',
                    border: `2px solid ${selectedPanelKey === 'cervical' ? 'var(--text-ink)' : 'var(--border-hairline)'}`,
                    borderRadius: 'var(--radius-xs)',
                    transition: 'all 0.15s ease'
                  }}
                  id="panel-select-cervical"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>ONCOLOGY</span>
                    {selectedPanelKey === 'cervical' && <Check size={16} color="var(--text-ink)" />}
                  </div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Cervical Cancer piRNA Assay</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                    Translates dysregulated small non-coding RNA signatures from painless liquid swabs.
                  </p>
                  <div style={{ marginTop: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    TARGET: piR-hsa-8201 / 16442
                  </div>
                </div>

                <div 
                  onClick={() => {
                    setSelectedPanelKey('parkinsons');
                    setSampleId('IZB-2026-PD-4108');
                  }}
                  style={{
                    padding: '24px',
                    cursor: 'pointer',
                    background: selectedPanelKey === 'parkinsons' ? 'var(--bg-subtle)' : 'var(--bg-surface)',
                    border: `2px solid ${selectedPanelKey === 'parkinsons' ? 'var(--text-ink)' : 'var(--border-hairline)'}`,
                    borderRadius: 'var(--radius-xs)',
                    transition: 'all 0.15s ease'
                  }}
                  id="panel-select-parkinsons"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>NEUROLOGY</span>
                    {selectedPanelKey === 'parkinsons' && <Check size={16} color="var(--text-ink)" />}
                  </div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Parkinson's Disease Assay</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-body)', lineHeight: 1.5 }}>
                    Ultrasensitive detection of early neuro-degenerative micro-transcripts from biofluids.
                  </p>
                  <div style={{ marginTop: '14px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    TARGET: piR-neuro-9188 signature
                  </div>
                </div>
              </div>

              {/* Barcode Input */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  SPECIMEN SERIAL BARCODE:
                </label>
                <input 
                  type="text" 
                  value={sampleId} 
                  onChange={(e) => setSampleId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--text-ink)',
                    fontSize: '0.92rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                  id="input-sample-id"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" onClick={handleStartRun} id="btn-start-docking">
                  <span>Dock Cartridge &amp; Initialize</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: Docking Animation */}
          {currentStage === 2 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <RefreshCw size={36} color="var(--text-ink)" style={{ animation: 'spin 1.5s linear infinite', margin: '0 auto 20px' }} />
              <h4 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Hermetic Cartridge Docking in Progress</h4>
              <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 20px', fontSize: '0.9rem' }}>
                Verifying microfluidic cassette calibration, dispensing lysis reagents, and priming optics.
              </p>
              <div style={{ display: 'inline-block', padding: '6px 14px', background: 'var(--bg-subtle)', border: '1px solid var(--border-hairline)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-ink)' }}>
                CASSETTE SEAL ENGAGED // ZERO CARRYOVER LOCK
              </div>
            </div>
          )}

          {/* STAGE 3: Real-Time qPCR Run */}
          {currentStage === 3 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div>
                  <h4 style={{ fontSize: '1.2rem' }}>Multiplex qPCR Thermal Run // Optical Telemetry</h4>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    ASSAY: {activePreset.panelName}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-ink)' }}>
                    CYCLE {simCycle} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ 40</span>
                  </div>
                </div>
              </div>

              {/* Minimalist Grayscale qPCR Graph Canvas */}
              <div className="qpcr-clean-canvas">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a', marginBottom: '8px' }}>
                  <span>FLUORESCENCE (RFU × 10³)</span>
                  <span style={{ color: '#ffffff' }}>THRESHOLD: Ct = {thresholdCt.toFixed(1)}</span>
                </div>

                <svg viewBox="0 0 640 200" style={{ width: '100%', height: '220px', overflow: 'visible' }}>
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="640" y2="50" stroke="#27272a" strokeDasharray="3" />
                  <line x1="0" y1="100" x2="640" y2="100" stroke="#27272a" strokeDasharray="3" />
                  <line x1="0" y1="150" x2="640" y2="150" stroke="#27272a" strokeDasharray="3" />

                  {/* Dynamic Threshold Cutoff Line */}
                  <line 
                    x1="0" 
                    y1={Math.max(40, Math.min(170, 180 - (thresholdCt - 18) * 8))} 
                    x2="640" 
                    y2={Math.max(40, Math.min(170, 180 - (thresholdCt - 18) * 8))} 
                    stroke="#71717a" 
                    strokeWidth="1.5" 
                    strokeDasharray="5" 
                  />
                  <text 
                    x="12" 
                    y={Math.max(34, Math.min(164, 174 - (thresholdCt - 18) * 8))} 
                    fill="#a1a1aa" 
                    fontFamily="var(--font-mono)" 
                    fontSize="10"
                  >
                    Clinical Cutoff Threshold (Ct = {thresholdCt.toFixed(1)})
                  </text>

                  {/* Negative Control Line */}
                  <line x1="0" y1="184" x2="640" y2="184" stroke="#3f3f46" strokeWidth="1.2" />
                  <text x="520" y="178" fill="#52525b" fontFamily="var(--font-mono)" fontSize="10">Internal Neg. Control</text>

                  {/* Active Amplification Curve */}
                  {simCycle > 0 && (
                    <polyline
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={getCurvePoints(simCycle)}
                    />
                  )}
                </svg>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#71717a', marginTop: '6px' }}>
                  <span>CYC 0</span>
                  <span>CYC 10</span>
                  <span>CYC 20</span>
                  <span>CYC 30</span>
                  <span>CYC 40</span>
                </div>
              </div>

              {/* Threshold Calibration Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-subtle)', padding: '8px 14px', borderRadius: 'var(--radius-xs)', margin: '12px 0 16px', border: '1px solid var(--border-hairline)' }}>
                <Sliders size={13} color="var(--text-muted)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  CALIBRATE CUTOFF:
                </span>
                <input 
                  type="range" 
                  min="18" 
                  max="35" 
                  step="0.5" 
                  value={thresholdCt} 
                  onChange={(e) => setThresholdCt(parseFloat(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--text-ink)', cursor: 'pointer' }}
                  title="Adjust Clinical Threshold Cutoff"
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-ink)' }}>
                  Ct = {thresholdCt.toFixed(1)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {simCycle < 24 ? ">> Baseline optical normalization in progress..." : ">> Exponential inflection detected. Computing Ct..."}
                </span>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSimCycle(40)}
                >
                  Skip to End
                </button>
              </div>
            </div>
          )}

          {/* STAGE 4: Clean Clinical Report Sheet */}
          {currentStage === 4 && (
            <div>
              <div style={{ border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-xs)', padding: '32px', background: '#ffffff', color: '#09090b' }} id="sim-clinical-report">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #09090b', paddingBottom: '16px', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>INDZITA BIOTECH PVT. LTD.</h3>
                    <div style={{ fontSize: '0.82rem', color: '#52525b' }}>Automated Molecular Diagnostics Decision Support</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700 }}>
                      [STATUS: VERIFIED]
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#71717a' }}>
                      REF: {sampleId}-EVAL
                    </div>
                  </div>
                </div>

                <div className="sim-report-meta-grid">
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Specimen ID</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{sampleId}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Assay Panel</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{activePreset.panelName}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Sample Format</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{activePreset.sampleType}</div>
                  </div>
                </div>

                <div className="sim-table-scroll-container">
                  <table style={{ width: '100%', minWidth: '540px', borderCollapse: 'collapse', margin: '16px 0', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#09090b', color: '#ffffff', textAlign: 'left' }}>
                        <th style={{ padding: '8px 12px' }}>Target Marker</th>
                        <th style={{ padding: '8px 12px' }}>Observed Ct</th>
                        <th style={{ padding: '8px 12px' }}>Cutoff Ref</th>
                        <th style={{ padding: '8px 12px' }}>Differential</th>
                        <th style={{ padding: '8px 12px' }}>Diagnostic Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                        <td style={{ padding: '10px 12px', fontWeight: 600 }}>{activePreset.biomarkerTarget}</td>
                        <td style={{ padding: '10px 12px', fontWeight: 700 }}>{activePreset.baselineCt}</td>
                        <td style={{ padding: '10px 12px' }}>&lt; {activePreset.cutOffCt}</td>
                        <td style={{ padding: '10px 12px', fontWeight: 700 }}>+4.6× Elevation</td>
                        <td style={{ padding: '10px 12px' }}>
                          <span style={{ padding: '3px 8px', background: '#09090b', color: '#ffffff', borderRadius: '2px', fontSize: '0.72rem', fontWeight: 700 }}>
                            {activePreset.riskThreshold}
                          </span>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e4e4e7' }}>
                        <td style={{ padding: '10px 12px' }}>Internal Reference (RNU6)</td>
                        <td style={{ padding: '10px 12px' }}>16.8</td>
                        <td style={{ padding: '10px 12px' }}>15.0 - 18.0</td>
                        <td style={{ padding: '10px 12px' }}>Nominal</td>
                        <td style={{ padding: '10px 12px', fontWeight: 600 }}>QC PASS</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ background: '#f4f4f5', borderLeft: '3px solid #09090b', padding: '14px', marginTop: '16px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#09090b', marginBottom: '2px' }}>
                    Clinical Actionable Interpretation:
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#3f3f46' }}>
                    {activePreset.recommendation}
                  </div>
                </div>

                <div className="sim-report-footer" style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px solid #e4e4e7', display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#71717a', flexWrap: 'wrap', gap: '8px' }}>
                  <span>Validation partner: BRIC - RGCB / Karkinos Multi-Center Cohort</span>
                  <span>Instrumentation: IndZita Automated Platform v2.6</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="sim-report-actions">
                <button className="btn btn-secondary btn-sm" onClick={handleReset} id="btn-sim-run-another">
                  <RefreshCw size={13} />
                  <span>Run Another Specimen</span>
                </button>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    onClick={handleDownloadRecord}
                    id="btn-sim-download"
                    title="Download Official Clinical Evaluation Record"
                  >
                    <Download size={13} />
                    <span>Download Record (.txt)</span>
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    onClick={() => window.print()}
                    id="btn-sim-print"
                    title="Print Clinical Evaluation Report"
                  >
                    <Printer size={13} />
                    <span>Print Report</span>
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={onClose} id="btn-sim-done">
                    <span>Close Terminal</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
