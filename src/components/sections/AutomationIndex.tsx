import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const insights = [
  {
    category: "INSIGHT_REPORT",
    title: "THE_COST_OF_INERTIA",
    summary: "Why delaying AI integration costs more than the implementation itself in 2024.",
    readTime: "4_MIN"
  },
  {
    category: "STRATEGY_BRIEF",
    title: "SCALING_WITHOUT_HEADCOUNT",
    summary: "How a logistics partner grew revenue by 3x while maintaining a team of 12.",
    readTime: "6_MIN"
  },
  {
    category: "TECHNICAL_WHITE_PAPER",
    title: "AGENTIC_INFRASTRUCTURE",
    summary: "Moving beyond simple chatbots to autonomous decision-making agents.",
    readTime: "9_MIN"
  }
];

export const AutomationIndex = () => {
  return (
    <section id="about" className="py-16 md:py-32 px-4 sm:px-6 overflow-x-hidden w-full">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-w-0">
        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24 gap-6 w-full min-w-0">
          <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-6 sm:mb-8 tracking-tight uppercase text-center break-words [overflow-wrap:anywhere] whitespace-normal">
              The_Automation_Index
            </h2>
            <p className="text-white/40 text-sm tracking-widest uppercase leading-loose text-center break-words [overflow-wrap:anywhere] whitespace-normal">
              Latest insights into the evolution of autonomous business operating systems.
            </p>
          </div>
          <button className="text-[10px] tracking-[0.4em] uppercase border-b border-white/20 pb-2 hover:border-white transition-all text-white/60 hover:text-white">
            View_Full_Archive
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 w-full min-w-0">
          {insights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black p-5 sm:p-10 group cursor-pointer relative overflow-hidden h-full flex flex-col min-w-0 text-center items-center"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

              <div className="flex justify-between items-start mb-10 sm:mb-12 w-full gap-3">
                <span className="text-[9px] tracking-[0.2em] sm:tracking-[0.3em] text-white/30 uppercase text-left min-w-0 break-words [overflow-wrap:anywhere] whitespace-normal">
                  {item.category}
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
              </div>

              <h3 className="w-full text-lg sm:text-xl md:text-2xl font-medium mb-6 tracking-wide group-hover:text-white transition-colors text-center break-words [overflow-wrap:anywhere] whitespace-normal">
                {item.title}
              </h3>

              <p className="w-full text-sm text-white/50 leading-relaxed font-light mb-auto break-words [overflow-wrap:anywhere] whitespace-normal">
                {item.summary}
              </p>

              <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] tracking-widest text-white/20 uppercase w-full">
                <span className="break-words">RESOURCES // 0{index + 1}</span>
                <span className="break-words">{item.readTime}_READ</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
