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
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
             <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-tight uppercase">
              The_Automation_Index
            </h2>
            <p className="text-white/40 text-sm tracking-widest uppercase leading-loose">
              Latest insights into the evolution of autonomous business operating systems.
            </p>
          </div>
          <button className="text-[10px] tracking-[0.4em] uppercase border-b border-white/20 pb-2 hover:border-white transition-all text-white/60 hover:text-white">
            View_Full_Archive
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {insights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black p-10 group cursor-pointer relative overflow-hidden h-full flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              
              <div className="flex justify-between items-start mb-12">
                <span className="text-[9px] tracking-[0.3em] text-white/30 uppercase">{item.category}</span>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <h3 className="text-xl font-medium mb-6 tracking-wide group-hover:text-white transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm text-white/50 leading-relaxed font-light mb-auto">
                {item.summary}
              </p>

              <div className="mt-12 flex items-center justify-between text-[10px] tracking-widest text-white/20 uppercase">
                <span>RESOURCES // 0{index + 1}</span>
                <span>{item.readTime}_READ</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
