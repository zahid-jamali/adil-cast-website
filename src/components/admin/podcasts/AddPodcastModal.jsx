"use client";

import { useState } from "react";
// import ModalWrapper from "./ModalWrapper";
import ModalWrapper from "./ModelWrapper";

export default function AddPodcastModal({ onClose }) {
  const [form, setForm] = useState({
    title: "",
    youtubeId: "",
    type: "podcast",
    description: "",
    duration: "",
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/podcasts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        duration: Number(form.duration),
      }),
    });

    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-bold mb-6">Add New Podcast</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          name="title"
          required
          placeholder="Podcast Title"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* YouTube ID */}
        <input
          name="youtubeId"
          required
          placeholder="YouTube Video ID"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Type */}
        <select
          name="type"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="podcast">Podcast</option>
          <option value="show">Show</option>
          <option value="clip">Clip</option>
        </select>

        {/* Duration */}
        <input
          type="number"
          name="duration"
          required
          placeholder="Duration (seconds)"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Featured */}
        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" onChange={handleChange} />
          Featured Podcast
        </label>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="border px-6 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded"
          >
            Add Podcast
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
