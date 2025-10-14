import React from "react";
import ImageUploader from "../atoms/ImageUploader";
import TextArea from "../atoms/TextArea";
import { Trash2 } from "lucide-react";

export default function ClientCardForm({
  onChange,
  onDelete,
  formData,
  showTrash = true, // ✅ controla si se muestra el basurero
}) {
  formData = formData || { image: "", title: "", description: "" };

  // 🔹 Limpia los campos si no hay onDelete
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else if (onChange) {
      onChange("image", "");
      onChange("title", "");
      onChange("description", "");
    }
  };

  return (
    <div className="relative shadow-lg py-5 px-5 rounded-lg border border-gray-200 w-full h-full flex flex-col gap-2 bg-white">
      {/* 🔹 Ícono de basurero opcional */}
      {showTrash && (
        <button
          type="button"
          onClick={handleDelete}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-transform duration-200 hover:scale-110"
          title="Eliminar tarjeta de cliente"
        >
          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 transition-colors" />
        </button>
      )}

      {/* 🔹 Imagen del cliente */}
      <ImageUploader
        key={formData.image || "empty"} // ✅ resetea preview si se limpia
        name="image"
        placeholder={"/imagen.png"}
        previewUrl={formData.image}
        width={130}
        height={130}
        onChange={(file, previewUrl) => onChange("image", previewUrl)}
        required
      />

      {/* 🔹 Título */}
      <TextArea
        label="Ingrese el título."
        name="title"
        maxLength={80}
        labelSize={10}
        value={formData.title}
        onChange={(e) => onChange("title", e.target.value)}
        required
      />

      {/* 🔹 Descripción */}
      <TextArea
        label="Ingrese una descripción."
        name="description"
        maxLength={200}
        labelSize={10}
        value={formData.description}
        onChange={(e) => onChange("description", e.target.value)}
        required
      />
    </div>
  );
}
