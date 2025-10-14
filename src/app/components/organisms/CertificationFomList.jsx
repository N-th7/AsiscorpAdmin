"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CertificationForm from "../molecules/CertificationForm";
import PlusCard from "../atoms/PlusCard";

export default function CertificationFormList() {
  const [cards, setCards] = useState([]);
  const [emptyCard, setEmptyCard] = useState({ image: "", title: "" });
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0); 

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
  };

  const handleAddCard = () => {
    const isComplete = emptyCard.image && emptyCard.title.trim();

    if (!isComplete) {
      setError("Por favor completa todos los campos antes de agregar otra tarjeta.");
      return;
    }

    setError("");
    const newCard = { ...emptyCard, id: crypto.randomUUID() };
    setCards((prev) => [...prev, newCard]);
    setEmptyCard({ image: "", title: "" });
    setResetKey((prev) => prev + 1); 
    console.log(cards)
  };

  // 🔹 Elimina una card
  const handleDeleteCard = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="p-7 md:px-10 md:py-5 bg-[#EAEAEA] m-auto shadow-2xl rounded-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        <AnimatePresence>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <CertificationForm
                formData={card}
                onChange={(field, value) => handleChange(card.id, field, value)}
                onDelete={() => handleDeleteCard(card.id)}
                showTrash={true}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <CertificationForm
          key={`empty-${resetKey}`} 
          formData={emptyCard}
          onChange={(field, value) => handleChange("empty", field, value)}
          showTrash={false}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <PlusCard onClick={handleAddCard} />
        </motion.div>
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
    </div>
  );
}
