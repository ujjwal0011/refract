import React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      handle: "@sarahdev",
      avatar: "SC",
      content:
        "Refract has completely transformed how I approach code reviews. The AI characters make feedback so much more engaging and memorable!",
      color: "from-pink-500 to-purple-500",
    },
    {
      name: "Mike Rodriguez",
      handle: "@mikebuilds",
      avatar: "MR",
      content:
        "The character-based reviews are genius! Getting feedback from a detective persona helped me spot bugs I would have missed.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Alex Kim",
      handle: "@alexcodes",
      avatar: "AK",
      content:
        "Love how Refract makes code reviews fun while still being incredibly thorough. The multi-language support is fantastic too.",
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Emma Wilson",
      handle: "@emmawrites",
      avatar: "EW",
      content:
        "The review history feature is amazing for tracking my progress. I can see how my coding style has improved over time.",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "David Park",
      handle: "@davidcodes",
      avatar: "DP",
      content:
        "The instant feedback is incredible. I get detailed reviews in seconds that would take hours from human reviewers.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "Lisa Zhang",
      handle: "@lisadev",
      avatar: "LZ",
      content:
        "Context-aware suggestions have improved my code quality significantly. Refract understands exactly what I'm trying to achieve.",
      color: "from-teal-500 to-green-500",
    },
  ];

  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  const TestimonialCard = ({ testimonial }) => {
    return (
      <figure
        className={cn(
          "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6",
          // Dark theme styles
          "border-gray-800 bg-gray-900 hover:bg-gray-800/80"
        )}
      >
        <div className="flex items-center mb-4">
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-sm mr-3`}
          >
            {testimonial.avatar}
          </div>
          <div className="flex flex-col">
            <figcaption className="text-white font-semibold">
              {testimonial.name}
            </figcaption>
            <p className="text-gray-400 text-sm">{testimonial.handle}</p>
          </div>
        </div>
        <blockquote className="text-gray-300 text-sm leading-relaxed">
          {testimonial.content}
        </blockquote>
      </figure>
    );
  };

  return (
    <section className="py-20 px-6 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            See Refract in Action
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore a live demo to understand how Refract can transform your
            code review collection and presentation.
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:30s]">
            {firstRow.map((testimonial, index) => (
              <TestimonialCard
                key={`first-${index}`}
                testimonial={testimonial}
              />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:30s]" delay={1}>
            {secondRow.map((testimonial, index) => (
              <TestimonialCard
                key={`second-${index}`}
                testimonial={testimonial}
              />
            ))}
          </Marquee>

          {/* Gradient overlays for smooth fade effect */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
