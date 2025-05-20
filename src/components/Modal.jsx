import Button from "./Button";

const Modal = ({ title, message, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 ">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <Button variant="gray" onClick={onClose}>
            Batal
          </Button>
          <Button variant="red" onClick={onConfirm}>
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

