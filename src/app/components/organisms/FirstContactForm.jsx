import React, { useState, useEffect } from "react";
import TextArea from "../atoms/TextArea";
import Input from "../atoms/Input";
import { getContactById } from "@/app/api/contacts";

export default function FirstContactForm({ onSubmit, onChange: externalOnChange }) {
  const [formData, setFormData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await getContactById(1);

      if (response?.data) {
        setFormData({
          id: response.data.id || "",
          email: response.data.email || "",
          phone_number: response.data.phone_number || "",
          cellphone_number: response.data.cellphone_number || "",
          address: response.data.address || "",
        });
      } else {
        setFormData({
          id: "",
          email: "",
          phone_number: "",
          cellphone_number: "",
          address: "",
        });
      }

      console.log("Datos de contacto obtenidos:", response?.data);
      console.log(formData)
    } catch (error) {
      console.error("Error al obtener los datos de contacto:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="flex flex-col gap-4">
            <Input
              label="Número de celular"
              name="cellphone_number"
              type="tel"
              placeholder="Ej. 77777777"
              maxLength={15}
              value={formData.cellphone_number}
              onChange={(e) => handleChange("cellphone_number", e.target.value)}
            />

            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              maxLength={50}
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Número de teléfono"
              name="phone_number"
              type="tel"
              placeholder="Ej. 4412345"
              maxLength={15}
              value={formData.phone_number}
              onChange={(e) => handleChange("phone_number", e.target.value)}
            />

            <TextArea
              label="Dirección"
              name="address"
              placeholder="Ej. Av. Blanco Galindo, Km 5½"
              maxLength={200}
              height={130}
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              labelUp={true}
            />
          </div>
        </form>
      )}
    </>
  );
}
