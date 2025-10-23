import React from "react";
import NavLink from "../atoms/NavLink";

export default function NavLinksGroup({ vertical = false }) {
  return (
    <div className={`${vertical ? "flex flex-col space-y-5" : "hidden md:flex space-x-4"}`}>
      <NavLink href="#">Inicio</NavLink>
      <NavLink href="#contact_us">Sobre nosotros</NavLink>
      <NavLink href="#services">Servicios</NavLink>
      <NavLink href="#covarage">Cobertura</NavLink>
    </div>
  );
}
