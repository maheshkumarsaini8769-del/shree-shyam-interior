import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface FestiveCountdownProps {
  targetDate?: string;
}

export const FestiveCountdown: React.FC<FestiveCountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number }>({
    d: 0,
    h: 0,
    m: 0,
    s: 0
  });

  useEffect(() => {
    // Default fallback to 15 days ahead if none specified
    const target = targetDate
      ? new Date(targetDate).getTime()
      : Date.now() + 15 * 24 * 60 * 60 * 1000;

    const calculate = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({ d, h, m, s });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-xs font-bold bg-black/50 px-2 sm:px-2.5 py-0.5 rounded-lg border border-white/20 text-amber-300 shrink-0">
      <Clock className="w-3 h-3 text-amber-400 shrink-0" />
      <span className="hidden sm:inline">Ends:</span>
      <span className="text-white">{timeLeft.d}d</span>:
      <span className="text-white">{String(timeLeft.h).padStart(2, '0')}h</span>:
      <span className="text-white">{String(timeLeft.m).padStart(2, '0')}m</span>:
      <span className="text-amber-400">{String(timeLeft.s).padStart(2, '0')}s</span>
    </div>
  );
};
