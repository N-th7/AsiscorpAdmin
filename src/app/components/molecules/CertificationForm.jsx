'use client';

import React from "react";
import ImageUploader from "../atoms/ImageUploader";
import TextArea from "../atoms/TextArea";
import { Trash2 } from "lucide-react";

export default function CertificationForm({
  formData,
  onChange,
  onDelete,
  showTrash = true,
}) {
  return (
    <div className="relative shadow-lg py-5 px-5 rounded-lg border border-gray-200 bg-white w-full h-full flex flex-col gap-3 overflow-visible">
      {/* 🗑️ Botón de eliminar — ahora siempre al frente */}
      {showTrash && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-2 right-2 z-50 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md 
                     hover:bg-red-100 transition-all duration-200 hover:scale-110"
          title="Eliminar certificado"
        >
          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 transition-colors" />
        </button>
      )}

      {/* 📸 Subida de imagen */}
      <div className="relative z-0">
        <ImageUploader
          name="image"
          placeholder="/imagen.png"
          height={130}
          previewUrl={formData.imagePreview || formData.image || null}
          onChange={(file, previewUrl) => {
            onChange("image", file);
            onChange("imagePreview", previewUrl);
          }}
          className="bg-white rounded-md"
        />
      </div>

      {/* 📝 Campo de texto */}
      <TextArea
        label="Ingrese el título"
        name="title"
        maxLength={80}
        labelSize={10}
        onChange={(e) => onChange("title", e.target.value)}
        value={formData.title}
        className="bg-white rounded-md"
      />
    </div>
  );
}
