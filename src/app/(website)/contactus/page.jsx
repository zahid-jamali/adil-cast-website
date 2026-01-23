"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Message sent successfully. We’ll get back to you soon!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen">
      {/* HERO */}
      <section className="relative w-full h-[400px]">
        <Image
          src="/assets/podcastHero.jpg"
          alt="Podcast Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-extrabold text-center">
            Reach Us
          </h1>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT: FORM */}
        <div className="bg-gray-50 p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-extrabold text-black mb-6">
            Get in Touch
          </h2>

          <p className="text-gray-600 mb-8">
            Have a question, feedback, or collaboration idea? Fill out the form
            below, and we’ll get back to you soon.
          </p>

          {/* Alerts */}
          {success && (
            <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-700">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-100 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Your message..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-red-600 text-white font-semibold rounded-full py-3 hover:bg-red-700 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* RIGHT: INFO */}
        <div className="flex flex-col justify-center space-y-10">
          <h2 className="text-3xl font-extrabold text-black">Contact Info</h2>

          <p className="text-gray-600">
            Prefer reaching out directly? Here’s how you can contact Adil Cast.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="text-red-600" />
              <span className="text-gray-700">contact@adilcast.com</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-red-600" />
              <span className="text-gray-700">+92 300 1234567</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-red-600" />
              <span className="text-gray-700">Karachi, Sindh, Pakistan</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
