import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <main className="bg-white min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Contact Form */}
        <div className="bg-gray-50 p-10 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-extrabold text-black mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-8">
            Have a question, feedback, or collaboration idea? Fill out the form
            below, and we’ll get back to you soon!
          </p>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
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
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Your message..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-red-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white font-semibold rounded-full py-3 hover:bg-red-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="flex flex-col justify-center space-y-10">
          <h2 className="text-3xl font-extrabold text-black mb-4">
            Contact Info
          </h2>
          <p className="text-gray-600 mb-6">
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
