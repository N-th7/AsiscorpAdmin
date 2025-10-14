"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCardForm from "../organisms/ServiceCardForm";
import { Button } from "../atoms/Button";

export default function ServicesFormList() {
  const [cards, setCards] = useState([]);
  const [emptyCard, setEmptyCard] = useState({ title: "", description: "", image: "" });
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0); // para reiniciar preview de imagen

  // 🔹 Maneja cambios en cualquier card
  const handleChange = (id, field, value) => {
    if (id === "empty") {
      setEmptyCard((prev) => ({ ...prev, [field]: value }));
    } else {
      setCards((prev) =>
        prev.map((card) =>
          card.id === id ? { ...card, [field]: value } : card
        )
      );
    }
    console.log(emptyCard)
  };

  // 🔹 Agrega una nueva card si el formulario vacío está completo
  const handleAddCard = () => {
    const isComplete = emptyCard.title.trim() && emptyCard.description.trim() && emptyCard.image;

    if (!isComplete) {
      setError("Por favor completa todos los campos antes de agregar otra tarjeta.");
      return;
    }

    setError("");
    const newCard = { ...emptyCard, id: crypto.randomUUID() };
    setCards((prev) => [...prev, newCard]);

    // 🔹 Limpiar formulario vacío y reiniciar preview
    setEmptyCard({ title: "", description: "", image: "" });
    setResetKey((prev) => prev + 1);
  };

  // 🔹 Elimina una card
  const handleDeleteCard = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="p-7 md:px-10 md:py-5 bg-[#EAEAEA] m-auto shadow-2xl rounded-2xl">
      <div className="grid grid-cols-1 gap-7">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <ServiceCardForm
                formData={card}
                onChange={(field, value) => handleChange(card.id, field, value)}
                onDelete={() => handleDeleteCard(card.id)}
                showTrash={true} // solo las agregadas tienen basurero
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 🔹 Form vacío sin basurero, con key para reiniciar preview */}
        <ServiceCardForm
          key={`empty-${resetKey}`}
          formData={emptyCard}
          onChange={(field, value) => handleChange("empty", field, value)}
          showTrash={false}
        />
      </div>

      {error && (
        <motion.p
          className="text-red-500 text-sm mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="mt-4 "
      >
       <div className="text-center">
         <Button onClick={handleAddCard} className="px-14">Agregar servicio</Button>
       </div>
      </motion.div>
    </div>
  );
}
