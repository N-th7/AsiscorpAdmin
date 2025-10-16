import React ,{useState, useEffect} from "react";
import SecondContactForm from "../organisms/SecondContactForm";
import { Button } from "../atoms/Button";
import { motion, AnimatePresence } from "framer-motion";
import { getContacts } from "@/app/api/contacts";

export default function SectionSecondContacts(){
    const [cards, setCards] = useState([]);
    const [emptyCard, setEmptyCard] = useState({ title: "", phone_number: "", cellphone_number: "", email: "", address: "" });
      const [error, setError] = useState("");
      
   const fetchData = async () => {
    try {
      const response = await getContacts();
      let contactsData = response?.data || [];

      contactsData = contactsData.filter((contact) => contact.id !== 1);

      setCards(contactsData);
      console.log("Datos de contactos obtenidos (sin id=1):", contactsData);
    } catch (error) {
      console.error("Error al obtener los datos de contactos:", error);
      setError("No se pudieron cargar los contactos");
    }
  };
    
      useEffect(() => {
        fetchData();
      }, []);


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
    
      const handleAddCard = () => {
        const isComplete = emptyCard.title.trim() && emptyCard.phone_number.trim() && emptyCard.cellphone_number.trim() && emptyCard.email.trim() && emptyCard.address.trim();
    
        if (!isComplete) {
          setError("Por favor completa todos los campos antes de agregar otra tarjeta.");
          return;
        }
    
        setError("");
        const newCard = { ...emptyCard, id: crypto.randomUUID() };
        setCards((prev) => [...prev, newCard]);
    
        setEmptyCard({  title: "", phone_number: "", cellphone_number: "", email: "", address: ""});
      };
    
      const handleDeleteCard = (id) => {
        setCards((prev) => prev.filter((card) => card.id !== id));
      };
    
    
    return(
        <div className="lg:px-30 w-fullr my-15 ">
            <h3 className="font-sans font-bold text-[36px] text-left">Contactos Secundarios</h3>
            {cards.map((card,index)=>(
                <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                >
                <div className=" p-5 pb-10 bg-[#EAEAEA] rounded-md my-10 shadow-2xl">
                <SecondContactForm
                formData={card}
                onChange={(field, value) => handleChange(card.id, field, value)}
                onDelete={() => handleDeleteCard(card.id)}
                showTrash={true} 
                ></SecondContactForm>
                </div>
                </motion.div>
            ))}
            <div className=" p-5 pb-10 bg-[#EAEAEA] rounded-md my-10 shadow-2xl">
                <SecondContactForm 
                key={"empty"}
                showTrash={false}
                formData={emptyCard}
                onChange={(field, value) => handleChange("empty", field, value)}
                ></SecondContactForm>

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
                className="mt-4 "
            >
            <div className="w-full text-center ">
                <Button className="px-10 " onClick={handleAddCard}>Agregar nuevo contacto</Button>
            </div>
            </motion.div>
        </div>
    );
};