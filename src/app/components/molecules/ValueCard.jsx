import React from "react";
import ImageUploader from "../atoms/ImageUploader";
import TextArea from "../atoms/TextArea";

export default function ValueCard({ title, data, onChange }) {
  const handleImageChange = (file, previewUrl) => {
    onChange({ ...data, image: previewUrl });
  };

  const handleDescriptionChange = (e) => {
    onChange({ ...data, description: e.target.value });
  };

  return (
    <div className="text-center h-min p-6 md:px-8 md:py-0">
      <ImageUploader
        placeholder="/imagen.png"
        onChange={handleImageChange}
        width={150}
        height={150}
        previewUrl={data.image || null}
      />

      <h2 className="text-[20px] font-bold m-3">{title}</h2>

      <TextArea
        label="Ingrese una descripción."
        name="description"
        maxLength={200}
        className="mb-1"
        value={data.description || ""}
        onChange={handleDescriptionChange}
      />
    </div>
  );
}
