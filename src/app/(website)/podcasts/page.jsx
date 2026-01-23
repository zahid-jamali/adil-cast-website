"use client";
import VideoModal from "@/components/VideoModal";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Youtube } from "lucide-react";

const categories = ["All", "Originals", "Interviews", "Special"];

// Dummy guests & media logos stay the same
const guests = [
  {
    id: 1,
    name: "Alamgeer Khan",
    image: "/assets/alamgeerkhan.jpg",
    role: "MNA",
  },
  { id: 2, name: "Awais Qadir", image: "/assets/awaisqadir.jpg", role: "MNA" },
  { id: 3, name: "Shaikh Salahudin", image: "/assets/shaikh.jpg", role: "MPA" },
];

const mediaLogos = [
  "/assets/roz.png",
  "/assets/venus.jpg",
  "/assets/metro.jpg",
  "/assets/dharty.jpg",
  "/assets/awaz.jpg",
  "/assets/pja.png",
  "/assets/youtube.jpg",
  "/assets/pta.png",
];

const PodcastPage = () => {
  const [episodes, setEpisodes] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const res = await fetch("/api/podcasts");
      const data = await res.json();
      setEpisodes(data);
    } catch (error) {
      console.error("Failed to load podcasts", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEpisodes =
    activeTab === "All"
      ? episodes
      : episodes.filter((ep) => ep.type === activeTab);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative w-full h-[400px]">
        <Image
          src="/assets/podcastHero.jpg"
          alt="Podcast Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-extrabold">
            Podcasts
          </h1>
        </div>
      </section>

      {/* Episodes */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeTab === cat
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-red-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading episodes...</p>
        )}

        {/* Empty */}
        {!loading && filteredEpisodes.length === 0 && (
          <p className="text-center text-gray-500">No episodes found.</p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredEpisodes.map((ep) => (
            <div
              key={ep._id}
              onClick={() => setSelectedVideo(ep)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-black">
                <Image
                  src={`https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg`}
                  alt={ep.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-600 text-white p-4 rounded-full shadow-lg scale-90 group-hover:scale-100 transition">
                    ▶
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-red-600 text-sm font-semibold mb-2">
                  <Youtube size={16} />
                  {ep.type}
                </div>

                <h3 className="text-lg font-bold mb-2 text-black line-clamp-2">
                  {ep.title}
                </h3>

                {ep.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {ep.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Guests */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold">Top Guests</h2>
          <p className="text-gray-600 mt-2">
            Our most inspiring and influential guests
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {guests.map((guest) => (
            <div
              key={guest.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >
              <div className="relative h-64">
                <Image
                  src={guest.image}
                  alt={guest.name}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{guest.name}</h3>
                <p className="text-gray-600">{guest.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Media Logos */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
            Platforms & Media Presence
          </h3>

          <div className="flex flex-wrap justify-center gap-10 items-center">
            {mediaLogos.map((logo, index) => (
              <div
                key={index}
                className="grayscale hover:grayscale-0 transition"
              >
                <img
                  src={logo}
                  alt="Media Logo"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedVideo && (
        <VideoModal
          youtubeId={selectedVideo.youtubeId}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </main>
  );
};

export default PodcastPage;
