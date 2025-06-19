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
    id: 0,
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
    id: 1,
    title: "Bioly",
    description: "Link-in-bio platform for creators and businesses to automate services and bookings with the help of AI and automations. Streamlines scheduling, payments, and client interactions in one place.",
    image: "/images/projects/project1.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "AWS", "OpenAI", "Firebase"],
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
      "💳 Payment integrations with Razorpay and Cashfree",
      "☁️ AWS for hosting & backend services",
      "🌐 Cloudflare for security and performance"
    ]
  },
  {
    id: 2,
    title: "Snapzy App",
    description: "AI avatar e-commerce platform allowing users to create custom avatars and purchase physical products with their avatars.",
    image: "/images/projects/project1.jpg",
    tags: ["Kotlin", "Android", "MVVM", "Firebase", "LLMs"],
    github: "https://github.com/yourusername/snapzy-app",
    live: "https://play.google.com/store/apps/details?id=com.snapzy.app"
  },
  {
    id: 3,
    title: "Snapzy Web",
    description: "Web platform for designing custom phone cases with AI-generated designs and user uploads.",
    image: "/images/projects/project2.jpg",
    tags: ["React", "TypeScript", "Next.js", "AWS"],
    github: "https://github.com/yourusername/snapzy-web",
    live: "https://snapzy.com",
    featured: true,
    features: [
      "🎨 AI-powered design generation for phone cases",
      "📱 Custom phone case creation workflow",
      "🖼️ User image upload and editing capabilities",
      "🛒 E-commerce integration with secure checkout",
      "📊 User analytics and behavior tracking",
      "🔄 Seamless mobile-to-web experience"
    ]
  },
  {
    id: 4,
    title: "Lattice App",
    description: "Secure social networking app for colleges with end-to-end encryption and event management features.",
    image: "/images/projects/project3.jpg",
    tags: ["Kotlin", "Android", "Firebase", "Encryption"],
    github: "https://github.com/yourusername/lattice-app"
  },
  {
    id: 5,
    title: "M FLIX OTT App",
    description: "Video streaming platform with ExoPlayer integration, content management, and subscription features.",
    image: "/images/projects/project4.jpg",
    tags: ["Java", "Android", "ExoPlayer", "Firebase"],
    github: "https://github.com/yourusername/m-flix"
  },
  {
    id: 6,
    title: "Real Estate dApp",
    description: "Decentralized application for real estate transactions using blockchain and NFTs. 2nd Place at Hack@Arch hackathon.",
    image: "/images/projects/project1.jpg",
    tags: ["Solidity", "React", "Web3", "NFTs"],
    github: "https://github.com/yourusername/real-estate-dapp"
  },
  {
    id: 7,
    title: "Farmers Auction App",
    description: "Platform connecting farmers directly to buyers through a bidding system. 2nd Place at Latency Hackathon.",
    image: "/images/projects/project2.jpg",
    tags: ["Flutter", "Dart", "Firebase", "Google Maps"],
    github: "https://github.com/yourusername/farmers-auction"
  }
]; 