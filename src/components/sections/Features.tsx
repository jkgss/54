import { Phone, Zap, Globe, CheckCircle } from 'lucide-react';
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
    <section id="features" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-light mb-6 tracking-tight uppercase">
            Cutting_Edge
            <br />
            <span className="glow-subtle font-medium">Capabilities</span>
          </h2>
          <p className="text-[10px] text-white/40 tracking-[0.5em] uppercase">Engineered_For_Excellence</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-10 border border-white/10 hover:border-white/30 transition-all duration-500 hover:border-glow bg-black flex flex-col h-full"
            >
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-8 group-hover:border-white/40 transition-all duration-300">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-5 tracking-wide uppercase glow-white">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed mb-8 text-sm font-light uppercase tracking-wider">
                {feature.description}
              </p>
              <div className="mt-auto pt-6 border-t border-white/10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] text-white/60 tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 bg-white animate-pulse" />
                  {feature.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
