import { NavLink } from "../atoms/NavLink";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Cobertura", href: "#cobertura" },
];

export function DesktopNavLinks() {
  return (
    <nav className="hidden lg:flex items-center gap-1">
      {links.map((item, i) => (
        <NavLink key={item.label} {...item} delay={i * 0.1} />
      ))}
    </nav>
  );
}
