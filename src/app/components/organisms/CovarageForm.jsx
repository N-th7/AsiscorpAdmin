import React from "react";
import TextArea from "../atoms/TextArea";
import ImageUploader from "../atoms/ImageUploader";

export default function CovarageForm({ onSubmit, onChange, formData, isEdit = false }) {    
    return( 
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-15 h-full lg:px-30">
            
            <TextArea
                label="Ingrese la descripcion."
                name="title"        
                maxLength={500}
                labelSize={10}
                height={400}
                required
                >
            </TextArea>
        <ImageUploader
                name="image"    
                placeholder={"/imagen.png"}
                required 
            >   
            </ImageUploader>
        </div>  
    );
}