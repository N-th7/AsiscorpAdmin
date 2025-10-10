import React, {useState} from "react";
import ImageUploader from "../atoms/ImageUploader";
import Input from "../atoms/Input";

export default function SocialMediaForm({ onSubmit, onChange: externalOnChange, formData: externalFormData, isEdit = false }){
    const [formData, setFormData]= useState(
    externalFormData || {
      title: "",
      website_url: "",
      image: ""
    }

    );

     // Maneja los cambios en los inputs
  const handleChange = (field, value) => {
    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);

    // Si hay un onChange externo, lo notificamos también
    if (externalOnChange) externalOnChange(updatedForm);

    console.log(formData)
  };

  // 🔹 Manejo del submit (si existe onSubmit externo)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };
    return(
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="col-span-2 my-auto">
                <Input
                    label= "Titulo"
                    name= "title"
                    placeholder="Ingrese el titulo aqui"
                    maxLength={20}
                    value={formData.title}
                    onChange={(value) => handleChange("title", value)}
                    className={"bg-white"}
                />
                <Input
                    label={"URL del sitio web"}
                    name= "website_url"
                    placeholder={"www.susitio.com"}
                    value={formData.website_url}
                    onChange={(value) => handleChange("website_url", value)}
                        className={"bg-white"}

/>
            </div>
           <div className="h-full flex items-center justify-center">
            <ImageUploader
                placeholder={"/imagen.png"}
                onChange={(value) => handleChange("image", value)}
                className="bg-white my-auto"
            />
            </div>

        </div>
    );
};