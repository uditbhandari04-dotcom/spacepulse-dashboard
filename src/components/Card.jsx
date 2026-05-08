import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

export const Card = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
