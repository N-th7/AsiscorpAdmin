import React, { useState, useEffect } from "react";
import ValueCard from "../molecules/ValueCard";
import { getIntroductionByName } from "@/app/api/introductions";

export default function ValuesSection() {
  const [cards, setCards] = useState({
    Misión: { id: "", image: null, description: "" },
    Visión: { id: "", image: null, description: "" },
    Valores: { id: "", image: null, description: "" },
  });
  const [formLoaded, setFormLoaded] = useState(false);

  const handleChange = (key, newData) => {
    setCards((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...newData },
    }));
    console.log(cards);
  };

  const fetchData = async () => {
    try {
      const [missionRes, visionRes, valuesRes] = await Promise.all([
        getIntroductionByName("Mission"),
        getIntroductionByName("Vision"),
        getIntroductionByName("Values"),
      ]);

      const updatedCards = {
        Misión: {
          id: missionRes?.data?.id || "",
          image: missionRes?.data?.image || null,
          description: missionRes?.data?.text || "",
        },
        Visión: {
          id: visionRes?.data?.id || "",
          image: visionRes?.data?.image || null,
          description: visionRes?.data?.text || "",
        },
        Valores: {
          id: valuesRes?.data?.id || "",
          image: valuesRes?.data?.image || null,
          description: valuesRes?.data?.text || "",
        },
      };

      setCards(updatedCards);
      setFormLoaded(true);
      console.log("Datos de introducción obtenidos:", updatedCards);
    } catch (error) {
      console.error("Error al obtener los datos de introducción:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    console.log("Datos completos:", cards);
  };

  return (
    <div>
      {formLoaded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y-2 sm:divide-y-0 md:divide-x-2 md:divide-black my-20">
          {Object.keys(cards).map((key) => (
            <ValueCard
              key={key}
              title={key}
              data={cards[key]}
              onChange={(newData) => handleChange(key, newData)}
            />
          ))}
        </div>
      )}

      <div className="text-center my-6">
        <button
          onClick={handleSubmit}
          className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
