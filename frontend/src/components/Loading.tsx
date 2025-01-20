import { Spinner } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingProps {
  visible: boolean;
  text?: string;
}

export function Loading({ visible, text }: LoadingProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-[8px] flex flex-col items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Spinner size="lg" color="primary" />
          {text && (
            <motion.div
              className="mt-4 text-white/90 text-sm px-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {text}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 