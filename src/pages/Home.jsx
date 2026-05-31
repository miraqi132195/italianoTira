import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Gallery from "../components/Gallery";
import OpeningHours from "../components/OpeningHours";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BottomActionBar from "../components/BottomActionBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-24 md:pb-0">
        <Hero />
        <About />
        <Gallery />
        <OpeningHours />
        <Contact />
      </main>
      <Footer />
      <BottomActionBar />
    </>
  );
}
