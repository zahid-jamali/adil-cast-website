import Image from "next/image";

const logos = [
  { name: "Roz News", src: "/assets/roz.png" },
  { name: "Youtube", src: "/assets/youtube.jpg" },
  { name: "Pakistan Telecommunication Authority", src: "/assets/pta.png" },
  { name: "Pakistan Jounalists Authority", src: "/assets/pja.png" },
];

const MediaLogos = () => {
  return (
    <section className="bg-white py-20 border-t">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-14">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
            Platforms & Media Presence
          </h3>
          <p className="text-gray-500 mt-2">
            Where Adil Cast conversations reach audiences
          </p>
        </div>

        {/* Logos */}
        <div className="  flex flex-row flex-wrap content-center justify-center  ">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex justify-center items-center  hover:grayscale-0 transition duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaLogos;
