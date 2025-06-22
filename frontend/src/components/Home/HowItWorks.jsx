import React from "react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "1",
      title: "Paste Your Code",
      description:
        "Simply paste your code and select the programming language. Add context if needed.",
    },
    {
      step: "2",
      title: "Choose Character",
      description:
        "Pick from our collection of unique AI reviewers, each with their own personality and style.",
    },
    {
      step: "3",
      title: "Get Review",
      description:
        "Receive detailed, entertaining feedback with actionable suggestions to improve your code.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How Refract Works
          </h2>
          <p className="text-lg text-gray-400">
            Create your account in minutes with our simple and secure
            registration process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
