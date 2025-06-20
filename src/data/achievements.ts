export interface Achievement {
  id: string;
  eventName: string;
  location: string;
  year: number;
  prize: string;
  projectName: string;
  description: string;
  technologies?: string[];
}

export const achievements: Achievement[] = [
  {
    id: "hack-arch",
    eventName: "Hack@Arch",
    location: "GEC Thrissur",
    year: 2022,
    prize: "2nd Place – National Level Hackathon",
    projectName: "Decentralized Real Estate Platform",
    description: "Blockchain app using Solidity and Ethereum for property transactions. Used NFTs for ownership and IPFS for storage. Reduced transaction cost by 15%.",
    technologies: ["Solidity", "Ethereum", "NFT", "IPFS", "React"]
  },
  {
    id: "latency",
    eventName: "Latency",
    location: "TKMCE IEDC",
    year: 2022,
    prize: "2nd Place – National Level Hackathon",
    projectName: "Farmers' Community Auction App",
    description: "Android app for farmers to auction bulk produce in real-time. Included bidding system and live tracking for buyers.",
    technologies: ["Android", "Firebase", "Java", "Real-time Database"]
  },
  {
    id: "magnathon",
    eventName: "Magnathon",
    location: "GEC Vadakara IEDC",
    year: 2023,
    prize: "3rd Place – Hackathon",
    projectName: "Local Vendor Sales & Delivery App",
    description: "Mobile app connecting local vendors with customers to promote and track local products. Integrated native delivery system for efficient last-mile delivery.",
    technologies: ["Flutter", "Firebase", "Google Maps API", "Real-time Tracking", "Payment Gateway"]
  }
]; 