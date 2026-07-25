import { useState } from 'react';
import { Layers, Zap } from 'lucide-react';

export const ComparisonSlider = () => {
  const [position, setPosition] = useState(50);

  const handleMove = (clientX: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const newPosition = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  return (
    <div
      className="relative w-full min-h-[280px] sm:min-h-[320px] h-auto overflow-hidden glass-card select-none group cursor-ew-resize animate-slide-up"
      onMouseMove={(e) => handleMove(e.clientX, e.currentTarget)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.currentTarget)}
    >
      {/* AI Flow side (right, base layer) */}
      <div className="relative z-0 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-8">
        <div className="max-w-md w-full">
          <div className="p-4 sm:p-6 rounded-lg border border-emerald-500/30 bg-emerald-500/[0.04] backdrop-blur-md glow-emerald">
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="h-2 w-24 max-w-full bg-emerald-500/30 rounded mb-2" />
                <div className="h-1.5 w-16 max-w-full bg-emerald-500/15 rounded" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-full bg-emerald-500/15 rounded" />
              <div className="h-2 w-full bg-emerald-500/15 rounded" />
              <div className="h-2 w-[80%] bg-emerald-500/15 rounded" />
            </div>
          </div>
          <div className="mt-6 sm:mt-8 text-center">
            <div className="text-sm sm:text-base font-semibold tracking-[0.2em] text-emerald-400">AI FLOW</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-emerald-400/60 mt-1">
              Autonomous &amp; scalable
            </div>
          </div>
        </div>
      </div>

      {/* Manual side (left, clipped overlay) */}
      <div
        className="absolute inset-0 bg-[#0d1117]/80 backdrop-blur-sm pointer-events-none z-[1]"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center py-10 sm:py-14 px-4 sm:px-8">
          <div className="max-w-md w-full relative opacity-60 grayscale">
            <div className="flex justify-center mb-6">
              <Layers className="w-8 h-8 text-white/30" />
            </div>
            <div className="space-y-3 sm:space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`gap-4 ${i >= 3 ? 'hidden sm:flex' : 'flex'}`}>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded border border-white/10 shrink-0" />
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="h-1.5 w-[60%] bg-white/10 rounded" />
                    <div className="h-1.5 w-full bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <div className="text-sm sm:text-base font-semibold tracking-[0.2em] text-white/40">
                MANUAL FRICTION
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/25 mt-1">
                Disconnected &amp; slow
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-emerald-500/60 bg-[#0d1117] flex items-center justify-center gap-1">
          <div className="w-[1.5px] h-3 bg-emerald-400" />
          <div className="w-[1.5px] h-3 bg-emerald-400" />
        </div>
      </div>
    </div>
  );
};
