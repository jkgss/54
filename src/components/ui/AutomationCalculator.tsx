import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Clock, Zap, TrendingUp } from 'lucide-react';

const HOURLY_RATE = 65;

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

  const yearlyReclaimed = reclaimedTime * 12;
  const impactValue = yearlyReclaimed * HOURLY_RATE;
  const efficiencyGain = Math.round(((manualHours * 0.8) / 40) * 1000) / 10;

  const stats = [
    { icon: Clock, label: 'Hours reclaimed / year', value: yearlyReclaimed.toLocaleString() },
    { icon: Zap, label: 'Scaled impact value', value: `$${impactValue.toLocaleString()}` },
    { icon: TrendingUp, label: 'Efficiency gain', value: `${efficiencyGain}%` },
  ];

  return (
    <div className="p-5 sm:p-8 glass-card relative overflow-hidden w-full">
      <h3 className="text-base sm:text-xl font-medium mb-8 text-[#f3f4f6] flex items-center gap-3">
        <span className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
          <Calculator className="w-4 h-4 text-emerald-400" />
        </span>
        Automation ROI Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-baseline gap-4 mb-4">
              <label className="text-xs text-[#9ca3af] tracking-widest uppercase">Team size</label>
              <span className="text-white shrink-0">
                <span className="text-xl font-medium">{teamSize}</span>{' '}
                <span className="text-xs text-[#9ca3af]">people</span>
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-baseline gap-4 mb-4">
              <label className="text-xs text-[#9ca3af] tracking-widest uppercase min-w-0">
                Manual hours / person / week
              </label>
              <span className="text-white shrink-0">
                <span className="text-xl font-medium">{manualHours}</span>{' '}
                <span className="text-xs text-[#9ca3af]">hours</span>
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={manualHours}
              onChange={(e) => setManualHours(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <p className="text-xs text-[#9ca3af]/70 italic leading-relaxed">
            *Based on an average fully-loaded hourly rate of ${HOURLY_RATE} and 80% automation
            efficiency across standardized workflows.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.08]"
            >
              <span className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <stat.icon className="w-4 h-4 text-emerald-400" />
              </span>
              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.15em] uppercase text-[#9ca3af] mb-1">
                  {stat.label}
                </div>
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl sm:text-2xl font-light text-white"
                >
                  {stat.value}
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
