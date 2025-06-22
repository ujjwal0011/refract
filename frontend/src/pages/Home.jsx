import React from "react";
import { useAuth } from "../context/AuthContext";
import HeroSection from "../components/Home/Hero";
import FeaturesSection from "../components/Home/Features";
import HowItWorksSection from "../components/Home/HowItWorks";
import TestimonialsSection from "../components/Home/Testimonials";
import FAQSection from "../components/Home/Faq";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection user={user} />
      <FeaturesSection />
      {!user && <HowItWorksSection />}
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default HomePage;
