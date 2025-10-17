"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCardForm from "../organisms/ServiceCardForm";
import { Button } from "../atoms/Button";
import {getServices, createService, deleteService} from "@/app/api/services";
import ConfirmModal from "../molecules/ConfirmModal";

export default function ServicesFormList() {
  const [cards, setCards] = useState(null);
  const [emptyCard, setEmptyCard] = useState({
    title: "",
    text: "",
    image: null, 
    imagePreview: null,
  });
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);

  const [serviceToDelete, setServiceToDelete] = useState(null);

  const handleDeleteCard = (id) => {
    setServiceToDelete(id); 
  };

  const confirmDelete = async () => {
    try {
      await deleteService(serviceToDelete);
      setCards((prev) => prev.filter((c) => c.id !== serviceToDelete));
      console.log("✅ Servicio eliminado");
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
      setError("❌ Error al eliminar el servicio");
    } finally {
      setServiceToDelete(null); // cierra el modal
    }
  };

  const cancelDelete = () => setServiceToDelete(null);


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


  const fetchData = async () => {
    try {
      const response = await getServices();
      const servicesData = response?.data || [];
      setCards(servicesData);
      console.log("Datos de servicios obtenidos:", servicesData);
    } catch (error) {
      console.error("Error al obtener los datos de servicios:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddCard = async () => {
  const isComplete = emptyCard.title.trim() && emptyCard.text.trim() && emptyCard.image;

  if (!isComplete) {
    setError("Por favor completa todos los campos antes de agregar otra tarjeta.");
    return;
  }

  try {
    setError("");

    // Crear el nuevo servicio en backend
    const newService = await handleCreateService(emptyCard);

    // Agregar el nuevo servicio a la lista (con el id real del backend)
    if (newService) {
      setCards((prev) => [...(prev || []), newService]);
    }

    // Limpiar formulario
    setEmptyCard({
      title: "",
      text: "",
      image: null,
      imagePreview: null,
    });
    setResetKey((prev) => prev + 1);

  } catch (error) {
    console.error("Error al agregar servicio:", error);
    setError("❌ No se pudo agregar el servicio.");
  }
};


  const handleCreateService = async (data) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("text", data.text);
    if (data.image) {
      formData.append("image", data.image);
    }

    const response = await createService(formData);
    console.log("✅ Nuevo servicio:", response.data);

    return response.data;

  } catch (error) {
    console.error("Error al crear servicio:", error);
    setError("❌ Error al crear el servicio");
    return null;
  }
};



  return (
    <div className="p-7 md:px-10 md:py-5 bg-[#EAEAEA] m-auto shadow-2xl rounded-2xl">
      <div className="grid grid-cols-1 gap-7">
        <AnimatePresence>
          {cards && cards.map((card) => (
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
                showTrash={true} 
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <ServiceCardForm
          key={`empty-${resetKey}`}
          formData={emptyCard}
          onChange={(field, value) => handleChange("empty", field, value)}
          showTrash={false}
        />
         <ConfirmModal
        open={!!serviceToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
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
