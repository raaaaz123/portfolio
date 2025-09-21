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

// Skills data with actual icon paths
const skills: SkillCategory[] = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React", icon: "/icons/react.svg", level: 95 },
      { name: "Next.js", icon: "/icons/nextjs.svg", level: 90 },
      { name: "TypeScript", icon: "/icons/typescript.svg", level: 88 },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg", level: 92 },
      { name: "JavaScript", icon: "/icons/tech/javascript.svg", level: 95 },
      { name: "HTML/CSS", icon: "/icons/edge.svg", level: 98 },
      { name: "Flutter", icon: "/icons/tech/flutter.svg", level: 85 },
      { name: "Dart", icon: "/icons/tech/dart.svg", level: 80 },
    ]
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", icon: "/icons/nodejs.svg", level: 90 },
      { name: "Java", icon: "/icons/tech/java.svg", level: 82 },
      { name: "MongoDB", icon: "/icons/mongodb.svg", level: 85 },
      { name: "PostgreSQL", icon: "/icons/tech/sql.svg", level: 88 },
      { name: "API Design", icon: "/icons/tech/api.svg", level: 92 },
      { name: "Serverless", icon: "/icons/serverless.svg", level: 90 },
      { name: "n8n", icon: "/icons/tech/api.svg", level: 85 },
    ]
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Git", icon: "/icons/tech/git.svg", level: 92 },
      { name: "Docker", icon: "/icons/tech/docker.svg", level: 78 },
      { name: "AWS", icon: "/icons/tech/aws.svg", level: 75 },
      { name: "Firebase", icon: "/icons/tech/firebase.svg", level: 85 },
      { name: "GCP", icon: "/icons/tech/gcp.svg", level: 70 },
      { name: "CI/CD", icon: "/icons/tech/cicd.svg", level: 80 },
      { name: "GitHub Actions", icon: "/icons/tech/github-actions.svg", level: 85 },
      { name: "Agile", icon: "/icons/tech/agile.svg", level: 90 },
    ]
  },
  {
    category: "AI & ML Tools",
    skills: [
      { name: "Claude", icon: "/icons/tech/claude.svg", level: 95 },
      { name: "Vertex AI", icon: "/icons/tech/vertex.svg", level: 85 },
      { name: "OpenAI", icon: "/icons/ai.svg", level: 90 },
      { name: "Cursor", icon: "/icons/ai.svg", level: 95 },
      { name: "Windsurf", icon: "/icons/web3.svg", level: 88 },
      { name: "Lovable", icon: "/icons/tech/agile.svg", level: 85 },
      { name: "AI Integration", icon: "/icons/serverless.svg", level: 88 },
      { name: "Prompt Engineering", icon: "/icons/web3.svg", level: 92 },
      { name: "AI Agents", icon: "/icons/ai.svg", level: 90 },
    ]
  }
];

interface FloatingOrbProps {
  delay: number;
  duration: number;
  size?: string;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ delay, duration, size = "w-32 h-32" }) => {
  return (
    <motion.div
      className={`absolute ${size} rounded-full opacity-10`}
      style={{
        background: 'linear-gradient(135deg, var(--notion-blue-bg) 0%, var(--notion-blue-text) 100%)',
        filter: 'blur(40px)',
      }}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -80, 100, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

interface SkillCardProps {
  skill: Skill;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.2,
        delay: index * 0.02,
        type: "spring",
        stiffness: 120,
      }}
      whileHover={{ scale: 1.03 }}
      className="inline-block"
    >
      {/* Compact tag-style design */}
      <div className="rounded-full px-3 py-1.5 transition-all duration-200 flex items-center gap-1.5 shadow-sm" style={{
        backgroundColor: 'var(--notion-default-bg)',
        border: `1px solid var(--notion-gray-text)`,
        color: 'var(--notion-default-text)'
      }}>
        {/* Skill icon */}
        <img 
          src={skill.icon} 
          alt={skill.name} 
          className="w-3.5 h-3.5 object-contain"
        />
        
        {/* Skill name */}
        <span className="text-xs font-medium whitespace-nowrap" style={{ color: 'var(--notion-default-text)' }}>
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  return (
    <section className="relative py-12 overflow-hidden" style={{ backgroundColor: 'var(--notion-gray-bg)' }}>
      {/* Minimal floating orbs */}
      <FloatingOrb delay={0} duration={25} size="w-64 h-64" />
      <FloatingOrb delay={8} duration={30} size="w-48 h-48" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Compact Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--notion-default-text)' }}>
            Skills & Expertise
          </h2>
          <div className="w-16 h-0.5 mx-auto rounded-full" style={{ backgroundColor: 'var(--notion-gray-text)' }} />
        </motion.div>

        {/* New horizontal flow layout */}
        <div className="space-y-6">
          {skills.map((category, catIndex) => (
            <motion.div 
              key={category.category}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1, duration: 0.4 }}
              className="rounded-2xl p-4 transition-all duration-300"
              style={{
                backgroundColor: 'var(--notion-default-bg)',
                border: `1px solid var(--notion-gray-text)`
              }}
            >
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--notion-default-text)' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--notion-blue-text)' }}></div>
                {category.category}
              </h3>
              
              {/* Horizontal flowing tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reduced particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: 'var(--notion-gray-text)',
              opacity: 0.4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;