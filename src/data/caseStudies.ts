/**
 * Written from the project data only — every decision and result here is
 * something the product actually does or has, not an estimate.
 */
export interface FlowStep {
  label: string;
  /** Several parallel boxes in one step (e.g. a fan-out to models). */
  items?: string[];
  note?: string;
}

export interface CaseStudy {
  projectId: number;
  title: string;
  kicker: string;
  problem: string;
  built: string[];
  flow: FlowStep[];
  host: string;
  decisions: { what: string; why: string }[];
  results: { value: string; label: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    projectId: 4,
    title: 'Dietly Fit',
    kicker: 'AI fitness app, pivoted from a calorie tracker',
    problem:
      'Workout apps log what you did, but not whether it is working or what to train next. Dietly Fit turns one photo a week into a score, names the weak point, and builds the training week that fixes it.',
    built: [
      'A weekly body scan: one photo becomes a Form Score out of 100, a body-fat estimate and the weak area named',
      'A plan generator that builds a full week of sessions from the scan, the goal and the equipment available',
      'A RAG-based AI coach that retrieves the user’s full workout history, scans and diet logs before answering, and rewrites a session from a sentence',
      'Set-by-set logging with personal records, progressive-overload suggestions and 21 muscles ranked against strength standards',
      'Meal logging by photo, sentence or voice, with targets set from training and goal',
      'Native apps in Swift for iOS and Kotlin for Android',
    ],
    flow: [
      { label: 'Weekly photo', note: 'one scan a week' },
      { label: 'Scan scoring', items: ['Form Score /100', 'Body-fat estimate', 'Weak point'] },
      { label: 'Plan generator', note: 'goal, kit, score' },
      { label: 'Training', items: ['Guided sessions', 'Set logging', 'Diet logging'] },
      { label: 'RAG coach', items: ['Workout history', 'Scans', 'Diet logs'] },
    ],
    host: 'Native Swift (iOS) + Kotlin (Android)',
    decisions: [
      {
        what: 'Pivoted from calorie tracking to training in 2026',
        why: 'the product now centres on a weekly score and the plan that moves it; food logging from Dietly AI stays in as a side feature.',
      },
      {
        what: 'Photos are resized on the phone before upload',
        why: 'a size limit on the upload path made photo meal scanning fail on most high-resolution cameras. Shipped as a fix in v2.0.',
      },
      {
        what: 'A RAG-based coach over each user’s own data',
        why: 'it retrieves their full workout history, scans and diet logs before answering, so advice is about their numbers, not generic fitness content.',
      },
      {
        what: 'Native Swift and Kotlin instead of one cross-platform codebase',
        why: 'the earlier Dietly AI was built in Flutter; the rebuild uses each platform’s own camera and health APIs directly, including Apple Health sync.',
      },
    ],
    results: [
      { value: '5k+', label: 'users across Dietly' },
      { value: '2,000+', label: 'workouts' },
      { value: '2', label: 'native apps: iOS and Android' },
    ],
  },
  {
    projectId: 100,
    title: 'Chatlo.io',
    kicker: 'Multi-LLM analytics SaaS',
    problem:
      'Brands can see how they rank on Google, but not how they show up inside ChatGPT, Claude or Gemini answers. Chatlo measures that.',
    built: [
      'An engine that runs one prompt set across several LLMs for a side-by-side comparison',
      'Scoring for brand mentions, competitor share of voice and the sources each model cites',
      'Scheduled runs with trend dashboards and change alerts',
      'Exportable reports for clients and stakeholders',
    ],
    flow: [
      { label: 'Prompt set', note: 'per brand & category' },
      { label: 'Scheduler', note: 'recurring runs' },
      { label: 'Models', items: ['OpenAI', 'Claude', 'Gemini'] },
      { label: 'Scoring', items: ['Mentions', 'Share of voice', 'Citations'] },
      { label: 'Dashboards', note: 'trends, alerts, reports' },
    ],
    host: 'Next.js + TypeScript, self-hosted on a VPS',
    decisions: [
      {
        what: 'The same prompt set runs against every model',
        why: 'so results compare like-for-like instead of mixing prompt changes with model differences.',
      },
      {
        what: 'Self-hosted on a VPS rather than pay-per-request infrastructure',
        why: 'to keep costs under control for high-volume, scheduled model calls.',
      },
    ],
    results: [
      { value: '2k+', label: 'users' },
      { value: '3', label: 'LLM providers compared' },
      { value: 'Live', label: 'at chatlo.io' },
    ],
  },
  {
    projectId: 101,
    title: 'Notes.chatlo.io',
    kicker: 'RAG notes app, web + iOS + Android',
    problem:
      'Keyword search fails on personal notes: people remember what a note was about, not the exact words in it. Notes.chatlo finds notes by meaning.',
    built: [
      'A Next.js web app and a React Native app for iOS and Android, kept in sync in real time',
      'RAG-based semantic search across notes and documents',
      'AI-assisted writing and automatic tags and categories',
      'The retrieval stack, running on self-hosted infrastructure',
    ],
    flow: [
      { label: 'Clients', items: ['Web · Next.js', 'iOS · React Native', 'Android · React Native'] },
      { label: 'Sync API', note: 'real-time' },
      { label: 'Embeddings', note: 'on every save' },
      { label: 'Vector index', note: 'semantic search' },
      { label: 'LLM', note: 'answers, drafts, tags' },
    ],
    host: 'TypeScript end to end, RAG stack on a 12 GB VPS',
    decisions: [
      {
        what: 'Retrieval runs on a self-hosted 12 GB VPS',
        why: 'for speed and so note content stays on infrastructure under my control.',
      },
      {
        what: 'TypeScript across web and mobile',
        why: 'so the Next.js and React Native clients share one language and data model.',
      },
    ],
    results: [
      { value: '1k', label: 'users' },
      { value: '3', label: 'platforms: web, App Store, Google Play' },
      { value: 'Live', label: 'at notes.chatlo.io' },
    ],
  },
];
