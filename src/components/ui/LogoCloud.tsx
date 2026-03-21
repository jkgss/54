import { motion } from 'framer-motion';
import { Landmark, HeartPulse, Truck, ShoppingCart, Scale, Cpu } from 'lucide-react';

const sectors = [
  { name: 'FINANCE', icon: Landmark },
  { name: 'HEALTHCARE', icon: HeartPulse },
  { name: 'LOGISTICS', icon: Truck },
  { name: 'E-COMMERCE', icon: ShoppingCart },
  { name: 'LEGAL', icon: Scale },
  { name: 'TECH', icon: Cpu },
];

export const LogoCloud = () => {
  return (
    <div className="py-24 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[10px] text-white/40 tracking-[0.5em] uppercase">Industry_Integration_Matrix</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 text-white/30">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, filter: 'grayscale(1)' }}
              whileInView={{ opacity: 1, filter: 'grayscale(1)' }}
              whileHover={{ opacity: 1, color: 'white', filter: 'grayscale(0)' }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center gap-4 group cursor-default"
            >
              <sector.icon className="w-8 h-8 transition-transform group-hover:scale-110" />
              <span className="text-[10px] tracking-[0.2em]">{sector.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
