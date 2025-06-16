import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded bg-black text-white hover:bg-gray-700 transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
