import React, { useState } from "react";
import TextArea from "../atoms/TextArea";
import ImageUploader from "../atoms/ImageUploader";
import { Trash2 } from "lucide-react";
import { Button } from "../atoms/Button";

export default function ServiceCardForm({
  onSubmit,
  onChange,
  onDelete, 
  formData,
  isEdit = false,
  showTrash = true,
}) {

  formData = formData || { image: "", title: "", text: "" };


  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else if (onChange) {
      onChange("image", "");
      onChange("title", "");
      onChange("text", "");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-col w-full shadow-2xl p-5 rounded-lg border border-gray-200 bg-white"
    >
      {showTrash&&(<button
        type="button"
        onClick={handleDelete}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-transform duration-200 hover:scale-110"
        title="Eliminar servicio"
      >
        <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 transition-colors" />
      </button>)}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <TextArea
            label="Ingrese el título"
            name="title"
            maxLength={50}
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            required
          />

          <TextArea
            height={200}
            label="Ingrese la descripción"
            name="text"
            maxLength={500}
            value={formData.text}
            onChange={(e) => onChange("text", e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-center">
          <ImageUploader
            name="image"
            placeholder="/imagen.png"
            previewUrl={formData.imagePreview || formData.image || null}
            onChange={(file, previewUrl) => {
              onChange("image", file); // 🔹 guarda el archivo real
              onChange("imagePreview", previewUrl); // 🔹 guarda el preview para mostrar
            }}
            className="bg-white"
            height={280}
          />

        </div>
      </div>

      {/* 🔹 Botón opcional de envío */}
      {onSubmit && (
        <div className="flex justify-end">
          <Button type="submit" label={isEdit ? "Actualizar" : "Guardar"} />
        </div>
      )}
    </form>
  );
}
