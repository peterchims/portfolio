/**
 * Portfolio Data Service
 * Fetches all portfolio content from backend API
 * No hardcoded data - fully API-driven
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || '';

async function apiRequest<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl: string;
  sourceUrl: string;
  featured: boolean;
  completedDate: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  rating: number;
  imageUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export interface Profile {
  name: string;
  role: string;
  bio: string;
  email: string;
  phoneNumber: string;
  location: string;
  profileImageUrl?: string;
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  id: string;
  projects: Project[];
  skills: Skill[];
  skillsByCategory: Record<string, Skill[]>;
  testimonials: Testimonial[];
  profile: Profile;
  lastUpdated: string;
}

/**
 * Fetch all featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    return await apiRequest('/api/projects/featured');
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    return [];
  }
}

/**
 * Fetch all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    return await apiRequest('/api/projects');
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

/**
 * Fetch all skills
 */
export async function getSkills(): Promise<Skill[]> {
  try {
    return await apiRequest('/api/skills');
  } catch (error) {
    console.error('Failed to fetch skills:', error);
    return [];
  }
}

/**
 * Fetch skills grouped by category
 */
export async function getSkillsByCategory(): Promise<Record<string, Skill[]>> {
  try {
    return await apiRequest('/api/skills/by-category');
  } catch (error) {
    console.error('Failed to fetch skills by category:', error);
    return {};
  }
}

/**
 * Fetch all testimonials
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await apiRequest('/api/testimonials');
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return [];
  }
}

/**
 * Fetch portfolio profile information
 */
export async function getProfile(): Promise<Profile> {
  try {
    return await apiRequest('/api/portfolio/profile');
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return {
      name: 'Peter4Tech',
      role: 'Full-Stack Developer',
      bio: 'Building digital solutions',
      email: 'contact@peter4tech.com',
      phoneNumber: '',
      location: '',
      socialLinks: [],
    };
  }
}

/**
 * Fetch complete portfolio data
 */
export async function getCompletePortfolioData(): Promise<PortfolioData> {
  try {
    return await apiRequest('/api/portfolio');
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error);
    return {
      id: '',
      projects: [],
      skills: [],
      skillsByCategory: {},
      testimonials: [],
      profile: {
        name: 'Peter4Tech',
        role: 'Full-Stack Developer',
        bio: 'Building digital solutions',
        email: 'contact@peter4tech.com',
        phoneNumber: '',
        location: '',
        socialLinks: [],
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}
