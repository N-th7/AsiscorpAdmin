"use client";
import { motion } from "motion/react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Cobertura", href: "#cobertura" },
];

export function MobileNavLinks() {
  return (
    <nav className="flex flex-col gap-2">
      {links.map((item, index) => (
        <motion.a
          key={item.label}
          href={item.href}
          className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-[#183d72] hover:to-[#0a7d35] hover:text-white transition-all duration-300 font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileTap={{ scale: 0.98 }}
        >
          {item.label}
        </motion.a>
      ))}
    </nav>
  );
}
