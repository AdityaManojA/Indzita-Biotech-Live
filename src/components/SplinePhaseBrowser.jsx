import React, { useState, useEffect, useRef } from 'react';
import { workflowSteps } from '../data/indzitaData';
import { 
  Play, 
  RotateCw, 
  Eye, 
  Layers, 
  Maximize2, 
  Minimize2, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  Sparkles,
  RefreshCw,
  ExternalLink,
  Plus,
  Minus,
  RotateCcw
} from 'lucide-react';

export default function SplinePhaseBrowser({ activeStepIndex, setActiveStepIndex, onOpenSimulator }) {
  const [engineMode, setEngineMode] = useState('canvas'); // 'canvas' or 'spline-cloud'
  const [autoRotate, setAutoRotate] = useState(true);
  const [splineUrl, setSplineUrl] = useState('https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode');
  const [splineLoadError, setSplineLoadError] = useState(false);
  const [splineLoading, setSplineLoading] = useState(false);
  const [SplineComponent, setSplineComponent] = useState(null);

  // 3D Canvas References & State
  const canvasRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isPinchingRef = useRef(false);
  const initialPinchDistRef = useRef(null);
  const initialPinchZoomRef = useRef(1.0);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  
  // Camera angles and distance with mobile-responsive initial zoom
  const isInitialMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const cameraRef = useRef({
    yaw: 0.35,       // horizontal angle around Y
    pitch: 0.22,     // vertical tilt
    zoom: isInitialMobile ? 0.55 : 1.1,       // camera distance scale
    targetYaw: 0.35,
    targetPitch: 0.22,
    targetZoom: isInitialMobile ? 0.55 : 1.1
  });

  const [telemetry, setTelemetry] = useState({
    camX: '0.00',
    camY: '0.00',
    camZ: '1.10',
    yawDeg: '20.0°',
    pitchDeg: '12.6°',
    phasePct: '0%'
  });

  const activeStep = workflowSteps[activeStepIndex];

  // Tactile Zoom Handlers
  const handleZoomIn = () => {
    cameraRef.current.targetZoom = Math.min(2.5, cameraRef.current.targetZoom + 0.2);
  };

  const handleZoomOut = () => {
    cameraRef.current.targetZoom = Math.max(0.30, cameraRef.current.targetZoom - 0.2);
  };

  const handleResetView = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    cameraRef.current.targetYaw = 0.35;
    cameraRef.current.targetPitch = 0.22;
    cameraRef.current.targetZoom = isMobile ? 0.55 : 1.1;
  };

  // Lazy load @splinetool/react-spline when switching to spline-cloud mode
  useEffect(() => {
    if (engineMode === 'spline-cloud' && !SplineComponent) {
      setSplineLoading(true);
      import('@splinetool/react-spline')
        .then((module) => {
          setSplineComponent(() => module.default);
          setSplineLoading(false);
        })
        .catch((err) => {
          console.warn('Spline module load notice:', err);
          setSplineLoadError(true);
          setSplineLoading(false);
        });
    }
  }, [engineMode, SplineComponent]);

  // Adjust camera target when active phase changes
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const baseZoom = isMobile ? 0.55 : 1.25;

    const phaseAngles = [
      { yaw: -0.65, pitch: 0.25, zoom: baseZoom }, // Phase 1
      { yaw: -0.32, pitch: 0.15, zoom: baseZoom * 0.96 }, // Phase 2
      { yaw: 0.00,  pitch: 0.28, zoom: baseZoom * 1.04 }, // Phase 3 (Center)
      { yaw: 0.32,  pitch: 0.18, zoom: baseZoom * 0.96 }, // Phase 4
      { yaw: 0.65,  pitch: 0.26, zoom: baseZoom }  // Phase 5
    ];

    const target = phaseAngles[activeStepIndex] || phaseAngles[0];
    cameraRef.current.targetYaw = target.yaw;
    cameraRef.current.targetPitch = target.pitch;
    cameraRef.current.targetZoom = target.zoom;
  }, [activeStepIndex]);

  // Interactive 3D Spline Canvas Engine
  useEffect(() => {
    if (engineMode !== 'canvas') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle high DPI displays
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 3D Spline mathematical knot points across the 5 phases
    const phaseNodes3D = [
      { id: 1, title: 'Phase 01', label: 'Collection',    x: -240, y: -45, z: 80,  t: 0.10 },
      { id: 2, title: 'Phase 02', label: 'Kit Isolation', x: -120, y: 55,  z: -60, t: 0.30 },
      { id: 3, title: 'Phase 03', label: 'Amplification', x: 0,    y: -50, z: 90,  t: 0.50 },
      { id: 4, title: 'Phase 04', label: 'QPCR Analysis', x: 120,  y: 60,  z: -70, t: 0.70 },
      { id: 5, title: 'Phase 05', label: 'Report & AI',   x: 240,  y: -30, z: 75,  t: 0.90 }
    ];

    // Smooth Catmull-Rom Spline interpolation in 3D
    function getSplinePoint(p0, p1, p2, p3, t) {
      const t2 = t * t;
      const t3 = t2 * t;

      const f0 = -0.5 * t3 + t2 - 0.5 * t;
      const f1 =  1.5 * t3 - 2.5 * t2 + 1.0;
      const f2 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
      const f3 =  0.5 * t3 - 0.5 * t2;

      return {
        x: p0.x * f0 + p1.x * f1 + p2.x * f2 + p3.x * f3,
        y: p0.y * f0 + p1.y * f1 + p2.y * f2 + p3.y * f3,
        z: p0.z * f0 + p1.z * f1 + p2.z * f2 + p3.z * f3
      };
    }

    // Extended control points for smooth ends
    const splineControlPoints = [
      { x: -300, y: -70, z: 120 },
      ...phaseNodes3D,
      { x: 300, y: -20, z: 100 }
    ];

    let pulseTick = 0;

    const render = () => {
      pulseTick += 0.035;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Auto-rotation inertia
      if (autoRotate && !isDraggingRef.current) {
        cameraRef.current.targetYaw += 0.003;
      }

      // Smooth camera interpolation
      cameraRef.current.yaw += (cameraRef.current.targetYaw - cameraRef.current.yaw) * 0.08;
      cameraRef.current.pitch += (cameraRef.current.targetPitch - cameraRef.current.pitch) * 0.08;
      cameraRef.current.zoom += (cameraRef.current.targetZoom - cameraRef.current.zoom) * 0.08;

      const yaw = cameraRef.current.yaw;
      const pitch = cameraRef.current.pitch;
      const zoom = cameraRef.current.zoom;

      // Update telemetry display state once every ~10 frames
      if (Math.floor(pulseTick * 25) % 10 === 0) {
        setTelemetry({
          camX: (Math.sin(yaw) * zoom * 1.5).toFixed(2),
          camY: (Math.sin(pitch) * zoom * 1.5).toFixed(2),
          camZ: (Math.cos(yaw) * zoom * 1.5).toFixed(2),
          yawDeg: `${((yaw * 180 / Math.PI) % 360).toFixed(1)}°`,
          pitchDeg: `${(pitch * 180 / Math.PI).toFixed(1)}°`,
          phasePct: `${((activeStepIndex + 1) / 5 * 100).toFixed(0)}%`
        });
      }

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Detect active theme
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const splinePrimaryColor = isDark ? '#f4f4f5' : '#09090b';
      const splineMutedColor = isDark ? 'rgba(244, 244, 245, 0.22)' : 'rgba(9, 9, 11, 0.20)';
      const splineGridColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
      const accentGlow = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';

      const isMobile = width < 768;
      const cx = width / 2;
      const cy = height / 2;
      // Responsive base FOV ensures the trajectory is comfortably scaled to fit mobile screens
      const responsiveBaseFov = isMobile ? Math.min(220, width * 0.55) : 520;
      const fov = responsiveBaseFov * zoom;

      // 3D Perspective Projection function
      const project3D = (x, y, z) => {
        // Rotate around Y (yaw)
        const cosY = Math.cos(yaw);
        const sinY = Math.sin(yaw);
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate around X (pitch)
        const cosP = Math.cos(pitch);
        const sinP = Math.sin(pitch);
        const y2 = y * cosP - z1 * sinP;
        const z2 = z1 * cosP + y * sinP;

        // Perspective depth
        const cameraDistance = 450;
        const depth = cameraDistance + z2;
        const scale = fov / Math.max(depth, 50);

        return {
          px: cx + x1 * scale,
          py: cy + y2 * scale,
          depth: z2,
          scale: scale
        };
      };

      // 1. Draw 3D Spatial Hairline Coordinate Grid on floor
      const gridSize = 320;
      const gridSteps = 8;
      const floorY = 90;
      ctx.strokeStyle = splineGridColor;
      ctx.lineWidth = 1;

      for (let i = -gridSteps; i <= gridSteps; i += 2) {
        const pA = project3D(i * (gridSize / gridSteps), floorY, -gridSize);
        const pB = project3D(i * (gridSize / gridSteps), floorY, gridSize);
        ctx.beginPath();
        ctx.moveTo(pA.px, pA.py);
        ctx.lineTo(pB.px, pB.py);
        ctx.stroke();

        const pC = project3D(-gridSize, floorY, i * (gridSize / gridSteps));
        const pD = project3D(gridSize, floorY, i * (gridSize / gridSteps));
        ctx.beginPath();
        ctx.moveTo(pC.px, pC.py);
        ctx.lineTo(pD.px, pD.py);
        ctx.stroke();
      }

      // 2. Generate 3D Catmull-Rom Spline Samples
      const curveSamples = [];
      const samplesPerSegment = 24;

      for (let i = 0; i < splineControlPoints.length - 3; i++) {
        const p0 = splineControlPoints[i];
        const p1 = splineControlPoints[i + 1];
        const p2 = splineControlPoints[i + 2];
        const p3 = splineControlPoints[i + 3];

        for (let s = 0; s < samplesPerSegment; s++) {
          const t = s / samplesPerSegment;
          const pt3D = getSplinePoint(p0, p1, p2, p3, t);
          curveSamples.push(pt3D);
        }
      }

      // 3. Draw Dual Ribbon Spline (Simulating Molecular Double-Helix Backbone)
      const helixA = [];
      const helixB = [];

      for (let i = 0; i < curveSamples.length; i++) {
        const pt = curveSamples[i];
        const angle = i * 0.22 + pulseTick * 0.4;
        const radius = 18;
        const offsetAx = Math.cos(angle) * radius;
        const offsetAy = Math.sin(angle) * radius;
        const offsetBx = -offsetAx;
        const offsetBy = -offsetAy;

        helixA.push(project3D(pt.x + offsetAx, pt.y + offsetAy, pt.z));
        helixB.push(project3D(pt.x + offsetBx, pt.y + offsetBy, pt.z));
      }

      // Draw Molecular Cross-Rungs
      ctx.lineWidth = 1;
      for (let i = 0; i < helixA.length; i += 4) {
        const pA = helixA[i];
        const pB = helixB[i];
        ctx.strokeStyle = splineMutedColor;
        ctx.beginPath();
        ctx.moveTo(pA.px, pA.py);
        ctx.lineTo(pB.px, pB.py);
        ctx.stroke();
      }

      // Draw Ribbon A
      ctx.strokeStyle = splinePrimaryColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < helixA.length; i++) {
        if (i === 0) ctx.moveTo(helixA[i].px, helixA[i].py);
        else ctx.lineTo(helixA[i].px, helixA[i].py);
      }
      ctx.stroke();

      // Draw Ribbon B (Subtle Dashed)
      ctx.strokeStyle = splineMutedColor;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let i = 0; i < helixB.length; i++) {
        if (i === 0) ctx.moveTo(helixB[i].px, helixB[i].py);
        else ctx.lineTo(helixB[i].px, helixB[i].py);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // 4. Project and Sort 5 Phase Nodes by 3D Depth
      const renderedNodes = phaseNodes3D.map((node, idx) => {
        const proj = project3D(node.x, node.y, node.z);
        return {
          ...node,
          index: idx,
          px: proj.px,
          py: proj.py,
          depth: proj.depth,
          scale: proj.scale,
          isActive: activeStepIndex === idx
        };
      });

      // Depth sort so farther nodes render first
      renderedNodes.sort((a, b) => b.depth - a.depth);

      // 5. Draw 3D Phase Nodes
      renderedNodes.forEach(node => {
        const radius = (node.isActive ? 13 : 8) * (node.scale * 0.9);

        // Ground anchor hairline drop line
        const groundPt = project3D(node.x, floorY, node.z);
        ctx.strokeStyle = node.isActive ? splinePrimaryColor : splineMutedColor;
        ctx.lineWidth = node.isActive ? 1.5 : 1;
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.moveTo(node.px, node.py);
        ctx.lineTo(groundPt.px, groundPt.py);
        ctx.stroke();
        ctx.setLineDash([]);

        // Ground contact ring
        ctx.beginPath();
        ctx.ellipse(groundPt.px, groundPt.py, 10 * node.scale, 4 * node.scale, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Pulsing active resonance wave for the active phase
        if (node.isActive) {
          const waveRadius = radius + (Math.sin(pulseTick * 2) + 1) * 8 * node.scale;
          ctx.beginPath();
          ctx.arc(node.px, node.py, waveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(9, 9, 11, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Outer secondary echo wave
          const waveRadius2 = radius + ((pulseTick * 1.5) % 1) * 26 * node.scale;
          const alpha2 = Math.max(0, 1 - ((pulseTick * 1.5) % 1));
          ctx.beginPath();
          ctx.arc(node.px, node.py, waveRadius2, 0, Math.PI * 2);
          ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${alpha2 * 0.3})` : `rgba(9, 9, 11, ${alpha2 * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Node Body Circle
        const nodeRadius = (node.isActive ? 8 : 5.5) * (isMobile ? 0.75 : 1.0);
        ctx.beginPath();
        ctx.arc(node.px, node.py, Math.max(3, nodeRadius), 0, Math.PI * 2);
        ctx.fillStyle = node.isActive ? (isDark ? '#f4f4f5' : '#09090b') : (isDark ? '#18181c' : '#ffffff');
        ctx.fill();
        ctx.strokeStyle = node.isActive ? (isDark ? '#09090b' : '#ffffff') : splinePrimaryColor;
        ctx.lineWidth = node.isActive ? 2.5 : 1.5;
        ctx.stroke();

        // Label Pill - crisp, readable typography scaled for viewport
        const labelText = isMobile ? `0${node.index + 1} ${node.label}` : `0${node.index + 1} // ${node.label}`;
        const fontSize = isMobile ? 9 : Math.max(10, Math.round(11 * node.scale));
        ctx.font = `600 ${fontSize}px "JetBrains Mono", monospace`;
        const textWidth = ctx.measureText(labelText).width;
        const pillHeight = isMobile ? 18 : 22;
        const pillWidth = textWidth + (isMobile ? 10 : 18);
        const pillX = node.px - pillWidth / 2;
        const pillY = node.py - nodeRadius - (isMobile ? 16 : 24);

        // Pill background
        ctx.fillStyle = node.isActive 
          ? (isDark ? '#f4f4f5' : '#09090b') 
          : (isDark ? 'rgba(18, 18, 21, 0.88)' : 'rgba(255, 255, 255, 0.88)');
        ctx.strokeStyle = node.isActive ? splinePrimaryColor : splineMutedColor;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.rect(pillX, pillY, pillWidth, pillHeight);
        ctx.fill();
        ctx.stroke();

        // Pill text
        ctx.fillStyle = node.isActive 
          ? (isDark ? '#09090b' : '#ffffff') 
          : (isDark ? '#f4f4f5' : '#09090b');
        ctx.textBaseline = 'middle';
        ctx.fillText(labelText, pillX + (isMobile ? 5 : 9), pillY + pillHeight / 2);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse & Touch Interaction Handlers for 3D Orbiting
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      cameraRef.current.targetYaw += dx * 0.008;
      cameraRef.current.targetPitch = Math.max(-0.6, Math.min(0.8, cameraRef.current.targetPitch - dy * 0.008));
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * -0.0012;
      // Allow zooming out comfortably down to 0.30 and in up to 2.50
      cameraRef.current.targetZoom = Math.max(0.30, Math.min(2.5, cameraRef.current.targetZoom + zoomDelta));
    };

    // Touch Event Handlers for Mobile & Tablet screens (Fluid Pinch-to-zoom & 1-finger orbit)
    const handleTouchStart = (e) => {
      if (!e.touches) return;
      if (e.touches.length === 2) {
        // 2-finger pinch start
        isPinchingRef.current = true;
        isDraggingRef.current = false;
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialPinchDistRef.current = dist;
        initialPinchZoomRef.current = cameraRef.current.targetZoom;
        if (e.cancelable) e.preventDefault();
      } else if (e.touches.length === 1) {
        // 1-finger orbit start
        isDraggingRef.current = true;
        isPinchingRef.current = false;
        lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e) => {
      if (!e.touches) return;
      if (e.touches.length === 2 && isPinchingRef.current && initialPinchDistRef.current) {
        // 2-finger pinch scale calculation
        if (e.cancelable) e.preventDefault();
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        if (currentDist > 0 && initialPinchDistRef.current > 0) {
          const scaleRatio = currentDist / initialPinchDistRef.current;
          const newZoom = initialPinchZoomRef.current * scaleRatio;
          // Zoom out down to 0.30, zoom in up to 2.5
          cameraRef.current.targetZoom = Math.max(0.30, Math.min(2.5, newZoom));
        }
      } else if (e.touches.length === 1 && isDraggingRef.current) {
        // 1-finger orbit
        if (e.cancelable) e.preventDefault();
        const dx = e.touches[0].clientX - lastMousePosRef.current.x;
        const dy = e.touches[0].clientY - lastMousePosRef.current.y;
        lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        cameraRef.current.targetYaw += dx * 0.008;
        cameraRef.current.targetPitch = Math.max(-0.6, Math.min(0.8, cameraRef.current.targetPitch - dy * 0.008));
      }
    };

    const handleTouchEnd = (e) => {
      if (!e.touches || e.touches.length < 2) {
        isPinchingRef.current = false;
        initialPinchDistRef.current = null;
      }
      if (!e.touches || e.touches.length === 0) {
        isDraggingRef.current = false;
      } else if (e.touches.length === 1) {
        isDraggingRef.current = true;
        lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    // Click & Tap detection on phase nodes
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX !== undefined ? e.clientX : (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0);
      const clientY = e.clientY !== undefined ? e.clientY : (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : 0);
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;

      // Check distance to projected phase nodes
      const isMobile = rect.width < 768;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const responsiveBaseFov = isMobile ? Math.min(220, rect.width * 0.55) : 520;
      const fov = responsiveBaseFov * cameraRef.current.zoom;

      phaseNodes3D.forEach((node, idx) => {
        // Approximate projection
        const cosY = Math.cos(cameraRef.current.yaw);
        const sinY = Math.sin(cameraRef.current.yaw);
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;

        const cosP = Math.cos(cameraRef.current.pitch);
        const sinP = Math.sin(cameraRef.current.pitch);
        const y2 = node.y * cosP - z1 * sinP;
        const z2 = z1 * cosP + node.y * sinP;

        const scale = fov / Math.max(450 + z2, 50);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        const dist = Math.hypot(clickX - px, clickY - py);
        if (dist < (isMobile ? 28 : 36)) {
          setActiveStepIndex(idx);
        }
      });
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('click', handleClick);

    // Mobile touch gestures with non-passive listeners for pinch capture
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    canvas.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [engineMode, autoRotate, activeStepIndex, setActiveStepIndex]);

  return (
    <div className="spline-space-container" id="spline-space-container">
      {/* 3D Topbar & Telemetry */}
      <div className="spline-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="status-dot-ink"></span>
            <span style={{ fontWeight: 700, letterSpacing: '0.05em' }}>
              3D SPLINE TRAJECTORY ENGINE
            </span>
          </div>
          <span style={{ color: 'var(--text-caption)' }}>|</span>
          <span style={{ color: 'var(--text-muted)' }}>
            CAM: [{telemetry.camX}, {telemetry.camY}, {telemetry.camZ}]
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            YAW: {telemetry.yawDeg}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>
            TRAJECTORY: {telemetry.phasePct}
          </span>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Engine Selector */}
          <div className="view-mode-toggle" style={{ margin: 0, alignItems: 'stretch' }}>
            <button
              className={`view-mode-btn ${engineMode === 'canvas' ? 'active' : ''}`}
              onClick={() => setEngineMode('canvas')}
              title="Real-time 3D Spline Vector Canvas"
              style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', padding: '6px 14px', gap: '2px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={13} />
                <span>Vector 3D</span>
              </div>
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', opacity: 0.75, fontWeight: 500 }}>
                (Active Engine)
              </span>
            </button>
            <button
              className={`view-mode-btn ${engineMode === 'spline-cloud' ? 'active' : ''}`}
              onClick={() => setEngineMode('spline-cloud')}
              title="Spline Cloud Runtime Scene (Upcoming Feature — Model Coming Soon)"
              style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', padding: '6px 14px', gap: '2px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={13} />
                <span>Spline Cloud</span>
              </div>
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--text-ink)', opacity: 0.85, fontWeight: 600 }}>
                (Model coming soon)
              </span>
            </button>
          </div>

          {engineMode === 'canvas' && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setAutoRotate(!autoRotate)}
              title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
              style={{ height: '36px', padding: '0 12px', fontSize: '0.72rem' }}
            >
              <RotateCw size={12} className={autoRotate ? 'spin-icon' : ''} />
              <span>{autoRotate ? 'Orbit: ON' : 'Orbit: OFF'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Viewport Canvas or Spline Scene */}
      <div className="spline-viewport-canvas" id="spline-viewport-canvas">
        {engineMode === 'canvas' ? (
          <>
            <canvas 
              ref={canvasRef} 
              style={{ width: '100%', height: '100%', display: 'block', touchAction: 'none' }}
            />

            {/* In-canvas Guidance Overlay */}
            <div className="spline-canvas-guide">
              <span className="guide-desktop">[DRAG] Orbit 360° • [SCROLL] Zoom Depth • [CLICK NODE] Select</span>
              <span className="guide-mobile">[DRAG] Rotate • [PINCH / + −] Zoom • [TAP] Select</span>
            </div>

            {/* Real-time Target Crosshair in Center */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '18px',
                height: '18px',
                pointerEvents: 'none',
                opacity: 0.25
              }}
            >
              <div style={{ position: 'absolute', top: '9px', left: 0, right: 0, height: '1px', background: 'var(--text-ink)' }}></div>
              <div style={{ position: 'absolute', left: '9px', top: 0, bottom: 0, width: '1px', background: 'var(--text-ink)' }}></div>
            </div>

            {/* Tactile Zoom & Reset HUD for Mobile / Quick Tap */}
            <div className="spline-canvas-zoom-hud" id="spline-canvas-zoom-hud">
              <button 
                type="button"
                className="canvas-hud-btn" 
                onClick={handleZoomIn} 
                title="Zoom In"
                aria-label="Zoom In 3D Canvas"
              >
                <Plus size={14} />
              </button>
              <button 
                type="button"
                className="canvas-hud-btn" 
                onClick={handleZoomOut} 
                title="Zoom Out"
                aria-label="Zoom Out 3D Canvas"
              >
                <Minus size={14} />
              </button>
              <button 
                type="button"
                className="canvas-hud-btn" 
                onClick={handleResetView} 
                title="Reset View"
                aria-label="Reset 3D Canvas Camera"
              >
                <RotateCcw size={13} />
              </button>
            </div>

            {/* Floating Picture-in-Picture Specimen Viewfinder Feed */}
            <div className="spline-canvas-pip" id="spline-specimen-pip">
              <div className="spline-pip-header">
                <span>SPECIMEN VIEW</span>
                <span>0{activeStepIndex + 1} // 05</span>
              </div>
              <div className="spline-pip-img-frame">
                <img 
                  src={activeStep.image} 
                  alt={`${activeStep.title} specimen micrograph`}
                  onError={(e) => { e.currentTarget.src = '/images/sample.png'; }}
                />
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {activeStep.title}
              </div>
            </div>
          </>
        ) : (
          /* Spline Cloud Scene Container: Upcoming Feature Notice */
          <div style={{ width: '100%', height: '100%', position: 'relative', background: 'var(--spline-canvas-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center', maxWidth: '520px', gap: '16px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, padding: '4px 12px', background: 'var(--bg-surface)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-xs)', color: 'var(--text-ink)', letterSpacing: '0.05em' }}>
                <Sparkles size={13} color="#10b981" />
                <span>UPCOMING FEATURE // SPLINE CLOUD</span>
              </div>

              <h3 style={{ fontSize: '1.75rem', color: 'var(--text-ink)', margin: 0, fontWeight: 800, letterSpacing: '-0.02em' }}>
                3D Model Coming Soon
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65, margin: 0 }}>
                High-fidelity interactive 3D Spline Cloud CAD models of the IndZita Automated Diagnostic Cassette and Organoid Bioreactor Docking Nest are currently in development.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-caption)' }}>
                <span>SCHEDULED: Q4 2026</span>
                <span>•</span>
                <span>FULL WEBGPU EMBED</span>
              </div>

              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setEngineMode('canvas')}
                style={{ marginTop: '8px' }}
              >
                <Compass size={13} />
                <span>Return to Active Vector 3D Engine</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5-Phase Scrubbing Rail with Images at Every Phase */}
      <div className="spline-controls-rail">
        {/* Mobile View: Single Current Phase Navigator (Replaces 5 stacked cards on mobile) */}
        <div className="mobile-phase-current-bar">
          <button 
            className="mobile-phase-arrow-btn"
            disabled={activeStepIndex === 0}
            onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
            aria-label="Previous Phase"
            id="mobile-spline-phase-prev"
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
            id="mobile-spline-phase-next"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Desktop 5-Step Grid (hidden on mobile <= 768px) */}
        <div className="spline-step-grid" role="tablist">
          {workflowSteps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStepIndex(idx)}
              className={`spline-step-tab-btn ${activeStepIndex === idx ? 'active' : ''}`}
              id={`spline-step-btn-${idx + 1}`}
              role="tab"
              aria-selected={activeStepIndex === idx}
            >
              <div className="spline-step-thumb">
                <img 
                  src={step.image} 
                  alt={`${step.title} illustration`}
                  onError={(e) => { e.currentTarget.src = '/images/sample.png'; }}
                />
              </div>
              <div>
                <div className="step-index-mono" style={{ fontSize: '0.68rem', marginBottom: '2px' }}>
                  PHASE 0{idx + 1}
                </div>
                <div className="step-label" style={{ fontSize: '0.82rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {step.title}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Phase Focal Card with Prominent Specimen Image & Specs */}
        <div className="phase-focal-card">
          {/* Column 1: Clinical Specimen Image */}
          <div className="phase-focal-img-frame">
            <img 
              src={activeStep.image} 
              alt={`${activeStep.title} clinical illustration`} 
              onError={(e) => { e.currentTarget.src = '/images/sample.png'; }}
            />
            <span className="phase-img-badge">STAGE 0{activeStepIndex + 1} SPECIMEN</span>
          </div>

          {/* Column 2: Narrative & Clinical Context */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="step-index-mono" style={{ fontSize: '0.72rem' }}>
                ACTIVE NODE // PHASE 0{activeStepIndex + 1}
              </span>
              <span style={{ color: 'var(--text-caption)' }}>•</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {activeStep.category}
              </span>
            </div>

            <h4 style={{ fontSize: '1.35rem', color: 'var(--text-ink)', marginBottom: '8px' }}>
              {activeStep.title}
            </h4>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: '1.6' }}>
              {activeStep.fullDesc || activeStep.shortDesc}
            </p>
          </div>

          {/* Column 3: Specs & Actions */}
          <div>
            {/* Metric Chips */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
              {activeStep.keyMetrics.map((km, i) => (
                <div 
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 12px',
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--border-hairline)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.78rem'
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>{km.label}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-ink)' }}>{km.val}</span>
                </div>
              ))}
            </div>

            {/* Stepper Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                  style={{ opacity: activeStepIndex === 0 ? 0.3 : 1 }}
                >
                  <ChevronLeft size={14} />
                  <span>Prev</span>
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  disabled={activeStepIndex === workflowSteps.length - 1}
                  onClick={() => setActiveStepIndex(prev => Math.min(workflowSteps.length - 1, prev + 1))}
                  style={{ opacity: activeStepIndex === workflowSteps.length - 1 ? 0.3 : 1 }}
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={onOpenSimulator}
              >
                <Play size={12} fill="currentColor" />
                <span>Simulate Phase</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
