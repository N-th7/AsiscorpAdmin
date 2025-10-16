"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientCardForm from "../molecules/ClientCardForm";
import PlusCard from "../atoms/PlusCard";
import { getClients } from "@/app/api/clients";

export default function ClientCardList() {
  const [cards, setCards] = useState(null);
  const [emptyCard, setEmptyCard] = useState({ image: "", title: "", description: "" });
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const fetchData = async () => {
    try {
      const response = await getClients();
      const clientsData = response?.data || [];
      setCards(clientsData);
      console.log("Datos de clientes obtenidos:", clientsData);
    } catch (error) {
      console.error("Error al obtener los datos de clientes:", error);
    } 
  };

  useEffect(() => {
    fetchData();
  }, []);  

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
        console.log(cards)

  };


  // 🔹 Agrega una nueva card si el form vacío está completo
  const handleAddCard = () => {
    const isComplete =
      emptyCard.image && emptyCard.title.trim() && emptyCard.description.trim();

    if (!isComplete) {
      setError("Por favor completa todos los campos antes de agregar otra tarjeta.");
      return;
    }

    setError("");
    const newCard = { ...emptyCard, id: crypto.randomUUID() };
    setCards((prev) => [...prev, newCard]);
    setEmptyCard({ image: "", title: "", description: "" });
    setResetKey((prev) => prev + 1); // ✅ limpia los inputs e imagen
  };

  // 🔹 Elimina una card por id
  const handleDeleteCard = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="p-7 md:px-10 md:py-5 bg-[#EAEAEA] m-auto shadow-2xl rounded-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {cards && cards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <ClientCardForm
                formData={card}
                onChange={(field, value) => handleChange(card.id, field, value)}
                onDelete={() => handleDeleteCard(card.id)}
                showTrash={true} // ✅ Solo las tarjetas agregadas tienen basurero
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 🔹 Form vacío sin basurero */}
        <ClientCardForm
          key={`empty-${resetKey}`}
          formData={emptyCard}
          onChange={(field, value) => handleChange("empty", field, value)}
          showTrash={false}
        />

        {/* 🔹 Botón de agregar */}
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
