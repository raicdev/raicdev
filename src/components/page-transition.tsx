import { useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <motion.div
      key={pathname}
      initial={{
        opacity: 0,
        scale: 0.95,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
        type: "tween",
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
