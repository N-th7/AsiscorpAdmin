"use client";
import { motion } from "motion/react";

export function Logo() {
  return (
    <motion.a
      href="#inicio"
      className="relative z-10 flex items-center gap-3 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#183d72] to-[#0a7d35] opacity-20 blur-xl group-hover:opacity-30 transition-opacity rounded-full" />
        <img src="/logo.png" alt="Asiscorp" className="h-16 w-auto relative z-10 drop-shadow-lg" />
      </div>
      <div className="hidden sm:block">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#183d72] to-[#0a7d35] bg-clip-text text-transparent">
          Asiscorp
        </div>
        <div className="text-xs text-gray-600 -mt-1">Conectando Bolivia</div>
      </div>
    </motion.a>
  );
}
