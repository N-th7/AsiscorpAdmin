"use client";

import React from "react";
import PresentationSection from "../components/templates/PresentationSection";
import ValuesSection from "../components/templates/ValuesSection";
import ServicesFormList from "../components/templates/ServicesFormList";
import ClientCardList from "../components/organisms/ClientCardList";
import CertificationFomList from "../components/organisms/CertificationFomList";
import CovarageForm from "../components/organisms/CovarageForm";
import SectionFirstContact from "../components/templates/SectionFirstContact";
import SectionSecondContacts from "../components/templates/SectionSecondContacts";
import SectionSocial from "../components/templates/SectionSocial";
import SectionTitle from "../components/atoms/SectionTitle";
import { logout } from "@/app/api/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const { authenticated, loading } = useAuth();
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

  if (loading) return <p>Cargando...</p>;
  if (!authenticated) return null;

  return (
    <div className="md:p-20 p-10 md:px-30 min-h-screen bg-white text-black">
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Cerrar sesión
      </button>

      <PresentationSection />
      <ValuesSection />
      <SectionTitle>Nuestros Servicios</SectionTitle>
      <ServicesFormList />
      <SectionTitle>Nuestros Clientes</SectionTitle>
      <ClientCardList />
      <SectionTitle>Nuestras Certificaciones</SectionTitle>
      <CertificationFomList />
      <SectionTitle>Cobertura</SectionTitle>
      <CovarageForm />
      <SectionTitle>Contactos</SectionTitle>
      <SectionFirstContact />
      <SectionSecondContacts />
      <SectionTitle>Redes Sociales</SectionTitle>
      <SectionSocial />
    </div>
  );
}
