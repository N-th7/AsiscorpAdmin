import React from "react";
import ImageUploader from "../atoms/ImageUploader";
import TextArea from "../atoms/TextArea";

export default function ValueCard({ title, data, onChange }) {

  const handleFile = (file) => {
    if (onChange) onChange({ ...data, image: file });
  };

  const handleDescriptionChange = (e) => {
    if (onChange) onChange({ ...data, description: e.target.value });
  };

  return (
    <div className="text-center h-min p-6 md:px-8 md:py-0">
      <ImageUploader
        placeholder="/imagen.png"
        onChange={handleFile}
        width={150}
        height={150}
        value={data.image}
      />
      <h2 className="text-[20px] font-bold m-3">{title}</h2>
      <TextArea
        label="Ingrese una descripción."
        maxLength={100}
        className="mb-1"
        value={data.description}
        onChange={handleDescriptionChange}
      />
    </div>
  );
}
