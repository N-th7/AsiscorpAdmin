import React, { useState } from "react";
import ClientCardForm from "../molecules/ClientCardForm";
import PlusCard from "../atoms/PlusCard";

export default function ClientCardList() {
  const [cards, setCards] = useState([
    { image: "", title: "", description: "" },
  ]);

  // 🔹 Actualiza los datos de una card
  const handleChange = (index, field, value) => {
    const updated = [...cards];
    updated[index][field] = value;
    setCards(updated);
    console.log(cards);
  };

  // 🔹 Agrega una nueva card si la última está completa
  const handleAddCard = () => {
    const lastCard = cards[cards.length - 1];
    const isComplete =
      lastCard.image && lastCard.title.trim() && lastCard.description.trim();

    if (!isComplete) {
      alert("Por favor completa todos los campos antes de agregar otra tarjeta.");
      return;
    }

    setCards([...cards, { image: "", title: "", description: "" }]);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:px-10">
      {cards.map((card, index) => (
        <ClientCardForm
          key={index}
          formData={card}
          onChange={(field, value) => handleChange(index, field, value)}
        />
      ))}

      <PlusCard onClick={handleAddCard} />
    </div>
  );
}
