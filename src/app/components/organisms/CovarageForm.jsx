"use client";

import React, { useState, useEffect, useRef } from "react";
import TextArea from "../atoms/TextArea";
import ImageUploader from "../atoms/ImageUploader";
import { getIntroductionByName, updateIntroduction } from "../../api/introductions";

export default function CoverageForm() {
  const [formData, setFormData] = useState(null);
  const debounceRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await getIntroductionByName("Covarage"); 
      if (response?.data) {
        setFormData({
          id: response.data.id || "",
          text: response.data.text || "",
          image: response.data.image || null,
          previewUrl: response.data.image || null,
        });
      } else {
        setFormData({
          id: "",
          text: "",
          image: null,
          previewUrl: null,
        });
      }
    } catch (error) {
      console.error("❌ Error al obtener los datos de cobertura:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);
    console.log(formData)
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!updatedForm?.id) return;

      const data = new FormData();
      data.append("text", updatedForm.text || "");
      if (updatedForm.image instanceof File) {
        data.append("image", updatedForm.image);
      }

      try {
        const response = await updateIntroduction(updatedForm.id, data);

        if (response?.data) {
          setFormData((prev) => ({
            ...prev,
            text: response.data.text ?? prev.text,
            image: response.data.image ?? prev.image,
            previewUrl: response.data.image
              ? `${response.data.image}?t=${Date.now()}`
              : prev.previewUrl,
          }));
        }
      } catch (err) {
        console.error("❌ Error al guardar cobertura:", err);
      }
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl p-6">
      {formData && (
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12 h-full lg:px-20 ">
          <div className="relative">
            <TextArea
              label="Ingrese la descripción"
              name="text"
              maxLength={500}
              labelSize={10}
              height={400}
              required
              value={formData.text}
              onChange={(e) => handleChange("text", e.target.value)}
            />
          </div>

          <div className="flex justify-center items-center">
            <ImageUploader
              name="image"
              placeholder="/imagen.png"
              previewUrl={formData.previewUrl || null}
              onChange={(file, previewUrl) => {
                handleChange("image", file);
              }}
              height={400}
              width="100%"
            />
          </div>
        </form>
      )}
    </div>
  );
}
