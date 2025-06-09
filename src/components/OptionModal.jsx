import Button from "./Button";
import { X } from "lucide-react";

const OptionModal = ({ title, isOpen, onClick, onClose, options = [] }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg relative">
        <button
          className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-500"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-lg text-center font-semibold mb-4">{title}</h2>
        <div className="flex flex-col justify-end gap-3">
          {options.map((option, idx) => (
            <Button
              key={idx}
              variant={option.variant}
              onClick={() => onClick(option.label)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptionModal;

