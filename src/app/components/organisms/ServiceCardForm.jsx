import React from "react";
import TextArea from "../atoms/TextArea";
import ImageUploader from "../atoms/ImageUploader";
import { Button } from "../atoms/Button";

export default function ServiceCardForm({ onSubmit, onChange, formData, isEdit = false }) {
    onChange = onChange || (() => {});
  return (
    <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 w-full"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
            <div>
            <TextArea                   
            label="Ingrese el titulo"
            name="title"
            maxLength={10}  
            required          
        />
        <TextArea       
            height={200}
            label="Ingrese la descripcion."
            name="description"
            maxLength={500}
            required
        />  
        </div>
        <div className="h-full flex">
            <ImageUploader
            name="image"  
            placeholder={"/imagen.png"}  
            onChange={onChange}

            
            />
        </div>
        </div>
        <Button type="submit" className="m-auto">
            {isEdit ? "Update Service" : "Agregar nuevo servicio"}  
        </Button>
    </form>
  );
};