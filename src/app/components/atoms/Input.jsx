import React, { useState } from "react";

// Lista de países y prefijos de ejemplo
const countryCodes = [
  { code: "+591", country: "BO" },
  { code: "+1", country: "USA" },
  { code: "+52", country: "MEX" },
  { code: "+34", country: "ESP" },
  { code: "+44", country: "UK" },
];

export default function Input({
  type,
  label,
  error,
  maxLength,
  className,
  darkMode,
  labelSize,
  onChange,
  placeholder,
  value,
  ...props
}) {
  const [text, setText] = useState(value || "");
  const [prefix, setPrefix] = useState(countryCodes[0].code);
  const [internalError, setInternalError] = useState("");

  // 🔹 Validador de email simple (RFC 5322 simplificado)
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // 🔹 Cuando cambia el input
  const handleTextChange = (e) => {
    let input = e.target.value;

    if (type === "tel") {
      input = input.replace(/\D/g, "");
    }

    setText(input);
    if (onChange) onChange(type === "tel" ? prefix + input : input);

    // Validar email si aplica
    if (type === "email") {
      if (input.length === 0) {
        setInternalError("");
      } else if (!validateEmail(input)) {
        setInternalError("Correo electrónico no válido");
      } else {
        setInternalError("");
      }
    }
  };

  // 🔹 Cuando cambia el prefijo
  const handlePrefixChange = (e) => {
    setPrefix(e.target.value);
    if (onChange) onChange(e.target.value + text);
  };

  return (
    <div className="flex flex-col w-full relative my-3">
      {label && (
        <label
          className={`mb-1 text-[${labelSize ? labelSize : 14}px] font-medium ${
            darkMode ? "text-gray-200" : "text-[#B1A6A6]"
          }`}
        >
          {label}
        </label>
      )}

      {type === "tel" ? (
        <div className="flex gap-0">
          {/* Dropdown con prefijos */}
          <select
            value={prefix}
            onChange={handlePrefixChange}
            className={`p-3 border rounded-l-md focus:outline-none focus:ring-2 ${
              error || internalError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } ${darkMode ? "bg-gray-800 text-gray-100" : "bg-[#EAEAEA] text-gray-900"} ${
              className || ""
            }`}
          >
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code}>
                {c.country}
              </option>
            ))}
          </select>

          {/* Input del número */}
          <input
            type="tel"
            className={`flex-1 p-3 border rounded-r-md focus:outline-none focus:ring-2 ${
              error || internalError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } ${darkMode ? "bg-gray-800 text-gray-100" : "bg-[#EAEAEA] text-gray-900"} ${
              className || ""
            }`}
            value={text}
            onChange={handleTextChange}
            placeholder={placeholder || "Número de teléfono"}
            maxLength={maxLength}
            {...props}
          />
        </div>
      ) : (
        <input
          type={type || "text"}
          className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
            error || internalError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          } ${darkMode ? "bg-gray-800 text-gray-100" : "bg-[#EAEAEA] text-gray-900"} ${
            className || ""
          }`}
          value={text}
          onChange={handleTextChange}
          placeholder={placeholder || "Ingrese un valor"}
          maxLength={maxLength}
          {...props}
        />
      )}

      {/* Mensaje de error */}
      {(error || internalError) && (
        <span className="text-red-500 mt-1 text-sm">
          {internalError || error}
        </span>
      )}

      {/* Contador */}
      {maxLength && (
        <span
          className={`${
            darkMode
              ? "text-[14px] text-gray-300 absolute right-0"
              : "text-[#B1A6A6] absolute right-2 bottom-0"
          }`}
        >
          {text.length}/{maxLength}
        </span>
      )}
    </div>
  );
}
