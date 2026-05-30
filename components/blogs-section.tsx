"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { FileText, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost, BlogsContent } from "@/content/types";
import { useData } from "@/lib/use-data";
import blogsFallback from "@/content/blogs";

export function BlogsSection() {
  const blogsContent = useData<BlogsContent>("/api/blogs", blogsFallback);
  const { sectionTitle, posts } = blogsContent;
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  return (
    <section id="blogs" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/assets/blog.JPG')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />

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
            className="flex flex-nowrap gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {posts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-[320px] md:w-[350px] flex-none shrink-0 group/card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback src={post.image} alt={post.title} fill className="object-cover group-hover/card:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-purple-500/80 text-white text-xs font-medium backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 text-ellipsis overflow-hidden">{post.shortDescription}</p>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <FileText size={16} />
                    <span>Read More</span>
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
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {selectedPost.image && (
              <div className="relative w-full h-64 md:h-80 mb-6 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <p className="text-purple-400 text-sm font-medium mb-2">{selectedPost.category}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{selectedPost.title}</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedPost.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
