import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/hero.png" // put image in /public folder
        alt="Adil Cast Podcast"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 text-center text-white">
        {/* <span className="inline-block mb-4 px-4 py-1 rounded-full bg-accent/20 text-accent text-sm tracking-wide">
          🎙️ Adil Cast Podcast
        </span> */}

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Where Real Voices
          <br />
          Tell Real Stories
        </h1>

        <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Unfiltered conversations with creators, entrepreneurs, and thinkers.
          No scripts. No filters. Just pure truth and powerful ideas.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 rounded-full border border-white/40 hover:bg-white hover:text-black transition">
            Become a Guest
          </button>

          <button className="px-8 py-3 rounded-full border border-white/40 hover:bg-white hover:text-black transition">
            Contact us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
