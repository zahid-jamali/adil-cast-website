"use client";

import { useEffect, useState } from "react";
import ViewPodcastModal from "./ViewPodcastModel";
import EditPodcastModal from "./EditPodcastModel";
import DeletePodcastModal from "./DeletePodcastModel";
import AddPodcastModal from "./AddPodcastModal";

export default function PodcastsTable() {
  const [podcasts, setPodcasts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null); // view | edit | delete

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    const res = await fetch("/api/podcasts");
    const data = await res.json();
    setPodcasts(data);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <button
          onClick={() => setModal("add")}
          className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
        >
          + Add Podcast
        </button>
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Published</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {podcasts.map((podcast) => (
              <tr key={podcast._id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{podcast.title}</td>

                <td className="p-4 text-gray-600 line-clamp-2">
                  {podcast.description}
                </td>

                <td className="p-4">
                  {new Date(podcast.publishedAt).toLocaleDateString()}
                </td>

                <td className="p-4 text-center space-x-3">
                  <button
                    onClick={() => {
                      setSelected(podcast);
                      setModal("view");
                    }}
                    className="text-blue-600 font-semibold"
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      setSelected(podcast);
                      setModal("edit");
                    }}
                    className="text-green-600 font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelected(podcast);
                      setModal("delete");
                    }}
                    className="text-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {modal === "view" && (
        <ViewPodcastModal podcast={selected} onClose={() => setModal(null)} />
      )}

      {modal === "edit" && (
        <EditPodcastModal
          podcast={selected}
          onClose={() => {
            setModal(null);
            fetchPodcasts();
          }}
        />
      )}

      {modal === "delete" && (
        <DeletePodcastModal
          podcast={selected}
          onClose={() => {
            setModal(null);
            fetchPodcasts();
          }}
        />
      )}

      {modal === "add" && (
        <AddPodcastModal
          onClose={() => {
            setModal(null);
            fetchPodcasts();
          }}
        />
      )}
    </>
  );
}
