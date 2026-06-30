import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CreatorGrid from "@/components/CreatorGrid";
import LiveSection from "@/components/LiveSection";
import TrendingSection from "@/components/TrendingSection";

import Footer from "@/components/Footer";
import WhySubscribe from "@/components/WhySubscribe";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-yellow-400 selection:text-black">
      <Navbar />

      <main>
        <Hero />

        <TrendingSection />

        <CreatorGrid />

        <LiveSection />

        <WhySubscribe />

        <PricingSection />

        <Testimonials />

        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
