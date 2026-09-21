import React, { useEffect, useRef } from 'react';

/**
 * GenomicAsciiCanvas
 * Inspired by motion.dev's interactive generative ASCII canvas.
 * Renders an interactive matrix of nucleotide sequences (A, U, G, C), piRNA coordinates,
 * and molecular telemetry that responds to pointer movement with fluid wave displacement.
 * Features mobile power optimization and viewport intersection observer.
 */
export default function GenomicAsciiCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const nucleotides = ['A', 'U', 'G', 'C', '·', '+', '26', '32', 'pi', 'Ct'];
    let cols = 0;
    let rows = 0;
    let grid = [];

    const initGrid = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      const cellSize = isMobile ? 38 : 24; // Lower particle density on mobile for 60fps & battery saving

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      cols = Math.ceil(rect.width / cellSize);
      rows = Math.ceil(rect.height / cellSize);
      grid = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const char = nucleotides[(r * 7 + c * 13) % nucleotides.length];
          grid.push({
            originX: c * cellSize + cellSize / 2,
            originY: r * cellSize + cellSize / 2,
            x: c * cellSize + cellSize / 2,
            y: r * cellSize + cellSize / 2,
            vx: 0,
            vy: 0,
            char,
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    };

    initGrid();
    window.addEventListener('resize', initGrid);

    // Viewport Intersection Observer: Pause computation when scrolled past hero
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.05 });

    observer.observe(container);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleTouchMove = (e) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.touches[0].clientX - rect.left;
      mouseRef.current.targetY = e.touches[0].clientY - rect.top;
    };

    const handleLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleLeave);
    parent.addEventListener('touchmove', handleTouchMove, { passive: true });
    parent.addEventListener('touchend', handleLeave);

    let time = 0;

    const render = () => {
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.025;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.12;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.12;

      const rect = canvas.parentElement.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(9, 9, 11, 0.08)';
      const activeColor = isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(9, 9, 11, 0.55)';

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const interactionRadius = 140;

      for (let i = 0; i < grid.length; i++) {
        const p = grid[i];

        // Ambient idle breathing wave
        const idleOffsetX = Math.sin(time + p.phase) * 1.5;
        const idleOffsetY = Math.cos(time + p.phase) * 1.5;

        // Pointer distance
        const dx = mouseX - (p.originX + idleOffsetX);
        const dy = mouseY - (p.originY + idleOffsetY);
        const dist = Math.hypot(dx, dy);

        if (dist < interactionRadius && dist > 0) {
          const force = (1 - dist / interactionRadius) * 22;
          const angle = Math.atan2(dy, dx);
          // Elastic spring push away from mouse
          p.vx -= Math.cos(angle) * force * 0.08;
          p.vy -= Math.sin(angle) * force * 0.08;
        }

        // Spring back to origin
        const springK = 0.06;
        const damp = 0.84;
        p.vx += (p.originX + idleOffsetX - p.x) * springK;
        p.vy += (p.originY + idleOffsetY - p.y) * springK;
        p.vx *= damp;
        p.vy *= damp;

        p.x += p.vx;
        p.y += p.vy;

        // Draw character
        const distToMouse = Math.hypot(mouseX - p.x, mouseY - p.y);
        if (distToMouse < interactionRadius) {
          ctx.fillStyle = activeColor;
          ctx.fillText(p.char, p.x, p.y);
        } else {
          ctx.fillStyle = textColor;
          ctx.fillText(p.char, p.x, p.y);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', initGrid);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleLeave);
      parent.removeEventListener('touchmove', handleTouchMove);
      parent.removeEventListener('touchend', handleLeave);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
      {/* Radial vignette mask so text remains 100% legible in center */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, var(--bg-page) 90%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
