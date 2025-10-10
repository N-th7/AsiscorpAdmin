import React ,{useState} from "react";
import Input from "../atoms/Input";
import TextArea from "../atoms/TextArea";

export default function SecondContactForm({onSubmit, onChange: externalOnChange, formData: externalFormData, isEdit = false }){
  // Estado local del formulario (si no se pasa uno externo)
  const [formData, setFormData] = useState(
    externalFormData || {
      title: "",
      email: "",
      phone_number: "",
      cellphone_number: "",
      address: "",
    }
  );

  // Maneja los cambios en los inputs
  const handleChange = (field, value) => {

    const updatedForm = { ...formData, [field]: value };
    setFormData(updatedForm);

    // Si hay un onChange externo, lo notificamos también
    if (externalOnChange) externalOnChange(updatedForm);
  };

  // 🔹 Manejo del submit (si existe onSubmit externo)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };


    return(
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-4">
                <div>
                    <Input
                        label={"Titulo"}
                        placeholder={"Ej. Santa Cruz"}
                        maxLength={30}
                        name={"title"}
                        value={formData.cellphone_number}
                        onChange={(value) => handleChange("title", value)}
                        className={"bg-white"}
                    />
                     <Input
                        label="Número de teléfono"
                        name="phone_number"
                        type="tel"
                        placeholder="Ej. 4412345"
                        maxLength={10}
                        value={formData.phone_number}
                        onChange={(value) => handleChange("phone_number", value)}
                        className={"bg-white"}
                        />
                    
                </div>
                <div>
                    <Input
                    label="Número de celular"
                    name="cellphone_number"
                    type="tel"
                    placeholder="Ej. 77777777"
                    maxLength={10}
                    value={formData.cellphone_number}
                    onChange={(value) => handleChange("cellphone_number", value)}
                    className={"bg-white"}

                    />
                    <Input
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    maxLength={50}
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={(value) => handleChange("email", value)}
                    className={"bg-white"}

                    />
                </div>

       
        
            </div>

            <TextArea
            label="Dirección"
            name="address"
            placeholder="Dirección"
            maxLength={200}
            height={130}
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            labelUp={true}
            className={"bg-white"}
            />
        </div>
    );
};