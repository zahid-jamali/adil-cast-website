import ModalWrapper from "./ModelWrapper";
export default function ViewPodcastModal({ podcast, onClose }) {
  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">{podcast.title}</h2>

      <iframe
        className="w-full h-64 rounded-xl"
        src={`https://www.youtube.com/embed/${podcast.youtubeId}`}
        allowFullScreen
      />

      <p className="mt-4 text-gray-600">{podcast.description}</p>
      <p>{podcast.youtubeId}</p>
    </ModalWrapper>
  );
}
