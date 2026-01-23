"use client";

import { useEffect, useState } from "react";
import ViewContactModal from "./ViewContactModal";
import DeleteContactModal from "./DeleteContactModal";

export default function ContactTable() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null); // view | delete

  const fetchMessages = async () => {
    const res = await fetch("/api/contact");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleRead = async (msg) => {
    await fetch(`/api/contact/${msg._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: !msg.isRead }),
    });
    fetchMessages();
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => (
              <tr
                key={msg._id}
                className={`border-t hover:bg-gray-50 ${
                  !msg.isRead ? "bg-red-50" : ""
                }`}
              >
                <td className="p-4 font-medium">{msg.name}</td>
                <td className="p-4">{msg.email}</td>
                <td className="p-4">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      msg.isRead
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {msg.isRead ? "Read" : "Unread"}
                  </span>
                </td>

                <td className="p-4 text-center space-x-3">
                  <button
                    onClick={() => {
                      setSelected(msg);
                      setModal("view");
                    }}
                    className="text-blue-600 font-semibold"
                  >
                    View
                  </button>

                  <button
                    onClick={() => toggleRead(msg)}
                    className="text-indigo-600 font-semibold"
                  >
                    {msg.isRead ? "Unread" : "Read"}
                  </button>

                  <button
                    onClick={() => {
                      setSelected(msg);
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
      {modal === "view" && (
        <ViewContactModal
          message={selected}
          onClose={() => {
            setModal(null);
            fetchMessages();
          }}
        />
      )}

      {modal === "delete" && (
        <DeleteContactModal
          message={selected}
          onClose={() => {
            setModal(null);
            fetchMessages();
          }}
        />
      )}
    </>
  );
}
