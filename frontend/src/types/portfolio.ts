import type { LucideIcon } from 'lucide-react';

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
  /** Portrait for the About section. Drop a file in /public/images and point here. */
  photoUrl: string | null;
  /** GitHub username, used for the stats widgets. */
  githubUser: string;
  socials: SocialLink[];
}

export interface NavItem {
  id: string;
  label: string;
  /** Lucide icon component, shown beside the label in the nav. */
  Icon: LucideIcon;
}

export interface Service {
  title: string;
  description: string;
  /** Short capability tags shown as pills. */
  tags: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface CaseStudy {
  problem: string;
  approach: string;
  decisions: string[];
  outcome: string;
}

export interface ProjectFigure {
  /** Path under /public/images, or null to render a captioned placeholder. */
  src: string | null;
  alt: string;
  caption: string;
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
  /** Optional real screenshot for the card / case-study hero. */
  image: string | null;
  /** Hue (0-360) for the generated cover when there is no image. */
  hue: number;
  caseStudy: CaseStudy;
  /** In-body figures for the case study. */
  figures: ProjectFigure[];
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
