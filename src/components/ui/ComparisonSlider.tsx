import { useState } from 'react';

export const ComparisonSlider = () => {
  const [position, setPosition] = useState(50);

  const handleMove = (clientX: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const newPosition = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  return (
    <div
      className="relative w-full min-h-[280px] sm:min-h-[320px] h-auto overflow-hidden border border-white/10 select-none group cursor-ew-resize animate-slide-up"
      onMouseMove={(e) => handleMove(e.clientX, e.currentTarget)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.currentTarget)}
    >
      {/* Automated Side (Right) */}
      <div className="relative z-0 bg-black flex items-center justify-center py-10 sm:py-14 px-4 sm:px-8">
        <div className="max-w-md w-full">
          <div className="p-4 sm:p-6 border border-white/20 bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="h-2 w-24 max-w-full bg-white/20 rounded mb-2" />
                <div className="h-1.5 w-16 max-w-full bg-white/10 rounded" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-full bg-white/10 rounded" />
              <div className="h-2 w-full bg-white/10 rounded" />
              <div className="h-2 w-[80%] bg-white/10 rounded" />
            </div>
            <div className="mt-6 sm:mt-8 flex justify-end">
              <div className="px-3 sm:px-4 py-2 border border-white/40 text-[8px] sm:text-[10px] tracking-widest uppercase">
                Process_Locked
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-10 text-center text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-40">
            SYSTEM_OPTIMIZED
          </div>
        </div>
      </div>

      {/* Manual Side (Left) — clipped overlay */}
      <div
        className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none z-[1]"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/40 py-10 sm:py-14 px-4 sm:px-8">
          <div className="max-w-md w-full relative opacity-60 grayscale">
            <div className="space-y-3 sm:space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`gap-4 ${i >= 3 ? 'hidden sm:flex' : 'flex'}`}>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 border border-white/10 shrink-0" />
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="h-1.5 w-[60%] bg-white/10 rounded" />
                    <div className="h-1.5 w-full bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute inset-x-0 bottom-0 z-[2] flex justify-between items-end p-4 sm:p-6 pointer-events-none uppercase tracking-[0.3em] text-[8px] sm:text-[10px]">
        <span className="text-white/40">MANUAL_FRICTION</span>
        <span className="text-white">AGENT_EFFICIENCY</span>
      </div>

      {/* Slider Bar */}
      <div
        className="absolute top-0 bottom-0 w-[1px] bg-white z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 border border-white bg-black flex items-center justify-center flex-col gap-0.5">
          <div className="w-[1px] h-2 sm:h-3 bg-white mb-0.5 sm:mb-1" />
          <div className="w-[1px] h-2 sm:h-3 bg-white" />
        </div>
      </div>
    </div>
  );
};
