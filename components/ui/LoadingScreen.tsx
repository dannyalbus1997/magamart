"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0c1a2e]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="flex items-center gap-3 mb-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/40"
          animate={{ rotate: [0, -6, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
            <path d="M4 4h3l3.5 14h14l2.5-10H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="13.5" cy="22.5" r="2" fill="white"/>
            <circle cx="22.5" cy="22.5" r="2" fill="white"/>
          </svg>
        </motion.div>
        <div>
          <motion.h1
            className="text-3xl font-black text-white tracking-tight leading-none"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            Mega<span className="text-blue-400">Mart</span>
          </motion.h1>
          <motion.p
            className="text-blue-300/70 text-xs tracking-widest uppercase font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            Shop Everything
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        className="flex items-end gap-5 mb-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {[
          { icon: "📱", delay: 0, dur: 2.8 },
          { icon: "💻", delay: 0.3, dur: 3.2 },
          { icon: "👟", delay: 0.6, dur: 2.5 },
          { icon: "🎧", delay: 0.9, dur: 3.5 },
          { icon: "⌚", delay: 1.2, dur: 2.9 },
        ].map(({ icon, delay, dur }, i) => (
          <motion.div
            key={i}
            className="text-3xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
          >
            {icon}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 rounded-full"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.p
        className="text-white/40 text-xs tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Loading your store...
      </motion.p>
    </motion.div>
  );
}
