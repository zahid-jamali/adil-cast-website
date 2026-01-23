"use client";

import { useState } from "react";
import ModalWrapper from "../podcasts/ModelWrapper";

export default function AddBlogModal({ onClose }) {
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("coverImage", image);

    await fetch("/api/blogs", {
      method: "POST",
      body: fd,
    });

    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-bold mb-6">Add Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Title"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Category"
          required
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Excerpt (SEO)"
          required
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Content"
          required
          rows={6}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <select
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border p-3 rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded">
            Add Blog
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
