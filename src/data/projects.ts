export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  features?: string[];
  role?: string;
}

export const projects: Project[] = [
  {
    id: 102,
    title: "ClawInst",
    description: "One-click OpenClaw instance deployment platform. Spin up fully configured OpenClaw instances instantly with automated provisioning, Docker-based isolation, and integrated billing via Polar Pay.",
    image: "/images/projects/clawinst.jpg",
    tags: ["Next.js", "Docker", "VPS", "Polar Pay", "TypeScript", "OpenClaw", "Automation", "DevOps"],
    live: "https://clawinst.com",
    featured: true,
    role: "Full-stack Developer",
    features: [
      "One-click OpenClaw instance provisioning with zero configuration",
      "Docker-based container isolation for each deployed instance",
      "Automated VPS setup and resource allocation",
      "Integrated billing and subscription management via Polar Pay",
      "Real-time instance monitoring and health checks",
      "Custom domain support for deployed instances",
      "Auto-scaling and resource management",
      "Secure deployment pipeline with automated backups"
    ]
  },
  {
    id: 100,
    title: "Chatlo.io",
    description: "AI RAG-based customer engagement platform that enables businesses to provide intelligent, context-aware customer support. Built with advanced retrieval-augmented generation for accurate, real-time responses from your knowledge base.",
    image: "/images/projects/chatlo.jpg",
    tags: ["Next.js", "LangChain", "Qdrant Vector DB", "Voyage Re-ranker", "RAG", "TypeScript", "AI Agents", "Customer Support", "VPS Hosting"],
    live: "https://chatlo.io",
    featured: true,
    role: "Full-stack Developer & AI Engineer",
    features: [
      "🤖 Advanced RAG pipeline with LangChain for intelligent document retrieval",
      "🗄️ Qdrant vector database for efficient semantic search across knowledge bases",
      "🎯 Voyage re-ranker integration for highly accurate result ordering",
      "💬 Real-time customer engagement with context-aware AI responses",
      "📊 Analytics dashboard for tracking customer interactions and insights",
      "🔄 Seamless knowledge base sync and automatic document processing",
      "⚡ Self-hosted on VPS (12GB) for optimal performance and data control",
      "🔒 Enterprise-grade security for sensitive customer data",
      "🌐 Multi-channel support for web, chat widgets, and API integration",
      "📈 Continuous learning and improvement from customer interactions"
    ]
  },
  {
    id: 101,
    title: "Notes.chatlo.io",
    description: "AI-powered note-taking application with seamless web and mobile experiences. Features intelligent RAG-based search, smart organization, and AI-assisted writing to help you capture and retrieve knowledge effortlessly.",
    image: "/images/projects/notes-chatlo.jpg",
    tags: ["Next.js", "React Native", "RAG", "TypeScript", "AI", "Mobile App", "Web App", "VPS Hosting", "Vector Search"],
    live: "https://notes.chatlo.io",
    featured: true,
    role: "Full-stack Developer & Mobile Developer",
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
    id: 0,
    title: "Makemyflyer App",
    description: "AI-powered photo editor and image generator mobile app. Create stunning photos, remove backgrounds, restore old photos, make professional headshots, and generate images from text prompts with advanced AI technology.",
    image: "/images/projects/makemyflyer-app.jpg",
    tags: ["React Native", "TypeScript", "AI", "Image Processing", "Machine Learning", "Photo Editor", "Background Removal", "Text-to-Image", "Firebase", "Cloud Functions"],
    live: "https://play.google.com/store/apps/details?id=com.flyeraidesigner.app",
    featured: true,
    role: "Mobile App Developer",
    features: [
      "🎨 AI-powered photo editing with advanced filters and effects",

      12+12+      "🖼️ Text-to-image generation using state-of-the-art AI models",
      "✂️ One-tap background removal with transparent PNG export",
      "📸 Photo restoration and colorization for old or damaged images",
      "👔 Professional AI headshot generation for LinkedIn and resumes",
      "👗 Virtual try-on feature for digital outfit experimentation",
      "🎭 Multiple art styles including anime, Pixar, Disney, and more",
      "⚡ AI upscaling, noise reduction, and image enhancement tools",
      "📱 Cross-platform mobile experience with React Native",
      "🔒 Private and secure image processing with user data control"
    ]
  },
  {
    id: 1,
    title: "Rexa Hire AI",
    description: "AI-powered hiring platform with agentic workflows for smart job pages, resume ranking, and real-time interviews. Features real-time coding test execution with live code editor and voice-based interviews using OpenAI and Eleven Labs APIs.",
    image: "/images/projects/rexa-hire.jpg",
    tags: ["Next.js", "TypeScript", "React", "OpenAI", "Eleven Labs", "WebRTC", "Node.js", "MongoDB", "Redis", "WebSockets", "AI Agents", "Voice AI", "Code Editor", "Real-time"],
    live: "https://rexahire.com",
    featured: true,
    role: "Full-stack developer & AI Engineer",
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
    id: 2,
    title: "MakeMyFlyer.com",
    description: "Transform your products into AI-powered designs. Create stunning flyers, ads, and marketing materials in seconds with our AI design tool. Generate faceless videos and professional visuals without design skills.",
    image: "/images/projects/project1.jpg",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "OpenAI", "Gemini 2.5", "Runway ML", "Google Veo3"],
    live: "https://makemyflyer.com",
    featured: true,
    role: "Full-stack developer",
    features: [
      "🎨 AI-powered design generation for marketing materials",
      "🖼️ Faceless video creation using advanced ML models",
      "✨ Integration with multiple AI image generation models",
      "🔄 Seamless conversion of product descriptions to visuals",
      "📱 Responsive design across all devices",
      "🚀 High-performance rendering and processing",
      "🧠 Integrated with Gemini 2.5 LLM for creative content",
      "🎬 Runway ML for video creation capabilities",
      "🔎 Google Veo3 integration for enhanced visual search"
    ]
  },
  {
    id: 3,
    title: "Bioly",
    description: "Link-in-bio platform for creators and businesses to automate services and bookings with the help of AI and automations. Streamlines scheduling, payments, and client interactions in one place.",
    image: "/images/projects/project1.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "AWS", "OpenAI", "Firebase", "MongoDB", "Redis", "Serverless", "WebSockets", "Stripe", "Razorpay", "Cashfree", "Google APIs", "Twilio", "Cloudflare"],
    live: "https://bioly.link",
    github: "https://github.com/yourusername/bioly",
    featured: true,
    role: "Full-stack developer",
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
    title: "Dietly AI Nutrition & Calorie Tracker",
    description: "Transform your health journey with Dietly AI – the intelligent calorie counter and meal plan app that makes tracking food and fitness as easy as snapping a photo. Uses computer vision and AI to identify foods, calculate nutritional content, and provide personalized health recommendations with over 50,000+ users worldwide.",
    image: "/images/projects/project2.jpg",
    tags: ["Flutter", "Dart", "Firebase", "OpenAI", "Vertex AI", "Hive", "TensorFlow Lite", "Google ML Kit", "Cloud Functions", "FCM", "Stripe", "RevenueCat", "Health APIs"],
    github: "https://github.com/yourusername/dietly-ai",
    live: "https://play.google.com/store/apps/details?id=com.rexa.nutrizenai",
    featured: true,
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
    title: "Snapzy App",
    description: "AI avatar e-commerce platform allowing users to create custom avatars and purchase physical products with their avatars. Utilizes fine-tuned LoRA models for instant ID image generation with personalized styles.",
    image: "/images/projects/project1.jpg",
    tags: ["Kotlin", "Android", "MVVM", "Firebase", "LLMs", "LoRA", "Stable Diffusion", "AWS", "CloudFront", "WhatsApp API", "FCM", "Cloud Functions"],
    github: "https://github.com/yourusername/snapzy-app",
    live: "https://play.google.com/store/apps/details?id=com.genai.aiphotoeditor&hl=en_IN",
    features: [
      "🖼️ Custom avatar generation with fine-tuned LoRA models",
      "🎨 Multiple AI style options using Stable Diffusion variants",
      "☁️ AWS S3 and CloudFront for image storage and CDN delivery",
      "📱 Firebase Cloud Messaging for real-time push notifications",
      "🔄 WhatsApp Cloud API integration for order tracking updates",
      "⚡ Serverless cloud functions for AI processing tasks",
      "🛒 Seamless e-commerce integration with secure checkout",
      "📊 User behavior analytics and personalization"
    ]
  },
  {
    id: 6,
    title: "Snapzy Web",
    description: "Web platform for designing custom phone cases with AI-generated designs and user uploads. Features advanced image processing and a seamless ordering experience.",
    image: "/images/projects/project2.jpg",
    tags: ["React", "TypeScript", "Next.js", "AWS", "CloudFront", "Stable Diffusion", "LoRA", "WhatsApp API", "Serverless", "Cloud Functions", "Tailwind CSS"],
    github: "https://github.com/yourusername/snapzy-web",
    live: "https://snapzy.in",
    featured: true,
    features: [
      "🎨 AI-powered design generation for phone cases using custom LoRA models",
      "🖼️ Fine-tuned Stable Diffusion models for instant ID image generation",
      "📱 Custom phone case creation workflow with live preview",
      "🔄 WhatsApp Cloud API for order notifications and tracking updates",
      "☁️ AWS S3 and CloudFront for optimized image storage and delivery",
      "⚡ Serverless cloud functions for handling AI processing workloads",
      "🛒 E-commerce integration with secure checkout process",
      "📊 User analytics and behavior tracking for personalization",
      "🔄 Seamless mobile-to-web experience with shared user accounts"
    ]
  },
  {
    id: 7,
    title: "Lattice App",
    description: "Secure social networking app for colleges with end-to-end encryption and event management features. Built for TKMCE college with 5,000+ active users, featuring secure messaging, event organization, and campus-wide announcements.",
    image: "/images/projects/project3.jpg",
    tags: ["Kotlin", "Java", "Android", "Firebase", "End-to-End Encryption", "AES Cipher", "FCM", "Room DB", "MVVM", "Coroutines", "Jetpack"],
    github: "https://github.com/yourusername/lattice-app",
    live: "https://play.google.com/store/apps/details?id=com.tkmce.latticeapp&hl=en_IN",
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
    title: "M FLIX OTT App",
    description: "Video streaming platform with ExoPlayer integration, content management, and subscription features. Serving 10,000+ users with secure video delivery, adaptive streaming, and premium content management.",
    image: "/images/projects/project4.jpg",
    tags: ["Java", "Android", "ExoPlayer", "Firebase", "AWS CloudFront", "HLS", "DASH", "DRM", "FCM", "Analytics", "Subscription"],
    github: "https://github.com/yourusername/m-flix",
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