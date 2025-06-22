import React from "react";

const FeaturesSection = () => {
  const features = [
    {
      title: "Character-Based Reviews",
      description:
        "Get code reviews from unique AI personalities - from superheroes to detectives!",
    },
    {
      title: "Multiple Languages",
      description:
        "Support for JavaScript, Python, C++, Java, TypeScript, and many more languages.",
    },
    {
      title: "Smart Analysis",
      description:
        "Advanced AI analyzes your code for bugs, performance, and best practices.",
    },
    {
      title: "Review History",
      description:
        "Keep track of all your reviews and see your coding progress over time.",
    },
    {
      title: "Instant Feedback",
      description:
        "Get detailed code reviews in seconds with actionable suggestions.",
    },
    {
      title: "Context Aware",
      description:
        "Provide additional context to get more targeted and relevant feedback.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose Refract?
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Refract offers a powerful suite of features to make code reviews
            more effective and enjoyable.
          </p>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-white">Powerful Features!</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 text-center px-4 sm:px-0 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="width-fit text-left">
              <div className="flex items-center gap-2">
                <div className="text-lg mb-1 font-normal text-white dark:text-gray-900">
                  {feature.title}
                </div>
              </div>
              <div className="font-regular max-w-sm text-md text-gray-500 dark:text-gray-400">
                {feature.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
