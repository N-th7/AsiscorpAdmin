import React, { useState, useEffect } from "react";
import TextArea from "../atoms/TextArea";
import ImageUploader from "../atoms/ImageUploader";
import { getIntroductionByName } from "@/app/api/introductions";

export default function CoverageForm({
  onSubmit,
  onChange: externalOnChange,
  formData: externalFormData,
}) {
  const [formData, setFormData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getIntroductionByName("Covarage");

      if (response?.data) {
        setFormData({
          id: response.data.id || "",
          text: response.data.text || "",
          image: response.data.image || null,
        });
      } else {
        setFormData({
          id: "",
          text: "",
          image: null,
        });
      }

      console.log("Datos de cobertura obtenidos:", response?.data);
    } catch (error) {
      console.error("Error al obtener los datos de cobertura:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (externalFormData) setFormData(externalFormData);
  }, [externalFormData]);

  const handleChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);
    if (externalOnChange) externalOnChange(updatedForm);
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <>
      {formData && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12 h-full lg:px-20"
        >
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

          <div className="flex justify-center items-center">
            <ImageUploader
              name="image"
              placeholder="/imagen.png"
              previewUrl={formData.image || null}
              onChange={(file, previewUrl) => handleChange("image", previewUrl)}
              height={400}
              width="100%"
            />
          </div>
        </form>
      )}
    </>
  );
}
