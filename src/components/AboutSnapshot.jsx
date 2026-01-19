import Image from "next/image";

const AboutSnapshot = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Image */}
        <div className="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/assets/ceo.png" // put image in /public/about
            alt="About Adil Cast"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
            🎙️ About Adil Cast
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-6">
            Conversations That Go
            <span className="text-red-600"> Beyond the Surface</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl">
            Adil Cast is more than just a podcast — it’s a platform for honest
            conversations, unheard stories, and voices that challenge the norm.
            Built to inspire, educate, and spark real change.
          </p>

          {/* Achievements */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            <div>
              <h3 className="text-3xl font-extrabold text-black">150+</h3>
              <p className="text-gray-500 text-sm">Episodes</p>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-black">100K+</h3>
              <p className="text-gray-500 text-sm">Monthly Views</p>
            </div>
            <div>
              <h3 className="text-3xl font-extrabold text-black">200+</h3>
              <p className="text-gray-500 text-sm">Guests Hosted</p>
            </div>
          </div>

          {/* CTA */}
          <a
            href="/about"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-semibold hover:bg-red-600 transition"
          >
            Read Full Story
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
