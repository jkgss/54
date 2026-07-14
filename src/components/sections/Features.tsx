import { Phone, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Globe,
    title: "HIGH_PERFORMANCE_WEB_DESIGN",
    description: "Custom-engineered, mobile-first websites built for speed and authority. This is your digital storefront, optimized to rank on Google and turn local searchers into high-value leads.",
    tag: "UI_UX_INFRASTRUCTURE"
  },
  {
    icon: Phone,
    title: "AUTOMATED_PHONE_RESPONDER",
    description: "An 'always-on' receptionist that eliminates the Client Communications bottleneck. It handles intake, qualifies prospects, and books appointments 24/7 so you never miss a job while on-site.",
    tag: "VOICE_LOGIC_GATEWAY"
  },
  {
    icon: Zap,
    title: "INSTANT_LEAD_QUALIFICATION",
    description: "Automated SMS and email workflows that remove the Lead Qualifying and Data Entry bottlenecks. Every inquiry is instantly vetted and synced to your database without manual paperwork.",
    tag: "DATA_INGEST_PIPELINE"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-16 md:py-32 px-4 sm:px-6 relative overflow-x-hidden w-full">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-w-0">
        <div className="text-center mb-16 md:mb-24 w-full min-w-0">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light mb-6 tracking-tight uppercase break-words [overflow-wrap:anywhere] whitespace-normal">
            Cutting_Edge
            <br />
            <span className="glow-subtle font-medium">Capabilities</span>
          </h2>
          <p className="text-[10px] text-white/40 tracking-[0.3em] sm:tracking-[0.5em] uppercase break-words">
            Engineered_For_Excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-5 sm:p-10 border border-white/10 hover:border-white/30 transition-all duration-500 hover:border-glow bg-black flex flex-col h-full min-w-0 overflow-hidden text-center items-center"
            >
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-8 group-hover:border-white/40 transition-all duration-300 shrink-0">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="w-full text-lg sm:text-xl md:text-2xl font-bold mb-5 tracking-wide uppercase glow-white text-center break-words [overflow-wrap:anywhere] whitespace-normal">
                {feature.title}
              </h3>
              <p className="w-full text-white/50 leading-relaxed mb-8 text-sm font-light uppercase tracking-wider break-words [overflow-wrap:anywhere] whitespace-normal">
                {feature.description}
              </p>
              <div className="mt-auto pt-6 border-t border-white/10 w-full flex justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] text-white/60 tracking-widest uppercase max-w-full break-words [overflow-wrap:anywhere]">
                  <span className="w-1.5 h-1.5 bg-white animate-pulse shrink-0" />
                  <span className="min-w-0 break-words [overflow-wrap:anywhere]">{feature.tag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
