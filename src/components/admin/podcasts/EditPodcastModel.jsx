"use client";

import { useState } from "react";
// import ModalWrapper from "./ModalWrapper";
import ModalWrapper from "./ModelWrapper";
export default function EditPodcastModal({ podcast, onClose }) {
  const [form, setForm] = useState({
    title: podcast.title,
    description: podcast.description,
    featured: podcast.featured,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/podcasts/${podcast._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-bold mb-6">Edit Podcast</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-3 rounded"
          placeholder="Title"
        />

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="w-full border p-3 rounded"
          placeholder="Description"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) =>
              setForm({
                ...form,
                featured: e.target.checked,
              })
            }
          />
          Featured
        </label>

        <button className="bg-red-600 text-white px-6 py-2 rounded">
          Save Changes
        </button>
      </form>
    </ModalWrapper>
  );
}
