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
        background: 'linear-gradient(135deg, #fff7ed 0%, #fdba74 100%)',
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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: index * 0.03,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ scale: 1.05 }}
      className="group"
    >
      {/* Ultra-compact card design */}
      <div className="bg-white/80 backdrop-blur-sm border border-primary-100 rounded-lg p-2 hover:shadow-sm transition-all duration-300 flex items-center gap-2">
        {/* Skill icon */}
        <motion.div
          className="w-6 h-6 flex items-center justify-center"
          whileHover={{ rotate: 10 }}
        >
          <img 
            src={skill.icon} 
            alt={skill.name} 
            className="w-5 h-5 object-contain"
          />
        </motion.div>
        
        {/* Skill name */}
        <p className="text-xs font-medium text-gray-800">
          {skill.name}
        </p>
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-primary-50">
      {/* Light gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)',
        }}
      />
      
      {/* Subtle floating orbs */}
      <FloatingOrb delay={0} duration={20} size="w-96 h-96" />
      <FloatingOrb delay={5} duration={25} size="w-64 h-64" />
      <FloatingOrb delay={10} duration={30} size="w-32 h-32" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
          >
            Skills & Expertise
          </motion.h2>
          <motion.div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
        </motion.div>

        {/* Skills categories - horizontal on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((category, catIndex) => (
            <motion.div 
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1, duration: 0.5 }}
              className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-primary-100/50 hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg font-bold mb-4 text-gray-800 border-b border-primary-100 pb-2">
                {category.category}
              </h3>
              
              <div className="grid grid-cols-2 gap-2">
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

        {/* Subtle particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;