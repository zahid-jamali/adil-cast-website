// import ModalWrapper from "./ModalWrapper";
import ModalWrapper from "./ModelWrapper";
export default function DeletePodcastModal({ podcast, onClose }) {
  const handleDelete = async () => {
    await fetch(`/api/podcasts/${podcast._id}`, {
      method: "DELETE",
    });
    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-bold text-red-600 mb-4">Delete Podcast</h2>

      <p className="mb-6">
        Are you sure you want to delete <strong>{podcast.title}</strong>?
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
