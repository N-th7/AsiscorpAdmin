import React from "react";

export default function PlusCard({ onClick }) {
    return (
        <div className="shadow-lg py-20 px-10 rounded-lg border bg-white border-gray-200 w-full h-full flex flex-col gap-4" onClick={onClick}>
            <img
                src={"/mas.png"}
                className="object-contain opacity-50 m-auto"
                style={{ width: "50%", height: "50%" }}
            />
        </div>
    );
}