import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const TYPE_STYLES = {
  success: "bg-green-50 border-green-400 text-green-800",
  error: "bg-red-50 border-red-400 text-red-800",
  warning: "bg-yellow-50 border-yellow-400 text-yellow-800",
  info: "bg-blue-50 border-blue-400 text-blue-800",
};

const TYPE_ICONS = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

export default function Toast({ message, type = "info", duration = 3000, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(enterTimer);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => onClose && onClose(), 200);
  };

  useEffect(() => {
    if (duration > 0) {
      const closeTimer = setTimeout(handleClose, duration);
      return () => clearTimeout(closeTimer);
    }
  }, [duration]);

  return (
    <div
      role="alert"
      className={`
        flex items-start gap-3 w-80 max-w-full p-4 rounded-lg border shadow-md
        transition-all duration-200 ease-out
        ${TYPE_STYLES[type] || TYPE_STYLES.info}
        ${isVisible && !isLeaving ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      <div className="shrink-0 mt-0.5">{TYPE_ICONS[type] || TYPE_ICONS.info}</div>
      <p className="flex-1 text-sm font-medium leading-snug">{message}</p>
      <button
        onClick={handleClose}
        aria-label="Dismiss notification"
        className="shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}