"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "What exactly is HiFun?",
      answer:
        "HiFun is a premium social challenge platform where you can compete in real challenges, submit video performances, and rank globally with Gen Z players around the world.",
    },
    {
      question: "Is HiFun free or paid?",
      answer: "Yes, HiFun is free to use.",
    },
    {
      question: "How do I join a challenge?",
      answer:
        "Browse challenges in the app and tap on any challenge to participate.",
    },
    {
      question: "Is HiFun available on iOS and Android?",
      answer: "Yes, HiFun is available on both platforms.",
    },
    {
      question: "Do I need friends to use HiFun?",
      answer: "No, you can join challenges with other users on the platform.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 px-6 bg-[#0C0E12] relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-roboto)]">
            <span className="text-white block mb-2">Common questions</span>
            <span className="bg-[linear-gradient(105deg,#FFB300_0%,#7B5EED_100%)] text-transparent bg-clip-text">
              about us
            </span>
          </h2>
        </div>

        <div
          className="relative rounded-[40px] p-8 md:p-12 lg:p-14 overflow-hidden border border-[#2B303B80]"
          style={{
            backgroundImage: "url('/about.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay to ensure readability and match the dark theme */}
          <div className="absolute inset-0 bg-black/95 -z-10"></div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#2B303B80] bg-[#1A1D21]/90 backdrop-blur-sm overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left group"
                >
                  <span className="text-lg md:text-[20px] font-bold text-white font-[family-name:var(--font-roboto)]">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  )}
                </button>

                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-40 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-slate-400 text-[16px] leading-relaxed font-[family-name:var(--font-inter)] font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
