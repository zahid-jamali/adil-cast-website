"use client";

import { useState } from "react";
import ModalWrapper from "../podcasts/ModelWrapper";

export default function AddUpcomingShowModal({ onClose }) {
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("image", image);

    await fetch("/api/upcoming-shows", {
      method: "POST",
      body: fd,
    });

    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-bold mb-6">Add Upcoming Show</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Title"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Description"
          required
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Category"
          required
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <input
          type="date"
          required
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <select
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border p-3 rounded"
        >
          <option value="coming soon">Coming Soon</option>
          <option value="scheduled">Scheduled</option>
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
            Add Show
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
