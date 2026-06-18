import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import CoachSection from "@/components/sections/CoachSection";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <CoachSection />
      <BeforeAfter />
      <Testimonials />
    </>
  );
}
