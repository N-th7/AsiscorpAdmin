"use client";

import React, { useState, useEffect, useRef } from "react";
import SocialMediaForm from "../organisms/SocialMediaForm";
import { Button } from "../atoms/Button";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmModal from "../molecules/ConfirmModal";
import { getLinks, createLink, deleteLink, updateLink } from "@/app/api/links";

export default function SectionSocial() {
  const [emptyCard, setEmptyCard] = useState({
    title: "",
    website_url: "",
    image: null,
    imagePreview: null,
  });
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [linkToDelete, setLinkToDelete] = useState(null);
  const debounceRefs = useRef({});
  const cardsRef = useRef(cards);

  // Mantener referencia actualizada
  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  // 🧩 Obtener enlaces existentes
  const fetchData = async () => {
    try {
      const response = await getLinks();
      const linksData = response?.data || [];
      setCards(linksData);
      console.log("✅ Datos de enlaces obtenidos:", linksData);
    } catch (error) {
      console.error("❌ Error al obtener los enlaces:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🧠 Manejo de cambios (local + update automático)
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

    // Si es un cambio visual (imagen preview), no hacer update
    if (field === "imagePreview") return;

    // 🕒 Debounce update
    if (debounceRefs.current[id]) clearTimeout(debounceRefs.current[id]);

    debounceRefs.current[id] = setTimeout(async () => {
      const current = cardsRef.current.find((c) => c.id === id);
      if (!current) return;

      const formData = new FormData();
      formData.append("title", current.title || "");
      formData.append("website_url", current.website_url || "");
      if (current.image instanceof File) {
        formData.append("image", current.image);
      }

      try {
        console.log(`🚀 Actualizando enlace ${id}...`);
        const response = await updateLink(id, formData);

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
          console.log(`✅ Enlace ${id} actualizado correctamente.`);
        }
      } catch (err) {
        console.error(`❌ Error al actualizar enlace ${id}:`, err);
        setError("No se pudo guardar el cambio.");
      }
    }, 800);
  };

  // ➕ Crear nuevo enlace
  const handleAddCard = async () => {
    const isComplete =
      emptyCard.title.trim() &&
      emptyCard.website_url.trim() &&
      emptyCard.image;

    if (!isComplete) {
      setError("Por favor completa todos los campos antes de agregar otra tarjeta.");
      return;
    }

    try {
      setError("");
      const formData = new FormData();
      formData.append("title", emptyCard.title);
      formData.append("website_url", emptyCard.website_url);
      if (emptyCard.image) {
        formData.append("image", emptyCard.image);
      }

      const response = await createLink(formData);
      if (response?.data) {
        setCards((prev) => [...prev, response.data]);
        console.log("✅ Nuevo enlace creado:", response.data);
      }

      setEmptyCard({
        title: "",
        website_url: "",
        image: null,
        imagePreview: null,
      });
      setResetKey((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error al crear el enlace:", error);
      setError("Error al crear el enlace.");
    }
  };

  // 🗑️ Eliminar enlace
  const handleDeleteCard = (id) => setLinkToDelete(id);

  const confirmDelete = async () => {
    try {
      await deleteLink(linkToDelete);
      setCards((prev) => prev.filter((c) => c.id !== linkToDelete));
      console.log("✅ Enlace eliminado");
    } catch (error) {
      console.error("❌ Error al eliminar el enlace:", error);
      setError("Error al eliminar el enlace.");
    } finally {
      setLinkToDelete(null);
    }
  };

  const cancelDelete = () => setLinkToDelete(null);

  return (
    <div className="lg:px-30">
      <AnimatePresence>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <div className="bg-[#EAEAEA] rounded-md p-4 lg:px-20 my-10">
              <SocialMediaForm
                formData={card}
                onChange={(field, value) => handleChange(card.id, field, value)}
                onDelete={() => handleDeleteCard(card.id)}
                showTrash={true}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Formulario para agregar nuevo enlace */}
      <div className="bg-[#EAEAEA] rounded-md p-4 lg:px-20 my-10">
        <SocialMediaForm
          key={`empty-${resetKey}`}
          formData={emptyCard}
          onChange={(field, value) => handleChange("empty", field, value)}
          showTrash={false}
        />

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

      {/* Botón para agregar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="mt-4 text-center"
      >
        <Button onClick={handleAddCard}>Agregar nuevo enlace</Button>
      </motion.div>

      {/* Modal de confirmación */}
      <ConfirmModal
        open={!!linkToDelete}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        label="link"
      />
    </div>
  );
}
