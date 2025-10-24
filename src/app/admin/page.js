"use client";

import React, { useState } from "react";
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
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "../components/atoms/Button";
import CreateUserModal from "../components/organisms/CreateUserModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { authenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p>Cargando...</p>;
  if (!authenticated) return null;

  return (
    <div className=" p-5 py-30  md:p-25 min-h-screen text-black">
      <Button className="my-10" onClick={() => setShowModal(true)}>
        Crear usuario
      </Button>
      <CreateUserModal isOpen={showModal} onClose={() => setShowModal(false)} />
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
