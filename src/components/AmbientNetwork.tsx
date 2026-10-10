import { useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './AmbientNetwork.css';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  rotation: number;
  shape: 'circle' | 'square' | 'diamond' | 'triangle' | 'hexagon';
};

type Ripple = { x: number; y: number; startedAt: number };

const MAX_RIPPLES = 4;
const CONNECTION_DISTANCE = 190;
const TAU = Math.PI * 2;
const PARTICLE_COLOR = '244, 248, 255';

function makeParticles(width: number, height: number, mobile: boolean): Particle[] {
  const targetCount = Math.floor((width * height) / (mobile ? 15000 : 12000));
  const count = Math.max(mobile ? 28 : 48, Math.min(mobile ? 60 : 140, targetCount));
  const columns = Math.ceil(Math.sqrt(count * (width / height)));
  const rows = Math.ceil(count / columns);
  const shapes: Particle['shape'][] = ['circle', 'square', 'diamond', 'triangle', 'hexagon'];

  return Array.from({ length: count }, (_, index) => {
    const seed = (index + 1) * 127.1;
    const random = (value: number) => {
      const result = Math.sin(seed + value * 78.233) * 43758.5453;
      return result - Math.floor(result);
    };
    const angle = random(3) * TAU;
    const speed = 1.5 + random(4) * 2.5;
    const column = index % columns;
    const row = Math.floor(index / columns);

    return {
      x: ((column + 0.2 + random(1) * 0.6) / columns) * width,
      y: ((row + 0.2 + random(2) * 0.6) / rows) * height,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: 2.1 + random(5) * 1.7,
      phase: random(6) * TAU,
      rotation: random(7) * TAU,
      shape: shapes[Math.floor(random(8) * shapes.length)],
    };
  });
}

export default function AmbientNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const pointerTargetX = useMotionValue(-1000);
  const pointerTargetY = useMotionValue(-1000);
  const pointerX = useSpring(pointerTargetX, { stiffness: 75, damping: 25, mass: 0.7 });
  const pointerY = useSpring(pointerTargetY, { stiffness: 75, damping: 25, mass: 0.7 });
  const pointerPosition = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return undefined;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let frameId = 0;
    let lastFrame = 0;
    let isVisible = !document.hidden;
    let isMobile = window.matchMedia('(max-width: 760px)').matches;
    const unsubscribeX = pointerX.on('change', (value) => { pointerPosition.current.x = value; });
    const unsubscribeY = pointerY.on('change', (value) => { pointerPosition.current.y = value; });

    const scheduleDraw = () => {
      if (!frameId && isVisible) frameId = requestAnimationFrame(draw);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      isMobile = window.matchMedia('(max-width: 760px)').matches;
      particles = makeParticles(width, height, isMobile);
      scheduleDraw();
    };

    const draw = (timestamp: number) => {
      frameId = 0;
      if (document.hidden || !isVisible) return;
      if (!reducedMotion && timestamp - lastFrame < 32) {
        frameId = requestAnimationFrame(draw);
        return;
      }

      const delta = lastFrame ? Math.min((timestamp - lastFrame) / 1000, 0.05) : 0.016;
      lastFrame = timestamp;
      context.clearRect(0, 0, width, height);
      if (!canvas.dataset.ready) {
        canvas.dataset.ready = 'true';
        canvas.closest('.ambient-layer')?.classList.add('is-ready');
      }

      const cursorX = reducedMotion ? -1000 : pointerPosition.current.x;
      const cursorY = reducedMotion ? -1000 : pointerPosition.current.y;
      const time = timestamp / 1000;

      for (const particle of particles) {
        const dx = particle.x - cursorX;
        const dy = particle.y - cursorY;
        const distance = Math.hypot(dx, dy);
        const influence = !reducedMotion && distance < 460 ? 1 - distance / 460 : 0;

        if (!reducedMotion) {
          if (influence > 0 && distance > 0) {
            const attraction = influence * 24;
            particle.vx -= (dx / distance) * attraction * delta;
            particle.vy -= (dy / distance) * attraction * delta;
          }
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;
          particle.vx *= 0.997;
          particle.vy *= 0.997;
          if (particle.x < -12) particle.x = width + 12;
          if (particle.x > width + 12) particle.x = -12;
          if (particle.y < -12) particle.y = height + 12;
          if (particle.y > height + 12) particle.y = -12;
        }

        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > 54) {
          particle.vx = (particle.vx / speed) * 54;
          particle.vy = (particle.vy / speed) * 54;
        }

        const pulse = reducedMotion ? 0.76 : 0.62 + Math.sin(time * 1.1 + particle.phase) * 0.13;
        const alpha = Math.min(pulse + influence * 0.32, 1);
        const radius = particle.radius + influence * 1.15;
        const sides = particle.shape === 'triangle' ? 3 : particle.shape === 'hexagon' ? 6 : 4;

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation + (reducedMotion || particle.shape === 'circle' ? 0 : time * 0.16));
        context.beginPath();
        if (particle.shape === 'circle') {
          context.arc(0, 0, radius, 0, TAU);
        } else {
          for (let point = 0; point < sides; point += 1) {
            const angle = (point / sides) * TAU - Math.PI / 2;
            const scale = particle.shape === 'diamond' || particle.shape === 'triangle' ? 1.25 : 1;
            const x = Math.cos(angle) * radius * scale;
            const y = Math.sin(angle) * radius * scale;
            if (point === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
          }
          context.closePath();
        }
        context.fillStyle = `rgba(${PARTICLE_COLOR}, ${alpha})`;
        context.fill();
        context.restore();
      }

      for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {
        const first = particles[firstIndex];
        for (let secondIndex = firstIndex + 1; secondIndex < particles.length; secondIndex += 1) {
          const second = particles[secondIndex];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance > CONNECTION_DISTANCE) continue;
          const midpointX = (first.x + second.x) / 2;
          const midpointY = (first.y + second.y) / 2;
          const pointerDistance = Math.hypot(midpointX - cursorX, midpointY - cursorY);
          const pointerBoost = !reducedMotion && pointerDistance < 240 ? (1 - pointerDistance / 240) * 0.65 : 0;
          const alpha = (1 - distance / CONNECTION_DISTANCE) * (0.22 + pointerBoost);
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.strokeStyle = `rgba(${PARTICLE_COLOR}, ${alpha})`;
          context.lineWidth = 0.7 + pointerBoost * 3;
          context.stroke();
        }
      }

      if (!reducedMotion) {
        const rippleDuration = 1150;
        ripples = ripples.filter((ripple) => timestamp - ripple.startedAt < rippleDuration);
        for (const ripple of ripples) {
          const progress = (timestamp - ripple.startedAt) / rippleDuration;
          context.beginPath();
          context.arc(ripple.x, ripple.y, 12 + progress * 110, 0, TAU);
          context.strokeStyle = `rgba(${PARTICLE_COLOR}, ${(1 - progress) * 0.5})`;
          context.lineWidth = 1.5 * (1 - progress) + 0.35;
          context.stroke();
        }
      }

      if (!reducedMotion || ripples.length > 0) frameId = requestAnimationFrame(draw);
    };

    const movePointer = (event: PointerEvent) => {
      if (reducedMotion || event.pointerType === 'touch') return;
      pointerTargetX.set(event.clientX);
      pointerTargetY.set(event.clientY);
      scheduleDraw();
    };
    const addRipple = (event: PointerEvent) => {
      if (reducedMotion || event.button > 0) return;
      if (event.pointerType === 'touch') {
        pointerTargetX.set(event.clientX);
        pointerTargetY.set(event.clientY);
      }
      ripples.push({ x: event.clientX, y: event.clientY, startedAt: performance.now() });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
      scheduleDraw();
    };
    const visibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastFrame = 0;
        scheduleDraw();
      } else if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };

    resize();
    scheduleDraw();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', movePointer, { passive: true });
    window.addEventListener('pointerdown', addRipple, { passive: true });
    document.addEventListener('visibilitychange', visibilityChange);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      unsubscribeX();
      unsubscribeY();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', movePointer);
      window.removeEventListener('pointerdown', addRipple);
      document.removeEventListener('visibilitychange', visibilityChange);
    };
  }, [pointerTargetX, pointerTargetY, pointerX, pointerY, reducedMotion]);

  return <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />;
}
