import React from "react";

export const Button = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button 
        type={type}
        onClick={onClick}
        className={`px-8 py-2 text-[18px] bg-[#0A7D35] text-white rounded-2xl hover:bg-[#106A44] transition ${className}`}
    >        
        
      {children}        
    </button>
    );
};