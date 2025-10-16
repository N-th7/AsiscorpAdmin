"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { getImageUrl } from "@/utils/getImageUrl";

const ImageUploader = ({ label, placeholder, className, width, height, onChange, previewUrl }) => {
  const [preview, setPreview] = useState(previewUrl || null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // 🔄 Si cambia previewUrl desde el padre (por datos del backend)
  useEffect(() => {
    setPreview(previewUrl || null);
  }, [previewUrl]);

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten archivos de imagen");
      setPreview(null);
      return;
    }

    setError("");
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    if (onChange) onChange(file, localPreview);
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

  const handleClick = () => inputRef.current.click();

  const src = preview ? getImageUrl(preview) : null;

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`relative border-2 h-full m-auto border-dashed rounded-md p-4 flex items-center justify-center cursor-pointer
          ${error ? "border-red-500" : "border-gray-300"}
          hover:border-blue-500 transition-colors overflow-hidden`}
        style={{ width: width || "100%", height: height || "100%" }}
      >
        {src ? (
          <Image src={src} alt="preview" fill className="object-contain" />
        ) : placeholder ? (
          <img
            src={placeholder}
            alt="placeholder"
            className="object-contain opacity-50"
            style={{ width: "50%", height: "50%" }}
          />
        ) : (
          <span className="text-gray-400 text-center">
            Arrastra la imagen o haz click para subir
          </span>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      {label && (
        <label className="text-[14px] font-medium text-[#B1A6A6] mt-2">
          {label}
        </label>
      )}
      {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default ImageUploader;
