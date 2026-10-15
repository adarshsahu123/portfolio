import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import HoloSection from "@/components/world/HoloSection";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1 overflow-x-clip">
        <Hero />
        <Marquee />
        {[About, Skills, Experience, Projects, Journey, Education, Contact].map((Section) => (
          <HoloSection key={Section.name}>
            <Section />
          </HoloSection>
        ))}
      </main>
    </>
  );
}
