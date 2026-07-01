"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";

/* ─── Shared spring/easing presets ─────────────────────────────────── */
export const springBouncy = { type: "spring" as const, stiffness: 320, damping: 22 };
export const springSnappy = { type: "spring" as const, stiffness: 400, damping: 30 };
export const easeOut = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

/* ─── FadeIn ────────────────────────────────────────────────────────── */
interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}
export function FadeIn({ children, delay = 0, duration = 0.5, className, once = true }: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ─── SlideUp ───────────────────────────────────────────────────────── */
interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}
export function SlideUp({ children, delay = 0, distance = 30, className, once = true }: SlideUpProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── ScaleIn (pop) ─────────────────────────────────────────────────── */
interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}
export function ScaleIn({ children, delay = 0, className, once = true }: ScaleInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-40px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.75 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ ...springBouncy, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger container ─────────────────────────────────────────────── */
const staggerContainerVariants: Variants = {
  hidden: {},
  show: (staggerChildren = 0.08) => ({
    transition: { staggerChildren, delayChildren: 0 },
  }),
};

interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
  delay?: number;
  once?: boolean;
}
export function StaggerContainer({ children, stagger = 0.08, className, delay = 0, once = true }: StaggerContainerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-50px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainerVariants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      custom={stagger}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Stagger item ──────────────────────────────────────────────────── */
const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...springBouncy },
  },
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={staggerItemVariants}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hover card (lift + shadow) ────────────────────────────────────── */
interface HoverCardProps {
  children: ReactNode;
  className?: string;
  lift?: number;
}
export function HoverCard({ children, className, lift = 6 }: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -lift, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={springSnappy}
    >
      {children}
    </motion.div>
  );
}

/* ─── Floating (gentle bob) ─────────────────────────────────────────── */
interface FloatingProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
}
export function Floating({ children, className, amplitude = 10 }: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Page transition wrapper ───────────────────────────────────────── */
export function PageTransition({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ ...easeOut, duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
