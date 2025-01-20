import { useInView } from '@/hooks/useInView';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
}

type DirectionOffset = {
  y?: number;
  x?: number;
};

const directions: Record<NonNullable<FadeInProps['direction']>, DirectionOffset> = {
  up: { y: 20 },
  down: { y: -20 },
  left: { x: 20 },
  right: { x: -20 }
};

export function FadeIn({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.5,
  once = true
}: FadeInProps) {
  const { ref, isInView } = useInView({ once });
  
  const directionOffset = directions[direction];
  
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{
        opacity: 0,
        ...directionOffset
      }}
      animate={{
        opacity: isInView ? 1 : 0,
        ...isInView 
          ? { x: 0, y: 0 }
          : directionOffset
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