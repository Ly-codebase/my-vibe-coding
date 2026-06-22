export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  location: string;
  email: string;
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  skills: string[];
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  updatedAt: string;
}
