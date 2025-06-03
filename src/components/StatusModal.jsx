import { CheckCircle, XCircle } from 'lucide-react';
import Button from './Button';

const StatusModal = ({ type, message, isOpen, onClose }) => {
  if (!isOpen) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center relative">
        {isSuccess ? (
          <CheckCircle className="text-green-500 mx-auto w-16 h-16" />
        ) : (
          <XCircle className="text-red-500 mx-auto w-16 h-16" />
        )}
        <h2 className="text-xl font-semibold mt-4">
          {isSuccess ? 'Berhasil!' : 'Gagal!'}
        </h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <Button
          variant="blue"
          onClick={onClose}
          className="mt-4"
        >
          Tutup
        </Button>
      </div>
    </div>
  );
};

export default StatusModal;
