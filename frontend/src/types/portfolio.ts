export interface PortfolioProfile {
  name: string;
  role: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  resumeUrl: string;
}

export interface HeroMetric {
  value: string;
  label: string;
  detail: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface ServicePillar {
  title: string;
  description: string;
  bullets: string[];
}

export interface FeaturedProject {
  title: string;
  year: string;
  category: string;
  summary: string;
  impact: string;
  stack: string[];
  liveUrl: string | null;
  codeUrl: string | null;
}

export interface StackGroup {
  title: string;
  items: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface SystemSignal {
  label: string;
  value: string;
  detail: string;
  tone: 'accent' | 'support';
}

export interface PortfolioContent {
  profile: PortfolioProfile;
  heroMetrics: HeroMetric[];
  socialLinks: SocialLink[];
  servicePillars: ServicePillar[];
  featuredProjects: FeaturedProject[];
  stackGroups: StackGroup[];
  processSteps: ProcessStep[];
  systemSignals: SystemSignal[];
}

export interface SitePayload {
  data: PortfolioContent;
  meta: {
    updatedAt: string;
    source: string;
  };
}

export interface ApiHealth {
  status: string;
  timestamp: string;
  startedAt: string;
  uptimeSeconds: number;
  environment: string;
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

export interface InteractionPayload {
  event: string;
  section?: string;
  label?: string;
}
