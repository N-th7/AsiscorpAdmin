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


  if (loading) return <p>Cargando...</p>;
  if (!authenticated) return null;

  return (
    <div className=" p-5 py-30  md:p-25 min-h-screen text-black">

      <PresentationSection id="inicio" />
      <ValuesSection id="sobre-nosotros" />
      <SectionTitle id="servicios">Nuestros Servicios</SectionTitle>
      <ServicesFormList />
      <SectionTitle>Nuestros Clientes</SectionTitle>
      <ClientCardList />
      <SectionTitle>Nuestras Certificaciones</SectionTitle>
      <CertificationFomList />
      <SectionTitle id="cobertura">Cobertura</SectionTitle>
      <CovarageForm />
      <SectionTitle>Contactos</SectionTitle>
      <SectionFirstContact />
      <SectionSecondContacts />
      <SectionTitle>Redes Sociales</SectionTitle>
      <SectionSocial />
    </div>
  );
}
