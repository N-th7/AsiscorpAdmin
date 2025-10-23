"use client";
import { motion } from "motion/react";

export function CTAButton({className, onClick}) {
  return (
    <motion.a
      href="#contacto"
      className={`relative px-6 py-2.5 bg-gradient-to-r from-[#fa0101] to-[#ad0707] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <button
              onClick={onClick}
            >
              Cerrar sesión
            </button>
    </motion.a>
  );
}
