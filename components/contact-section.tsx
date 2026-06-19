"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Youtube, Twitter, Download, LucideIcon } from "lucide-react";
import { useData } from "@/lib/use-data";
import type { SocialPlatform, ContactContent } from "@/content/types";
import contactFallback from "@/content/contact";

const platformIcon: Record<SocialPlatform, LucideIcon> = {
  facebook:  Facebook,
  instagram: Instagram,
  linkedin:  Linkedin,
  whatsapp:  MessageCircle,
  gmail:     Mail,
  twitter:   Twitter,
  youtube:   Youtube,
};

const platformGradient: Record<SocialPlatform, string> = {
  facebook:  "from-blue-500 to-purple-600",
  instagram: "from-pink-500 to-red-500",
  linkedin:  "from-blue-400 to-cyan-500",
  whatsapp:  "from-green-500 to-blue-500",
  gmail:     "from-red-500 to-yellow-500",
  twitter:   "from-sky-400 to-blue-500",
  youtube:   "from-red-600 to-red-400",
};

export function ContactSection() {
  const contactContent = useData<ContactContent>("/api/contact", contactFallback);
  const { sectionTitle, subtitle, email, cvPath, bookMeetingUrl, socials } = contactContent;

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
      <div className="absolute inset-0 bg-[url('/assets/krishna.jpg')] bg-cover bg-top opacity-40 [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_20%,transparent_90%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_20%,transparent_90%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-center mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          {sectionTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12 flex-wrap gap-6"
        >
          {socials.map((social, index) => {
            const Icon = platformIcon[social.platform];
            const gradient = platformGradient[social.platform];
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {social.name}
                </span>
              </motion.a>
            );
          })}
        </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <a
              href={cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </a>
            <a
              href="mailto:arnab.prof.work@gmail.com"
              className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white font-bold text-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Book a Meeting</span>
            </a>
          </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-8 border-t border-gray-800 text-center"
        >
            <p className="text-gray-500 text-sm">
              <span>© 2026 Arnab Samadder. Built with Next.js & Tailwind CSS. Developed by <a href="https://github.com/Grb-47" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">Gourab Mondal</a>.</span>
            </p>
        </motion.div>
      </div>
    </section>
  );
}
