import About from "./components/ui/About";
import Features from "./components/ui/Features";
import Footer from "./components/ui/Footer";
import Hero from "./components/ui/Hero";
import Navbar from "./components/ui/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
      </main>
      <Footer />
    </>
  );
}