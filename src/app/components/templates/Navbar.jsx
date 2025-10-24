import { useState, useEffect } from "react";
import { NavbarContent } from "../organisms/NavbarContent";
import { MobileMenu } from "../organisms/MobileMenu";
import { logout } from "../../api/auth";
import { useRouter } from "next/navigation";

export function Navbar({phone}) {

    const router = useRouter();
  
    const handleLogout = async () => {
      try {
        await logout();
        localStorage.removeItem("accessToken");
        router.push("/");
      } catch (err) {
        alert("No se pudo cerrar sesión correctamente");
        console.error(err);
      }
    };
  

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          setIsMobileMenuOpen(false);
        }
      });
    });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-xl"
          : "bg-gradient-to-b from-white via-white/98 to-transparent"
      }`}
    >
      <div className="relative">
        <div className="h-1 w-full bg-gradient-to-r from-[#183d72] via-[#0a7d35] to-[#183d72]" />
        <NavbarContent
          isScrolled={isScrolled}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          phone={phone}
          onClick={handleLogout}
        />
      </div>
      <MobileMenu 
      isOpen={isMobileMenuOpen}
      onClick={handleLogout}
      />
    </header>
  );
}
