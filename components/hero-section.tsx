"use client";

import React from "react";
import { motion } from "framer-motion";
import { Spotlight } from "./ui/spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { useData } from "@/lib/use-data";
import type { HeroContent } from "@/content/types";
import { Download, Calendar } from "lucide-react";
import heroFallback from "@/content/hero";
import siteLinks from "@/content/links";

export function HeroSection() {
  const hero = useData<HeroContent>("/api/hero", heroFallback);
  const { titleLine1, titleLine2, subtitle, profileImage, profileImageAlt, logosLabel, logos } = hero;
  return (
    <div id="home" className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black pt-16">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
          style={{
            filter: "brightness(0.4) contrast(1.2)",
          }}
        >
          <source src="/videos/background.MP4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
      </div>

      {/* Spotlight Effects */}
      <Spotlight className="absolute -top-40 left-0 md:left-60 md:-top-20 hidden md:block" fill="purple" />
      <Spotlight className="absolute top-10 left-full h-[80vh] w-[50vw] hidden lg:block" fill="blue" />

      {/* Floating Profile Images - Desktop Only */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute right-[2%] top-1/2 -translate-y-1/2 z-10 hidden xl:block"
      >
        <div className="relative">
          <ImageWithFallback
            src={profileImage}
            alt={profileImageAlt}
            width={500}
            height={500}
            className="object-contain"
            style={{
              filter: `
                drop-shadow(0 0 10px rgba(138, 43, 226, 0.4))
                drop-shadow(0 0 20px rgba(138, 43, 226, 0.3))
                drop-shadow(0 0 30px rgba(138, 43, 226, 0.2))
              `,
            }}
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center space-y-8 xl:pr-[15%]">
        {/* Title with Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-purple-400 bg-clip-text text-transparent leading-tight">
            {titleLine1}
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse leading-tight">
            {titleLine2}
          </h1>
        </motion.div>

        {/* Subtitle with Text Generate Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full px-4 lg:max-w-4xl"
        >
          <TextGenerateEffect
            words={subtitle}
            className="text-sm sm:text-lg md:text-2xl lg:text-3xl text-gray-300 font-medium"
            breakAfterIndex={6}
          />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex justify-center"
          >
            <a
              href={siteLinks.bookMeetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-blue-800 to-blue-500 animate-gradient background-size-[200%_auto] border-0 text-white font-bold text-base hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book a Meeting</span>
            </a>
          </motion.div>

          {/* Mobile Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="xl:hidden relative mt-8"
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto">
            <ImageWithFallback
              src={profileImage}
              alt={profileImageAlt}
              width={320}
              height={320}
              className="object-contain"
              style={{
                filter: `
                  drop-shadow(0 0 10px rgba(138, 43, 226, 0.6))
                  drop-shadow(0 0 20px rgba(138, 43, 226, 0.4))
                `,
              }}
            />
          </div>
        </motion.div>

        {/* Organization Logos Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-full mt-16"
        >
          <h3 className="text-gray-400 text-xs sm:text-sm md:text-base font-medium mb-8 uppercase tracking-wider">
            {logosLabel}
          </h3>
          <InfiniteMovingCards items={logos} speed="slow" />
        </motion.div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-purple-500 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-purple-500 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
