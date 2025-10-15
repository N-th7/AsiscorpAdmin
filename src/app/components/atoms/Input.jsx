import React, { useState, useEffect } from "react";

const countryCodes = [
  { code: "+591", country: "BO" },
  { code: "+1", country: "USA" },
  { code: "+52", country: "MEX" },
  { code: "+34", country: "ESP" },
  { code: "+44", country: "UK" },
];

export default function Input({
  type = "text",
  label,
  error,
  maxLength,
  className,
  darkMode = false,
  labelSize = 14,
  onChange,
  placeholder,
  value,
  name,
  ...props
}) {
  const [prefix, setPrefix] = useState(countryCodes[0].code);
  const [text, setText] = useState(value || countryCodes[0].code);
  const [internalError, setInternalError] = useState("");

  useEffect(() => {
    if(type=="tel") {if (value && value.startsWith(prefix)) {
      setText(value);
    } else if (value) {
      setText(prefix + value.replace(/^\+?[0-9]*/, ""));
    } else {
      setText(prefix);
    }}else{setText(value||"")}
  }, [value, prefix]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleTextChange = (e) => {
    let input = e.target.value;

    if (type === "tel") {
      input = input.replace(/(?!^)\+/g, "");
      input = input.replace(/[^0-9+]/g, "");

      if (!input.startsWith(prefix)) {
        if (prefix.startsWith("+") && input.startsWith("+")) {
          input = prefix;
        } else {
          input = prefix + input.replace(/^\+?[0-9]*/, "");
        }
      }
    }

    setText(input);

    if (onChange) {
      onChange({
        target: { name, value: input },
      });
    }

    if (type === "email") {
      if (!input.length) setInternalError("");
      else if (!validateEmail(input))
        setInternalError("Correo electrónico no válido");
      else setInternalError("");
    }
  };

  const handlePrefixChange = (e) => {
    const newPrefix = e.target.value;
    setPrefix(newPrefix);

    const newValue = newPrefix + text.replace(/^\+?[0-9]*/, "");
    setText(newValue);

    if (onChange && type === "tel") {
      onChange({
        target: { name, value: newValue },
      });
    }
  };

  return (
    <div className="flex flex-col w-full relative my-3">
      {label && (
        <label
          htmlFor={name}
          className={`mb-1 text-[${labelSize}px] font-medium ${
            darkMode ? "text-gray-200" : "text-[#B1A6A6]"
          }`}
        >
          {label}
        </label>
      )}

      {type === "tel" ? (
        <div className="flex gap-0">
          <select
            value={prefix}
            onChange={handlePrefixChange}
            className={`p-3 border rounded-l-md focus:outline-none focus:ring-2 ${
              error || internalError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } ${
              darkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-[#EAEAEA] text-gray-900"
            } ${className || ""}`}
          >
            {countryCodes.map((c) => (
              <option key={c.code} value={c.code}>
                {c.country}
              </option>
            ))}
          </select>

          <input
            id={name}
            name={name}
            type="tel"
            className={`flex-1 p-3 border rounded-r-md focus:outline-none focus:ring-2 ${
              error || internalError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } ${
              darkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-[#EAEAEA] text-gray-900"
            } ${className || ""}`}
            value={text}
            onChange={handleTextChange}
            placeholder={placeholder || "Número de teléfono"}
            maxLength={maxLength}
            {...props}
          />
        </div>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={`p-3 border rounded-md focus:outline-none focus:ring-2 ${
            error || internalError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          } ${
            darkMode
              ? "bg-gray-800 text-gray-100"
              : "bg-[#EAEAEA] text-gray-900"
          } ${className || ""}`}
          value={text}
          onChange={handleTextChange}
          placeholder={placeholder || "Ingrese un valor"}
          maxLength={maxLength}
          {...props}
        />
      )}

      {(error || internalError) && (
        <span className="text-red-500 mt-1 text-sm">
          {internalError || error}
        </span>
      )}

      {maxLength && (
        <span
          className={`absolute right-3 bottom-1 text-xs ${
            darkMode ? "text-gray-300" : "text-[#B1A6A6]"
          }`}
        >
          {text.length}/{maxLength}
        </span>
      )}
    </div>
  );
}
