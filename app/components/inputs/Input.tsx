"use client";

import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className={`w-full relative ${className || ""}`}>
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute mt-5 top-5 left-5 mr-4"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={showPassword ? "text" : type}
        value={inputValue}
        onChange={handleInputChange}
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 outline-none transition disabled:opacity-60 disabled:cursor-not-allowed rounded-md
        ${id === "description" ? "pb-20" : ""}
        ${formatPrice ? "pl-12  pt-10 " : "pl-4"}
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-neutral-300"}
        `}
      />

      {type === "password" && inputValue.length > 0 && (
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-neutral-700 bg-white absolute w-10 h-10 top-5 right-0 pl-3 mr-2 cursor-pointer"
          >
            {showPassword ? <IoIosEyeOff size={20} /> : <IoIosEye size={20} />}
          </button>
        </div>
      )}

      <label
        className={`absolute text-md duration-150 transform -translate-y-3 top-4 z-10 origin-[0]
        ${formatPrice ? "left-9 text-lg" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
