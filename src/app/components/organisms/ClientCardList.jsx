"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientCardForm from "../molecules/ClientCardForm";
import PlusCard from "../atoms/PlusCard";
import { getClients, createClient ,deleteClient, updateClient } from "@/app/api/clients";
import ConfirmModal from "../molecules/ConfirmModal";


export default function ClientCardList() {
  
  const [cards, setCards] = useState(null);
  const [emptyCard, setEmptyCard] = useState({
    image: null,          
    imagePreview: null,  
    title: "",
    text: "",
  });
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);
   const debounceRefs = useRef({});
  const [clientToDelete, setClientToDelete] = useState(null);
  
  
    const handleDeleteCard = (id) => {
      setClientToDelete(id); 
    };
  
    const confirmDelete = async () => {
      try {
        await deleteClient(clientToDelete);
        setCards((prev) => prev.filter((c) => c.id !== clientToDelete));
      } catch (error) {
        setError("❌ Error al eliminar el cliente");
      } finally {
        setClientToDelete(null); 
      }
    };
  
    const cancelDelete = () => setClientToDelete(null);

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
    return;
  }

  setCards((prev) =>
    prev.map((card) =>
      card.id === id ? { ...card, [field]: value } : card
    )
  );

  // Limpiar debounce previo
  if (debounceRefs.current[id]) clearTimeout(debounceRefs.current[id]);

  // Crear nuevo debounce
  debounceRefs.current[id] = setTimeout(async () => {
    try {
      const updatedCard = cards.find((card) => card.id === id);
      if (!updatedCard) return;

     if (field === "image" && value instanceof File) {
  console.log("🖼️ Nueva imagen detectada:", value.name);
  const formData = new FormData();
  formData.append("title", updatedCard.title);
  formData.append("text", updatedCard.text);
  formData.append("image", value);

  await updateClient(id, formData, true);
  console.log(`✅ Imagen del cliente ${id} actualizada correctamente`);
}
 else {
        // ✅ Si se cambió texto o título
        await updateClient(id, { [field]: value });
        console.log(`✅ Cliente ${id} actualizado en backend.`);
      }
    } catch (error) {
      console.error(`❌ Error al actualizar cliente ${id}:`, error);
      setError("No se pudo guardar el cambio.");
    }
  }, 800);
};




const handleAddCard = async () => {
  const isComplete =
    emptyCard.image && emptyCard.title.trim() && emptyCard.text.trim();

  if (!isComplete) {
    setError("Por favor completa todos los campos antes de agregar otra tarjeta.");
    return;
  }

  try {
    setError("");

    const formData = new FormData();
    formData.append("title", emptyCard.title);
    formData.append("text", emptyCard.text);
    formData.append("image", emptyCard.image);

    const response = await createClient(formData);

    if (response?.data) {
      const newClient = response.data;
      setCards((prev) => [...(prev || []), newClient]);
    }

    setEmptyCard({
      image: null,
      imagePreview: null,
      title: "",
      text: "",
    });
    setResetKey((prev) => prev + 1);

    console.log("✅ Cliente creado correctamente");
  } catch (error) {
    console.error("Error al crear cliente:", error);
    setError("❌ Error al crear el cliente");
  }
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
                showTrash={true} 
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <ClientCardForm
          key={`empty-${resetKey}`}
          formData={emptyCard}
          onChange={(field, value) => handleChange("empty", field, value)}
          showTrash={false}
        />
        <ConfirmModal
                open={!!clientToDelete}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                label="cliente"
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
