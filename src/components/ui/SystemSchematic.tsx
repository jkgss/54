import { motion } from 'framer-motion';
import { Database, Cpu, Share2, MessageSquare, Zap, Users, TrendingDown } from 'lucide-react';

const nodes = [
  { icon: Database, label: 'Data Ingestion' },
  { icon: Cpu, label: 'AI Processing' },
  { icon: Share2, label: 'Tool Orchestration' },
  { icon: MessageSquare, label: 'Human Feedback' },
];

const stats = [
  {
    icon: Zap,
    stat: '80% Reduction',
    label: 'Processing time',
    description: 'Automated document extraction and routing for a regional healthcare provider.',
  },
  {
    icon: Users,
    stat: '1,200+ Hours',
    label: 'Saved monthly',
    description: 'Reclaimed team capacity by syncing disparate CRM and financial tools.',
  },
  {
    icon: TrendingDown,
    stat: '0% Error Rate',
    label: 'In data entry',
    description: 'Eliminated manual transcription errors in high-stakes financial reporting.',
  },
];

export const SystemSchematic = () => {
  return (
    <div className="relative w-full flex flex-col gap-16 md:gap-24 overflow-x-hidden">
      {/* Flow nodes */}
      <div className="flex flex-wrap items-start justify-center sm:justify-start gap-8 sm:gap-12 w-full">
        {nodes.map((node, index) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="flex flex-col items-center gap-3 w-24"
          >
            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center glow-emerald-strong">
              <node.icon className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#9ca3af] text-center leading-relaxed">
              {node.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Impact stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full min-w-0">
        {stats.map((item, index) => (
          <motion.div
            key={item.stat}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card hover:border-emerald-500/40 hover:glow-emerald transition-all duration-500 p-5 sm:p-6 flex flex-col min-w-0 text-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-emerald-400" />
              </span>
              <div className="min-w-0">
                <div className="text-base font-semibold text-white break-words">{item.stat}</div>
                <div className="text-[10px] tracking-[0.15em] uppercase text-[#9ca3af]">
                  {item.label}
                </div>
              </div>
            </div>
            <p className="text-xs text-[#9ca3af] leading-relaxed mb-5 break-words">
              {item.description}
            </p>
            <motion.div
              className="mt-auto h-[2px] bg-emerald-500/70 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.8 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
