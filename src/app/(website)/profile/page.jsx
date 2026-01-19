import Image from "next/image";
import { Calendar } from "lucide-react";

const careerTimeline = [
  {
    year: "2015",
    role: "Started Journalism Career",
    description:
      "Joined local newspaper as a junior reporter, covering community events and political news.",
  },
  {
    year: "2018",
    role: "Television Reporter",
    description:
      "Worked with ARY News, reporting on national affairs and investigative journalism.",
  },
  {
    year: "2020",
    role: "Podcast Host",
    description:
      "Launched Adil Cast to provide a platform for unfiltered conversations and stories.",
  },
  {
    year: "2023",
    role: "National Recognition",
    description:
      "Featured on major media platforms and recognized for impactful journalism.",
  },
];

const AboutPage = () => {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[500px]">
        <Image
          src="/assets/ceo.png"
          alt="Adil Cast Hero"
          fill
          className="object-none "
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-extrabold text-center">
            About <span className="text-red-600">Adil Cast</span>
          </h1>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Bio & Quote */}
        <div className="space-y-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black">
            Who We Are
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Adil Cast is a platform dedicated to honest conversations and
            stories that matter. Founded to highlight voices often unheard, we
            believe journalism should be transparent, impactful, and
            thought-provoking.
          </p>

          {/* Quote Block */}
          <blockquote className="border-l-4 border-red-600 pl-6 italic text-gray-800 text-lg">
            “Journalism is not just about reporting facts, it’s about giving a
            voice to the voiceless and inspiring change.” – Adil Cast
          </blockquote>
        </div>

        {/* Right: Timeline */}
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-10">
            Career Timeline
          </h2>

          <div className="border-l-2 border-gray-200 ml-4 relative">
            {careerTimeline.map((item, index) => (
              <div key={index} className="mb-12 relative pl-8">
                {/* Circle */}
                <div className="absolute -left-4 top-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                  <Calendar size={16} />
                </div>

                <h3 className="text-xl font-semibold text-black">
                  {item.year} – {item.role}
                </h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
