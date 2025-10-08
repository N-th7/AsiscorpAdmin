'use client';

import React, { useState, useEffect, useRef } from "react";

const TextArea = ({ label, error, maxLength, className, darkMode, height, ...props }) => {
  const [text, setText] = useState(props.value || "");
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = height ? height + "px" : "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleChange = (e) => {
    setText(e.target.value);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className="flex flex-col w-full">

      <textarea
        ref={textAreaRef}
        value={text}
        onChange={handleChange}
        maxLength={maxLength}
        className={`resize-none p-3 border rounded-md focus:outline-none focus:ring-2 
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
          ${darkMode ? "bg-gray-800 text-gray-100 placeholder-gray-400" : "bg-[#EAEAEA] text-gray-900 placeholder-gray-500"}
          ${className}`}
        {...props}
      />
      <div className="flex relative justify-between mt-1 text-xs right-0">
        {label && (
            <label className={`mb-1 text-[14px] font-medium ${darkMode ? "text-gray-200" : "text-[#B1A6A6]"}`}>
            {label}
            </label>
        )}
        {error && <span className="text-red-500">{error}</span>}
        {maxLength && <span className={`${darkMode ? " text-[14px]  text-gray-300 absolute right-0" : "text-[#B1A6A6] absolute right-0"}`}>{text.length}/{maxLength}</span>}
      </div>
    </div>
  );
};

export default TextArea;
