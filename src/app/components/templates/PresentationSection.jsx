import React, { useState, useEffect } from "react";
import PresentationForm from "../organisms/PresentetationForm";
import ImageUploader from "../atoms/ImageUploader";
import { getIntroductionByName } from "@/app/api/introductions";

export default function PresentationSection() {

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    text: "",
    slogan: "",
  });
  const fetchData = async () => {
    try {
      const response = await getIntroductionByName("Presentation"); 
      if (response && response.data) {
        setFormData(response.data);
        console.log("Datos de introducción obtenidos:", response.data);
      } 
    } catch (error) {     
      console.error("Error al obtener los datos de introducción:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);
    console.log(updatedForm); 
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-20">
      <PresentationForm formData={formData} onChange={handleChange} />
      <ImageUploader
        label="Ingrese una imagen"
        placeholder="/imagen.png"
        value={formData.image}
        onChange={(value) => handleChange("image", value)}
        height={400}
      />
    </div>
  );
}
