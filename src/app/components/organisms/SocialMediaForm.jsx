import React from "react";
import ImageUploader from "../atoms/ImageUploader";
import Input from "../atoms/Input";
import { Trash2 } from "lucide-react";

export default function SocialMediaForm({
  onSubmit,
  onChange,
  onDelete,
  formData,
  showTrash = true,
}) {
  formData = formData || { title: "", website_url: "", image: "" };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    } else {
      const clearedForm = { title: "", website_url: "", image: "" };
      if (onChange) onChange(clearedForm);
    }
  };

  return (
    <div className="relative shadow-lg py-5 px-5 rounded-lg border border-gray-200 bg-white w-full h-full flex flex-col gap-4">
      {showTrash && (
        <button
          type="button"
          onClick={handleDelete}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/70 backdrop-blur-sm shadow-md z-50 
                     hover:bg-red-100 transition-all duration-200 hover:scale-110"
          title="Eliminar red social"
        >
          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 transition-colors" />
        </button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-0">
        <div className="col-span-2 my-auto">
          <Input
            label="Título"
            name="title"
            placeholder="Ingrese el título aquí"
            maxLength={20}
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            className="bg-white"
          />
          <Input
            label="URL del sitio web"
            name="website_url"
            placeholder="www.susitio.com"
            value={formData.website_url}
            onChange={(e) => onChange("website_url", e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="h-full flex items-center justify-center">
          <ImageUploader
            placeholder="/imagen.png"
            height={200}
            previewUrl={formData.imagePreview || formData.image || null}
            onChange={(file, previewUrl) => {
              onChange("image", file);
              onChange("imagePreview", previewUrl);
            }}
            className="bg-white my-auto"
          />
        </div>
      </div>
    </div>
  );
}
