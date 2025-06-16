import React, {createContext, useContext, useState, useCallback} from "react";
import {FiCheckCircle, FiInfo, FiAlertCircle, FiXCircle} from "react-icons/fi";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export default function ToastProvider({children}) {
  const [message, setMessage] = useState(null);

  const showToast = useCallback((msg, type = "info") => {
    setMessage({text: msg, type});
    setTimeout(() => setMessage(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      {message && (
        <div
          className={`
          fixed top-18 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded shadow-lg flex items-center gap-2
          ${
            message.type === "success"
              ? "bg-green-600"
              : message.type === "error"
              ? "bg-red-600"
              : "bg-black"
          }
          text-white
        `}
        >
          {message.type === "success" && <FiCheckCircle />}
          {message.type === "error" && <FiXCircle />}
          {message.type === "info" && <FiInfo />}
          {message.type === "warning" && <FiAlertCircle />}

          <span>{message.text}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
}
