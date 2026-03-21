import { useState } from 'react';
import { motion } from 'framer-motion';

export const ComparisonSlider = () => {
  const [position, setPosition] = useState(50);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newPosition = ((x - rect.left) / rect.width) * 100;
    setPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden border border-white/10 select-none group cursor-ew-resize"
         onMouseMove={handleMouseMove}
         onTouchMove={handleMouseMove}>
      
      {/* Automated Side (Right) */}
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <div className="max-w-md w-full px-8">
          <div className="p-6 border border-white/20 bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="h-2 w-24 bg-white/20 rounded mb-2" />
                <div className="h-1.5 w-16 bg-white/10 rounded" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-full bg-white/10 rounded" />
              <div className="h-2 w-full bg-white/10 rounded" />
              <div className="h-2 w-[80%] bg-white/10 rounded" />
            </div>
            <div className="mt-8 flex justify-end">
              <div className="px-4 py-2 border border-white/40 text-[10px] tracking-widest uppercase">Process_Locked</div>
            </div>
          </div>
          <div className="mt-12 text-center text-xs tracking-[0.3em] uppercase opacity-40">SYSTEM_OPTIMIZED</div>
        </div>
      </div>

      {/* Manual Side (Left) */}
      <div 
        className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/40">
           <div className="max-w-md w-full px-8 relative opacity-60 grayscale">
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 border border-white/10 shrink-0" />
                    <div className="flex-1 space-y-2">
                       <div className="h-1.5 w-[60%] bg-white/10 rounded" />
                       <div className="h-1.5 w-full bg-white/5 rounded" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/[0.02] rounded-full blur-2xl" />
           </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute inset-0 flex justify-between items-end p-8 pointer-events-none uppercase tracking-[0.3em] text-[10px]">
        <span className="text-white/40">MANUAL_FRICTION</span>
        <span className="text-white">AGENT_EFFICIENCY</span>
      </div>

      {/* Slider Bar */}
      <div 
        className="absolute top-0 bottom-0 w-[1px] bg-white z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border border-white bg-black flex items-center justify-center flex-col gap-0.5">
           <div className="w-[1px] h-3 bg-white mb-1" />
           <div className="w-[1px] h-3 bg-white" />
        </div>
      </div>
    </div>
  );
};
