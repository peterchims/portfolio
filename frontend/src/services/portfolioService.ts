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
    return await apiRequest('/api/skills/grouped');
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
    const site = await apiRequest<{
      data: {
        profile: {
          name: string;
          role: string;
          summary: string;
          email: string;
          phone: string;
          location: string;
        };
        socialLinks: SocialLink[];
      };
    }>('/api/site');

    return {
      name: site.data.profile.name,
      role: site.data.profile.role,
      bio: site.data.profile.summary,
      email: site.data.profile.email,
      phoneNumber: site.data.profile.phone,
      location: site.data.profile.location,
      socialLinks: site.data.socialLinks,
    };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw error;
  }
}

/**
 * Fetch complete portfolio data
 */
export async function getCompletePortfolioData(): Promise<PortfolioData> {
  try {
    const [site, projects, testimonials, skills] = await Promise.all([
      apiRequest<{
        data: {
          profile: {
            name: string;
            role: string;
            summary: string;
            email: string;
            phone: string;
            location: string;
          };
          socialLinks: SocialLink[];
        };
        meta: {
          updatedAt: string;
        };
      }>('/api/site'),
      getAllProjects(),
      getTestimonials(),
      getSkills(),
    ]);

    const skillsByCategory = skills.reduce<Record<string, Skill[]>>((accumulator, skill) => {
      const category = skill.category || 'General';

      if (!accumulator[category]) {
        accumulator[category] = [];
      }

      accumulator[category].push(skill);
      return accumulator;
    }, {});

    return {
      id: site.meta.updatedAt,
      projects,
      skills,
      skillsByCategory,
      testimonials,
      profile: {
        name: site.data.profile.name,
        role: site.data.profile.role,
        bio: site.data.profile.summary,
        email: site.data.profile.email,
        phoneNumber: site.data.profile.phone,
        location: site.data.profile.location,
        socialLinks: site.data.socialLinks,
      },
      lastUpdated: site.meta.updatedAt,
    };
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error);
    throw error;
  }
}
