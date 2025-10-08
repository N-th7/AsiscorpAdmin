import React from "react";
import ClientCardForm from "../molecules/ClientCardForm";
import PlusCard from "../atoms/PlusCard";

export default function ClientCardList({ clients = [], onAddClient, onEditClient, onDeleteClient }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:px-10 my-20">   
            {/*clients.map((client, index) => (
                <ClientCardForm
                    key={index}
                    client={client}
                    onEdit={() => onEditClient(index)}
                    onDelete={() => onDeleteClient(index)}
                />
            ))*/}

            
            <ClientCardForm></ClientCardForm>
            <PlusCard onClick={onAddClient} />  
        </div>
    );
}