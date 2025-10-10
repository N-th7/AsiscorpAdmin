import React from "react";
import ValueCard from "../molecules/ValueCard";

export default function ValuesSection() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y-2 sm:divide-y-0 md:divide-x-2 md:divide-black my-20">
            <ValueCard title="Misión"/>
            <ValueCard title="Vision"/>
            <ValueCard title="Valores"/>
        </div>
    );
}