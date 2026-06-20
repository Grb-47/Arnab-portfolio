"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Project, ProjectsContent } from "@/content/types";
import { useData } from "@/lib/use-data";
import projectsFallback from "@/content/projects";

export function ProjectsSection() {
  const projectsContent = useData<ProjectsContent>("/api/projects", projectsFallback);
  const { sectionTitle, items } = projectsContent;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
    <section id="projects" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/project.JPG')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          {sectionTitle}
        </motion.h2>

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
            {items.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-[320px] md:w-[350px] flex-none shrink-0 lg:min-w-0 lg:w-[calc(33.333%-1.334rem)] group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 text-ellipsis overflow-hidden">{project.shortDescription}</p>
                  <div className="flex flex-nowrap gap-2 mb-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium whitespace-nowrap flex-shrink-0"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>View Details</span>
                    <ExternalLink size={16} />
                  </button>
                </div>
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
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {selectedProject.image && (
              <div className="relative w-full h-64 md:h-80 mb-6 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedProject.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
