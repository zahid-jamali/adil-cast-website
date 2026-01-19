import Image from "next/image";

const shows = [
  {
    id: 1,
    title: "Adil Cast Originals",
    description:
      "Raw, honest conversations with creators, entrepreneurs, and thinkers shaping the future.",
    image: "/shows/show-1.jpg",
  },
  {
    id: 2,
    title: "Midnight Talks",
    description:
      "Deep late-night discussions on life, struggles, success, and the truths people avoid.",
    image: "/shows/show-2.jpg",
  },
  {
    id: 3,
    title: "Voices of Change",
    description:
      "Stories of individuals breaking norms, challenging systems, and inspiring real change.",
    image: "/shows/show-3.jpg",
  },
  {
    id: 4,
    title: "Unfiltered Minds",
    description:
      "Bold opinions, controversial topics, and fearless conversations without censorship.",
    image: "/shows/show-4.jpg",
  },
];

const Shows = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4">
            Our Shows
          </h2>
          <p className="text-gray-600 max-w-2xl text-lg">
            Explore Adil Cast’s exclusive shows, each crafted to deliver
            meaningful stories and powerful conversations.
          </p>
        </div>

        {/* Shows Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {shows.map((show) => (
            <div
              key={show.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition"
            >
              {/* Image */}
              <div className="relative h-56">
                <Image
                  src={show.image}
                  alt={show.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-3">
                  {show.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-6">
                  {show.description}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition"
                >
                  View Episodes
                  <span className="text-lg">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shows;
