import type { ContactContent } from "./types";
import siteLinks from "./links";

const contact: ContactContent = {
  sectionTitle: "Let's Get Connected",
  subtitle:
    "Feel free to reach out for collaborations, opportunities, or just a friendly chat!",

  email: "arnab.prof.work@gmail.com",

  /** Place your CV at public/cv/cv.pdf */
  cvPath: siteLinks.cvUrl,
  bookMeetingUrl: siteLinks.bookMeetingUrl,

  socials: siteLinks.socials,

  footerText: "Arnab Samadder. Built with Next.js & Tailwind CSS",
};

export default contact;
