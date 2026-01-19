import Image from "next/image";

const videos = [
  {
    id: 1,
    title: "From Zero to Founder – Real Struggles Behind Success",
    thumbnail: "/videos/video1.jpg",
    duration: "42 min",
  },
  {
    id: 2,
    title: "The Truth About Consistency No One Talks About",
    thumbnail: "/videos/video2.jpg",
    duration: "38 min",
  },
  {
    id: 3,
    title: "Money, Mindset & Mistakes – Hard Lessons",
    thumbnail: "/videos/video3.jpg",
    duration: "45 min",
  },
];

const LatestVideos = () => {
  return (
    <section className="w-full bg-background py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <span className="inline-block mb-3 px-4 py-1 rounded-full bg-accent/10 text-accent text-sm tracking-wide uppercase">
            Latest Episodes
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-text mb-4">
            Fresh Conversations from
            <span className="text-accent"> Adil Cast</span>
          </h2>

          <p className="text-muted max-w-2xl mx-auto">
            Watch our most recent episodes featuring honest stories, valuable
            lessons, and unfiltered conversations.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition"></div>

                {/* Duration */}
                <span className="absolute bottom-3 right-3 bg-primary text-background text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text mb-3 group-hover:text-accent transition">
                  {video.title}
                </h3>

                <button className="inline-flex items-center gap-2 text-accent font-medium hover:text-gold transition">
                  ▶ Watch Episode
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <button
            className="px-10 py-3 rounded-full bg-primary text-background font-semibold 
            hover:bg-gold hover:text-primary transition-all duration-300"
          >
            View All Episodes
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestVideos;
