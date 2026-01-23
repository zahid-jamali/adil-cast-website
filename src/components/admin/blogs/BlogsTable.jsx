"use client";

import { useEffect, useState } from "react";
import AddBlogModal from "./AddBlogModal";
import EditBlogModal from "./EditBlogModal";
import DeleteBlogModal from "./DeleteBlogModal";

export default function BlogsTable() {
  const [blogs, setBlogs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null); // add | edit | delete

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">All Blogs</h2>

        <button
          onClick={() => setModal("add")}
          className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
        >
          + Add Blog
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Published</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{blog.title}</td>

                <td className="p-4">{blog.category}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      blog.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>

                <td className="p-4">
                  {new Date(blog.publishedAt).toLocaleDateString()}
                </td>

                <td className="p-4 text-center space-x-3">
                  <button
                    onClick={() => {
                      setSelected(blog);
                      setModal("edit");
                    }}
                    className="text-green-600 font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelected(blog);
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
        <AddBlogModal
          onClose={() => {
            setModal(null);
            fetchBlogs();
          }}
        />
      )}

      {modal === "edit" && (
        <EditBlogModal
          blog={selected}
          onClose={() => {
            setModal(null);
            fetchBlogs();
          }}
        />
      )}

      {modal === "delete" && (
        <DeleteBlogModal
          blog={selected}
          onClose={() => {
            setModal(null);
            fetchBlogs();
          }}
        />
      )}
    </>
  );
}
