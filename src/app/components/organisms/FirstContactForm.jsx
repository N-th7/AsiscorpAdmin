"use client";

import React, { useState, useEffect, useRef } from "react";
import TextArea from "../atoms/TextArea";
import Input from "../atoms/Input";
import { getContactById, updateContact } from "@/app/api/contacts";

export default function FirstContactForm() {
  const [formData, setFormData] = useState(null);
  const debounceRef = useRef(null);
  const formRef = useRef(formData);

  useEffect(() => {
    formRef.current = formData;
  }, [formData]);

  const fetchData = async () => {
    try {
      const response = await getContactById(1);
      const data = response?.data || {};

      setFormData({
        id: data.id || "",
        email: data.email || "",
        phone_number: data.phone_number || "",
        cellphone_number: data.cellphone_number || "",
        address: data.address || "",
      });

      console.log("✅ Datos de contacto obtenidos:", data);
    } catch (error) {
      console.error("❌ Error al obtener los datos de contacto:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    const updatedForm = { ...formRef.current, [field]: value };
    setFormData(updatedForm);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!updatedForm?.id) return;

      try {
        const response = await updateContact(updatedForm.id, updatedForm);
        if (response?.data) {
          setFormData(response.data);
          console.log("✅ Contacto actualizado:", response.data);
        }
      } catch (err) {
        console.error("❌ Error al guardar contacto:", err);
      } 
    }, 800);
  };

  return (
    <>
      {formData && (
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-5 bg-white p-6 rounded-xl shadow-sm relative">


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
