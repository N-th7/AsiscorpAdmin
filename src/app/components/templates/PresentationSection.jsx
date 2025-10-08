import React from "react";
import PresentationForm from "../organisms/PresentetationForm";
import ImageUploader from "../atoms/ImageUploader";

export default function PresentationSection() {
    const handleFile = (file) => {
        console.log("Archivo seleccionado:", file);
      };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            
            <PresentationForm/>
            <ImageUploader 
                label="Ingrese una imagen"
                placeholder={"/imagen.png"}
                onFileSelect={handleFile}
            />
        </div>
    );
}