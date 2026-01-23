"use client";

import { useState } from "react";
import ModalWrapper from "../podcasts/ModelWrapper";

export default function EditUpcomingShowModal({ show, onClose }) {
  const [form, setForm] = useState(show);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append("image", image);

    await fetch(`/api/upcoming-shows/${show._id}`, {
      method: "PUT",
      body: fd,
    });

    onClose();
  };

  return (
    <ModalWrapper onClose={onClose}>
      <h2 className="text-xl font-bold mb-6">Edit Upcoming Show</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-3 rounded"
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
        />

        <input
          type="date"
          value={form.date?.slice(0, 10)}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border p-3 rounded"
        >
          <option value="coming soon">Coming Soon</option>
          <option value="scheduled">Scheduled</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded">
            Save Changes
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}
