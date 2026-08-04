import { Phone, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Globe,
    title: "High performance web design",
    description: "Custom-engineered, mobile-first websites built for speed and authority. This is your digital storefront, optimized to rank on Google and turn local searchers into high-value leads.",
    tag: "UI/UX infrastructure"
  },
  {
    icon: Phone,
    title: "Automated phone responder",
    description: "An 'always-on' receptionist that eliminates the client communications bottleneck. It handles intake, qualifies prospects, and books appointments 24/7 so you never miss a job while on-site.",
    tag: "Voice logic gateway"
  },
  {
    icon: Zap,
    title: "Instant lead qualification",
    description: "Automated SMS and email workflows that remove the lead qualifying and data entry bottlenecks. Every inquiry is instantly vetted and synced to your database without manual paperwork.",
    tag: "Data ingest pipeline"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-16 md:py-32 px-4 sm:px-6 relative overflow-x-hidden w-full">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center min-w-0">
        <div className="text-center mb-12 md:mb-20 w-full min-w-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 tracking-tight text-[#f3f4f6] break-words">
            Cutting-edge capabilities
          </h2>
          <p className="text-sm text-[#9ca3af] break-words">
            Engineered for excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 sm:p-8 glass-card hover:border-emerald-500/40 hover:glow-emerald transition-all duration-500 flex flex-col h-full min-w-0 overflow-hidden text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 group-hover:glow-emerald-strong transition-all duration-300 shrink-0">
                <feature.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="w-full text-lg sm:text-xl font-medium mb-4 text-[#f3f4f6] break-words">
                {feature.title}
              </h3>
              <p className="w-full text-[#9ca3af] leading-relaxed mb-8 text-sm break-words">
                {feature.description}
              </p>
              <div className="mt-auto pt-5 border-t border-white/[0.08] w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-[#9ca3af]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="min-w-0 break-words">{feature.tag}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
