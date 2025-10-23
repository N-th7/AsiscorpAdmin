import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

export function Footer( ) {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="relative bg-gradient-to-br from-[#0d2847] via-[#183d72] to-[#0a7d35] text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-white"
          />
        </svg>
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-green-300 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 sm:pt-20 pb-6 sm:pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img src={"/logo.png"} alt="Asiscorp" className="h-12 sm:h-14 lg:h-16 w-auto drop-shadow-2xl" />
                </motion.div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold">Asiscorp</div>
                  <div className="text-xs sm:text-sm text-blue-200">Conectando Bolivia</div>
                </div>
              </div>
              
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-blue-100 mb-4 sm:mb-6">
                Líderes en telecomunicaciones con presencia nacional. Innovación, calidad y compromiso.
              </p>

              
            </motion.div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20 h-fit">
                <p className="text-xs sm:text-sm text-blue-100">
                  Esta empresa está regulada y fiscalizada por la ATT
                </p>
              </div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-6 sm:pt-8 border-t border-white/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-4">
              <p className="text-xs sm:text-sm text-blue-100 text-center md:text-left">
                © {currentYear} Asistencia Corporativa SRL. Todos los derechos reservados.
              </p>

            </div>
            
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
