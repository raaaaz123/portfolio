export interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export const education: Education[] = [
  {
    degree: "B.Tech. Computer Science & Engineering",
    institution: "TKM College of Engineering",
    period: "2021–2024",
    description: "Focused on advanced programming, algorithms, and AI/ML coursework."
  },
  {
    degree: "Diploma in Computer Science & Engineering",
    institution: "Madin Polytechnic",
    period: "2018–2021",
    description: "Foundations of programming, data structures, and software development."
  }
]; 