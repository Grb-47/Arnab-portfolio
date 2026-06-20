"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useData } from "@/lib/use-data";
import type { AboutContent } from "@/content/types";
import aboutFallback from "@/content/about";

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<"organizations" | "education">("organizations");
  const about = useData<AboutContent>("/api/about", aboutFallback);
  const { sectionTitle, intro, photo, photoAlt, organizations, education, bio } = about;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    el.scrollBy({ left: -(card.offsetWidth + gap), behavior: "smooth" });
  };

  const scrollRight = () => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(el).gap) || 0;
    el.scrollBy({ left: card.offsetWidth + gap, behavior: "smooth" });
  };

  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          {sectionTitle}
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {intro}
            </p>

            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("organizations")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === "organizations"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                Organizations
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === "education"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                Education
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <ImageWithFallback
                src={photo}
                alt={photoAlt}
                width={600}
                height={600}
                className="w-full h-auto object-cover rounded-2xl"
                style={{
                  maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-16"
        >
          {activeTab === "organizations" ? (
            <div className="relative group">
              <button
                onClick={scrollLeft}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 hover:bg-black/80 text-white rounded-full p-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div
                ref={scrollRef}
                className="flex flex-nowrap gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {organizations.map((org, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="min-w-[300px] lg:min-w-0 lg:w-[calc(33.333%-1rem)] bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="h-16 w-16 mb-4 relative">
                      <ImageWithFallback src={org.logo} alt={org.name} width={64} height={64} className="object-contain" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{org.name}</h3>
                    <div className="space-y-1 mb-4">
                      {org.designations.map((desig, i) => (
                        <p key={i} className="text-sm text-gray-400">
                          <strong className="text-purple-400">• </strong>{desig.title}
                          <span className="text-gray-500 ml-2">({desig.year})</span>
                        </p>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{org.description}</p>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={scrollRight}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 hover:bg-black/80 text-white rounded-full p-2"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                    <span className="text-sm text-gray-400">{edu.year}</span>
                  </div>
                  <p className="text-purple-400 font-medium">{edu.degree}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto space-y-6"
        >
          <p className="text-base md:text-lg text-gray-300 leading-relaxed whitespace-pre-wrap">
            {bio}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
