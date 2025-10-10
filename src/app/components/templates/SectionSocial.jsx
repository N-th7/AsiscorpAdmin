import React from "react";
import SocialMediaForm from "../organisms/SocialMediaForm";
import { Button } from "../atoms/Button";

export default function SectionSocial(){
    return(
        <div className="lg:px-30">
            <div className="bg-[#EAEAEA] rounded-md p-4 lg:px-20 my-10">
                <SocialMediaForm></SocialMediaForm>
            </div>
            <div className="w-full text-center">
                <Button>Agregar nuevo enlace</Button>
            </div>
        </div>
    );
};