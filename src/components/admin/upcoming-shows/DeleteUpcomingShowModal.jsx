import ModalWrapper from "../podcasts/ModelWrapper";

export default function DeleteUpcomingShowModal({ show, onClose }) {
  const handleDelete = async () => {
    await fetch(`/api/upcoming-shows/${show._id}`, {
      method: "DELETE",
    });
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-bold text-red-600 mb-4">
        Delete Upcoming Show
      </h2>

      <p className="mb-6">
        Are you sure you want to delete <strong>{show.title}</strong>?
      </p>

      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          Delete
        </button>

        <button onClick={onClose} className="border px-6 py-2 rounded">
          Cancel
        </button>
      </div>
    </ModalWrapper>
  );
}
