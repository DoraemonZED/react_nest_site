import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface MessageProps {
  id: string;
  type: 'primary' | 'success' | 'warning' | 'danger' | string;
  content: string;
  onCloseAction: () => void;
  index: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Message = forwardRef<HTMLDivElement, MessageProps>(
  ({ type, content, onCloseAction, onMouseEnter, onMouseLeave }, ref) => {
    const bgColor = {
      primary: 'bg-primary/60',
      success: 'bg-success/60',
      warning: 'bg-warning/60',
      danger: 'bg-danger/60'
    }[type];

    return (
      <motion.div
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`
          ${bgColor} backdrop-blur-[8px] text-white
          rounded-lg shadow-lg
          border border-white/10
          px-4 py-2 sm:px-4 sm:py-2.5
          text-sm sm:text-base
          w-[280px] sm:w-[320px]
          flex items-center
          backdrop-saturate-150
          z-[1000]
        `}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.2 }}
        layout
      >
        <span className="flex-1 line-clamp-2 mr-2">{content}</span>
        <button 
          onClick={onCloseAction}
          className="shrink-0 hover:opacity-80 p-1 ml-auto"
        >
          <i className="bi bi-x text-base" />
        </button>
      </motion.div>
    );
  }
);

// 添加显示名称以便调试
Message.displayName = 'Message'; 