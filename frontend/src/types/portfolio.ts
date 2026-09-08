export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  resumeUrl: string;
  socials: SocialLink[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface Service {
  title: string;
  description: string;
  bullets: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface StackGroup {
  title: string;
  items: string[];
}

export interface CaseStudy {
  problem: string;
  approach: string;
  decisions: string[];
  outcome: string;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  role: string;
  highlights: string[];
  stack: string[];
  liveUrl: string | null;
  codeUrl: string | null;
  featured: boolean;
  caseStudy: CaseStudy;
}

export interface AboutContent {
  heading: string;
  paragraphs: string[];
  facts: { label: string; value: string }[];
}

export interface SeoMeta {
  title: string;
  description: string;
  path: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
  message: string;
  submissionId: string;
}

export interface ApiHealth {
  status: string;
  environment: string;
  uptimeSeconds: number;
}

export interface InteractionPayload {
  event: string;
  section?: string;
  label?: string;
}
