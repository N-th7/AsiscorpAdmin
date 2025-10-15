import React, { useState, useEffect } from "react";
import TextArea from "../atoms/TextArea";
import ImageUploader from "../atoms/ImageUploader";

export default function CovarageForm({ onSubmit, onChange: externalOnChange, formData: externalFormData, isEdit = false }) {
  // Estado interno (si no se pasa uno externo)
  const [formData, setFormData] = useState(
    externalFormData || {
      text: "",
      image: null,
    }
  );

  // Sincroniza cambios desde el padre
  useEffect(() => {
    if (externalFormData) setFormData(externalFormData);
  }, [externalFormData]);

  // Maneja cambios internos
  const handleChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);

    if (externalOnChange) externalOnChange(updatedForm);
    console.log(formData);
  };

  // Manejo del submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-15 h-full lg:px-30">
      <TextArea
        label="Ingrese la descripción"
        name="text"
        maxLength={500}
        labelSize={10}
        height={400}
        required
        value={formData.text}
        onChange={(e) => handleChange("text", e.target.value)}
      />
      <ImageUploader
        name="image"
        placeholder="/imagen.png"
        required
        value={formData.image}
        onChange={(file) => handleChange("image", file)}
      />

    </form>
  );
}
