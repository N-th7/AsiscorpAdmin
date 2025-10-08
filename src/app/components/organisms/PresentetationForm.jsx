import React from "react";
import TextArea from "../atoms/TextArea";

export default function PresentationForm() {
    return (
        <div className="flex flex-col gap-4">
            <TextArea
                label="Ingrese el titulo"
                maxLength={10}
                placeholder="Ingrese el titulo"
                className="mb-1"
            />
            <TextArea
                label="Ingrese la descripcion"
                maxLength={500}
                placeholder="Ingrese la descripcion"
                className="mb-1"
                height={150}
            />
            <TextArea
                label="Ingrese el lema"
                maxLength={50}
                placeholder="Ingrese el lema"
                className="mb-1"
            />

        </div>
    );
}