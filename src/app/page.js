'use client';

import React, {useState} from "react";
import PresentationSection from "./components/templates/PresentationSection";
import ValuesSection from "./components/templates/ValuesSection";
import ServiceCardForm from "./components/organisms/ServiceCardForm";
import ClientCardForm from "./components/molecules/ClientCardForm";
import ClientCardList from "./components/organisms/ClientCardList";

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
      <ServiceCardForm formData={formData}/>
      <ClientCardList/>
</div>
  );
}
