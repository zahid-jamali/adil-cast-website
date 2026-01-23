"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const UpcomingShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingShows();
  }, []);

  const fetchUpcomingShows = async () => {
    try {
      const res = await fetch("/api/upcoming-shows");
      const data = await res.json();

      // show only latest 4 for homepage
      setShows(data.slice(0, 4));
    } catch (error) {
      console.error("Failed to load upcoming shows", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mb-20">
          <span className="text-red-600 font-semibold uppercase tracking-wide">
            What’s Next
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-black">
            Upcoming Shows
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Powerful conversations and exclusive stories coming soon on Adil
            Cast. Stay ahead — these episodes are worth the wait.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-500 text-center">Loading upcoming shows...</p>
        )}

        {/* EMPTY */}
        {!loading && shows.length === 0 && (
          <p className="text-gray-500 text-center">
            No upcoming shows announced yet.
          </p>
        )}

        {/* SHOWS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {shows.map((show) => (
            <article
              key={show._id}
              className="group border border-gray-200 rounded-3xl overflow-hidden bg-white hover:shadow-2xl transition"
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={show.image}
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                {/* STATUS */}
                <span className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full capitalize">
                  {show.status}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                <p className="text-sm text-red-600 font-semibold mb-2">
                  {new Date(show.date).toLocaleDateString()}
                </p>

                <h3 className="text-lg font-bold text-black mb-3 line-clamp-2">
                  {show.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-6">
                  {show.description}
                </p>

                <a
                  href="/upcoming-shows"
                  className="inline-flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition"
                >
                  View Details
                  <span className="text-lg">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        {!loading && shows.length > 0 && (
          <div className="mt-20 text-center">
            <a
              href="/shows"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              View All Upcoming Shows
              <span className="text-lg">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingShows;
