import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const AutomationCalculator = () => {
  const [teamSize, setTeamSize] = useState(10);
  const [manualHours, setManualHours] = useState(15);
  const [reclaimedTime, setReclaimedTime] = useState(0);

  useEffect(() => {
    // Assuming 80% automation efficiency for these manual tasks
    const weeklyReclaimed = teamSize * manualHours * 0.8;
    const monthlyReclaimed = weeklyReclaimed * 4;
    setReclaimedTime(Math.round(monthlyReclaimed));
  }, [teamSize, manualHours]);

  return (
    <div className="p-8 border border-white/10 bg-black/50 backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      
      <h3 className="text-xl font-medium mb-8 tracking-wide flex items-center gap-3">
        AUTOMATION_CALCULATOR
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
      </h3>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between mb-4">
            <label className="text-xs text-white/50 tracking-widest uppercase">Team Size</label>
            <span className="text-white font-mono">{teamSize} PERS.</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={teamSize}
            onChange={(e) => setTeamSize(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-white"
          />
        </div>

        <div>
          <div className="flex justify-between mb-4">
            <label className="text-xs text-white/50 tracking-widest uppercase">Manual Hours / Week / Person</label>
            <span className="text-white font-mono">{manualHours} HRS</span>
          </div>
          <input
            type="range"
            min="1"
            max="40"
            value={manualHours}
            onChange={(e) => setManualHours(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-white"
          />
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="text-xs text-white/40 tracking-[0.2em] mb-4 uppercase">Potential Reclaimed Time</div>
          <div className="relative">
            <motion.div
              key={reclaimedTime}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-light glow-white inline-block"
            >
              {reclaimedTime.toLocaleString()}
            </motion.div>
            <span className="text-sm text-white/40 ml-4 tracking-widest uppercase">Hours / Month</span>
          </div>
          <p className="mt-4 text-[10px] text-white/30 leading-relaxed max-w-xs uppercase tracking-tighter">
            *Based on an average 80% automation efficiency across standardized operational workflows.
          </p>
        </div>
      </div>
    </div>
  );
};
