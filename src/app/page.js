'use client';

import React, {useState} from "react";
import PresentationSection from "./components/templates/PresentationSection";
import ValuesSection from "./components/templates/ValuesSection";
import ServiceCardForm from "./components/organisms/ServiceCardForm";
import ClientCardForm from "./components/molecules/ClientCardForm";
import ClientCardList from "./components/organisms/ClientCardList";
import SectionTitle from "./components/atoms/SectionTitle";
import CertificationFomList from "./components/organisms/CertificationFomList";
import CovarageForm from "./components/organisms/CovarageForm";
import SectionFirstContact from "./components/templates/SectionFirstContact";
import SectionSecondContacts from "./components/templates/SectionSecondContacts";
import SectionSocial from "./components/templates/SectionSocial";

export default function Home() {
const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
});

  return (
    <div className=" md:p-20 p-10 md:px-30" >
      <PresentationSection/>
      <ValuesSection/>
      <SectionTitle>Nuestros Servicios</SectionTitle>
      <ServiceCardForm formData={formData}/>
      <SectionTitle>Nuestros Clientes</SectionTitle>
      <ClientCardList/>

      <SectionTitle>Nuestras Certificaciones</SectionTitle>
      <CertificationFomList/>
      <SectionTitle>Cobertura</SectionTitle>
      <CovarageForm />
      <SectionTitle>Contactos</SectionTitle>
      <SectionFirstContact></SectionFirstContact>
      <SectionSecondContacts></SectionSecondContacts>
      <SectionTitle>Redes Sociales</SectionTitle>
      <SectionSocial></SectionSocial>
</div>
  );
}
