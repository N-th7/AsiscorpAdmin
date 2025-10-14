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
    <div className="relative shadow-lg py-5 px-5 rounded-lg border border-gray-200 bg-white w-full h-full flex flex-col gap-2">
      {showTrash && onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-transform duration-200 hover:scale-110"
          title="Eliminar certificado"
        >
          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 transition-colors" />
        </button>
      )}

      <ImageUploader
        name="image"
        placeholder={"/imagen.png"}
        height={130}
        previewUrl={formData.image}
        onChange={(file, previewUrl) => onChange("image", previewUrl)}
      />

      <TextArea
        label="Ingrese el título."
        name="title"
        maxLength={80}
        labelSize={10}
        onChange={(e) => onChange("title", e.target.value)}
        value={formData.title}
      />
    </div>
  );
}
