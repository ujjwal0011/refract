import React from "react";
import { useNavigate } from "react-router-dom";
import { Spotlight } from "../ui/spotlight";
import { Meteors } from "../ui/meteors";
import { cn } from "../../lib/utils";
import { Sparkles, ArrowRight, Star, Github } from "lucide-react";

const HeroSection = ({ user }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/ujjwal0011/refract", "_blank");
  };

  return (
    <>
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10" />

        <Meteors number={20} />

        {/* Grid pattern */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
            "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
          )}
        />

        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center mt-10">
          <div className="mb-8 bg-gray-900 text-gray-300 border-gray-700 inline-flex items-center px-3 py-1 rounded-full text-sm">
            <Sparkles className="mr-2 w-4 h-4" />
            Discover Intelligent Code Reviews
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight">
            <span className="text-white">Transform Code Reviews</span>
            <br />
            <span className="text-gray-400">with AI-Powered Analysis</span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            {user
              ? "Welcome back! Continue refining your code with insights from our character-driven AI reviewers, designed to make feedback more engaging and effective."
              : "Elevate your coding experience with AI reviewers that embody distinct personalities—offering expert analysis, unique perspectives, and actionable feedback."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <>
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="group relative px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-800 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  <span className="relative z-10">Go to Dashboard</span>
                </button>
                <button
                  onClick={handleGitHubClick}
                  className="group relative px-8 py-3 text-lg font-medium text-gray-300 bg-transparent border-2 border-gray-600 rounded-lg overflow-hidden transition-all duration-300 hover:border-yellow-500 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center">
                    <Star className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    Star on GitHub
                  </span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("/login")}
                  className="group relative px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                  <span className="relative z-10 flex items-center">
                    Get Started Now
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>
                <button
                  onClick={handleGitHubClick}
                  className="group relative px-8 py-3 text-lg font-medium text-gray-300 bg-transparent border-2 border-gray-600 rounded-lg overflow-hidden transition-all duration-300 hover:border-yellow-500 hover:text-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center">
                    <Star className="mr-2 w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                    Star on GitHub
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes spotlight {
          0% {
            opacity: 0;
            transform: translate(-72%, -62%) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -40%) scale(1);
          }
        }

        .animate-spotlight {
          animation: spotlight 2s ease 0.75s 1 forwards;
        }
      `}</style>
    </>
  );
};

export default HeroSection;
