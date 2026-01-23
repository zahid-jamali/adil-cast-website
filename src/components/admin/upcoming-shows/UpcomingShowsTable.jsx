"use client";

import { useEffect, useState } from "react";
import AddUpcomingShowModal from "./AddUpcomingShowModal";
import EditUpcomingShowModal from "./EditUpcomingShowModal";
import DeleteUpcomingShowModal from "./DeleteUpcomingShowModal";

export default function UpcomingShowsTable() {
  const [shows, setShows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null); // add | edit | delete

  const fetchShows = async () => {
    const res = await fetch("/api/upcoming-shows");
    const data = await res.json();
    setShows(data);
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">All Upcoming Shows</h2>

        <button
          onClick={() => setModal("add")}
          className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
        >
          + Add Upcoming Show
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {shows.map((show) => (
              <tr key={show._id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={show.image}
                    alt={show.title}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                </td>

                <td className="p-4 font-medium">{show.title}</td>

                <td className="p-4">
                  {new Date(show.date).toLocaleDateString()}
                </td>

                <td className="p-4 text-center space-x-3">
                  <button
                    onClick={() => {
                      setSelected(show);
                      setModal("edit");
                    }}
                    className="text-green-600 font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelected(show);
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

      {/* Modals */}
      {modal === "add" && (
        <AddUpcomingShowModal
          onClose={() => {
            setModal(null);
            fetchShows();
          }}
        />
      )}

      {modal === "edit" && (
        <EditUpcomingShowModal
          show={selected}
          onClose={() => {
            setModal(null);
            fetchShows();
          }}
        />
      )}

      {modal === "delete" && (
        <DeleteUpcomingShowModal
          show={selected}
          onClose={() => {
            setModal(null);
            fetchShows();
          }}
        />
      )}
    </>
  );
}
