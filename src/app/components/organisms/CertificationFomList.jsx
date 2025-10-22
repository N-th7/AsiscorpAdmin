"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CertificationForm from "../molecules/CertificationForm";
import PlusCard from "../atoms/PlusCard";
import {
  getCertifications,
  createCertification,
  deleteCertification,
  updateCertification,
} from "@/app/api/certifications";
import ConfirmModal from "../molecules/ConfirmModal";

export default function CertificationFormList() {
  const [cards, setCards] = useState([]);
  const [emptyCard, setEmptyCard] = useState({
    image: null,
    imagePreview: null,
    title: "",
  });
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [certificationToDelete, setCertificationToDelete] = useState(null);

  const debounceRefs = useRef({});
  const cardsRef = useRef(cards);

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  // 🧩 Obtener certificaciones
  const fetchData = async () => {
    try {
      const response = await getCertifications();
      const certificationsData = response?.data || [];
      setCards(certificationsData);
      console.log("✅ Certificaciones obtenidas:", certificationsData);
    } catch (error) {
      console.error("❌ Error al obtener certificaciones:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🧠 Manejar cambios (local + debounce update)
  const handleChange = (id, field, value) => {
    if (id === "empty") {
      setEmptyCard((prev) => ({ ...prev, [field]: value }));
      return;
    }

    // Actualiza localmente
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );

    // 🖼️ Actualiza preview inmediatamente
    if (field === "imagePreview") {
      setCards((prev) =>
        prev.map((card) =>
          card.id === id ? { ...card, imagePreview: value } : card
        )
      );
      return;
    }

    // 🕒 Debounce: actualiza en backend
    if (debounceRefs.current[id]) clearTimeout(debounceRefs.current[id]);

    debounceRefs.current[id] = setTimeout(async () => {
      const current = cardsRef.current.find((c) => c.id === id);
      if (!current) return;

      const formData = new FormData();
      formData.append("title", current.title || "");
      if (current.image instanceof File) {
        formData.append("image", current.image);
      }

      try {
        console.log(`🚀 Actualizando certificación ${id}...`);
        const response = await updateCertification(id, formData);

        if (response?.data) {
          setCards((prev) =>
            prev.map((card) =>
              card.id === id
                ? {
                    ...card,
                    ...response.data,
                    imagePreview:
                      response.data.image &&
                      response.data.image !== card.image
                        ? `${response.data.image}?t=${Date.now()}`
                        : card.imagePreview,
                  }
                : card
            )
          );
          console.log(`✅ Certificación ${id} actualizada correctamente.`);
        }
      } catch (err) {
        console.error(`❌ Error al actualizar certificación ${id}:`, err);
        setError("No se pudo guardar el cambio.");
      }
    }, 800);
  };

  // ➕ Crear nueva certificación
  const handleAddCard = async () => {
    const isComplete = emptyCard.title.trim() && emptyCard.image;
    if (!isComplete) {
      setError("Por favor completa todos los campos antes de agregar otra tarjeta.");
      return;
    }

    try {
      setError("");
      const formData = new FormData();
      formData.append("title", emptyCard.title);
      if (emptyCard.image) formData.append("image", emptyCard.image);

      const response = await createCertification(formData);

      if (response?.data) {
        setCards((prev) => [...prev, response.data]);
        console.log("✅ Certificación creada:", response.data);
      }

      setEmptyCard({ image: null, imagePreview: null, title: "" });
      setResetKey((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error al crear certificación:", error);
      setError("No se pudo crear la certificación.");
    }
  };

  // 🗑️ Eliminar certificación
  const handleDeleteCard = (id) => setCertificationToDelete(id);
  const cancelDelete = () => setCertificationToDelete(null);

  const confirmDelete = async () => {
    try {
      await deleteCertification(certificationToDelete);
      setCards((prev) => prev.filter((c) => c.id !== certificationToDelete));
      console.log("✅ Certificación eliminada");
    } catch (error) {
      console.error("❌ Error al eliminar certificación:", error);
      setError("No se pudo eliminar la certificación.");
    } finally {
      setCertificationToDelete(null);
    }
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

        {/* Form vacía para agregar nueva */}
        <CertificationForm
          key={`empty-${resetKey}`}
          formData={emptyCard}
          onChange={(field, value) => handleChange("empty", field, value)}
          showTrash={false}
        />

        {/* Botón para agregar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <PlusCard onClick={handleAddCard} />
        </motion.div>

        {/* Modal de confirmación */}
        <ConfirmModal
          open={!!certificationToDelete}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          label="certificación"
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
    </div>
  );
}
