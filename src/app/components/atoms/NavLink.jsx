"use client";
import { motion } from "motion/react";

export function NavLink({ href, label, delay = 0 }) {
  return (
    <motion.a
      href={href}
      className="relative px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-[#183d72] transition-colors group"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -2 }}
    >
      {label}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#183d72] to-[#0a7d35] transition-all duration-300 group-hover:w-full rounded-full" />
    </motion.a>
  );
}
