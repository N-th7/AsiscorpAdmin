'use client';
import React , {useState, useEffect } from "react";
import { Lock, Mail, Eye, EyeOff, Shield, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Input from "./../atoms/Input";
import { Button } from "../atoms/Button";
import { login } from "../../api/auth"
import { useRouter } from "next/navigation";


export default function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({email: "", password: ""});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await login(formData);
            console.log("Login exitoso");
            setFormData({ email: "", password: "" });
            router.push("/admin");
            
        } catch (err) {
            setError("Error al iniciar sesión. Por favor, verifique sus credenciales.");
            console.error("Error de login:", err);
        } finally {
            setIsLoading(false);
        }
            setFormData({ email: "", password: "" });

        
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };  

    return (    
        <div>
            <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-2"
            >
             <div className="relative">
            <Mail className="absolute left-3 top-12 -translate-y-1/2 w-5 h-5 text-white/60 my-auto" />
            <Input
                label="Correo Electrónico"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all my-auto"
                required
            />
            </div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-2"
            >
              <div className="relative my-auto">
                <Lock className="absolute left-3 top-12 -translate-y-1/2 w-5 h-5 text-white/60 my-auto" />
                <Input
                label="Contraseña"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-11 pr-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-white/40 transition-all my-auto"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-12 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 " />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-white"
              >
                {error}
              </motion.div>
            )}


            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#0a7d35] to-[#0c9641] hover:from-[#0c9641] hover:to-[#0a7d35] text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Iniciando sesión...
                  </span>
                ) : (
                  "Iniciar Sesión"
                )}
              </Button>
            </motion.div>
          </form>
        </div>
    );
};