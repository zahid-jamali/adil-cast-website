"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const categories = ["All", "Originals", "Interviews", "Special"];

export default function UpcomingShowsPage() {
  const [shows, setShows] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const res = await fetch("/api/upcoming-shows");
      const data = await res.json();
      setShows(data);
    } catch (error) {
      console.error("Failed to load upcoming shows", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredShows =
    activeTab === "All"
      ? shows
      : shows.filter((show) => show.category === activeTab);

  return (
    <main className="bg-white min-h-screen">
      {/* HERO */}
      <section className="relative w-full h-[400px]">
        <Image
          src="/assets/podcastHero.jpg"
          alt="Upcoming Shows"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-extrabold text-center">
            Upcoming Shows
          </h1>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <span className="text-red-600 font-semibold tracking-wide uppercase">
            Adil Cast Network
          </span>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover what’s coming next on Adil Cast — powerful stories,
            fearless journalism, and conversations that matter.
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-center gap-4 flex-wrap mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === cat
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500">Loading upcoming shows...</p>
        )}

        {/* EMPTY */}
        {!loading && filteredShows.length === 0 && (
          <p className="text-center text-gray-500">No upcoming shows found.</p>
        )}

        {/* SHOW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredShows.map((show) => (
            <div
              key={show._id}
              onClick={() => setSelectedShow(show)}
              className="group cursor-pointer border border-gray-200 rounded-3xl overflow-hidden hover:shadow-2xl transition"
            >
              {/* IMAGE */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                <span className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full capitalize">
                  {show.status}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-8">
                <p className="text-sm text-red-600 font-semibold mb-2">
                  {new Date(show.date).toLocaleDateString()}
                </p>

                <h3 className="text-2xl font-bold text-black mb-3">
                  {show.title}
                </h3>

                {/* 👇 SHORT DESCRIPTION ONLY */}
                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                  {show.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Category: {show.category}
                  </span>

                  <span className="text-red-600 font-semibold">
                    View Details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {selectedShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
          <div className="bg-white max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl relative">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedShow(null)}
              className="absolute top-4 right-4 bg-black text-red-800 w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-black transition z-20"
            >
              X
            </button>

            {/* IMAGE */}
            <div className="relative h-[300px]">
              <img
                src={selectedShow.image}
                alt={selectedShow.title}
                className="w-full h-full object-cover"
              />

              <span className="absolute bottom-4 left-4 bg-red-600 text-white text-xs px-4 py-1 rounded-full uppercase tracking-wide">
                {selectedShow.status}
              </span>
            </div>

            {/* CONTENT */}
            <div className="p-10">
              <p className="text-sm text-red-600 font-semibold mb-2">
                {new Date(selectedShow.date).toLocaleDateString()}
              </p>

              <h2 className="text-3xl font-extrabold text-black mb-4">
                {selectedShow.title}
              </h2>

              <p className="text-gray-700 leading-relaxed mb-8">
                {selectedShow.description}
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <span>
                  <strong className="text-black">Category:</strong>{" "}
                  {selectedShow.category}
                </span>

                <span>
                  <strong className="text-black">Status:</strong>{" "}
                  {selectedShow.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
