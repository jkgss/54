import { motion } from 'framer-motion';

const caseStudies = [
  {
    title: "LOGISTICS_EFFICIENCY",
    result: "Reduced invoice processing time by 80% for a mid-sized firm.",
    stat: "80%",
    label: "TIME_REDUCTION"
  },
  {
    title: "FINANCIAL_AUTOMATION",
    result: "Identified $450k in annual leakages through automated auditing.",
    stat: "$450K",
    label: "ANNUAL_SAVINGS"
  },
  {
    title: "CUSTOMER_EXPERIENCE",
    result: "Managed 92% of queries without human intervention.",
    stat: "92%",
    label: "AUTO_RESOLUTION"
  }
];

export const CaseStudies = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full min-w-0">
      {caseStudies.map((study, index) => (
        <motion.div
          key={study.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="p-5 sm:p-8 border border-white/10 bg-black hover:border-white/30 transition-all group min-w-0 overflow-hidden text-center flex flex-col items-center"
        >
          <div className="w-full text-[10px] text-white/40 tracking-[0.2em] sm:tracking-[0.3em] mb-8 uppercase text-center break-words [overflow-wrap:anywhere] whitespace-normal">
            {study.title}
          </div>
          <div className="text-3xl sm:text-4xl font-light mb-2 glow-subtle group-hover:glow-white transition-all">
            {study.stat}
          </div>
          <div className="w-full text-[10px] text-white/60 tracking-widest uppercase mb-6 text-center break-words [overflow-wrap:anywhere] whitespace-normal">
            {study.label}
          </div>
          <p className="w-full text-sm text-white/50 leading-relaxed font-light break-words [overflow-wrap:anywhere] whitespace-normal">
            {study.result}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
