"use client";
import React, { useState } from "react";
import Input from "../atoms/Input";
import { Button } from "../atoms/Button";

export default function UserForm({ onSubmit }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📋 Formulario:", formData);
    if (formData.name && formData.email && formData.password) {
      onSubmit(formData);
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input name="name" label="Nombre" value={formData.name} onChange={handleChange} />
      <Input name="email" label="Correo" type="email" value={formData.email} onChange={handleChange} />
      <Input name="password" label="Contraseña" type="password" value={formData.password} onChange={handleChange} />
      <Button variant="primary" className="mt-2" onClick={handleSubmit}>Crear usuario</Button>
    </form>
  );
}
