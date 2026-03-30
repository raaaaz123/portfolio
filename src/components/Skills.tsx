import { motion } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const skills: SkillCategory[] = [
  {
    category: "RAG & LLM Infrastructure",
    skills: [
      { name: "LangChain", icon: "/icons/ai.svg", level: 95 },
      { name: "RAG Systems", icon: "/icons/ai.svg", level: 95 },
      { name: "Qdrant", icon: "/icons/mongodb.svg", level: 90 },
      { name: "Vector Databases", icon: "/icons/mongodb.svg", level: 92 },
      { name: "Voyage Re-ranker", icon: "/icons/ai.svg", level: 88 },
      { name: "LLM Fine-tuning", icon: "/icons/ai.svg", level: 85 },
      { name: "Embeddings", icon: "/icons/ai.svg", level: 90 },
      { name: "Pinecone", icon: "/icons/mongodb.svg", level: 85 },
      { name: "ChromaDB", icon: "/icons/mongodb.svg", level: 82 },
    ]
  },
  {
    category: "AI & ML Tools",
    skills: [
      { name: "Claude", icon: "/icons/tech/claude.svg", level: 95 },
      { name: "OpenAI GPT", icon: "/icons/ai.svg", level: 95 },
      { name: "Gemini", icon: "/icons/ai.svg", level: 90 },
      { name: "Vertex AI", icon: "/icons/tech/vertex.svg", level: 85 },
      { name: "AI Agents", icon: "/icons/ai.svg", level: 92 },
      { name: "Prompt Engineering", icon: "/icons/web3.svg", level: 95 },
      { name: "Cursor", icon: "/icons/ai.svg", level: 95 },
      { name: "Windsurf", icon: "/icons/web3.svg", level: 88 },
      { name: "AI Integration", icon: "/icons/serverless.svg", level: 90 },
    ]
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "React", icon: "/icons/react.svg", level: 95 },
      { name: "Next.js", icon: "/icons/nextjs.svg", level: 90 },
      { name: "TypeScript", icon: "/icons/typescript.svg", level: 88 },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg", level: 92 },
      { name: "JavaScript", icon: "/icons/tech/javascript.svg", level: 95 },
      { name: "React Native", icon: "/icons/react.svg", level: 88 },
      { name: "Flutter", icon: "/icons/tech/flutter.svg", level: 85 },
      { name: "HTML/CSS", icon: "/icons/edge.svg", level: 98 },
    ]
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", icon: "/icons/nodejs.svg", level: 90 },
      { name: "Python", icon: "/icons/tech/python.svg", level: 85 },
      { name: "Java", icon: "/icons/tech/java.svg", level: 82 },
      { name: "MongoDB", icon: "/icons/mongodb.svg", level: 85 },
      { name: "PostgreSQL", icon: "/icons/tech/sql.svg", level: 88 },
      { name: "API Design", icon: "/icons/tech/api.svg", level: 92 },
      { name: "Serverless", icon: "/icons/serverless.svg", level: 90 },
      { name: "n8n", icon: "/icons/tech/api.svg", level: 85 },
    ]
  },
  {
    category: "DevOps & Cloud",
    skills: [
      { name: "AWS", icon: "/icons/tech/aws.svg", level: 80 },
      { name: "Firebase", icon: "/icons/tech/firebase.svg", level: 88 },
      { name: "GCP", icon: "/icons/tech/gcp.svg", level: 75 },
      { name: "Docker", icon: "/icons/tech/docker.svg", level: 78 },
      { name: "VPS Hosting", icon: "/icons/serverless.svg", level: 90 },
      { name: "Git", icon: "/icons/tech/git.svg", level: 92 },
      { name: "CI/CD", icon: "/icons/tech/cicd.svg", level: 80 },
      { name: "GitHub Actions", icon: "/icons/tech/github-actions.svg", level: 85 },
    ]
  }
];

/* ─── Skill Tag ─── */
const SkillTag: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay: index * 0.025, ease: [0.22, 1, 0.36, 1] as const }}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
    className="group relative"
  >
    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-border/60 hover:border-primary/30 dark:hover:border-primary/20 hover:bg-primary/40 dark:hover:bg-primary/[0.06] shadow-sm hover:shadow-md hover:shadow-primary/[0.04] transition-all duration-300 cursor-default">
      <img
        src={skill.icon}
        alt={skill.name}
        className="w-4 h-4 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
      />
      <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
        {skill.name}
      </span>

      {/* Level indicator dot */}
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          skill.level >= 90
            ? 'bg-primary dark:bg-primary'
            : skill.level >= 80
            ? 'bg-primary dark:bg-primary'
            : 'bg-muted-foreground/40'
        }`}
      />
    </div>
  </motion.div>
);

/* ─── Category Card ─── */
const CategoryCard: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => {
  // Category accent colors
  const accents = [
    { dot: 'bg-primary', border: 'border-primary/20 dark:border-primary/15', bg: 'bg-primary/[0.04]' },
    { dot: 'bg-primary', border: 'border-primary/20 dark:border-primary/15', bg: 'bg-primary/[0.04]' },
    { dot: 'bg-primary', border: 'border-primary/20 dark:border-primary/15', bg: 'bg-primary/[0.04]' },
    { dot: 'bg-sky-500', border: 'border-sky-500/20 dark:border-sky-400/15', bg: 'bg-sky-500/[0.04]' },
    { dot: 'bg-indigo-500', border: 'border-indigo-500/20 dark:border-indigo-400/15', bg: 'bg-indigo-500/[0.04]' },
  ];
  const accent = accents[index % accents.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className={`rounded-2xl p-5 sm:p-6 border ${accent.border} ${accent.bg} transition-all duration-300`}
    >
      {/* Category Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`w-2 h-2 rounded-full ${accent.dot}`} />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          {category.category}
        </h3>
        <span className="text-[10px] text-muted-foreground ml-auto tabular-nums">
          {category.skills.length} skills
        </span>
      </div>

      {/* Skill Tags */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <SkillTag key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

/* ─── Main Skills Section ─── */
const Skills: React.FC = () => {
  const totalSkills = skills.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="relative py-16 sm:py-20 overflow-hidden bg-background text-foreground">
      {/* Subtle gradient bg */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-secondary/20 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <motion.span
            className="inline-block text-sm font-semibold uppercase tracking-widest text-primary dark:text-primary mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Tech Stack
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
            Skills & Expertise
          </h2>
          <p className="text-base sm:text-lg max-w-xl mx-auto text-muted-foreground leading-relaxed">
            {totalSkills}+ technologies across AI, full-stack, cloud, and mobile development.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="flex items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary" />
            <span className="text-xs text-muted-foreground">Expert (90+)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary" />
            <span className="text-xs text-muted-foreground">Advanced (80+)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
            <span className="text-xs text-muted-foreground">Proficient</span>
          </div>
        </motion.div>

        {/* Categories Grid — first 2 full width, rest in 3-col */}
        <div className="space-y-5">
          {/* Top 2 categories (RAG & AI) — wider */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {skills.slice(0, 2).map((category, index) => (
              <CategoryCard key={category.category} category={category} index={index} />
            ))}
          </div>

          {/* Remaining categories — 3-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.slice(2).map((category, index) => (
              <CategoryCard key={category.category} category={category} index={index + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
