import React from "react";
import Input from "../atoms/Input";
import TextArea from "../atoms/TextArea";
import { Trash2 } from "lucide-react";

export default function SecondContactForm({
  onSubmit,
  onChange,
  formData = {
    title: "",
    email: "",
    phone_number: "",
    cellphone_number: "",
    address: "",
  },
  onDelete,
  showTrash = true,
  isEdit = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-white rounded-2xl p-4 shadow-2xl"
    >
      {showTrash && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition-transform duration-200 hover:scale-110"
          title="Eliminar contacto"
        >
          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 transition-colors" />
        </button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-4">
        <div>
          <Input
            label="Título"
            placeholder="Ej. Santa Cruz"
            maxLength={30}
            name="title"
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            className="bg-white"
          />
          <Input
            label="Número de teléfono"
            name="phone_number"
            type="tel"
            placeholder="Ej. 4412345"
            maxLength={15}
            value={formData.phone_number}
            onChange={(e) => onChange("phone_number", e.target.value)}
            className="bg-white"
          />
        </div>

        <div>
          <Input
            label="Número de celular"
            name="cellphone_number"
            type="tel"
            placeholder="Ej. 77777777"
            maxLength={15}
            value={formData.cellphone_number}
            onChange={(e) => onChange("cellphone_number", e.target.value)}
            className="bg-white"
          />
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            maxLength={50}
            placeholder="correo@ejemplo.com"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="bg-white"
          />
        </div>
      </div>

      <TextArea
        label="Dirección"
        name="address"
        placeholder="Dirección"
        maxLength={200}
        height={130}
        value={formData.address}
        onChange={(e) => onChange("address", e.target.value)}
        labelUp={true}
        className="bg-white"
      />
    </form>
  );
}
