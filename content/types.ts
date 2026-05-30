// ─────────────────────────────────────────────────────────────────────────────
// Shared TypeScript types for all portfolio content files.
// Import these in any content file to get full type-checking.
// ─────────────────────────────────────────────────────────────────────────────

export interface Logo {
  src: string;
  alt: string;
}

export interface HeroContent {
  /** Line 1 of the hero headline */
  titleLine1: string;
  /** Line 2 of the hero headline (larger, animated) */
  titleLine2: string;
  /** Animated subtitle below the title */
  subtitle: string;
  /** Main profile image shown on large desktops (right side) */
  profileImage: string;
  /** Alt text for the profile image */
  profileImageAlt: string;
  /** Label above the logo carousel */
  logosLabel: string;
  /** Organization logos shown in the infinite carousel */
  logos: Logo[];
}

// ─── About ───────────────────────────────────────────────────────────────────

export interface Designation {
  title: string;
  year: string;
}

export interface Organization {
  name: string;
  /** Path to logo image, e.g. "/assets/pstu.png" */
  logo: string;
  designations: Designation[];
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface AboutContent {
  sectionTitle: string;
  intro: string;
  /** Photo shown next to the tab panel */
  photo: string;
  photoAlt: string;
  organizations: Organization[];
  education: Education[];
  /** Single biography text — use \n\n for paragraph breaks */
  bio: string;
}

// ─── Services ────────────────────────────────────────────────────────────────

export interface ServiceItem {
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface ServicesContent {
  sectionTitle: string;
  graphics: ServiceItem[];
  video: ServiceItem[];
  photography: ServiceItem[];
  research: ServiceItem[];
}

// ─── Recent Works ─────────────────────────────────────────────────────────────

export interface RecentWork {
  image: string;
  thumbnail: string;
  category: string;
  title: string;
  description: string;
}

export interface RecentWorksContent {
  sectionTitle: string;
  items: RecentWork[];
}

// ─── Projects ────────────────────────────────────────────────────────────────

export interface Project {
  image: string;
  shortDescription: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProjectsContent {
  sectionTitle: string;
  items: Project[];
}

// ─── Research ────────────────────────────────────────────────────────────────

export interface ResearchItem {
  image: string;
  thumbnail: string;
  category: string;
  title: string;
  shortDescription: string;
  description: string;
}

export interface ResearchContent {
  sectionTitle: string;
  ongoing: ResearchItem[];
  published: ResearchItem[];
  proposal: ResearchItem[];
}

// ─── Blogs ───────────────────────────────────────────────────────────────────

export interface BlogPost {
  image: string;
  thumbnail: string;
  category: string;
  title: string;
  shortDescription: string;
  description: string;
}

export interface BlogsContent {
  sectionTitle: string;
  posts: BlogPost[];
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "whatsapp"
  | "gmail"
  | "twitter"
  | "youtube";

export interface SocialLink {
  name: string;
  platform: SocialPlatform;
  url: string;
}

export interface SiteLinks {
  cvUrl: string;
  bookMeetingUrl: string;
  socials: SocialLink[];
}

export interface ContactContent {
  sectionTitle: string;
  subtitle: string;
  email: string;
  /** Path to CV file relative to /public, e.g. "/cv/cv.pdf" */
  cvPath: string;
  bookMeetingUrl: string;
  socials: SocialLink[];
  footerText: string;
}
