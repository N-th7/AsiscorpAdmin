import React from "react";
import TextArea from "../atoms/TextArea";

export default function PresentationForm({ formData, onChange }) {
  return (
    <div className="flex flex-col gap-4">
      <TextArea
        label="Ingrese el título"
        maxLength={50}
        placeholder="Ingrese el título"
        className="mb-1"
        value={formData.title}
        onChange={(e) => onChange("title", e.target.value)}
      />
      <TextArea
        label="Ingrese la descripción"
        maxLength={500}
        placeholder="Ingrese la descripción"
        className="mb-1"
        height={150}
        value={formData.text}
        onChange={(e) => onChange("text", e.target.value)}
      />
      <TextArea
        label="Ingrese el lema"
        maxLength={50}
        placeholder="Ingrese el lema"
        className="mb-1"
        value={formData.slogan}
        onChange={(e) => onChange("slogan", e.target.value)}
      />
    </div>
  );
}
