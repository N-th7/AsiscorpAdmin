import React, {useState, useEffect} from "react";
import SocialMediaForm from "../organisms/SocialMediaForm";
import { Button } from "../atoms/Button";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmModal from "../molecules/ConfirmModal";
import { getLinks, createLink, deleteLink } from "@/app/api/links";


export default function SectionSocial(){
  const [emptyCard,setEmptyCard]=useState({ title: "", website_url: "", image: null, imagePreview:null});
  const [cards,setCards]=useState(null);
  const [error, setError] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [linkToDelete, setLinkToDelete] = useState(null);
  const fetchData = async () => {
    try {
      const response = await getLinks();
      const linksData = response?.data || [];
      setCards(linksData);
      console.log("Datos de enlaces obtenidos:", linksData);
    } catch (error) {
      console.error("Error al obtener los datos de enlaces:", error);
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
    setError("");   
    console.log(cards)
  };

  const handleAddCard = async() => {
    const isComplete = emptyCard.title.trim() && emptyCard.website_url.trim() && emptyCard.image;

    if (!isComplete) {
      setError("Por favor completa todos los campos antes de agregar otra tarjeta.");
      return;
    }

    setError("");
    const formData = new FormData();
    formData.append("title", emptyCard.title);
    formData.append("website_url", emptyCard.website_url);
    if (emptyCard.image) {
        formData.append("image", emptyCard.image);
    }
    
        const newSocial = await createLink(formData);
        console.log("✅ Nuevo servicio:", newSocial.data);

    setCards((prev) => [...prev, newSocial.data]);

    setEmptyCard({ title: "", website_url: "", image: null, imagePreview: null });
    setResetKey((prev) => prev + 1);
  };

  const handleDeleteCard = (id) => {
      setLinkToDelete(id); 
    };

    const confirmDelete = async () => {
      try {
        await deleteLink(linkToDelete);
        setCards((prev) => prev.filter((c) => c.id !== linkToDelete));
        console.log("✅ Link eliminado");
      } catch (error) {
        console.error("Error al eliminar Link:", error);
        setError("❌ Error al eliminar el Link");
      } finally {
        setLinkToDelete(null);
      }
    };

  const cancelDelete = () => setLinkToDelete(null);


    return(
        <div className="lg:px-30">
            {cards && cards.map((card, index)=>(
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
                ></SocialMediaForm>
            </div>
            </motion.div>))}

            <div className="bg-[#EAEAEA] rounded-md p-4 lg:px-20 my-10">

                <SocialMediaForm
                     key={`empty-${resetKey}`}
                    formData={emptyCard}
                    onChange={(field, value) => handleChange("empty", field, value)}
                    showTrash={false}
                ></SocialMediaForm>
              <ConfirmModal
              open={!!linkToDelete}
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
              label="link"
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
                    className="mt-4 "
                  >
            <div className="w-full text-center" onClick={handleAddCard}>
                <Button>Agregar nuevo enlace</Button>
            </div>
            </motion.div>
        </div>
    );
};