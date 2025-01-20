import React from 'react';
import { Button } from "@heroui/button";
import { motion } from 'framer-motion';

interface HamburgerButtonProps {
  isOpen: boolean;
  onPress: () => void;
}

const HamburgerButton = ({ isOpen, onPress }: HamburgerButtonProps) => {
  return (
    <Button
      isIconOnly
      variant="light"
      className="md:hidden relative w-10 h-10"
      onPress={onPress}
    >
      <motion.div
        animate={isOpen ? "open" : "closed"}
        className="w-6 h-6 flex flex-col justify-between items-center"
      >
        {/* 上横线 */}
        <motion.span
          variants={{
            closed: { 
              rotate: 0,
            },
            open: { 
              rotate: 45,
            },
          }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'left center' }}
          className="w-full h-1 bg-foreground -mt-0.5 block rounded-full"
        />
        {/* 中横线 */}
        <motion.span
          variants={{
            closed: { 
              rotate: 0,
              width: '100%',
            },
            open: { 
              rotate: -45,
              width: 'calc(100% * sqrt(2))',
            },
          }}
          transition={{ duration: 0.2 }}
          style={{ transformOrigin: 'center center' }}
          className="w-6 h-1 bg-foreground block rounded-full"
        />
        {/* 下横线 */}
        <motion.span
          variants={{
            closed: { 
              rotate: 0,
            },
            open: { 
              rotate: 45,
            },
          }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'right center' }}
          className="w-full h-1 bg-foreground -mb-0.5 block rounded-full"
        />
      </motion.div>
    </Button>
  );
};

export default HamburgerButton; 