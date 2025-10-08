import React from "react";

export default function PlusCard() {
    return (
        <div className="shadow-lg py-20 px-10 rounded-lg border border-gray-200 w-full h-full flex flex-col gap-4">
            <img
                src={"/mas.png"}
                className="object-contain opacity-50 m-auto"
                style={{ width: "50%", height: "50%" }}
            />
        </div>
    );
}