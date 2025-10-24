"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServiceCardForm from "../organisms/ServiceCardForm";
import { Button } from "../atoms/Button";
import { getServices, createService, deleteService, updateService } from "../../api/services";
import ConfirmModal from "../molecules/ConfirmModal";

export default function ServicesFormList() {
  const [cards, setCards] = useState([]);
  const [emptyCard, setEmptyCard] = useState({
    title: "",
    text: "",
    image: null,
    imagePreview: null,
  });
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const cardsRef = useRef(cards);
  const debounceRefs = useRef({});

  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  const fetchData = async () => {
    try {
      const response = await getServices();
      const servicesData = response?.data || [];
      setCards(servicesData);
    } catch (error) {
      console.error("❌ Error al obtener los servicios:", error);
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

    if (field === "imagePreview") {
      setCards((prev) =>
        prev.map((card) =>
          card.id === id ? { ...card, imagePreview: value } : card
        )
      );
      return;
    }

    if (debounceRefs.current[id]) clearTimeout(debounceRefs.current[id]);

    debounceRefs.current[id] = setTimeout(async () => {
      const current = cardsRef.current.find((c) => c.id === id);
      if (!current) return;

      const formData = new FormData();
      formData.append("title", current.title || "");
      formData.append("text", current.text || "");

      if (current.image instanceof File) {
        formData.append("image", current.image);
      }

      try {
        const response = await updateService(id, formData);

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
        }
      } catch (err) {
        console.error(`❌ Error al actualizar servicio ${id}:`, err);
        setError("No se pudo guardar el cambio.");
      }
    }, 800);
  };

  const handleAddCard = async () => {
    const isComplete =
      emptyCard.title.trim() && emptyCard.text.trim() && emptyCard.image;

    if (!isComplete) {
      setError("Por favor completa todos los campos antes de agregar otra tarjeta.");
      return;
    }

    try {
      setError("");
      const formData = new FormData();
      formData.append("title", emptyCard.title);
      formData.append("text", emptyCard.text);
      if (emptyCard.image) formData.append("image", emptyCard.image);

      const response = await createService(formData);
      if (response?.data) {
        setCards((prev) => [...prev, response.data]);
      }

      setEmptyCard({
        title: "",
        text: "",
        image: null,
        imagePreview: null,
      });
      setResetKey((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error al agregar servicio:", error);
      setError("No se pudo agregar el servicio.");
    }
  };

  const handleDeleteCard = (id) => setServiceToDelete(id);
  const cancelDelete = () => setServiceToDelete(null);

  const confirmDelete = async () => {
    try {
      await deleteService(serviceToDelete);
      setCards((prev) => prev.filter((c) => c.id !== serviceToDelete));
    } catch (error) {
      console.error("❌ Error al eliminar servicio:", error);
      setError("Error al eliminar el servicio.");
    } finally {
      setServiceToDelete(null);
    }
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
          label="servicio"
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
        className="mt-4 text-center"
      >
        <Button onClick={handleAddCard} className="px-14">
          Agregar servicio
        </Button>
      </motion.div>
    </div>
  );
}
