/**
 * Offline fallback for "Ask AI", used only when /api/chat can't be reached:
 * the portfolio data is split into chunks, a query is scored against them
 * (TF-IDF with a title boost), and the answer is composed from the matches.
 */
import { projects, type Project } from '../data/projects';
import { experiences } from '../data/experience';
import { skillGroups } from '../data/skills';
import { achievements } from '../data/achievements';
import { education } from '../data/education';
import { caseStudies } from '../data/caseStudies';
import { personalInfo } from '../data/personalInfo';
import { clean, liveCount, parseUsers, productsShipped, statusLabel, usersReached } from './ui';

export type Source =
  | { kind: 'project'; id: number; label: string }
  | { kind: 'section'; href: string; label: string };

export interface Answer {
  text: string;
  sources: Source[];
  /** How many chunks matched, shown in the tool-call trace. */
  hits: number;
}

interface Chunk {
  title: string;
  text: string;
  source: Source;
}

const STOP = new Set(
  'a an and are as at be by can could did do does for from has have he him his how i in is it its me my of on or so tell that the their them this to was what when where which who why will with you your about any some show give list rasheed rasheeds'.split(
    ' ',
  ),
);

const tokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .split(/[^a-z0-9+#]+/)
    .filter((t) => t && !STOP.has(t))
    .map((t) => (t.length > 3 && t.endsWith('s') ? t.slice(0, -1) : t));

const projectSource = (p: Project): Source => ({ kind: 'project', id: p.id, label: p.title });

const chunks: Chunk[] = [
  ...projects.map((p) => ({
    title: `${p.title} ${p.role ?? ''}`,
    text: [p.summary, p.description, p.tags.join(' '), (p.features ?? []).join(' ')].join(' '),
    source: projectSource(p),
  })),
  ...experiences.map((e) => ({
    title: `${e.title} ${e.company}`,
    text: [e.period, e.type, e.description.join(' '), (e.technologies ?? []).join(' ')].join(' '),
    source: { kind: 'section', href: '#experience', label: e.company === 'Self-employed' ? e.title : e.company } as Source,
  })),
  ...skillGroups.map((g) => ({
    title: g.label,
    text: g.items.join(' '),
    source: { kind: 'section', href: '#stack', label: 'Stack' } as Source,
  })),
  ...achievements.map((a) => ({
    title: `${a.eventName} hackathon award`,
    text: [a.prize, a.projectName, a.description, (a.technologies ?? []).join(' ')].join(' '),
    source: { kind: 'section', href: '#awards', label: a.eventName } as Source,
  })),
  ...education.map((e) => ({
    title: `${e.degree} ${e.institution} education`,
    text: e.description ?? '',
    source: { kind: 'section', href: '#awards', label: 'Education' } as Source,
  })),
];

const docs = chunks.map((c) => ({ title: tokens(c.title), body: tokens(`${c.title} ${c.text}`) }));
const df = new Map<string, number>();
for (const d of docs) for (const t of new Set(d.body)) df.set(t, (df.get(t) ?? 0) + 1);
const idf = (t: string) => Math.log(1 + chunks.length / (df.get(t) ?? 0.5));

const search = (q: string, k = 4) => {
  const qt = tokens(q);
  return docs
    .map((d, i) => {
      let score = 0;
      for (const t of qt) {
        const tf = d.body.filter((x) => x === t || (t.length > 3 && x.startsWith(t))).length;
        if (tf) score += idf(t) * (1 + Math.log(tf));
        if (d.title.includes(t)) score += 2 * idf(t);
      }
      return { chunk: chunks[i], score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
};

const has = (q: string, ...words: string[]) => words.some((w) => new RegExp(`\\b${w}`, 'i').test(q));

const usersLine = (p: Project) => (p.users ? `, ${p.users} users` : '');
const bullets = (items: string[]) => items.map((s) => `- ${s}`).join('\n');
const uniq = (s: Source[]) =>
  s.filter((x, i) => s.findIndex((y) => y.label === x.label) === i).slice(0, 4);

/** A project is named in the query: "dietly", "chatlo.io", "rexa pilot"… */
const namedProject = (q: string) => {
  const lq = q.toLowerCase();
  return (
    projects.find((p) => lq.includes(p.title.toLowerCase())) ??
    projects.find((p) => {
      const first = p.title.toLowerCase().split(/[\s.]/)[0];
      return first.length > 3 && new RegExp(`\\b${first}`).test(lq);
    })
  );
};

const describeProject = (p: Project): Answer => {
  const cs = caseStudies.find((c) => c.projectId === p.id);
  const feats = (p.features ?? []).slice(0, 4).map(clean);
  let text = `**${p.title}** (${p.year}, ${statusLabel[p.status].toLowerCase()}${usersLine(p)}).\n\n${p.description}`;
  if (feats.length) text += `\n\nHighlights:\n${bullets(feats)}`;
  if (cs) text += `\n\nOne design decision: **${cs.decisions[0].what}**, because ${cs.decisions[0].why}`;
  text += `\n\nBuilt with ${p.tags.slice(0, 6).join(', ')}.`;
  return { text, sources: [projectSource(p)], hits: 1 };
};

const ANSWERS: { test: (q: string) => boolean; run: (q: string) => Answer }[] = [
  {
    test: (q) => has(q, 'hire', 'contact', 'email', 'reach', 'availab', 'freelanc', 'rate', 'call', 'whatsapp', 'open to'),
    run: () => ({
      text: `Yes. Rasheed is currently **open to freelance, contract and full-time roles**, working from ${personalInfo.location} (IST) with remote teams.\n\n- Email: **${personalInfo.email}**\n- WhatsApp / phone: ${personalInfo.phone}\n- LinkedIn and GitHub are linked in the contact section.\n\nThe fastest route is email with a line about the product and timeline.`,
      sources: [{ kind: 'section', href: '#contact', label: 'Contact' }],
      hits: 1,
    }),
  },
  {
    test: (q) => has(q, 'rag', 'retrieval', 'vector', 'embedding', 'llm', 'ai', 'agent', 'claude', 'openai', 'bedrock', 'langchain'),
    run: (q) => {
      const ai = search(`${q} rag llm ai agent vector`, 5).filter((r) => r.chunk.source.kind === 'project');
      const list = ai.map((r) => projects.find((p) => p.id === (r.chunk.source as { id: number }).id)!);
      return {
        text: `AI is the core of most of Rasheed's recent work. In production at **Geekflare** that meant deploying RAG pipelines on LangChain and Qdrant with FastAPI services.\n\nIn Rasheed's own products:\n${bullets(
          list.map((p) => `**${p.title}**: ${p.summary}`),
        )}\n\nRasheed works across Claude, OpenAI and Gemini, often through AWS Bedrock, and self-hosts retrieval when cost or privacy matters.`,
        sources: uniq([{ kind: 'section', href: '#experience', label: 'Geekflare' }, ...list.map(projectSource)]),
        hits: list.length + 1,
      };
    },
  },
  {
    test: (q) => has(q, 'stack', 'skill', 'tech', 'language', 'tool', 'framework'),
    run: () => ({
      text: `Rasheed's stack, grouped by area:\n\n${skillGroups
        .map((g) => `- **${g.label}:** ${g.items.join(', ')}`)
        .join('\n')}\n\nDay to day that means TypeScript and Python on the backend, Next.js on the web, and native Swift / Kotlin on mobile.`,
      sources: [{ kind: 'section', href: '#stack', label: 'Stack' }],
      hits: skillGroups.length,
    }),
  },
  {
    test: (q) => has(q, 'experience', 'job', 'career', 'worked', 'company', 'geekflare', 'history', 'background', 'year'),
    run: () => ({
      text: `${experiences
        .map((e) => `**${e.title}** at ${e.company} (${e.period})\n${e.description[0]}.`)
        .join('\n\n')}\n\nBefore that: ${education.map((e) => `${e.degree} at ${e.institution}`).join('; ')}.`,
      sources: [{ kind: 'section', href: '#experience', label: 'Experience' }],
      hits: experiences.length,
    }),
  },
  {
    test: (q) => has(q, 'award', 'hackathon', 'prize', 'win', 'won'),
    run: () => ({
      text: `${achievements.length} national-level hackathon podiums:\n\n${bullets(
        achievements.map((a) => `**${a.prize.split('–')[0].trim()}** at ${a.eventName} (${a.year}) for ${a.projectName}`),
      )}`,
      sources: [{ kind: 'section', href: '#awards', label: 'Awards' }],
      hits: achievements.length,
    }),
  },
  {
    test: (q) => has(q, 'education', 'degree', 'college', 'university', 'study', 'studied'),
    run: () => ({
      text: bullets(education.map((e) => `**${e.degree}**: ${e.institution}, ${e.period}`)),
      sources: [{ kind: 'section', href: '#awards', label: 'Education' }],
      hits: education.length,
    }),
  },
  {
    test: (q) => has(q, 'user', 'traction', 'biggest', 'popular', 'number', 'scale', 'how many'),
    run: () => {
      const top = [...projects].sort((a, b) => parseUsers(b.users) - parseUsers(a.users)).slice(0, 4);
      return {
        text: `Across **${productsShipped} shipped products** Rasheed has reached roughly **${usersReached}+ users**, and ${liveCount} are still live.\n\nLargest by users:\n${bullets(
          top.map((p) => `**${p.title}**: ${p.users} users (${statusLabel[p.status].toLowerCase()})`),
        )}`,
        sources: top.map(projectSource),
        hits: top.length,
      };
    },
  },
  {
    test: (q) => has(q, 'mobile', 'ios', 'android', 'app store', 'swift', 'kotlin', 'iphone'),
    run: (q) => {
      const iosOnly = has(q, 'app store', 'ios', 'iphone', 'swift') && !has(q, 'android', 'play');
      const apps = projects.filter((p) => (iosOnly ? p.ios : p.ios || p.android));
      return {
        text: `${apps.length} of Rasheed's products ${iosOnly ? 'are on the App Store' : 'ship as mobile apps'}:\n\n${bullets(
          apps.map((p) => `**${p.title}**: ${p.summary} (${[p.ios && 'iOS', p.android && 'Android'].filter(Boolean).join(' + ')})`),
        )}\n\nRecent work is native: SwiftUI on iOS and Kotlin on Android.`,
        sources: apps.slice(0, 4).map(projectSource),
        hits: apps.length,
      };
    },
  },
  {
    test: (q) => has(q, 'project', 'built', 'build', 'product', 'work', 'portfolio', 'best', 'proud'),
    run: () => {
      const live = projects.filter((p) => p.status === 'live');
      return {
        text: `Rasheed has shipped **${productsShipped} products**; these ${live.length} are live today:\n\n${bullets(
          live.map((p) => `**${p.title}**: ${p.summary}${usersLine(p)}`),
        )}\n\nAsk about any of them by name for the details.`,
        sources: live.slice(0, 4).map(projectSource),
        hits: live.length,
      };
    },
  },
];

export const ask = (q: string): Answer => {
  const named = namedProject(q);
  if (named) return describeProject(named);

  const intent = ANSWERS.find((a) => a.test(q));
  if (intent) return intent.run(q);

  const hits = search(q);
  if (!hits.length)
    return {
      text: `I couldn't find anything about that in this portfolio. Try asking about Rasheed's **projects**, **RAG work**, **mobile apps**, **experience** or **hiring**.`,
      sources: [],
      hits: 0,
    };

  const top = hits[0].chunk;
  if (top.source.kind === 'project') {
    const p = projects.find((x) => x.id === (top.source as { id: number }).id)!;
    return { ...describeProject(p), hits: hits.length };
  }
  return {
    text: `Here's the closest match:\n\n**${top.title}**\n${top.text.slice(0, 420)}${top.text.length > 420 ? '…' : ''}`,
    sources: uniq(hits.map((h) => h.chunk.source)),
    hits: hits.length,
  };
};

export const SUGGESTIONS = [
  'Why should we hire you?',
  'How many people use what you’ve built?',
  'What AI have you shipped to production?',
  'Which hackathons have you placed in?',
];
