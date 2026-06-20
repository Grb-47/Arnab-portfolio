"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useData } from "@/lib/use-data";
import type { ServicesContent } from "@/content/types";
import servicesFallback from "@/content/services";

type ServiceCategory = "graphics" | "video" | "photography" | "research";

const categories: { id: ServiceCategory; label: string }[] = [
  { id: "graphics",     label: "Graphics Design" },
  { id: "video",        label: "Video Editing" },
  { id: "photography",  label: "Photography" },
  { id: "research",     label: "Research Paper" },
];

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("graphics");
  const servicesContent = useData<ServicesContent>("/api/services", servicesFallback);
  const { sectionTitle, graphics, video, photography, research } = servicesContent;
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
    <section id="services" className="py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          {sectionTitle}
        </motion.h2>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50 scale-105"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative group">
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 hover:bg-black/80 text-white rounded-full p-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div
              ref={scrollRef}
              className="flex flex-nowrap gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {(() => {
                const serviceMap = { graphics, video, photography, research } as const;
                return serviceMap[activeCategory].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="min-w-[320px] md:min-w-[350px] shrink-0 lg:min-w-0 lg:w-[calc(33.333%-1.334rem)] bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                      <ImageWithFallback src={service.image} alt={service.title} fill className="object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-400 mb-4" dangerouslySetInnerHTML={{ __html: service.description }} />
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                    >
                      <span>View Sample</span>
                      <ExternalLink size={16} />
                    </a>
                  </motion.div>
                ));
              })()}
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 hover:bg-black/80 text-white rounded-full p-2"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
