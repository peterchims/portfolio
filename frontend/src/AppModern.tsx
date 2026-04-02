import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  PhoneCall,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react';
import { ChatWidget, type ChatConversationResult, type ChatMessage } from './components/common/ChatWidget';
import { WhatsAppButton } from './components/WhatsAppButton';
import {
  sendContactRequest,
  sendChatMessage,
  startChatConversation,
  trackInteraction,
  type ChatConversation,
} from './lib/api';
import { usePortfolioContent } from './hooks/usePortfolioContent';
import type {
  ContactPayload,
  ContactSelectFieldContent,
  FeaturedProject,
  NavigationItem,
} from './types/portfolio';

const serviceIcons = [Sparkles, Briefcase, ShieldCheck] as const;
const projectTones = [
  'project-tone-blue',
  'project-tone-teal',
  'project-tone-amber',
] as const;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const initialFormState: ContactPayload = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
};

const socialIconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

type RevealAxis = 'x' | 'y';
type ProjectGalleryTile = {
  label: string;
  value: string;
};

function getSocialIcon(label: string): LucideIcon {
  return socialIconMap[label.toLowerCase()] ?? ExternalLink;
}

function toInitials(value: string): string {
  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function formatUptime(seconds: number): string {
  if (seconds <= 0) {
    return 'Ready for new projects';
  }

  const hours = Math.floor(seconds / 3600);

  if (hours >= 24) {
    return `${Math.floor(hours / 24)}d uptime`;
  }

  if (hours > 0) {
    return `${hours}h uptime`;
  }

  return `${Math.max(1, Math.floor(seconds / 60))}m uptime`;
}

function getProjectGalleryTiles(project: FeaturedProject): ProjectGalleryTile[] {
  const primaryMetric = project.metrics[0];
  const secondaryMetric = project.metrics[1];
  const stackPreview = project.stack.slice(0, 2).join(' • ');
  const secondaryFallbackValue = stackPreview || project.year;

  return [
    {
      label: primaryMetric?.label ?? 'Focus',
      value: primaryMetric?.value ?? project.category,
    },
    {
      label: 'Outcome',
      value: project.highlights[0] ?? project.summary,
    },
    {
      label: secondaryMetric?.label ?? 'Stack',
      value: secondaryMetric?.value ?? secondaryFallbackValue,
    },
  ];
}

function mapConversationMessages(conversation: ChatConversation): ChatMessage[] {
  return conversation.messages.map((message) => ({
    id: message.id,
    content: message.content,
    sender: message.sender.toLowerCase() === 'visitor' ? 'visitor' : 'system',
    timestamp: new Date(message.createdAt),
    isAutomated: message.isAutomated,
  }));
}

function getEnterAnimation(
  prefersReducedMotion: boolean,
  options: {
    axis?: RevealAxis;
    delay?: number;
    distance?: number;
    duration?: number;
  } = {}
) {
  const {
    axis = 'y',
    delay = 0,
    distance = 22,
    duration = 0.58,
  } = options;
  const hidden = axis === 'x' ? { x: distance, y: 0 } : { y: distance, x: 0 };

  if (prefersReducedMotion) {
    return {
      initial: false as const,
      animate: { opacity: 1, x: 0, y: 0 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, ...hidden },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration, delay, ease: EASE_OUT },
  };
}

function getInViewAnimation(
  prefersReducedMotion: boolean,
  options: {
    axis?: RevealAxis;
    delay?: number;
    distance?: number;
    duration?: number;
    amount?: number;
  } = {}
) {
  const {
    axis = 'y',
    delay = 0,
    distance = 20,
    duration = 0.52,
    amount = 0.18,
  } = options;
  const hidden = axis === 'x' ? { x: distance, y: 0 } : { y: distance, x: 0 };

  if (prefersReducedMotion) {
    return {
      initial: false as const,
      whileInView: { opacity: 1, x: 0, y: 0 },
      transition: { duration: 0 },
      viewport: { once: true, amount: 0.01 },
    };
  }

  return {
    initial: { opacity: 0, ...hidden },
    whileInView: { opacity: 1, x: 0, y: 0 },
    transition: { duration, delay, ease: EASE_OUT },
    viewport: { once: true, amount },
  };
}

function LoaderScreen({
  name,
  title,
  subtitle,
}: {
  name: string;
  title: string;
  subtitle: string;
}) {
  return (
    <motion.div
      className="loader-screen"
      role="status"
      aria-live="polite"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
    >
      <div className="loader-panel">
        <div className="loader-brand">{toInitials(name)}</div>
        <div className="loader-spinner" aria-hidden="true" />
        <p className="loader-title">{title}</p>
        <p className="loader-subtitle">{subtitle}</p>
      </div>
    </motion.div>
  );
}

function SectionIntro({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="section-intro">
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-heading">{title}</h2>
      <p className="section-copy">{copy}</p>
    </div>
  );
}

function UnavailableState({ error }: { error: string | null }) {
  const healthHref = `${
    import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || ''
  }/api/health`;

  return (
    <div className="portfolio-shell portfolio-shell-unavailable">
      <div className="site-glow site-glow-left" aria-hidden="true" />
      <div className="site-glow site-glow-right" aria-hidden="true" />

      <main className="unavailable-screen">
        <motion.section
          className="surface unavailable-panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: EASE_OUT }}
        >
          <p className="section-kicker">Backend Required</p>
          <h1 className="unavailable-title">
            Portfolio content is temporarily unavailable.
          </h1>
          <p className="unavailable-copy">
            {error ??
              'The frontend is running, but the backend has not provided the live portfolio content yet.'}
          </p>
          <div className="unavailable-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={() => window.location.reload()}
            >
              Reload page
              <RefreshCw size={18} />
            </button>
            <a
              href={healthHref}
              className="button button-secondary"
              target="_blank"
              rel="noreferrer"
            >
              Check API health
              <ExternalLink size={18} />
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

function SiteHeader({
  name,
  role,
  navigation,
  ctaLabel,
  ctaHref,
  onNavigate,
}: {
  name: string;
  role: string;
  navigation: NavigationItem[];
  ctaLabel: string;
  ctaHref: string;
  onNavigate: (id: string, label: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const brandMark = toInitials(name);

  const handleNavigate = (id: string, label: string) => {
    onNavigate(id, label);
    setIsOpen(false);
  };

  return (
    <header className="site-header">
      <div className="shell site-header-inner">
        <a
          href="#home"
          className="brand-lockup"
          onClick={() => handleNavigate('home', 'Home')}
        >
          <span className="brand-mark">{brandMark}</span>
          <span className="brand-copy">
            <strong>{name}</strong>
            <small>{role}</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link"
              onClick={() => handleNavigate(item.id, item.label)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href={ctaHref}
            className="button button-primary header-cta"
            onClick={() => handleNavigate(ctaHref.replace('#', ''), ctaLabel)}
          >
            {ctaLabel}
          </a>

          <button
            type="button"
            className="nav-toggle"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: EASE_OUT }}
          >
            <div className="shell mobile-drawer-inner">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="mobile-nav-link"
                  onClick={() => handleNavigate(item.id, item.label)}
                >
                  {item.label}
                </a>
              ))}

              <a
                href={ctaHref}
                className="button button-primary mobile-nav-cta"
                onClick={() => handleNavigate(ctaHref.replace('#', ''), ctaLabel)}
              >
                {ctaLabel}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function SelectField({
  field,
  value,
  onChange,
}: {
  field: ContactSelectFieldContent;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="field-group">
      <span>{field.label}</span>
      <select
        className="input-control"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
      >
        <option value="">{field.placeholder}</option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ParallaxSection({
  children,
  distance,
  className,
}: {
  children: ReactNode;
  distance: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [distance, 0, distance * -1]
  );

  return (
    <motion.div ref={ref} style={prefersReducedMotion ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function AppModern() {
  const { content, health, loading, error } = usePortfolioContent();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [showLoader, setShowLoader] = useState(true);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [formData, setFormData] = useState<ContactPayload>(initialFormState);
  const [submitState, setSubmitState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (loading) {
      setShowLoader(true);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowLoader(false);
    }, prefersReducedMotion ? 0 : 640);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loading, content, prefersReducedMotion]);

  useEffect(() => {
    if (!content?.featuredProjects.length) {
      return;
    }

    setActiveProjectIndex((currentIndex) =>
      Math.min(currentIndex, content.featuredProjects.length - 1)
    );
  }, [content]);

  const handleNavigate = (id: string, label: string) => {
    void trackInteraction({
      event: 'navigate',
      section: id,
      label,
    });
  };

  const handleProjectLinkClick = (title: string, target: string) => {
    void trackInteraction({
      event: 'project_link',
      section: 'projects',
      label: `${title}-${target}`,
    });
  };

  const handleSocialClick = (label: string) => {
    void trackInteraction({
      event: 'social_open',
      section: 'hero',
      label,
    });
  };

  const handleActionClick = (section: string, label: string) => {
    void trackInteraction({
      event: 'cta_click',
      section,
      label,
    });
  };

  const handleStartChat = async (
    name: string,
    email: string,
    message: string
  ): Promise<ChatConversationResult> => {
    const conversation = await startChatConversation({
      visitorName: name,
      visitorEmail: email,
      initialMessage: message,
    });

    setIsChatOpen(true);
    void trackInteraction({
      event: 'chat_start',
      section: 'contact',
      label: 'conversation-created',
    });

    return {
      id: conversation.id,
      messages: mapConversationMessages(conversation),
    };
  };

  const handleSendMessage = async (
    conversationId: string,
    message: string
  ): Promise<ChatConversationResult> => {
    const conversation = await sendChatMessage(conversationId, message);

    void trackInteraction({
      event: 'chat_message',
      section: 'contact',
      label: 'conversation-updated',
    });

    return {
      id: conversation.id,
      messages: mapConversationMessages(conversation),
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState('loading');
    setSubmitMessage('');

    try {
      const response = await sendContactRequest(formData);

      setSubmitState('success');
      setSubmitMessage(`${response.message} Reference: ${response.submissionId}`);
      setFormData(initialFormState);
      void trackInteraction({
        event: 'contact_submit',
        section: 'contact',
        label: 'success',
      });
    } catch (submitError) {
      setSubmitState('error');
      setSubmitMessage(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to send your message right now.'
      );
    }
  };

  if (!content) {
    if (loading || showLoader) {
      return (
        <div className="portfolio-shell">
          <AnimatePresence mode="wait">
            <LoaderScreen
              name="Portfolio"
              title="Loading portfolio"
              subtitle="Connecting to the live content service."
            />
          </AnimatePresence>
        </div>
      );
    }

    return <UnavailableState error={error} />;
  }

  const {
    loader,
    siteNavigation,
    profile,
    hero,
    sections,
    projectShowcase,
    contactForm,
    footer,
  } = content;

  const heroCopyAnimation = getEnterAnimation(prefersReducedMotion, {
    distance: 20,
    duration: 0.56,
  });
  const heroPanelAnimation = getEnterAnimation(prefersReducedMotion, {
    delay: 0.08,
    distance: 24,
    duration: 0.62,
  });
  const liveState = hero.modeLabels.api;
  const systemState = health
    ? `${health.status} · ${formatUptime(health.uptimeSeconds)}`
    : 'Service signal pending';
  const activeProject = content.featuredProjects[activeProjectIndex]
    ?? content.featuredProjects[0]
    ?? null;
  const activeProjectTone = projectTones[activeProjectIndex % projectTones.length];
  const projectGalleryTiles = activeProject ? getProjectGalleryTiles(activeProject) : [];
  const activeProjectPanelId = activeProject
    ? `project-showcase-panel-${activeProjectIndex}`
    : undefined;

  const handleProjectSelect = (index: number) => {
    const project = content.featuredProjects[index];

    if (!project) {
      return;
    }

    setActiveProjectIndex(index);
    void trackInteraction({
      event: 'project_preview',
      section: 'projects',
      label: project.title,
    });
  };

  return (
    <div className="portfolio-shell">
      <AnimatePresence mode="wait">
        {showLoader ? (
          <LoaderScreen
            name={profile.name}
            title={loader.title}
            subtitle={loader.subtitle}
          />
        ) : null}
      </AnimatePresence>

      <div className="site-glow site-glow-left" aria-hidden="true" />
      <div className="site-glow site-glow-right" aria-hidden="true" />

      <SiteHeader
        name={profile.name}
        role={profile.role}
        navigation={siteNavigation}
        ctaLabel={hero.headerCta.label}
        ctaHref={hero.headerCta.href}
        onNavigate={handleNavigate}
      />

      <main className="page-main">
        <section id="home" className="hero-section section-block">
          <div className="shell hero-grid">
            <ParallaxSection distance={28}>
              <motion.div className="hero-copy" {...heroCopyAnimation}>
                <div className="hero-kicker-row">
                  <span className="section-kicker">{hero.eyebrow}</span>
                  <span className="status-pill">{liveState}</span>
                </div>

                <h1 className="hero-title">{profile.headline}</h1>
                <p className="hero-lead">{profile.summary}</p>

                <div className="hero-actions">
                  <a
                    href={hero.primaryCta.href}
                    className="button button-primary"
                    onClick={() => handleActionClick('hero', hero.primaryCta.label)}
                  >
                    {hero.primaryCta.label}
                    <ArrowRight size={18} />
                  </a>

                  <a
                    href={hero.secondaryCta.href}
                    className="button button-secondary"
                    onClick={() => handleActionClick('hero', hero.secondaryCta.label)}
                  >
                    {hero.secondaryCta.label}
                    <Download size={18} />
                  </a>
                </div>

                <div className="social-row">
                  {content.socialLinks.map((link) => {
                    const Icon = getSocialIcon(link.label);

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className="social-link"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleSocialClick(link.label)}
                      >
                        <Icon size={16} />
                        <span>{link.handle}</span>
                      </a>
                    );
                  })}
                </div>

                <div className="metric-grid">
                  {content.heroMetrics.map((metric, index) => (
                    <motion.article
                      key={metric.label}
                      className="surface metric-card"
                      {...getInViewAnimation(prefersReducedMotion, {
                        delay: index * 0.04,
                        distance: 18,
                      })}
                    >
                      <p className="metric-value">{metric.value}</p>
                      <p className="metric-label">{metric.label}</p>
                      <p className="metric-detail">{metric.detail}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </ParallaxSection>

            <ParallaxSection distance={-24}>
              <motion.aside className="surface hero-panel" {...heroPanelAnimation}>
                <div className="panel-head">
                  <p className="mono-label">{hero.panelEyebrow}</p>
                  <span className="status-pill status-pill-strong">
                    {health?.environment ?? 'portfolio'}
                  </span>
                </div>

                <div className={`hero-preview-frame ${activeProjectTone}`}>
                  {activeProject?.imageUrl ? (
                    <div className="hero-preview-image">
                      <img src={activeProject.imageUrl} alt={activeProject.title} />
                    </div>
                  ) : null}

                  <div className="hero-preview-main">
                    <div className="hero-preview-copy">
                      <h2 className="panel-title">
                        {activeProject?.title ?? hero.panelTitle}
                      </h2>
                      <p className="panel-copy">
                        {activeProject?.summary ?? profile.availability}
                      </p>
                    </div>

                    <div className="hero-preview-badges">
                      {(activeProject?.metrics ?? content.heroMetrics.slice(0, 2))
                        .slice(0, 3)
                        .map((metric) => (
                          <span
                            key={`${activeProject?.title ?? 'hero'}-${metric.label}`}
                            className="hero-preview-badge"
                          >
                            {metric.value}
                          </span>
                        ))}
                    </div>
                  </div>

                  <div className="hero-preview-strip">
                    {content.featuredProjects.map((project, index) => (
                      <button
                        key={project.title}
                        type="button"
                        className={`preview-card ${projectTones[index % projectTones.length]}`}
                        data-active={index === activeProjectIndex}
                        onClick={() => handleProjectSelect(index)}
                      >
                        <span>{project.category}</span>
                        <strong>{project.title}</strong>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="signal-grid">
                  {content.systemSignals.map((signal, index) => (
                    <motion.article
                      key={signal.label}
                      className="system-signal"
                      data-tone={signal.tone}
                      {...getInViewAnimation(prefersReducedMotion, {
                        delay: index * 0.05,
                        distance: 14,
                      })}
                    >
                      <p className="signal-label">{signal.label}</p>
                      <h3>{signal.value}</h3>
                      <p>{signal.detail}</p>
                    </motion.article>
                  ))}
                </div>

                <div className="profile-meta">
                  <div>
                    <MapPin size={16} />
                    <span>{profile.location}</span>
                  </div>
                  <div>
                    <ShieldCheck size={16} />
                    <span>{systemState}</span>
                  </div>
                  <div>
                    <Mail size={16} />
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </div>
                </div>
              </motion.aside>
            </ParallaxSection>
          </div>
        </section>

        <section id="services" className="section-block">
          <div className="shell">
            <SectionIntro
              kicker={sections.services.kicker}
              title={sections.services.title}
              copy={sections.services.copy}
            />

            <ParallaxSection distance={18}>
              <div className="card-grid card-grid-3">
              {content.servicePillars.map((pillar, index) => {
                const Icon = serviceIcons[index % serviceIcons.length];

                return (
                  <motion.article
                    key={pillar.title}
                    className="surface service-card"
                    {...getInViewAnimation(prefersReducedMotion, {
                      delay: index * 0.05,
                      distance: 18,
                    })}
                  >
                    <div className="icon-chip">
                      <Icon size={18} />
                    </div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                    <ul className="bullet-list">
                      {pillar.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </motion.article>
                );
              })}
              </div>
            </ParallaxSection>
          </div>
        </section>

        <section id="projects" className="section-block">
          <div className="shell">
            <SectionIntro
              kicker={sections.projects.kicker}
              title={sections.projects.title}
              copy={sections.projects.copy}
            />

            <ParallaxSection distance={-20}>
              <div className="project-showcase-shell">
                <div className="project-selector-row" role="tablist" aria-label="Featured projects">
                  {content.featuredProjects.map((project, index) => (
                    <button
                      key={project.title}
                      id={`project-tab-${index}`}
                      type="button"
                      role="tab"
                      aria-selected={index === activeProjectIndex}
                      aria-controls={`project-showcase-panel-${index}`}
                      className="project-selector-card"
                      data-active={index === activeProjectIndex}
                      onClick={() => handleProjectSelect(index)}
                    >
                      <span className="project-selector-meta">
                        {project.category} · {project.year}
                      </span>
                      <strong>{project.title}</strong>
                      <small>{project.spotlight}</small>
                    </button>
                  ))}
                </div>

                {activeProject ? (
                  <AnimatePresence mode="wait">
                    <motion.article
                      key={`${activeProject.title}-${activeProjectIndex}`}
                      id={activeProjectPanelId}
                      role="tabpanel"
                      aria-labelledby={`project-tab-${activeProjectIndex}`}
                      className="surface project-showcase-card"
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -14 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.48, ease: EASE_OUT }}
                    >
                      <div className={`project-showcase-media ${activeProjectTone}`}>
                        <div className="project-showcase-media-head">
                          <span>{activeProject.category}</span>
                          <span>{activeProject.year}</span>
                        </div>

                        {activeProject.imageUrl ? (
                          <div className="project-showcase-image">
                            <img src={activeProject.imageUrl} alt={activeProject.title} />
                          </div>
                        ) : (
                          <div className="project-showcase-placeholder" aria-hidden="true">
                            <div className="project-placeholder-mark">
                              {toInitials(activeProject.title)}
                            </div>
                            <div className="project-placeholder-panels">
                              {projectGalleryTiles.map((tile) => (
                                <div
                                  key={`${activeProject.title}-${tile.label}-placeholder`}
                                  className="project-placeholder-panel"
                                >
                                  <span>{tile.label}</span>
                                  <strong>{tile.value}</strong>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="project-showcase-gallery">
                          <div className="project-gallery-focus">
                            <p className="project-gallery-label">{activeProject.category}</p>
                            <h3>{activeProject.title}</h3>
                            <p>{activeProject.spotlight}</p>
                          </div>

                          {projectGalleryTiles.map((tile) => (
                            <div
                              key={`${activeProject.title}-${tile.label}`}
                              className="project-gallery-card"
                            >
                              <span className="project-gallery-label">{tile.label}</span>
                              <p>{tile.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="project-showcase-body">
                        <div className="project-showcase-copy">
                          <p className="project-category">{activeProject.category}</p>
                          <h3>{activeProject.title}</h3>
                          <p className="project-summary">{activeProject.summary}</p>
                          <p className="project-impact">{activeProject.impact}</p>
                        </div>

                        <div>
                          <p className="project-detail-label">
                            {projectShowcase.metricsLabel}
                          </p>
                          <div className="project-stat-grid">
                            {activeProject.metrics.map((metric) => (
                              <div
                                key={`${activeProject.title}-${metric.label}`}
                                className="project-stat"
                              >
                                <p className="project-stat-value">{metric.value}</p>
                                <p className="project-stat-label">{metric.label}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="project-showcase-details">
                          <div>
                            <p className="project-detail-label">
                              {projectShowcase.highlightsLabel}
                            </p>
                            <ul className="project-highlights">
                              {activeProject.highlights.slice(0, 3).map((item) => (
                                <li key={`${activeProject.title}-${item}`}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <p className="project-detail-label">{projectShowcase.stackLabel}</p>
                            <div className="chip-row">
                              {activeProject.stack.slice(0, 6).map((item) => (
                                <span key={`${activeProject.title}-${item}`} className="chip">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="project-links">
                          {activeProject.liveUrl ? (
                            <a
                              href={activeProject.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-link"
                              onClick={() => handleProjectLinkClick(activeProject.title, 'live')}
                            >
                              {projectShowcase.liveLabel}
                              <ExternalLink size={16} />
                            </a>
                          ) : null}

                          {activeProject.codeUrl ? (
                            <a
                              href={activeProject.codeUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-link"
                              onClick={() => handleProjectLinkClick(activeProject.title, 'code')}
                            >
                              {projectShowcase.sourceLabel}
                              <ExternalLink size={16} />
                            </a>
                          ) : null}

                          {!activeProject.liveUrl && !activeProject.codeUrl ? (
                            <span className="project-note">{projectShowcase.privateLabel}</span>
                          ) : null}
                        </div>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                ) : null}
              </div>
            </ParallaxSection>
          </div>
        </section>

        <section id="process" className="section-block">
          <div className="shell">
            <SectionIntro
              kicker={sections.process.kicker}
              title={sections.process.title}
              copy={sections.process.copy}
            />

            <ParallaxSection distance={16}>
              <div className="workflow-grid">
              <motion.article
                className="surface process-card"
                {...getInViewAnimation(prefersReducedMotion, {
                  axis: 'x',
                  distance: -18,
                  duration: 0.56,
                })}
              >
                <p className="mono-label">Workflow</p>
                <div className="process-list">
                  {content.processSteps.map((step, index) => (
                    <div key={step.title} className="process-step">
                      <div className="step-index">0{index + 1}</div>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>

              <div className="stack-grid">
                {content.stackGroups.map((group, index) => (
                  <motion.article
                    key={group.title}
                    className="surface stack-card"
                    {...getInViewAnimation(prefersReducedMotion, {
                      delay: index * 0.05,
                      distance: 18,
                    })}
                  >
                    <h3>{group.title}</h3>
                    <div className="chip-row">
                      {group.items.map((item) => (
                        <span key={`${group.title}-${item}`} className="chip chip-soft">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
              </div>
            </ParallaxSection>
          </div>
        </section>

        <section id="contact" className="section-block section-block-last">
          <div className="shell">
            <SectionIntro
              kicker={sections.contact.kicker}
              title={sections.contact.title}
              copy={sections.contact.copy}
            />

            <ParallaxSection distance={-18}>
              <div className="contact-grid">
              <motion.article
                className="surface contact-card"
                {...getInViewAnimation(prefersReducedMotion, {
                  axis: 'x',
                  distance: -18,
                })}
              >
                <div>
                  <p className="mono-label">{contactForm.detailsLabel}</p>
                  <h3>{profile.name}</h3>
                  <p className="contact-copy">{profile.availability}</p>
                </div>

                <div className="contact-meta-list">
                  <a href={`mailto:${profile.email}`} className="meta-link">
                    <Mail size={16} />
                    <span>{profile.email}</span>
                  </a>
                  <a href={`tel:${profile.phone}`} className="meta-link">
                    <PhoneCall size={16} />
                    <span>{profile.phone}</span>
                  </a>
                  <div className="meta-link meta-link-static">
                    <MapPin size={16} />
                    <span>{profile.location}</span>
                  </div>
                </div>

                <p className="contact-helper">{contactForm.helperText}</p>

                <div className="contact-socials">
                  {content.socialLinks.map((link) => {
                    const Icon = getSocialIcon(link.label);

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        className="social-link"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleSocialClick(link.label)}
                      >
                        <Icon size={16} />
                        <span>{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              </motion.article>

              <motion.form
                className="surface contact-form"
                onSubmit={handleSubmit}
                {...getInViewAnimation(prefersReducedMotion, {
                  axis: 'x',
                  distance: 18,
                })}
              >
                <div className="field-grid two-up">
                  <label className="field-group">
                    <span>{contactForm.fields.name.label}</span>
                    <input
                      className="input-control"
                      type="text"
                      value={formData.name}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      placeholder={contactForm.fields.name.placeholder}
                      required
                    />
                  </label>

                  <label className="field-group">
                    <span>{contactForm.fields.email.label}</span>
                    <input
                      className="input-control"
                      type="email"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder={contactForm.fields.email.placeholder}
                      required
                    />
                  </label>
                </div>

                <div className="field-grid two-up">
                  <label className="field-group">
                    <span>{contactForm.fields.company.label}</span>
                    <input
                      className="input-control"
                      type="text"
                      value={formData.company}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          company: event.target.value,
                        }))
                      }
                      placeholder={contactForm.fields.company.placeholder}
                      required
                    />
                  </label>

                  <SelectField
                    field={contactForm.fields.projectType}
                    value={formData.projectType}
                    onChange={(value) =>
                      setFormData((current) => ({
                        ...current,
                        projectType: value,
                      }))
                    }
                  />
                </div>

                <div className="field-grid two-up">
                  <SelectField
                    field={contactForm.fields.budget}
                    value={formData.budget}
                    onChange={(value) =>
                      setFormData((current) => ({
                        ...current,
                        budget: value,
                      }))
                    }
                  />

                  <SelectField
                    field={contactForm.fields.timeline}
                    value={formData.timeline}
                    onChange={(value) =>
                      setFormData((current) => ({
                        ...current,
                        timeline: value,
                      }))
                    }
                  />
                </div>

                <label className="field-group">
                  <span>{contactForm.fields.message.label}</span>
                  <textarea
                    className="input-control input-textarea"
                    value={formData.message}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    placeholder={contactForm.fields.message.placeholder}
                    rows={6}
                    required
                  />
                </label>

                {submitMessage ? (
                  <p
                    className={`form-message form-message-${submitState}`}
                    role="status"
                    aria-live="polite"
                  >
                    {submitMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="button button-primary submit-button"
                  disabled={submitState === 'loading'}
                >
                  {submitState === 'loading' ? (
                    <>
                      <span className="button-spinner" aria-hidden="true" />
                      {contactForm.submittingLabel}
                    </>
                  ) : (
                    <>
                      {contactForm.submitLabel}
                      <Send size={18} />
                    </>
                  )}
                </button>
              </motion.form>
              </div>
            </ParallaxSection>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div>
            <p className="mono-label">{profile.name}</p>
            <p className="footer-copy">{footer.tagline}</p>
          </div>

          <div className="footer-links">
            {siteNavigation.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleNavigate(item.id, item.label)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <ChatWidget
        brandName={profile.name}
        onStartChat={handleStartChat}
        onSendMessage={handleSendMessage}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <WhatsAppButton phoneNumber={profile.phone} />
    </div>
  );
}
