import AboutSnapshot from "@/components/AboutSnapshot";
import Hero from "@/components/Hero";
import LatestVideos from "@/components/LatestVideos";
import MediaLogos from "@/components/Medialogos";
import Shows from "@/components/Show";

const Home = () => {
  return (
    <>
      <div className="bg-primary text-text">
        <Hero />
        <LatestVideos />
        <Shows />
        <AboutSnapshot />
        <MediaLogos />
      </div>
    </>
  );
};

export default Home;
