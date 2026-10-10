import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const layers = [
  { label: 'device tree', value: 'Aerodactyl', tone: 'blue' },
  { label: 'kernel', value: 'tuned', tone: 'ochre' },
  { label: 'power', value: 'balanced', tone: 'red' },
  { label: 'display', value: 'fluid', tone: 'blue' },
  { label: 'release', value: 'shipped', tone: 'green' },
];

export default function InteractiveSystems() {
  const reduceMotion = useReducedMotion();
  const [activeLayer, setActiveLayer] = useState(0);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 140, damping: 20, mass: 0.7 });
  const springY = useSpring(pointerY, { stiffness: 140, damping: 20, mass: 0.7 });
  const deviceX = useTransform(springX, [-1, 1], [-8, 8]);
  const deviceY = useTransform(springY, [-1, 1], [-5, 5]);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => setActiveLayer((current) => (current + 1) % layers.length), 2000);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;
    const handleMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: useScrollProgress(reduceMotion) }} aria-hidden="true" />
      <motion.div className="cursor-field" style={{ x: useTransform(springX, [-1, 1], ['0vw', '100vw']), y: useTransform(springY, [-1, 1], ['0vh', '100vh']) }} aria-hidden="true" />
      <motion.div className="hero-device" style={{ x: reduceMotion ? 0 : deviceX, y: reduceMotion ? 0 : deviceY }} aria-hidden="true">
        <div className="device-topline">
          <span>TWISTEDVIS / SYSTEM TRACE</span>
          <span className="device-live"><i /> live</span>
        </div>
        <div className="device-screen">
          <svg className="trace-map" viewBox="0 0 560 500" fill="none" role="presentation">
            <path className="trace-path trace-path-one" d="M45 88H178L223 130H391L435 89H523" />
            <path className="trace-path trace-path-two" d="M45 250H135L181 204H343L388 250H523" />
            <path className="trace-path trace-path-three" d="M45 412H164L215 360H373L426 412H523" />
            <path className="trace-path trace-path-rail" d="M280 20V480" />
            <circle className="trace-node node-one" cx="223" cy="130" r="7" />
            <circle className="trace-node node-two" cx="343" cy="204" r="7" />
            <circle className="trace-node node-three" cx="215" cy="360" r="7" />
            <circle className="trace-node node-active" cx={layers[activeLayer].tone === 'blue' ? '391' : layers[activeLayer].tone === 'ochre' ? '181' : '373'} cy={layers[activeLayer].tone === 'blue' ? '130' : layers[activeLayer].tone === 'ochre' ? '204' : '360'} r="12" />
          </svg>
          <div className="device-readout">
            <span>active layer</span>
            <AnimatePresence mode="wait">
              <motion.strong key={layers[activeLayer].label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                {layers[activeLayer].label}
              </motion.strong>
            </AnimatePresence>
          </div>
          <div className="device-grid-labels">
            {layers.map((layer, index) => (
              <button type="button" className={index === activeLayer ? 'is-active' : ''} key={layer.label} onClick={() => setActiveLayer(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {layer.label}
              </button>
            ))}
          </div>
        </div>
        <div className="device-footline">
          <span>NOTHING PHONE (2A) / 2A PLUS</span>
          <span>BOOT / 05</span>
        </div>
      </motion.div>
    </>
  );
}

function useScrollProgress(reduceMotion: boolean | null) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [reduceMotion]);

  return progress;
}
