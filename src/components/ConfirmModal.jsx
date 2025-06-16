import React from "react";
import Button from "./Button";

export default function ConfirmModal({
  show,
  title = "Confirm Action",
  message,
  nextStatus = "",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">
          {message} <span className="font-semibold">{nextStatus}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <Button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            {confirmLabel}
          </Button>
          <Button
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 cursor-pointer"
          >
            {cancelLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
