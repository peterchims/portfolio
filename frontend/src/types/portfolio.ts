export interface NavigationItem {
  id: string;
  label: string;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface LoaderContent {
  title: string;
  subtitle: string;
}

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

export interface ContentModeLabels {
  api: string;
  fallback: string;
}

export interface HeroContent {
  eyebrow: string;
  panelEyebrow: string;
  panelTitle: string;
  modeLabels: ContentModeLabels;
  headerCta: CallToAction;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
}

export interface SectionContent {
  kicker: string;
  title: string;
  copy: string;
}

export interface PortfolioSections {
  services: SectionContent;
  projects: SectionContent;
  process: SectionContent;
  contact: SectionContent;
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

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface FeaturedProject {
  title: string;
  year: string;
  category: string;
  imageUrl?: string | null;
  summary: string;
  impact: string;
  spotlight: string;
  highlights: string[];
  metrics: ProjectMetric[];
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

export interface ProjectShowcaseContent {
  highlightsLabel: string;
  metricsLabel: string;
  stackLabel: string;
  liveLabel: string;
  sourceLabel: string;
  privateLabel: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ContactFieldContent {
  label: string;
  placeholder: string;
}

export interface ContactSelectFieldContent extends ContactFieldContent {
  options: SelectOption[];
}

export interface ContactFormFields {
  name: ContactFieldContent;
  email: ContactFieldContent;
  company: ContactFieldContent;
  projectType: ContactSelectFieldContent;
  budget: ContactSelectFieldContent;
  timeline: ContactSelectFieldContent;
  message: ContactFieldContent;
}

export interface ContactFormContent {
  detailsLabel: string;
  helperText: string;
  submitLabel: string;
  submittingLabel: string;
  fields: ContactFormFields;
}

export interface FooterContent {
  tagline: string;
}

export interface PortfolioContent {
  loader: LoaderContent;
  siteNavigation: NavigationItem[];
  profile: PortfolioProfile;
  hero: HeroContent;
  sections: PortfolioSections;
  projectShowcase: ProjectShowcaseContent;
  contactForm: ContactFormContent;
  footer: FooterContent;
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
