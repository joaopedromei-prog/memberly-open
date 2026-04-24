'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Timer as TimerIcon,
  Hourglass,
} from 'lucide-react';

type Mode = 'stopwatch' | 'countdown';
const PRESETS = [30, 60, 120];

function formatTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function beep(times = 1) {
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    for (let i = 0; i < times; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      osc.type = 'sine';
      osc.connect(gain);
      gain.connect(ctx.destination);
      const start = ctx.currentTime + i * 0.25;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.25, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.2);
      osc.start(start);
      osc.stop(start + 0.22);
    }
    setTimeout(() => ctx.close().catch(() => {}), times * 300 + 200);
  } catch {}
}

export default function Timer() {
  const [mode, setMode] = useState<Mode>('stopwatch');
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [countdownSeconds, setCountdownSeconds] = useState(60);
  const [remaining, setRemaining] = useState(60 * 1000);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    if (!running) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    lastRef.current = performance.now();
    const tick = (now: number) => {
      const dt = now - lastRef.current;
      lastRef.current = now;
      if (mode === 'stopwatch') {
        setElapsed((p) => p + dt);
      } else {
        setRemaining((p) => {
          const next = p - dt;
          if (next <= 0) {
            setRunning(false);
            beep(3);
            return 0;
          }
          return next;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running, mode]);

  const reset = () => {
    setRunning(false);
    if (mode === 'stopwatch') setElapsed(0);
    else setRemaining(countdownSeconds * 1000);
  };

  const setPreset = (sec: number) => {
    setCountdownSeconds(sec);
    setRemaining(sec * 1000);
    setRunning(false);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setRunning(false);
    if (m === 'countdown') setRemaining(countdownSeconds * 1000);
  };

  const displayMs = mode === 'stopwatch' ? elapsed : remaining;

  return (
    <div className="rounded-lg border border-dark-border bg-dark-surface p-4">
      <div className="mb-4 flex gap-1 rounded-md bg-dark-bg p-1">
        <button
          onClick={() => switchMode('stopwatch')}
          className={`flex flex-1 items-center justify-center gap-2 rounded px-3 py-1.5 text-xs font-semibold transition-colors ${
            mode === 'stopwatch'
              ? 'bg-dark-card text-white'
              : 'text-text-muted hover:text-white'
          }`}
        >
          <TimerIcon className="h-3.5 w-3.5" />
          Cronômetro
        </button>
        <button
          onClick={() => switchMode('countdown')}
          className={`flex flex-1 items-center justify-center gap-2 rounded px-3 py-1.5 text-xs font-semibold transition-colors ${
            mode === 'countdown'
              ? 'bg-dark-card text-white'
              : 'text-text-muted hover:text-white'
          }`}
        >
          <Hourglass className="h-3.5 w-3.5" />
          Regressiva
        </button>
      </div>

      <div className="text-center">
        <div className="font-mono text-5xl font-bold tabular-nums text-white">
          {formatTime(displayMs)}
        </div>
      </div>

      {mode === 'countdown' && (
        <div className="mt-3 flex justify-center gap-2">
          {PRESETS.map((s) => (
            <button
              key={s}
              onClick={() => setPreset(s)}
              className={`rounded px-3 py-1 text-xs font-semibold transition-colors ${
                countdownSeconds === s
                  ? 'bg-primary text-white'
                  : 'border border-dark-border text-text-muted hover:text-white'
              }`}
            >
              {s < 60 ? `${s}s` : `${s / 60}min`}
            </button>
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setRunning(!running)}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          {running ? (
            <>
              <Pause className="h-4 w-4" /> Pausar
            </>
          ) : (
            <>
              <Play className="h-4 w-4" /> Iniciar
            </>
          )}
        </button>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-md border border-dark-border px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-dark-card"
        >
          <RotateCcw className="h-4 w-4" /> Zerar
        </button>
      </div>
    </div>
  );
}
