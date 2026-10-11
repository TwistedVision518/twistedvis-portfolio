import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { systemTrace } from '../data/systemTrace';

type PlayerState = 'idle' | 'playing' | 'paused' | 'complete';

const stagePositions = [
  { x: 102, y: 86 },
  { x: 226, y: 132 },
  { x: 386, y: 92 },
  { x: 442, y: 230 },
  { x: 350, y: 376 },
  { x: 205, y: 420 },
  { x: 86, y: 324 },
  { x: 122, y: 202 },
] as const;

export default function InteractiveSystems() {
  const reduceMotion = useReducedMotion();
  const prefersReducedMotion = reduceMotion === true;
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [playerState, setPlayerState] = useState<PlayerState>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [panelInView, setPanelInView] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const playerStateRef = useRef<PlayerState>('idle');
  const activeStageRef = useRef(0);
  const elapsedRef = useRef(0);
  const hasInteractedRef = useRef(false);
  const autoSuspendedRef = useRef(false);
  const initialStartRef = useRef<number | null>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 140, damping: 20, mass: 0.7 });
  const springY = useSpring(pointerY, { stiffness: 140, damping: 20, mass: 0.7 });
  const deviceX = useTransform(springX, [-1, 1], [-8, 8]);
  const deviceY = useTransform(springY, [-1, 1], [-5, 5]);
  const activeStage = systemTrace[activeStageIndex];
  const activePosition = stagePositions[activeStageIndex];
  const progress = activeStage ? Math.min(1, elapsed / activeStage.durationMs) : 0;
  const isVisible = panelInView && documentVisible;

  useEffect(() => {
    playerStateRef.current = playerState;
  }, [playerState]);

  useEffect(() => {
    activeStageRef.current = activeStageIndex;
  }, [activeStageIndex]);

  useEffect(() => {
    elapsedRef.current = elapsed;
  }, [elapsed]);

  useEffect(() => {
    hasInteractedRef.current = hasInteracted;
  }, [hasInteracted]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const observer = new IntersectionObserver(([entry]) => setPanelInView(entry.isIntersecting && entry.intersectionRatio >= 0.5), { threshold: [0, 0.5, 1] });
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateDocumentVisibility = () => setDocumentVisible(document.visibilityState === 'visible');
    updateDocumentVisibility();
    document.addEventListener('visibilitychange', updateDocumentVisibility);
    return () => document.removeEventListener('visibilitychange', updateDocumentVisibility);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      if (playerStateRef.current === 'playing') {
        autoSuspendedRef.current = true;
        setPlayerState('paused');
      }
      return;
    }

    if (autoSuspendedRef.current && playerStateRef.current === 'paused' && !hasInteractedRef.current && !prefersReducedMotion) {
      autoSuspendedRef.current = false;
      setPlayerState('playing');
    }
  }, [isVisible, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !isVisible || hasInteracted || activeStageIndex !== 0 || elapsed > 0 || playerState !== 'idle') return;
    initialStartRef.current = window.setTimeout(() => {
      if (!hasInteractedRef.current && activeStageRef.current === 0 && elapsedRef.current === 0 && playerStateRef.current === 'idle') setPlayerState('playing');
      initialStartRef.current = null;
    }, 400);
    return () => {
      if (initialStartRef.current !== null) window.clearTimeout(initialStartRef.current);
      initialStartRef.current = null;
    };
  }, [activeStageIndex, elapsed, hasInteracted, isVisible, playerState, prefersReducedMotion]);

  useEffect(() => {
    if (playerState !== 'playing') return;
    let previous = performance.now();
    const interval = window.setInterval(() => {
      const now = performance.now();
      const nextElapsed = elapsedRef.current + (now - previous);
      previous = now;
      const stage = systemTrace[activeStageRef.current];
      if (!stage) return;

      if (nextElapsed >= stage.durationMs) {
        if (activeStageRef.current < systemTrace.length - 1) {
          const nextIndex = activeStageRef.current + 1;
          activeStageRef.current = nextIndex;
          elapsedRef.current = 0;
          setActiveStageIndex(nextIndex);
          setElapsed(0);
        } else {
          elapsedRef.current = stage.durationMs;
          setElapsed(stage.durationMs);
          setPlayerState('complete');
        }
      } else {
        elapsedRef.current = nextElapsed;
        setElapsed(nextElapsed);
      }
    }, 50);
    return () => window.clearInterval(interval);
  }, [playerState]);

  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return;
    const handleMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [pointerX, pointerY, prefersReducedMotion]);

  const markInteracted = () => {
    hasInteractedRef.current = true;
    setHasInteracted(true);
    autoSuspendedRef.current = false;
  };

  const handlePlayPause = () => {
    markInteracted();
    if (playerState === 'playing') {
      setPlayerState('paused');
      return;
    }
    if (playerState === 'complete') return;
    setPlayerState('playing');
  };

  const handleReplay = () => {
    markInteracted();
    activeStageRef.current = 0;
    elapsedRef.current = 0;
    setActiveStageIndex(0);
    setElapsed(0);
    setAnnouncement('Replay reset to source / project.');
    setPlayerState(!prefersReducedMotion && isVisible ? 'playing' : 'idle');
  };

  const handleStageSelect = (index: number) => {
    markInteracted();
    const isSameStage = index === activeStageRef.current;
    activeStageRef.current = index;
    if (!isSameStage || playerState === 'complete') {
      elapsedRef.current = 0;
      setElapsed(0);
    }
    setActiveStageIndex(index);
    setPlayerState('paused');
    setAnnouncement(`${systemTrace[index].label}: ${systemTrace[index].summary}. ${systemTrace[index].explanation}`);
  };

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: useScrollProgress(prefersReducedMotion) }} aria-hidden="true" />
      <motion.div className="cursor-field" style={{ x: useTransform(springX, [-1, 1], ['0vw', '100vw']), y: useTransform(springY, [-1, 1], ['0vh', '100vh']) }} aria-hidden="true" />
      <motion.div ref={panelRef} className="hero-device" style={{ x: prefersReducedMotion ? 0 : deviceX, y: prefersReducedMotion ? 0 : deviceY }}>
        <div className="device-topline">
          <span>TWISTEDVIS / SYSTEM RUN</span>
          <span className={`device-live device-live-${playerState}`}><i /> {playerState}</span>
        </div>
        <div className="device-screen">
          <svg className="trace-map" viewBox="0 0 528 500" fill="none" role="presentation">
            <polyline className="trace-path trace-path-route" points={stagePositions.map(({ x, y }) => `${x},${y}`).join(' ')} />
            <line className="trace-path trace-path-rail" x1="264" y1="20" x2="264" y2="480" />
            {stagePositions.map((position, index) => (
              <circle className={`trace-node node-${systemTrace[index].tone} ${index === activeStageIndex ? 'node-active' : ''}`} cx={position.x} cy={position.y} r={index === activeStageIndex ? 11 : 6} key={systemTrace[index].id} />
            ))}
            <circle className="trace-pulse" cx={activePosition.x} cy={activePosition.y} r="18" />
          </svg>
          <div className="device-readout">
            <span>{activeStage.label}</span>
            <strong>{activeStage.summary}</strong>
            <p>{activeStage.explanation}</p>
            <a href={activeStage.evidenceHref} target="_blank" rel="noreferrer">{activeStage.evidenceLabel} ↗</a>
          </div>
          <div className="device-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
          <div className="device-grid-labels">
            {systemTrace.map((stage, index) => (
              <div key={stage.id}>
                <button type="button" className={`${index === activeStageIndex ? 'is-active' : ''} stage-${stage.tone}`} aria-current={index === activeStageIndex ? 'step' : undefined} aria-label={`Select ${stage.label}: ${stage.summary}`} onClick={() => handleStageSelect(index)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {stage.label}
                </button>
              </div>
            ))}
          </div>
          <div className="device-controls">
            <button type="button" className="trace-control" aria-label={playerState === 'playing' ? 'Pause system run' : 'Play system run'} aria-pressed={playerState === 'playing'} onClick={handlePlayPause}>{playerState === 'playing' ? 'pause' : 'play'} <span aria-hidden="true">{playerState === 'playing' ? 'Ⅱ' : '▶'}</span></button>
            <button type="button" className="trace-control" aria-label="Replay system run" onClick={handleReplay}>replay <span aria-hidden="true">↺</span></button>
            <span className="trace-count">{String(activeStageIndex + 1).padStart(2, '0')} / {String(systemTrace.length).padStart(2, '0')} · {Math.round(progress * 100)}%</span>
          </div>
          <p className="sr-only" aria-live="polite">{announcement}</p>
        </div>
        <div className="device-footline">
          <span>NOTHING PHONE (2A) / 2A PLUS</span>
          <span>REPLAY / {activeStage.id}</span>
        </div>
      </motion.div>
    </>
  );
}

function useScrollProgress(reduceMotion: boolean) {
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
