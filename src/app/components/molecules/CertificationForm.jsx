import React from "react";
import ImageUploader from "../atoms/ImageUploader";
import TextArea from "../atoms/TextArea";

export default function CertificationForm({ onSubmit, onChange, formData, isEdit = false }) {
   
    return( 

        <div className="shadow-lg py-5 px-5 rounded-lg border  border-gray-200 bg-white w-full h-full flex flex-col gap-2">
            <ImageUploader
                name="image"        
                placeholder={"/imagen.png"}
                height={130}
                onChange={(file, previewUrl) => onChange("image", previewUrl)}  
                required 
            >   
            </ImageUploader>    
            <TextArea
                label="Ingrese el titulo."
                name="title"
                maxLength={80}
                labelSize={10}
                onChange={(e) => onChange("title", e.target.value)}
                value={formData.title}
                required
                >

            </TextArea>

        </div>  
    );
};