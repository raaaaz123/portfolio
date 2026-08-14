export interface SkillGroup {
  label: string;
  items: string[];
}

/**
 * Deliberately short. No proficiency percentages — self-assessed levels are
 * noise, and every extra logo dilutes the ones that matter.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: 'AI & Retrieval',
    items: [
      'RAG pipelines',
      'LangChain',
      'Qdrant',
      'Pinecone',
      'Embeddings',
      'Re-ranking',
      'AI agents',
      'Prompt engineering',
    ],
  },
  {
    label: 'Languages & UI',
    items: [
      'TypeScript',
      'Python',
      'Next.js',
      'React',
      'React Native',
      'Flutter',
      'Kotlin',
      'Tailwind CSS',
    ],
  },
  {
    label: 'Backend & Data',
    items: [
      'Node.js',
      'FastAPI',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Celery',
      'WebSockets',
      'REST & API design',
    ],
  },
  {
    label: 'Infra & Models',
    items: [
      'AWS',
      'AWS Bedrock',
      'Firebase',
      'Docker',
      'VPS / self-hosting',
      'GitHub Actions',
      'Claude',
      'OpenAI / Gemini',
    ],
  },
];
