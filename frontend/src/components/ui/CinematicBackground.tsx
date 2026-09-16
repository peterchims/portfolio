import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/cn';

interface Blob {
  xPct: number;
  yPct: number;
  r: number;
  h: number;
  s: number;
  l: number;
  a: number;
}

/** Three light arrangements the canvas slowly morphs between — the "scene changes". */
const SCENES: Blob[][] = [
  [
    { xPct: 0.18, yPct: 0.26, r: 0.42, h: 26, s: 85, l: 55, a: 0.5 },
    { xPct: 0.84, yPct: 0.16, r: 0.34, h: 232, s: 80, l: 55, a: 0.42 },
    { xPct: 0.7, yPct: 0.8, r: 0.38, h: 12, s: 78, l: 48, a: 0.36 },
    { xPct: 0.08, yPct: 0.84, r: 0.28, h: 250, s: 70, l: 42, a: 0.3 },
  ],
  [
    { xPct: 0.74, yPct: 0.22, r: 0.4, h: 268, s: 78, l: 56, a: 0.46 },
    { xPct: 0.14, yPct: 0.18, r: 0.3, h: 190, s: 78, l: 54, a: 0.4 },
    { xPct: 0.26, yPct: 0.82, r: 0.36, h: 300, s: 70, l: 46, a: 0.34 },
    { xPct: 0.88, yPct: 0.78, r: 0.3, h: 220, s: 72, l: 42, a: 0.3 },
  ],
  [
    { xPct: 0.5, yPct: 0.1, r: 0.44, h: 228, s: 85, l: 58, a: 0.5 },
    { xPct: 0.88, yPct: 0.64, r: 0.3, h: 190, s: 75, l: 54, a: 0.36 },
    { xPct: 0.14, yPct: 0.7, r: 0.34, h: 320, s: 70, l: 48, a: 0.32 },
    { xPct: 0.4, yPct: 0.92, r: 0.26, h: 26, s: 80, l: 52, a: 0.26 },
  ],
];

const SEGMENT_MS = 9000;
const SWEEP_PERIOD_MS = 11000;
const SWEEP_DURATION = 0.4;

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** True modulo (always non-negative) — `elapsed` can be marginally negative
 * on the very first animation frame in some browsers. */
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

/** Smootherstep — gentler ease at both ends than smoothstep, reads as a real dissolve. */
function smoother(t: number) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * A slow-morphing canvas "scene" — additive light sources that drift and
 * dissolve into new arrangements, plus grain and a vignette. Reads as an
 * ambient cinematic backdrop without shipping an actual video file.
 * Freezes on a single blended frame under prefers-reduced-motion.
 */
export function CinematicBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    function drawFrame(elapsed: number) {
      const cycle = mod(elapsed, SEGMENT_MS * SCENES.length);
      const segment = Math.floor(cycle / SEGMENT_MS);
      const localT = smoother((cycle % SEGMENT_MS) / SEGMENT_MS);
      const from = SCENES[segment];
      const to = SCENES[(segment + 1) % SCENES.length];

      ctx.clearRect(0, 0, width, height);
      const base = ctx.createLinearGradient(0, 0, 0, height);
      base.addColorStop(0, '#05060b');
      base.addColorStop(1, '#0a0d18');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'lighter';
      from.forEach((blob, i) => {
        const target = to[i];
        const jitterX = reduced ? 0 : Math.sin(elapsed / 4000 + i) * width * 0.015;
        const jitterY = reduced ? 0 : Math.cos(elapsed / 5000 + i) * height * 0.015;
        const x = lerp(blob.xPct, target.xPct, localT) * width + jitterX;
        const y = lerp(blob.yPct, target.yPct, localT) * height + jitterY;
        const r = lerp(blob.r, target.r, localT) * Math.max(width, height);
        const h = lerp(blob.h, target.h, localT);
        const s = lerp(blob.s, target.s, localT);
        const l = lerp(blob.l, target.l, localT);
        const a = lerp(blob.a, target.a, localT);

        const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, ${a})`);
        grad.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduced) {
        const sweepCycle = mod(elapsed, SWEEP_PERIOD_MS) / SWEEP_PERIOD_MS;
        if (sweepCycle < SWEEP_DURATION) {
          const t = sweepCycle / SWEEP_DURATION;
          const sx = lerp(-width * 0.3, width * 1.3, t);
          const sweep = ctx.createLinearGradient(sx - width * 0.18, 0, sx + width * 0.18, height);
          sweep.addColorStop(0, 'rgba(255,255,255,0)');
          sweep.addColorStop(0.5, `rgba(255,255,255,${(0.06 * Math.sin(t * Math.PI)).toFixed(3)})`);
          sweep.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = sweep;
          ctx.fillRect(0, 0, width, height);
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    }

    let raf = 0;
    const start = performance.now();
    let paused = document.hidden;

    function tick(now: number) {
      if (!paused) drawFrame(now - start);
      raf = requestAnimationFrame(tick);
    }

    const onVisibility = () => {
      paused = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibility);

    if (reduced) {
      drawFrame(SEGMENT_MS * 0.5);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#05060b]', className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_50%_10%,transparent_45%,rgba(0,0,0,0.55)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: GRAIN_URL }}
      />
    </div>
  );
}
