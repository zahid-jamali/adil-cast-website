"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import VideoModal from "@/components/VideoModal";

const LatestVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchLatestVideos();
  }, []);

  const fetchLatestVideos = async () => {
    try {
      const res = await fetch("/api/podcasts");
      const data = await res.json();

      // show only latest 3 videos
      setVideos(data.slice(0, 3));
    } catch (err) {
      console.error("Failed to fetch latest videos", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-background py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="mb-14 text-center">
          <span className="inline-block mb-3 px-4 py-1 rounded-full bg-red-600/10 text-red-600 text-sm tracking-wide uppercase">
            Latest Episodes
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-text mb-4">
            Fresh Conversations from
            <span className="text-red-600"> Adil Cast</span>
          </h2>

          <p className="text-muted max-w-2xl mx-auto">
            Watch our most recent episodes featuring fearless journalism, honest
            stories, and real conversations.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading latest episodes...
          </p>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video._id}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* THUMBNAIL */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition">
                    ▶
                  </div>
                </div>

                {/* Duration (optional) */}
                {video.duration && (
                  <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text mb-3 line-clamp-2 group-hover:text-red-600 transition">
                  {video.title}
                </h3>

                <span className="inline-flex items-center gap-2 text-red-600 font-medium">
                  ▶ Watch Episode
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW ALL */}
        <div className="mt-14 text-center">
          <a
            href="/podcasts"
            className="inline-block px-10 py-3 rounded-full bg-red-600 text-white font-semibold 
            hover:bg-red-700 transition-all duration-300"
          >
            View All Episodes
          </a>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <VideoModal
          youtubeId={selectedVideo.youtubeId}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </section>
  );
};

export default LatestVideos;
