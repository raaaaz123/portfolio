export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "Java", icon: "/icons/tech/java.svg" },
      { name: "Kotlin", icon: "/icons/tech/kotlin.svg" },
      { name: "Dart", icon: "/icons/tech/dart.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "JavaScript", icon: "/icons/tech/javascript.svg" },
      { name: "Python", icon: "/icons/tech/python.svg" },
      { name: "SQL", icon: "/icons/tech/sql.svg" },
    ],
  },
  {
    category: "Frameworks & Platforms",
    skills: [
      { name: "Flutter", icon: "/icons/tech/flutter.svg" },
      { name: "React", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/nextjs.svg" },
      { name: "Android SDK", icon: "/icons/tech/android.svg" },
      { name: "Firebase", icon: "/icons/tech/firebase.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
      { name: "Node.js", icon: "/icons/nodejs.svg" },
    ],
  },
  {
    category: "DevOps & Cloud",
    skills: [
      { name: "AWS", icon: "/icons/tech/aws.svg" },
      { name: "GCP", icon: "/icons/tech/gcp.svg" },
      { name: "Firebase", icon: "/icons/tech/firebase.svg" },
      { name: "Serverless", icon: "/icons/serverless.svg" },
      { name: "GitHub Actions", icon: "/icons/tech/github-actions.svg" },
      { name: "Docker", icon: "/icons/tech/docker.svg" },
    ],
  },
  {
    category: "AI & Tools",
    skills: [
      { name: "OpenAI", icon: "/icons/ai.svg" },
      { name: "Claude", icon: "/icons/tech/claude.svg" },
      { name: "Vertex AI", icon: "/icons/tech/vertex.svg" },
      { name: "CI/CD", icon: "/icons/tech/cicd.svg" },
      { name: "REST APIs", icon: "/icons/tech/api.svg" },
      { name: "Agile", icon: "/icons/tech/agile.svg" },
      { name: "Git", icon: "/icons/tech/git.svg" },
    ],
  },
]; 