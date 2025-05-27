import { Children } from "react";

const ClearModal = ({ Children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 ">
        <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            {Children}
        </div>
    </div>
  );
};

export default ClearModal;

