"use client";

import { motion } from "framer-motion";
import { Navbar } from "../components/templates/Navbar";
import { Footer } from "../components/organisms/Footer";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen min-w-screen relative overflow-hidden bg-white">
      <Navbar></Navbar>
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#f5f9ff] via-[#e4e8ec] to-[#dfeaf5]"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          backgroundSize: "400% 400%",
        }}
      />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(173, 216, 255, 0.3), transparent 70%)",
        }}
      />

      <div className="relative z-10 bg-white/20">{children}</div>
      <Footer></Footer>
    </div>
  );
}
