import { useInView } from '@/hooks/useInView';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  scale?: number;
}

export function FadeIn({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  once = true,
  scale = 0.9
}: FadeInProps) {
  const { ref, isInView } = useInView({ once });
  
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{
        opacity: 0,
        scale: scale
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : scale
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 