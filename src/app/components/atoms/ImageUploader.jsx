"use client";

import React, { useState, useRef } from "react";

const ImageUploader = ({ label, placeholder, className, width, height }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten archivos de imagen");
      setPreview(null);
      return;
    }

    setError("");
    setPreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-2 h-full m-auto border-dashed rounded-md p-4 flex items-center justify-center cursor-pointer
          ${error ? "border-red-500" : "border-gray-300"}
          hover:border-blue-500 transition-colors`}
        style={{ width: width || "100%"}}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="object-contain"
            style={{ width: "50%", height: "50%" }}
          />
        ) : placeholder ? (
          <img
            src={placeholder}
            alt="placeholder"
            className="object-contain opacity-50"
            style={{ width: "50%", height: "50%" }}
          />
        ) : (
          <span className="text-gray-400">Arrastra la imagen o haz click para subir</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {label && <label className="text-[14px] font-medium text-[#B1A6A6]">{label}</label>}
      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default ImageUploader;
