import React from "react";

import ImageUploader from "../atoms/ImageUploader";
import TextArea from "../atoms/TextArea";

export default function ValueCard({title}) {
    const handleFile = (file) => {
        console.log("Archivo seleccionado:", file);
      };
    return (
        <div className="text-center h-min p-6 md:px-8 md:py-0 ">
            <ImageUploader 
                placeholder={"/imagen.png"}
                onFileSelect={handleFile}
                width="full"
            />
            <h2 className="text-[20px] font-bold m-3">{title}</h2>
            <TextArea
                label="Ingrese una descripción."
                maxLength={100}
                className="mb-1"
            />          
            
        </div>
    );
}