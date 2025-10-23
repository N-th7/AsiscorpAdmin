"use client";
import { motion, AnimatePresence } from "motion/react";
import { MobileNavLinks } from "../molecules/MobileNavLinks";
import { CTAButton } from "../molecules/CTAButton";

export function MobileMenu({ isOpen, onClick }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-white/98 backdrop-blur-lg border-t border-gray-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-4">
            <MobileNavLinks />
            <div className="pt-4 border-t border-gray-200 space-y-3 text-center">
              <CTAButton  className="mx-auto" onClick={onClick}/>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
