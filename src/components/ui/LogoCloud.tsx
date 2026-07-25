import { motion } from 'framer-motion';
import { Landmark, HeartPulse, Truck, ShoppingCart, Scale, Cpu } from 'lucide-react';

const sectors = [
  { name: 'Finance', icon: Landmark },
  { name: 'Healthcare', icon: HeartPulse },
  { name: 'Logistics', icon: Truck },
  { name: 'E-commerce', icon: ShoppingCart },
  { name: 'Legal', icon: Scale },
  { name: 'Tech', icon: Cpu },
];

export const LogoCloud = () => {
  return (
    <div className="py-20 border-y border-white/5 overflow-x-hidden w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center min-w-0">
        <div className="text-center mb-14 w-full">
          <p className="text-xs text-[#9ca3af] tracking-[0.2em] uppercase break-words">Trusted across industries</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-12 text-[#9ca3af]/60 w-full min-w-0">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ opacity: 1, color: 'rgb(52 211 153)' }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center gap-3 group cursor-default"
            >
              <sector.icon className="w-7 h-7 transition-transform group-hover:scale-110" />
              <span className="text-xs tracking-wide">{sector.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
