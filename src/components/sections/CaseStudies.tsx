import { motion } from 'framer-motion';

const caseStudies = [
  {
    title: "Logistics efficiency",
    result: "Reduced invoice processing time by 80% for a mid-sized firm.",
    stat: "80%",
    label: "Time reduction"
  },
  {
    title: "Financial automation",
    result: "Identified $450k in annual leakages through automated auditing.",
    stat: "$450K",
    label: "Annual savings"
  },
  {
    title: "Customer experience",
    result: "Managed 92% of queries without human intervention.",
    stat: "92%",
    label: "Auto resolution"
  }
];

export const CaseStudies = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 w-full min-w-0">
      {caseStudies.map((study, index) => (
        <motion.div
          key={study.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="p-6 sm:p-8 glass-card hover:border-emerald-500/40 hover:glow-emerald transition-all duration-500 group min-w-0 overflow-hidden text-left flex flex-col"
        >
          <div className="w-full text-[10px] text-[#9ca3af] tracking-[0.15em] uppercase mb-6 break-words">
            {study.title}
          </div>
          <div className="text-3xl sm:text-4xl font-light mb-1 text-emerald-400 transition-all">
            {study.stat}
          </div>
          <div className="w-full text-xs text-[#9ca3af] mb-5 break-words">
            {study.label}
          </div>
          <p className="w-full text-sm text-[#9ca3af] leading-relaxed mb-6 break-words">
            {study.result}
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
  );
};
