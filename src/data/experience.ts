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
    title: "AI Consultant & Full-Stack AI Developer",
    company: "Self-employed",
    period: "Dec 2025–Present",
    type: "Freelance",
    description: [
      "Shipping independent SaaS and mobile products end to end — product, infrastructure, billing and support",
      "Building AI automation for clients: agent workflows, RAG pipelines, voice agents and LLM integrations",
      "Publishing native iOS and Android apps, most recently GlowZen on the App Store",
      "Advising on model selection, cost control and self-hosted inference for small teams"
    ],
    technologies: ["Next.js", "React Native", "SwiftUI", "Python", "FastAPI", "AWS Bedrock", "LLMs", "AI Agents", "TypeScript"]
  },
  {
    title: "AI Engineer",
    company: "Geekflare",
    period: "Sep 2025–Dec 2025",
    type: "Contract · Full-time",
    description: [
      "Built and deployed scalable RAG pipelines using LangChain and Qdrant vector database for intelligent document retrieval",
      "Developed generative AI features with OpenAI LLMs and custom embedding models",
      "Designed and implemented FastAPI-based microservices for AI inference and document processing",
      "Set up async task processing with Celery and Redis for handling heavy AI workloads",
      "Containerized services with Docker for consistent deployment across environments"
    ],
    technologies: ["LangChain", "OpenAI", "RAG", "FastAPI", "Qdrant", "Celery", "Redis", "Docker", "Gen AI", "Embeddings", "LLMs", "Python"],
    websites: [
      { name: "Geekflare.ai", url: "https://geekflare.ai" }
    ]
  },
  {
    title: "Indie SaaS Developer",
    company: "Self-employed",
    period: "2022–Sep 2025",
    type: "Part-time",
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
      { name: "Snapzy.in", url: "https://snapzy.in" }
    ]
  }
];
