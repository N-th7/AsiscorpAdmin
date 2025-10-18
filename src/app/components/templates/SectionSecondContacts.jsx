import React, { useState, useEffect, useRef } from "react";
import SecondContactForm from "../organisms/SecondContactForm";
import { Button } from "../atoms/Button";
import { motion, AnimatePresence } from "framer-motion";
import { getContacts, createContact, deleteContact, updateContact } from "@/app/api/contacts"; // ✅ Importamos updateContact

export default function SectionSecondContacts() {
  const [cards, setCards] = useState([]);
  const [emptyCard, setEmptyCard] = useState({
    id: "",
    title: "",
    phone_number: "",
    cellphone_number: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const debounceRefs = useRef({}); // ✅ guardará los timeouts por id

  const fetchData = async () => {
    try {
      const response = await getContacts();
      let contactsData = response?.data || [];
      contactsData = contactsData.filter((contact) => contact.id !== 1);
      setCards(contactsData);
      console.log("Datos de contactos obtenidos:", contactsData);
    } catch (error) {
      console.error("Error al obtener los datos de contactos:", error);
      setError("No se pudieron cargar los contactos");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (id, field, value) => {
    if (id === "empty") {
      setEmptyCard((prev) => ({ ...prev, [field]: value }));
      return;
    }

    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, [field]: value } : card
      )
    );

    if (debounceRefs.current[id]) clearTimeout(debounceRefs.current[id]);

    debounceRefs.current[id] = setTimeout(async () => {
      try {
        const updatedCard = cards.find((card) => card.id === id);
        if (updatedCard) {
          await updateContact(id, { ...updatedCard, [field]: value });
          console.log(`✅ Contacto ${id} actualizado en backend.`);
        }
      } catch (error) {
        console.error(`❌ Error al actualizar contacto ${id}:`, error);
        setError("No se pudo guardar el cambio.");
      }
    }, 800); 
  };

  const handleAddCard = async () => {
    const isComplete =
      emptyCard.title.trim() &&
      emptyCard.phone_number.trim() &&
      emptyCard.cellphone_number.trim() &&
      emptyCard.email.trim() &&
      emptyCard.address.trim();

    if (!isComplete) {
      setError("Por favor completa todos los campos antes de agregar otra tarjeta.");
      return;
    }

    try {
      setError("");
      await createContact(emptyCard);
      await fetchData();
      setEmptyCard({
        id: "",
        title: "",
        phone_number: "",
        cellphone_number: "",
        email: "",
        address: "",
      });
      setResetKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error al agregar contacto:", error);
      setError("❌ No se pudo agregar el contacto.");
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await deleteContact(id);
      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      setError("❌ No se pudo eliminar el contacto.");
    }
  };

  return (
    <div className="lg:px-30 w-full my-15">
      <h3 className="font-sans font-bold text-[36px] text-left">Contactos Secundarios</h3>
      <AnimatePresence>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <div className="p-5 pb-10 bg-[#EAEAEA] rounded-md my-10 shadow-2xl">
              <SecondContactForm
                formData={card}
                onChange={(field, value) => handleChange(card.id, field, value)}
                onDelete={() => handleDeleteCard(card.id)}
                showTrash={true}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="p-5 pb-10 bg-[#EAEAEA] rounded-md my-10 shadow-2xl">
        <SecondContactForm
          key={`empty-${resetKey}`}
          showTrash={false}
          formData={emptyCard}
          onChange={(field, value) => handleChange("empty", field, value)}
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

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="mt-4"
      >
        <div className="w-full text-center">
          <Button className="px-10" onClick={handleAddCard}>
            Agregar nuevo contacto
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
