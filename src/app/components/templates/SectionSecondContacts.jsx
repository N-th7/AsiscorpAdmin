import React from "react";
import SecondContactForm from "../organisms/SecondContactForm";
import { Button } from "../atoms/Button";

export default function SectionSecondContacts(){
    return(
        <div className="lg:px-30 w-fullr my-15 ">
            <h3 className="font-sans font-bold text-[36px] text-left">Contactos Secundarios</h3>
            <div className=" p-5 pb-10 bg-[#EAEAEA] rounded-md my-10 shadow-2xl">
                <SecondContactForm></SecondContactForm>
            </div>
            <div className="w-full text-center ">
                <Button className="px-10 ">Agregar nuevo contacto</Button>
            </div>
        </div>
    );
};