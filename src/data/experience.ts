export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies?: string[];
  type?: string;
  websites?: { name: string; url: string }[];
}

export const experiences: Experience[] = [
  {
    title: "Indie SaaS Developer",
    company: "Self-employed",
    period: "2023–Present",
    type: "Full-time",
    description: [
      "Built and launched MakeMyFlyer.com, a profitable SaaS for automated design generation",
      "Created Snapzy.in, an AI-based mobile case selling platform with 500+ sales using LoRAs and GenAI models",
      "Developed Bioly.link, a link-in-bio and automation platform for businesses and creators",
      "Implemented subscription models and payment gateways for recurring revenue",
      "Leveraged AI tools like Claude and GPT-4 for faster development cycles"
    ],
    technologies: ["Next.js", "React", "TypeScript", "AI", "Node.js", "PostgreSQL", "Stripe", "LoRA", "GenAI"],
    websites: [
      { name: "MakeMyFlyer.com", url: "https://makemyflyer.com" },
      { name: "Snapzy.in", url: "https://snapzy.in" },
      { name: "Bioly.link", url: "https://bioly.link" }
    ]
  },
  {
    title: "Software Development Consultant",
    company: "Freelance",
    period: "2022–2023",
    type: "Contract",
    description: [
      "Delivered custom software solutions for multiple clients",
      "Built AI-powered automation tools for business workflows",
      "Developed mobile applications with Flutter for cross-platform deployment",
      "Implemented serverless architectures for scalable backend systems"
    ],
    technologies: ["Flutter", "AWS", "Firebase", "AI Integration", "Serverless", "Node.js"]
  },
  {
    title: "Tech Lead",
    company: "Google Developer Student Club TKMCE",
    period: "2022–2023",
    type: "Volunteer",
    description: [
      "Organized and conducted multiple hackathons, workshops and tech fests",
      "Mentored junior developers on mobile and web development",
      "Advocated for Firebase, GCP and cloud technologies",
      "Led a team of student developers on community projects"
    ],
    technologies: ["Android", "Firebase", "React", "Cloud", "GCP"]
  }
]; 