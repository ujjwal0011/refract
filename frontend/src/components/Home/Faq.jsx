import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is Refract?",
      answer:
        "Refract is an AI-powered code review platform that uses unique character personalities to provide engaging, thorough, and entertaining code feedback across multiple programming languages.",
    },
    {
      question: "How can Refract improve my code review process?",
      answer:
        "Refract makes code reviews more engaging through character-based AI reviewers, provides instant feedback, supports multiple languages, and maintains a comprehensive review history to track your progress.",
    },
    {
      question: "What are the key features of Refract?",
      answer:
        "Key features include character-based AI reviews, multi-language support, smart analysis for bugs and performance, instant feedback, review history tracking, and context-aware suggestions.",
    },
    {
      question: "How secure is the code I submit to Refract?",
      answer:
        "We take security seriously. All code submissions are encrypted, processed securely, and we never store your code permanently. Your intellectual property remains completely private.",
    },
    {
      question: "Can I export my review data?",
      answer:
        "Yes! You can export all your review history and feedback data at any time. We believe in giving you full control over your data.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">FAQ's</h2>
          <p className="text-lg text-gray-400">
            Some common FAQ's about Refract
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="space-y-4 cursor-pointer"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-800 data-[state=open]:border-blue-400/50 cursor-pointer"
            >
              <AccordionTrigger className="w-full py-6 text-left hover:text-blue-400 transition-all duration-300 hover:no-underline cursor-pointer">
                <span className="text-lg font-medium text-white">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
