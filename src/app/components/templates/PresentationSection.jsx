"use client";

import React, { useState, useEffect, useRef } from "react";
import PresentationForm from "../organisms/PresentetationForm";
import ImageUploader from "../atoms/ImageUploader";
import { getIntroductionByName, updateIntroduction } from "@/app/api/introductions";

export default function PresentationSection() {
  const [formData, setFormData] = useState({
    id: "",
    image: null,
    title: "",
    text: "",
    slogan: "",
    previewURL: "",
  });

  const debounceRefs = useRef({});
  const formRef = useRef(formData);

  // Mantener la referencia actualizada del formulario
  useEffect(() => {
    formRef.current = formData;
  }, [formData]);

  const fetchData = async () => {
    try {
      const response = await getIntroductionByName("Presentation");
      if (response?.data) {
        setFormData({
          id: response.data.id || "",
          image: response.data.image || null,
          title: response.data.title || "",
          text: response.data.text || "",
          slogan: response.data.slogan || "",
          previewURL: response.data.image || "",
        });
        console.log("✅ Datos de introducción obtenidos:", response.data);
      }
    } catch (error) {
      console.error("❌ Error al obtener los datos de introducción:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);

    const id = updatedForm.id || 1;
    if (debounceRefs.current[id]) clearTimeout(debounceRefs.current[id]);

    debounceRefs.current[id] = setTimeout(async () => {
      const current = formRef.current;

      const data = new FormData();
      data.append("title", current.title || "");
      data.append("text", current.text || "");
      data.append("slogan", current.slogan || "");

      if (current.image instanceof File) {
        data.append("image", current.image);
      }

      try {
        console.log(`🚀 Actualizando presentación (${id})`);
        for (let [k, v] of data.entries()) console.log(k, v);

        const response = await updateIntroduction(id, data);
        if (response?.data) {
          setFormData((prev) => ({
            ...prev,
            ...response.data,
            previewURL: response.data.image
              ? `${response.data.image}?t=${Date.now()}`
              : prev.previewURL,
          }));
        }

        console.log("✅ Presentación actualizada correctamente.");
      } catch (err) {
        console.error("❌ Error al actualizar presentación:", err);
      }
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-20">
      <PresentationForm formData={formData} onChange={handleChange} />
      <ImageUploader
        label="Ingrese una imagen"
        placeholder="/imagen.png"
        previewUrl={ formData.previewURL || formData.image || null }
        value={formData.image || null}
        onChange={(file, previewUrl) => {
          handleChange("image", file);
        }}
        height={400}
      />
    </div>
  );
}
