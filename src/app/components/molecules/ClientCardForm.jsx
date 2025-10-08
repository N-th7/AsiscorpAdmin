import React from "react";
import ImageUploader from "../atoms/ImageUploader";
import TextArea from "../atoms/TextArea";

export default function ClientCardForm({ onSubmit, onChange, formData, isEdit = false }) {
   
    return(
        <div className="shadow-lg py-10 px-2 rounded-lg border border-gray-200 w-full h-full flex flex-col gap-4">
            <ImageUploader
                name="image"
                placeholder={"/imagen.png"}
                onChange={onChange}
            >   
            </ImageUploader>
            <TextArea
                label="Ingrese el titulo."
                name="name"
                maxLength={80}>
            </TextArea>
            <TextArea
                label="Ingrese una descripcion."
                name="position"
                maxLength={80}>
            </TextArea>
        </div>

    );
};