"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setStories(data);
    } catch (error) {
      console.error("Failed to load stories", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    ...new Set(stories.map((story) => story.category)),
  ];

  const filteredStories =
    activeCategory === "All"
      ? stories
      : stories.filter((story) => story.category === activeCategory);

  const featuredStory = stories[0];

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative w-full h-[420px]">
        <Image
          src="/assets/podcastHero.jpg"
          alt="Stories & Articles"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-extrabold text-center">
            Stories & Articles
          </h1>
        </div>
      </section>

      {/* FEATURED */}
      {!loading && featuredStory && (
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl">
              <img
                src={featuredStory.coverImage}
                alt={featuredStory.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <span className="text-red-600 font-semibold uppercase tracking-wide">
                Featured Story
              </span>

              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-black">
                {featuredStory.title}
              </h2>

              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                {featuredStory.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mt-6">
                <span>{featuredStory.category}</span>
                <span>•</span>
                <span>
                  {new Date(featuredStory.createdAt).toLocaleDateString()}
                </span>
              </div>

              <button
                onClick={() => setSelectedStory(featuredStory)}
                className="inline-flex items-center gap-2 mt-8 text-red-600 font-semibold hover:gap-3 transition"
              >
                Read Full Story →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* CATEGORY FILTER */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeCategory === cat
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-red-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500 py-20">Loading stories...</p>
      )}

      {/* EMPTY */}
      {!loading && filteredStories.length === 0 && (
        <p className="text-center text-gray-500 py-20">No stories found.</p>
      )}

      {/* STORIES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredStories.map((story) => (
            <article
              key={story._id}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="p-6">
                <span className="text-sm text-red-600 font-semibold uppercase">
                  {story.category}
                </span>

                <h3 className="text-xl font-bold mt-3 mb-3 line-clamp-2">
                  {story.title}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-6">
                  {story.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(story.createdAt).toLocaleDateString()}</span>

                  <button
                    onClick={() => setSelectedStory(story)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Read →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
            {/* CLOSE */}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-black transition z-10"
            >
              ×
            </button>

            {/* HERO IMAGE */}
            <div className="relative h-[320px]">
              <img
                src={selectedStory.coverImage}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-6 left-6 bg-red-600 text-white text-xs px-4 py-1 rounded-full uppercase tracking-wide">
                {selectedStory.category}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-4 leading-tight">
                {selectedStory.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
                <span>
                  {new Date(selectedStory.createdAt).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>Adil Cast</span>
              </div>

              {/* EXCERPT */}
              {selectedStory.excerpt && (
                <p className="text-lg text-gray-700 font-medium mb-8 leading-relaxed">
                  {selectedStory.excerpt}
                </p>
              )}

              {/* FULL CONTENT */}
              <div className="prose prose-lg max-w-none text-gray-800">
                {selectedStory.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default StoriesPage;
