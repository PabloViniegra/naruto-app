"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "motion/react";

interface AnimatedBentoItemProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

export function AnimatedBentoItem({
  children,
  index = 0,
  className = "",
}: AnimatedBentoItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
