'use client';
import React from "react";
import LoginForm from "../organisms/LoginForm";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginTemplate() {
    return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#183d72] via-[#1a4580] to-[#0a7d35] flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-[#0a7d35] rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#183d72] rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
              <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 md:p-10">
            <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#0a7d35] to-[#183d72] rounded-2xl mb-4 shadow-lg">
             <Image
                src="/logo.png"
                width={80}
                height={80}
                alt="Asiscorp Logo"
             />
            </div>
            <h1 className="text-white mb-2">Panel de Administración</h1>
            <p className="text-white/80">Ingrese sus credenciales para continuar</p>
          </motion.div>
            <LoginForm />
        </div>
        </motion.div>
    </div>
    );
}   