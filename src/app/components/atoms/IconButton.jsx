"use client";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

export function IconButton({ isOpen, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X size={24} className="text-gray-700" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu size={24} className="text-gray-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
