"use client";

import { useState } from "react";
import Image from "next/image";

// Dummy data for shows
const showsData = [
  {
    id: 1,
    category: "Originals",
    title: "Adil Cast Originals",
    description:
      "Raw, honest conversations with creators and thinkers shaping the future.",
    image: "https://picsum.photos/seed/picsum/400/400",
  },
  {
    id: 2,
    category: "Originals",
    title: "Midnight Talks",
    description:
      "Late-night discussions on life, struggles, and success stories.",
    image: "https://picsum.photos/seed/picsum/400/400",
  },
  {
    id: 3,
    category: "Interviews",
    title: "Voices of Change",
    description:
      "Individuals breaking norms, challenging systems, inspiring real change.",
    image: "https://picsum.photos/seed/picsum/400/400",
  },
  {
    id: 4,
    category: "Interviews",
    title: "Unfiltered Minds",
    description:
      "Bold opinions, controversial topics, and fearless conversations.",
    image: "https://picsum.photos/seed/picsum/400/400",
  },
  {
    id: 5,
    category: "Special",
    title: "The Extra Mile",
    description: "Deep-dive stories from creators going above and beyond.",
    image: "https://picsum.photos/seed/picsum/400/400",
  },
];

const categories = ["All", "Originals", "Interviews", "Special"];

const ShowsPage = () => {
  const [activeTab, setActiveTab] = useState("All");

  // Filter shows based on active tab
  const filteredShows =
    activeTab === "All"
      ? showsData
      : showsData.filter((show) => show.category === activeTab);

  return (
    <main className="bg-white min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black">
            Our Shows
          </h1>
          <p className="text-gray-600 mt-2">
            Explore all Adil Cast shows by category
          </p>
        </div>

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

        {/* Shows Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredShows.map((show) => (
            <div
              key={show.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition"
            >
              {/* Show Image */}
              <div className="relative h-64">
                <img
                  src={show.image}
                  alt={show.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>

              {/* Show Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-black">
                  {show.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {show.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition"
                >
                  View Episodes
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ShowsPage;
