import type { AboutContent } from "./types";

const about: AboutContent = {
  sectionTitle: "Welcome Again",

  intro:
    "Here you can find detailed information about ARNAB. From his academic background to his desired career you can go through all information on this section.",

  photo: "/assets/aboutphoto.png",
  photoAlt: "Arnab Samadder",

  organizations: [
    {
      name: "IAAS PSTU",
      logo: "/assets/pstu.png",
      designations: [
        { title: "Local Network Manager", year: "2024" },
        { title: "ExPro Administration Officer", year: "2023" },
        { title: "General Member", year: "2022" },
      ],
      description:
        "It's the prior organization that I have joined at my very beginning of my university life.",
    },
    {
      name: "Hult Prize",
      logo: "/assets/hult.png",
      designations: [
        { title: "Deputy Director", year: "2024" },
        { title: "Head of IT", year: "2023" },
        { title: "Executive", year: "2022" },
      ],
      description:
        "It's the organization from where I learned all the organizational behavior.",
    },
    {
      name: "IAAS Bangladesh",
      logo: "/assets/ias.png",
      designations: [
        { title: "National Operational Officer", year: "2024" },
        { title: "Video Editor", year: "2023" },
      ],
      description:
        "I have joined IAAS Bangladesh to apply my previously earned experiences.",
    },
    {
      name: "IAAS Global",
      logo: "/assets/ias.png",
      designations: [
        { title: "Global networking and social media manager", year: "2024" },
        { title: "Global networking manager", year: "2023" },
        { title: "Global video editor", year: "2022" },
      ],
      description:
        "Here I gained the benefits of connectivity. In every step I have realized that connectivity is productivity.",
    },
  ],

  education: [
    {
      institution: "Patuakhali Science and Technology University",
      degree: "B.Sc. in Agriculture",
      year: "2022 - Present",
    },
    {
      institution: "St. Joseph Higher Secondary School",
      degree: "HSC",
      year: "2019 - 2021",
    },
    {
      institution: "Pirojpur Govt High School",
      degree: "SSC-JSC-PSC",
      year: "2013 - 2019",
    },
    {
      institution: "Morshed Srimty Sishu Niketon",
      degree: "Kinder Garden",
      year: "2010 - 2013",
    },
  ],

  bio: "Arnab Samadder is a dynamic youth leader, creative strategist, and emerging researcher whose work spans innovation, empowerment, and cultural branding. As the founder of OPT. National, Bangladesh's first email newsletter agency for global opportunities, Arnab connects thousands of young minds with life-changing prospects. He's also the co-founder of MEETRO, a bold initiative that reimagines Bangladeshi heritage through modern merchandising and storytelling.\n\nOn campus, Arnab leads The Brainiacs, a renowned team made by him along with his friends. Together, they've won multiple competitions, including the prestigious Textile Olympiad 2.0, showcasing their strategic brilliance and creative execution.\n\nArnab's research portfolio includes Pustikhamari, a vertical farming project in coastal Bangladesh funded by GAIN, and two other initiatives on vermicompost treatment and humic acid production from lignite coal, backed by RIC. His long-term goal is to pursue research as a career, driving sustainable innovation in agriculture.\n\nWith roles in IAAS Bangladesh, World Food Forum, YouthX, and more, Arnab blends leadership with hands-on creativity—excelling in video editing, motion graphics, SEO, and outreach strategy. He's driven by a mission to empower youth, celebrate heritage, and build a future where ideas thrive and impact multiplies.",
};

export default about;
