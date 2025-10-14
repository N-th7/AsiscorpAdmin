import React, { useState } from "react";
import ImageUploader from "../atoms/ImageUploader";
import Input from "../atoms/Input";
import { Trash2 } from "lucide-react";

export default function SocialMediaForm({
  onSubmit,
  onChange: externalOnChange,
  onDelete, // 🔹 Nueva prop opcional
  formData: externalFormData,
  isEdit = false,
}) {
  const [formData, setFormData] = useState(
    externalFormData || {
      title: "",
      website_url: "",
      image: "",
    }
  );

  // 🔹 Maneja los cambios en los inputs
  const handleChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);

    if (externalOnChange) externalOnChange(updatedForm);
  };

  // 🔹 Manejo del submit (si existe onSubmit externo)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  // 🔹 Manejo del borrado
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else {
      // Limpia el formulario si no se pasa onDelete
      const clearedForm = { title: "", website_url: "", image: "" };
      setFormData(clearedForm);
      if (externalOnChange) externalOnChange(clearedForm);
    }
  };

  return (
    <div className="relative shadow-lg py-5 px-5 rounded-lg border border-gray-200 bg-white w-full h-full flex flex-col gap-4">
      {/* 🔹 Ícono de basurero arriba a la derecha */}
      <button
        type="button"
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-transform duration-200 hover:scale-110"
        title="Eliminar red social"
      >
        <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 transition-colors" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="col-span-2 my-auto">
          <Input
            label="Título"
            name="title"
            placeholder="Ingrese el título aquí"
            maxLength={20}
            value={formData.title}
            onChange={(value) => handleChange("title", value)}
            className="bg-white"
          />
          <Input
            label="URL del sitio web"
            name="website_url"
            placeholder="www.susitio.com"
            value={formData.website_url}
            onChange={(value) => handleChange("website_url", value)}
            className="bg-white"
          />
        </div>

        <div className="h-full flex items-center justify-center">
          <ImageUploader
            placeholder="/imagen.png"
            onChange={(value) => handleChange("image", value)}
            className="bg-white my-auto"
          />
        </div>
      </div>
    </div>
  );
}
