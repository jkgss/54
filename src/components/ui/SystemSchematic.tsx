import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const SystemSchematic = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative w-full py-24 flex items-center justify-center">
      <motion.div style={{ opacity }} className="relative w-full max-w-4xl aspect-[2/1]">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* Nodes */}
          <CircleNode x={100} y={200} label="DATA_INPUT" delay={0.1} />
          <CircleNode x={300} y={100} label="ANALYSIS_ENGINE" delay={0.3} />
          <CircleNode x={300} y={300} label="LOGIC_GATE" delay={0.4} />
          <CircleNode x={500} y={200} label="ACTION_HANDLER" delay={0.6} />
          <CircleNode x={700} y={200} label="OUTPUT_RESULT" delay={0.8} />

          {/* Connections */}
          <motion.path
            d="M 140 200 L 260 100"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="4 4"
            style={{ pathLength }}
          />
          <motion.path
            d="M 140 200 L 260 300"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="4 4"
            style={{ pathLength }}
          />
          <motion.path
            d="M 340 100 L 460 200"
            fill="none"
            stroke="white"
            strokeWidth="1"
            style={{ pathLength }}
          />
          <motion.path
            d="M 340 300 L 460 200"
            fill="none"
            stroke="white"
            strokeWidth="1"
            style={{ pathLength }}
          />
          <motion.path
            d="M 540 200 L 660 200"
            fill="none"
            stroke="white"
            strokeWidth="1"
            style={{ pathLength }}
          />
        </svg>
      </motion.div>
    </div>
  );
};

const CircleNode = ({ x, y, label, delay }: { x: number; y: number; label: string; delay: number }) => (
  <g>
    <motion.circle
      cx={x}
      cy={y}
      r="40"
      fill="black"
      stroke="white"
      strokeWidth="1"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: false }}
    />
    <text
      x={x}
      y={y + 60}
      textAnchor="middle"
      fill="white"
      fontSize="10"
      fontFamily="monospace"
      letterSpacing="1"
      className="opacity-40 uppercase"
    >
      {label}
    </text>
    <motion.circle
      cx={x}
      cy={y}
      r="4"
      fill="white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: [0, 1, 0] }}
      transition={{ delay: delay + 0.5, duration: 2, repeat: Infinity }}
    />
  </g>
);
