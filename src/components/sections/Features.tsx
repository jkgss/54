import { Bot, Zap, Network, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Bot,
    title: "AI_CHAT_AGENTS",
    description: "Deploy intelligent conversational AI that understands context, learns from interactions, and delivers human-like experiences 24/7.",
    items: ["Natural_Language_Processing", "Multi_Platform_Integration", "Custom_Training_&_Optimization"]
  },
  {
    icon: Zap,
    title: "LEAD_GENERATION",
    description: "Automate prospect discovery, qualification, and nurturing with AI-powered systems that work while you sleep.",
    items: ["Intelligent_Lead_Scoring", "Automated_Outreach_Campaigns", "Real_Time_Analytics_&_Insights"]
  },
  {
    icon: Network,
    title: "CRM_INTEGRATION",
    description: "Seamlessly connect your AI agents with existing CRM systems for unified data flow and enhanced customer insights.",
    items: ["Universal_CRM_Compatibility", "Bidirectional_Sync", "Custom_Workflow_Automation"]
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

        <div className="grid lg:grid-cols-3 gap-6">
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
              <h3 className="text-xl font-medium mb-5 tracking-wide uppercase">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed mb-8 text-sm font-light uppercase tracking-wider">
                {feature.description}
              </p>
              <ul className="space-y-3 text-[10px] text-white/40 font-light mt-auto">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 uppercase tracking-widest">
                    <CheckCircle className="w-3 h-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
