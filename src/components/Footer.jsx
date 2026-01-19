import { Youtube, Instagram, X } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0B1C2D] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* About */}
          <div className="max-w-md">
            <h3 className="text-xl font-bold mb-4">Adil Cast</h3>
            <p className="text-gray-300 leading-relaxed">
              Adil Cast is a Pakistani podcast platform delivering honest
              conversations, impactful stories, and voices that challenge the
              narrative.
            </p>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-red-600 transition"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-white hover:text-black transition"
                aria-label="X"
              >
                <X size={20} />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-pink-600 transition"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10"></div>

        {/* Bottom */}
        <div className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Adil Cast. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
