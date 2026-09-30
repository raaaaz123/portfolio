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
      "Shipped GlowZen to the App Store: a SwiftUI app on a Python / FastAPI backend with AWS Bedrock, voice coaching and RAG chat",
      "Pivoted Dietly AI (5k+ users) from photo calorie tracking into Dietly Fit: native Swift and Kotlin apps with a RAG-based AI coach",
      "Built AI automation for clients: agent workflows, RAG pipelines, voice agents and LLM integrations",
      "Advised small teams on model selection, cost control and self-hosted inference"
    ],
    technologies: ["Swift", "Kotlin", "Next.js", "React Native", "Python", "FastAPI", "AWS Bedrock", "RAG", "LLMs", "AI Agents", "TypeScript"]
  },
  {
    title: "AI Engineer",
    company: "Geekflare",
    period: "Sep 2025–Dec 2025",
    type: "Contract · Full-time",
    description: [
      "Deployed RAG pipelines on LangChain and Qdrant to production for document retrieval",
      "Shipped generative AI features on OpenAI LLMs and custom embedding models",
      "Designed FastAPI microservices for AI inference and document processing",
      "Moved heavy AI workloads onto async queues with Celery and Redis, keeping API requests responsive",
      "Containerised services with Docker for consistent deploys across environments"
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
      "Launched MakeMyFlyer.com, a profitable SaaS for automated design generation",
      "Built Snapzy.in, an AI avatar store on fine-tuned LoRA models: 15k+ users and 500+ product sales",
      "Built Bioly.link, a link-in-bio and booking platform used by 8k creators and businesses",
      "Launched Dietly AI, a photo-based calorie tracker that grew to 5k+ users",
      "Ran subscriptions and payment gateways for recurring revenue across products"
    ],
    technologies: ["Next.js", "React", "TypeScript", "AI", "Node.js", "PostgreSQL", "Stripe", "LoRA", "GenAI"],
    websites: [
      { name: "MakeMyFlyer.com", url: "https://makemyflyer.com" },
      { name: "Snapzy.in", url: "https://snapzy.in" }
    ]
  }
];
