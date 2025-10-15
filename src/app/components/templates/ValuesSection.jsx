import React, { useState } from "react";
import ValueCard from "../molecules/ValueCard";

export default function ValuesSection() {
  // Estado centralizado de las tres tarjetas
  const [cards, setCards] = useState({
    Misión: { image: null, description: "" },
    Visión: { image: null, description: "" },
    Valores: { image: null, description: "" },
  });

  const handleCardChange = (key, newData) => {
    setCards((prev) => ({
      ...prev,
      [key]: newData,
    }));
    console.log(cards);
  };

  const handleSubmit = () => {
    console.log("Datos completos:", cards);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y-2 sm:divide-y-0 md:divide-x-2 md:divide-black my-20">
        {Object.keys(cards).map((key) => (
          <ValueCard
            key={key}
            title={key}
            data={cards[key]}
            onChange={(newData) => handleCardChange(key, newData)}
          />
        ))}
      </div>
      <div className="text-center my-6">

      </div>
    </div>
  );
}
