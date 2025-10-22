"use client";

import React, { useState, useEffect, useRef } from "react";
import ValueCard from "../molecules/ValueCard";
import { getIntroductionByName, updateIntroduction } from "@/app/api/introductions";

export default function ValuesSection() {
  const [cards, setCards] = useState({
    Misión: { id: "", image: null, description: "", previewUrl: null },
    Visión: { id: "", image: null, description: "", previewUrl: null },
    Valores: { id: "", image: null, description: "", previewUrl: null },
  });

  const [formLoaded, setFormLoaded] = useState(false);
  const debounceRefs = useRef({});
  const cardsRef = useRef(cards);

  // Mantener referencia actualizada al estado
  useEffect(() => {
    cardsRef.current = cards;
  }, [cards]);

  const handleChange = (key, newData) => {
    console.log("cambios", newData)
    setCards((prev) => ({
      ...prev,
      [key]: { ...prev[key], ...newData },
    }));

    const id = cards[key]?.id;
    if (!id) return;

    // Limpiar debounce anterior
    if (debounceRefs.current[id]) clearTimeout(debounceRefs.current[id]);

    // Crear nuevo debounce
    debounceRefs.current[id] = setTimeout(async () => {
      const currentCard = cardsRef.current[key];
      if (!currentCard?.id) return;

      const formData = new FormData();
      formData.append("title", key);
      formData.append("text", currentCard.description || "");

      if (currentCard.image instanceof File) {
        formData.append("image", currentCard.image);
      }

      try {
        console.log(`🚀 Enviando actualización de ${key}`);
        for (let [k, v] of formData.entries()) console.log(k, v);

        const response = await updateIntroduction(currentCard.id, formData);

        if (response?.data) {
          setCards((prev) => ({
            ...prev,
            [key]: {
              ...prev[key],
              description: response.data.text ?? prev[key].description,
              image: response.data.image ?? prev[key].image,
              previewUrl: response.data.image
                ? `${response.data.image}?t=${Date.now()}`
                : prev[key].previewUrl,
            },
          }));
        }

        console.log(`✅ ${key} actualizado correctamente.`);
      } catch (err) {
        console.error(`❌ Error al actualizar ${key}:`, err);
      }
    }, 800);
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
      console.log("✅ Datos obtenidos correctamente:", updatedCards);
    } catch (error) {
      console.error("❌ Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    </div>
  );
}
