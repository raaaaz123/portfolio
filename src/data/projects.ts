/**
 * `expired` = the product's domain no longer resolves, so its live link is not
 * rendered. `discontinued` = no longer maintained, links may still work.
 */
export type ProjectStatus = 'live' | 'expired' | 'discontinued';

export interface Project {
  id: number;
  title: string;
  status: ProjectStatus;
  /** Approximate reach, shown as "<users> users". */
  users?: string;
  /** One-line version shown in the collapsed list row. */
  summary: string;
  /** Full paragraph, shown only when a row is expanded. */
  description: string;
  year: number;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  ios?: string;
  android?: string;
  featured?: boolean;
  features?: string[];
  role?: string;
}

export const projects: Project[] = [
  {
    id: 104,
    title: "GlowZen",
    status: "live",
    summary: "Face-yoga iOS app — AI face scan, voice-coached daily routine.",
    description: "Face yoga and skincare app for iPhone and iPad. A single selfie is scanned for skin and muscle tone, mapped zone by zone into a Glow Score out of 100, and turned into a daily routine built around the user's goals and schedule. Sessions are led by a voice agent over video demonstrations, with a RAG-backed chat for skincare questions.",
    year: 2026,
    image: "/images/projects/glowzen.jpg",
    tags: ["Swift", "SwiftUI", "iOS", "Python", "FastAPI", "AWS Bedrock", "LLMs", "Voice Agents", "RAG Chat", "TTS", "STT"],
    ios: "https://apps.apple.com/us/app/glowzen-face-yoga-glow-up/id6795989775",
    role: "iOS & AI",
    features: [
      "AI face scan — one selfie reads skin and muscle tone across facial zones",
      "Glow Score out of 100 with zone-by-zone facial mapping",
      "Voice-agent coaching over guided video, built on streaming TTS and STT",
      "Daily plan generated from the scan, the user's goals and their schedule",
      "RAG chat for skincare and routine questions",
      "Targeted routines for jawline, wrinkles, cheeks, eye bags and overall radiance",
      "Progress tracking — before/after photos, streaks, badges and a 12-week map",
      "Native SwiftUI client backed by a Python and FastAPI service on AWS Bedrock"
    ]
  },
  {
    id: 101,
    title: "Notes.chatlo.io",
    status: "live",
    users: "1k",
    summary: "AI note-taking with RAG search, across web and mobile.",
    description: "AI-powered note-taking application with seamless web and mobile experiences. Features intelligent RAG-based search, smart organization, and AI-assisted writing to help you capture and retrieve knowledge effortlessly.",
    year: 2025,
    image: "/images/projects/notes-chatlo.jpg",
    tags: ["Next.js", "React Native", "RAG", "TypeScript", "AI", "Mobile App", "Web App", "VPS Hosting", "Vector Search"],
    live: "https://notes.chatlo.io",
    ios: "https://apps.apple.com/us/app/chatlo-ai-notes-transcribe/id6761918530",
    android: "https://play.google.com/store/apps/details?id=com.ainotesassistant.app",
    featured: true,
    role: "Full-stack & Mobile",
    features: [
      "📱 Cross-platform experience with React Native mobile app and Next.js web app",
      "🧠 RAG-powered intelligent search across all your notes and documents",
      "✍️ AI-assisted writing with smart suggestions and auto-completion",
      "🔍 Semantic search to find notes by meaning, not just keywords",
      "📂 Smart organization with AI-generated tags and categories",
      "🔄 Real-time sync between web and mobile platforms",
      "⚡ Self-hosted RAG infrastructure on VPS (12GB) for speed and privacy",
      "🔒 End-to-end encryption for secure note storage",
      "📊 Knowledge graph visualization for connected ideas",
      "🌙 Beautiful dark mode and customizable themes"
    ]
  },
  {
    id: 102,
    title: "Screenzy.pro",
    status: "live",
    users: "600",
    summary: "AI website builder that writes landing pages live, section by section.",
    description: "AI-powered website builder that creates stunning business landing pages in minutes. Answer a few questions about your business, watch the AI write your page live with real-time code preview, then tweak colors and text — no coding required. Powered by multiple LLMs including Claude and OpenAI via AWS Bedrock.",
    year: 2025,
    image: "/images/projects/screenzy.jpg",
    tags: ["Next.js", "AWS Bedrock", "Claude AI", "OpenAI", "TypeScript", "Tailwind CSS", "React", "AI Website Builder", "SaaS"],
    live: "https://screenzy.pro",
    featured: true,
    role: "Full-stack & AI",
    features: [
      "🤖 Multi-LLM architecture using Claude (Anthropic) and OpenAI models via AWS Bedrock",
      "⚡ Real-time live code generation — watch the AI write your landing page section by section",
      "🎨 Visual editor for colors, text, and layout with instant preview — no code needed",
      "🌐 One-click publish with shareable URL and free custom domain support",
      "📥 Full source code download — own your code, host anywhere, zero vendor lock-in",
      "📊 Built-in lead collection forms and visitor analytics for every site",
      "🚀 AI-powered content generation from simple business descriptions",
      "📱 Fully responsive sites with modern React and Tailwind CSS output"
    ]
  },
  {
    id: 100,
    title: "Chatlo.io",
    status: "live",
    users: "2k+",
    summary: "Multi-LLM GEO analysis — see how brands surface in AI answers.",
    description: "Generative Engine Optimization platform that measures how a brand actually shows up inside AI-generated answers. The same prompt set is run across multiple LLMs, then scored for brand mentions, competitor share of voice, and which sources the models cite — so teams can see where they are invisible and why.",
    year: 2025,
    image: "/images/projects/chatlo.jpg",
    tags: ["Next.js", "TypeScript", "Multi-LLM", "GEO", "OpenAI", "Claude", "Gemini", "AI Analytics", "SaaS", "VPS Hosting"],
    live: "https://chatlo.io",
    featured: true,
    role: "Full-stack & AI",
    features: [
      "Multi-LLM engine — one prompt set run across several models for side-by-side comparison",
      "Brand visibility scoring across AI-generated answers, tracked over time",
      "Competitor share-of-voice on the prompts that matter to a category",
      "Citation analysis showing which domains the models actually pull from",
      "Scheduled prompt runs with trend dashboards and change alerts",
      "Exportable reports for clients and stakeholders",
      "Self-hosted on VPS for cost control over high-volume model calls"
    ]
  },
  {
    id: 0,
    title: "Rexa Pilot",
    status: "live",
    users: "500",
    summary: "Chrome sidebar copilot — chat with any page, your docs and the live web.",
    description: "AI copilot Chrome extension that lives as a smart sidebar in every tab. Chat with any page, your documents, and the live web. Features voice calls, a do-it-for-me browser agent, instant replies across Gmail/Slack/LinkedIn, PDF & video summarization, and a RAG-powered knowledge base — all in 50+ languages.",
    year: 2025,
    image: "/images/projects/rexapilot.jpg",
    tags: ["Vite", "Chrome Extension", "RAG", "Vector DB", "AWS Bedrock", "Agent Core", "TypeScript", "AI Agents", "Voice AI"],
    live: "https://rexapilot.com",
    featured: true,
    role: "Full-stack & AI",
    features: [
      "🧠 RAG-powered Knowledge Base — upload PDFs, slides & docs and get answers with inline citations",
      "🤖 Do-it-for-me browser agent that navigates, clicks and fills forms in your real tab",
      "🔍 Live web search with grounded, up-to-the-minute answers and numbered source citations",
      "🎙️ Live voice calls — talk to Rexa out loud with optional screen sharing",
      "⚡ Instant replies inside Gmail, Slack, LinkedIn, Outlook, X and Reddit",
      "📄 PDF & video summarization for YouTube, TikTok, Instagram, X and Facebook",
      "✍️ Writing assistant with grammar fixes, rewrites, tone changes on any text field",
      "📸 Screenshot-to-ask — drag to capture any screen region and query a vision model",
      "🌐 50+ language support with Vector DB semantic search via AWS Bedrock"
    ]
  },
  {
    id: 103,
    title: "ClawInst",
    status: "discontinued",
    users: "10k+",
    summary: "Managed OpenClaw hosting — a running AI assistant in 30 seconds.",
    description: "Managed hosting for OpenClaw, the open-source AI assistant framework. Instead of provisioning a server, wiring up Docker and babysitting an instance, users got their own sandboxed cloud instance wired to Telegram, WhatsApp, Discord or Slack — with their own choice of model and memory that persisted across conversations.",
    year: 2026,
    image: "/images/projects/clawinst.jpg",
    tags: ["Next.js", "Python", "FastAPI", "Docker", "OpenClaw", "VPS Hosting", "Multi-Model", "Telegram Bot API", "SaaS"],
    live: "https://clawinst.com",
    role: "Full-stack & AI",
    features: [
      "One-click deploy — a working instance in about 30 seconds, no Docker or terminal",
      "Private per-user cloud instance in an isolated container with filesystem sandboxing",
      "Multi-model support — Claude, GPT, Gemini and free open-source models like Llama",
      "Chat channels for Telegram, WhatsApp, Discord and Slack",
      "Persistent memory across conversations",
      "Browser control plus 59+ built-in skills",
      "Encrypted API key management behind gateway authentication"
    ]
  },
  {
    id: 1,
    title: "Rexa Hire AI",
    status: "expired",
    users: "150",
    summary: "Agentic hiring platform with voice interviews and live coding tests.",
    description: "AI-powered hiring platform with agentic workflows for smart job pages, resume ranking, and real-time interviews. Features real-time coding test execution with live code editor and voice-based interviews using OpenAI and Eleven Labs APIs.",
    year: 2025,
    image: "/images/projects/rexa-hire.jpg",
    tags: ["Next.js", "TypeScript", "React", "OpenAI", "Eleven Labs", "WebRTC", "Node.js", "MongoDB", "Redis", "WebSockets", "AI Agents", "Voice AI", "Code Editor", "Real-time"],
    live: "https://rexahire.com",
    featured: true,
    role: "Full-stack & AI",
    features: [
      "🤖 Agentic workflows for automated candidate screening and evaluation",
      "📄 Smart job page generation with AI-powered content optimization",
      "🎯 Advanced resume ranking using machine learning algorithms",
      "🎤 Voice-based real-time interviews with Eleven Labs speech synthesis",
      "💻 Real-time coding test execution with live code editor and evaluation",
      "🧠 OpenAI integration for intelligent candidate assessment",
      "⚡ WebSocket connections for real-time interview collaboration",
      "📊 Comprehensive analytics dashboard for hiring insights",
      "🔄 Automated workflow orchestration for end-to-end hiring process",
      "🎯 Personalized candidate matching with AI-driven recommendations",
      "📹 Video interview capabilities with WebRTC integration",
      "🔒 Enterprise-grade security for sensitive hiring data"
    ]
  },
  {
    id: 3,
    title: "Bioly",
    status: "expired",
    users: "8k",
    summary: "Link-in-bio platform automating bookings, payments and client comms.",
    description: "Link-in-bio platform for creators and businesses to automate services and bookings with the help of AI and automations. Streamlines scheduling, payments, and client interactions in one place.",
    year: 2024,
    image: "/images/projects/project1.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "AWS", "OpenAI", "Firebase", "MongoDB", "Redis", "Serverless", "WebSockets", "Stripe", "Razorpay", "Cashfree", "Google APIs", "Twilio", "Cloudflare"],
    live: "https://bioly.link",
    featured: true,
    role: "Full-stack",
    features: [
      "🧠 Integrated OpenAI Models and Gemini LLMs for personalized automations",
      "🟢 WhatsApp Cloud API for booking updates and notifications",
      "📸 Instagram Graph API for creator content integrations",
      "📧 Email Service for reminders and engagement",
      "📅 Google Calendar Integration for scheduling",
      "📹 Google Meet API and Zoom Video Call API for virtual meetings",
      "💳 Payment integrations with Razorpay, Stripe and Cashfree",
      "☁️ AWS for hosting & backend services with serverless architecture",
      "🌐 Cloudflare for security, performance and edge functions",
      "📊 Real-time analytics with MongoDB and Redis caching",
      "🔄 WebSocket connections for live updates and notifications"
    ]
  },
  {
    id: 4,
    title: "Dietly AI",
    status: "live",
    users: "5k+",
    summary: "Photo-based calorie tracker built on custom vision models.",
    description: "Transform your health journey with Dietly AI – the intelligent calorie counter and meal plan app that makes tracking food and fitness as easy as snapping a photo. Uses computer vision and AI to identify foods, calculate nutritional content, and provide personalized health recommendations with 5,000+ users.",
    year: 2024,
    image: "/images/projects/project2.jpg",
    tags: ["Flutter", "Dart", "Firebase", "OpenAI", "Vertex AI", "Hive", "TensorFlow Lite", "Google ML Kit", "Cloud Functions", "FCM", "Stripe", "RevenueCat", "Health APIs"],
    live: "https://www.dietly.life/",
    ios: "https://apps.apple.com/us/app/dietly-ai-snap-calories/id6769698416",
    android: "https://play.google.com/store/apps/details?id=com.dietlyai.app",
    featured: true,
    role: "Mobile & AI",
    features: [
      "📸 Advanced photo-based food recognition using custom-trained ML models",
      "🍽️ Smart meal planning with AI recommendations based on nutritional goals",
      "💪 Fitness and workout integration with activity tracking",
      "📊 Comprehensive nutrition analytics and health insights dashboard",
      "🧠 Powered by OpenAI and Vertex AI models for food identification",
      "📱 Cross-platform mobile experience with Flutter and material design",
      "🔄 Offline capabilities with Hive local database for seamless experience",
      "🔔 Smart reminders and notifications via Firebase Cloud Messaging",
      "💳 Subscription management with Stripe and RevenueCat integration",
      "🔒 Secure health data storage with end-to-end encryption"
    ]
  },
  {
    id: 5,
    title: "Snapzy",
    status: "discontinued",
    users: "15k+",
    summary: "AI avatar store — fine-tuned LoRAs printed onto physical products.",
    description: "AI avatar e-commerce platform and custom design tool. Create personalized avatars, generate instant ID images with fine-tuned LoRA models, and order custom physical products like phone cases directly from web or mobile.",
    year: 2023,
    image: "/images/projects/project1.jpg",
    tags: ["React", "Next.js", "Kotlin", "Android", "Firebase", "Stable Diffusion", "LoRA", "AWS", "WhatsApp API", "Serverless", "MVVM"],
    live: "https://snapzy.in",
    android: "https://play.google.com/store/apps/details?id=com.genai.aiphotoeditor&hl=en_IN",
    featured: true,
    role: "Full-stack & Mobile",
    features: [
      "🖼️ Custom avatar and design generation using fine-tuned LoRA models",
      "🎨 Multiple AI style options using Stable Diffusion variants",
      "📱 Cross-platform experience with Native Android app and Next.js web platform",
      "🛒 Seamless e-commerce integration for designing and purchasing phone cases",
      "☁️ AWS S3 and CloudFront for optimized image storage and delivery",
      "🔄 WhatsApp Cloud API integration for automated order notifications",
      "⚡ Serverless cloud functions for handling complex AI processing tasks",
      "📱 Firebase Cloud Messaging for real-time push notifications"
    ]
  },
  {
    id: 7,
    title: "Lattice",
    status: "discontinued",
    users: "900",
    summary: "E2E-encrypted campus social app built for TKMCE.",
    description: "Secure social networking app for colleges with end-to-end encryption and event management features. Built for TKMCE college with 900+ active users, featuring secure messaging, event organization, and campus-wide announcements.",
    year: 2022,
    image: "/images/projects/project3.jpg",
    tags: ["Kotlin", "Java", "Android", "End-to-End Encryption", "AES Cipher", "Firebase", "FCM", "Room DB", "MVVM", "Coroutines", "Jetpack"],
    android: "https://play.google.com/store/apps/details?id=com.tkmce.latticeapp&hl=en_IN",
    role: "Android",
    features: [
      "🔒 End-to-end encrypted messaging using custom AES cipher implementation",
      "📱 Native Android development with Kotlin and Java",
      "🔥 Firebase Realtime Database for instant message delivery",
      "📅 Event management system for college activities and clubs",
      "🔔 Push notifications with Firebase Cloud Messaging",
      "💾 Offline data persistence with Room Database",
      "🏗️ MVVM architecture with Jetpack components",
      "⚡ Background processing with Kotlin Coroutines",
      "👥 User authentication and profile management",
      "📢 Campus-wide announcement system for administrators"
    ]
  },
  {
    id: 8,
    title: "M FLIX OTT",
    status: "discontinued",
    users: "25k+",
    summary: "Streaming app with DRM, adaptive HLS/DASH and subscriptions.",
    description: "Video streaming platform with ExoPlayer integration, content management, and subscription features. Serving 25,000+ users with secure video delivery, adaptive streaming, and premium content management.",
    year: 2022,
    image: "/images/projects/project4.jpg",
    tags: ["Java", "Android", "ExoPlayer", "Firebase", "AWS CloudFront", "HLS", "DASH", "DRM", "FCM", "Analytics", "Subscription"],
    role: "Android",
    features: [
      "🎬 Custom ExoPlayer implementation with advanced controls and features",
      "🔐 DRM protection and anti-piracy measures for content security",
      "📊 Adaptive streaming with HLS and DASH protocols for optimal quality",
      "☁️ AWS CloudFront CDN integration for global content delivery",
      "📱 Picture-in-picture and background playback capabilities",
      "💳 In-app subscription management and premium content access",
      "📊 User analytics and content recommendation engine",
      "🔔 Push notifications for new content and personalized recommendations",
      "📋 Content categorization and advanced search functionality",
      "📶 Offline download capabilities for premium subscribers"
    ]
  }
];
