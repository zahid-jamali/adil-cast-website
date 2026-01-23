import ModalWrapper from "../podcasts/ModelWrapper";

export default function ViewContactModal({ message, onClose }) {
  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Message from {message.name}</h2>

      <p className="text-sm text-gray-500 mb-2">{message.email}</p>

      <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
        {message.message}
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={onClose}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          Close
        </button>
      </div>
    </ModalWrapper>
  );
}
