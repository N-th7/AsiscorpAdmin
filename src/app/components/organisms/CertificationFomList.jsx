
import React, {useState} from "react";
import CertificationForm from "../molecules/CertificationForm";
import PlusCard from "../atoms/PlusCard";

export default function CertificationFomList() {
const [cards, setCards] = useState([
    { image: "", title: "" },
  ]);

  // 🔹 Actualiza los datos de una card
  const handleChange = (index, field, value) => {
    const updated = [...cards];
    updated[index][field] = value;
    setCards(updated);
    console.log(updated);
  };

  // 🔹 Agrega una nueva card si la última está completa
  const handleAddCard = () => {
    const lastCard = cards[cards.length - 1];
    const isComplete =
      lastCard.image && lastCard.title.trim();

    if (!isComplete) {
      alert("Por favor completa todos los campos antes de agregar otra tarjeta.");
      return;
    }

    setCards([...cards, { image: "", title: ""}]);
  };
    return (
        <div className="grid grid-cols-1 p-7 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:px-10 md:py-5 bg-[#EAEAEA] m-auto">
            {cards.map((card, index) => (
                    <CertificationForm
                      key={index}
                      formData={card}
                      onChange={(field, value) => handleChange(index, field, value)}
                    />
                  ))}
            <PlusCard onClick={handleAddCard }/>
        </div>
    );
}