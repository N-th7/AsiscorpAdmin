"use client";
import React from "react";
import ModalContainer from "../atoms/ModalContainer";
import UserForm from "../molecules/UserForm";
import { register } from "../../api/auth";
import { useState } from "react";

export default function CreateUserModal({ isOpen, onClose }) {
  const [message, setMessage] = useState(null);

  const handleCreateUser = async (formData) => {
    try {
      await register(formData);
      setMessage({ type: "success", text: "Usuario creado con éxito" });
      setTimeout(onClose, 1500);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold text-center mb-4">Crear nuevo usuario</h2>
      {message && (
        <div
          className={`p-3 rounded text-center mb-3 ${
            message.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          }`}
        >
          {message.text}
        </div>
      )}
      <UserForm onSubmit={handleCreateUser} />
    </ModalContainer>
  );
}
