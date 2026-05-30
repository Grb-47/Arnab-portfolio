import type { HeroContent } from "./types";

const hero: HeroContent = {
  titleLine1: "Welcome to",
  titleLine2: "Arnab's Space",
  subtitle: "Dynamic Youth Leader • Creative Strategist • Emerging Researcher",

  profileImage: "/assets/profile-photo2.png",
  profileImageAlt: "Arnab Samadder",

  logosLabel: "Associated With",
  logos: [
    { src: "/assets/ias.png",         alt: "IAS" },
    { src: "/assets/pstu.png",        alt: "PSTU" },
    { src: "/assets/hult.png",        alt: "Hult Prize" },
    { src: "/assets/youthxlogo.webp", alt: "YouthX" },
    { src: "/assets/wff.png",         alt: "WFF" },
    { src: "/assets/mtr.png",         alt: "MTR" },
    { src: "/assets/opt.png",         alt: "OPT" },
    { src: "/assets/exellence.png",   alt: "Excellence" },
  ],
};

export default hero;
