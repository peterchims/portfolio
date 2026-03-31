import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import { sendContactRequest, trackInteraction } from './lib/api';
import { usePortfolioContent } from './hooks/usePortfolioContent';
import type {
  ContactPayload,
  ContactSelectFieldContent,
  NavigationItem,
} from './types/portfolio';

const serviceIcons = [Sparkles, Briefcase, ShieldCheck] as const;
const projectTones = [
  'project-tone-blue',
  'project-tone-teal',
  'project-tone-amber',
] as const;

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
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
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
  const healthHref = `${import.meta.env.VITE_API_BASE_URL || ''}/api/health`;

  return (
    <div className="portfolio-shell portfolio-shell-unavailable">
      <div className="site-glow site-glow-left" aria-hidden="true" />
      <div className="site-glow site-glow-right" aria-hidden="true" />

      <main className="unavailable-screen">
        <motion.section
          className="surface unavailable-panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
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
            transition={{ duration: 0.24, ease: 'easeOut' }}
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

export default function AppModern() {
  const { content, health, loading, error } = usePortfolioContent();
  const [showLoader, setShowLoader] = useState(true);
  const [formData, setFormData] = useState<ContactPayload>(initialFormState);
  const [submitState, setSubmitState] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (loading) {
      setShowLoader(true);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowLoader(false);
    }, 700);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loading, content]);

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
  const liveState = hero.modeLabels.api;
  const systemState = health
    ? `${health.status} · ${formatUptime(health.uptimeSeconds)}`
    : 'Service signal pending';
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

      <main>
        <section id="home" className="hero-section">
          <div className="shell hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
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
                {content.heroMetrics.map((metric) => (
                  <article key={metric.label} className="surface metric-card">
                    <p className="metric-value">{metric.value}</p>
                    <p className="metric-label">{metric.label}</p>
                    <p className="metric-detail">{metric.detail}</p>
                  </article>
                ))}
              </div>
            </motion.div>

            <motion.aside
              className="surface hero-panel"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, ease: 'easeOut', delay: 0.08 }}
            >
              <div className="panel-head">
                <p className="mono-label">{hero.panelEyebrow}</p>
                <span className="status-pill status-pill-strong">
                  {health?.environment ?? 'portfolio'}
                </span>
              </div>

              <h2 className="panel-title">{hero.panelTitle}</h2>
              <p className="panel-copy">{profile.availability}</p>

              <div className="signal-list">
                {content.systemSignals.map((signal) => (
                  <article
                    key={signal.label}
                    className="system-signal"
                    data-tone={signal.tone}
                  >
                    <p className="signal-label">{signal.label}</p>
                    <h3>{signal.value}</h3>
                    <p>{signal.detail}</p>
                  </article>
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
          </div>
        </section>

        <section id="services" className="section-block">
          <div className="shell">
            <SectionIntro
              kicker={sections.services.kicker}
              title={sections.services.title}
              copy={sections.services.copy}
            />

            <div className="card-grid card-grid-3">
              {content.servicePillars.map((pillar, index) => {
                const Icon = serviceIcons[index % serviceIcons.length];

                return (
                  <motion.article
                    key={pillar.title}
                    className="surface service-card"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true, amount: 0.2 }}
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
          </div>
        </section>

        <section id="projects" className="section-block">
          <div className="shell">
            <SectionIntro
              kicker={sections.projects.kicker}
              title={sections.projects.title}
              copy={sections.projects.copy}
            />

            <div className="project-grid">
              {content.featuredProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  className="surface project-card"
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div
                    className={`project-visual ${projectTones[index % projectTones.length]}`}
                  >
                    <div className="project-visual-head">
                      <span>{project.category}</span>
                      <span>{project.year}</span>
                    </div>
                    <div className="project-mark">{toInitials(project.title)}</div>
                    <p className="project-spotlight">{project.spotlight}</p>
                    <p className="project-visual-copy">{project.impact}</p>
                  </div>

                  <div className="project-body">
                    <h3>{project.title}</h3>
                    <p className="project-summary">{project.summary}</p>

                    <div className="project-stat-grid">
                      {project.metrics.map((metric) => (
                        <div key={`${project.title}-${metric.label}`} className="project-stat">
                          <p className="project-stat-value">{metric.value}</p>
                          <p className="project-stat-label">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    <div className="project-detail-grid">
                      <div>
                        <p className="project-detail-label">
                          {projectShowcase.highlightsLabel}
                        </p>
                        <ul className="project-highlights">
                          {project.highlights.map((item) => (
                            <li key={`${project.title}-${item}`}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="project-detail-label">{projectShowcase.stackLabel}</p>
                        <div className="chip-row">
                          {project.stack.map((item) => (
                            <span key={`${project.title}-${item}`} className="chip">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="project-links">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-link"
                          onClick={() => handleProjectLinkClick(project.title, 'live')}
                        >
                          {projectShowcase.liveLabel}
                          <ExternalLink size={16} />
                        </a>
                      ) : null}

                      {project.codeUrl ? (
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-link"
                          onClick={() => handleProjectLinkClick(project.title, 'code')}
                        >
                          {projectShowcase.sourceLabel}
                          <ExternalLink size={16} />
                        </a>
                      ) : null}

                      {!project.liveUrl && !project.codeUrl ? (
                        <span className="project-note">{projectShowcase.privateLabel}</span>
                      ) : null}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section-block">
          <div className="shell">
            <SectionIntro
              kicker={sections.process.kicker}
              title={sections.process.title}
              copy={sections.process.copy}
            />

            <div className="workflow-grid">
              <motion.article
                className="surface process-card"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true, amount: 0.2 }}
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
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    viewport={{ once: true, amount: 0.2 }}
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
          </div>
        </section>

        <section id="contact" className="section-block section-block-last">
          <div className="shell">
            <SectionIntro
              kicker={sections.contact.kicker}
              title={sections.contact.title}
              copy={sections.contact.copy}
            />

            <div className="contact-grid">
              <motion.article
                className="surface contact-card"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true, amount: 0.2 }}
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
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55 }}
                viewport={{ once: true, amount: 0.2 }}
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
                  <p className={`form-message form-message-${submitState}`}>
                    {submitMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="button button-primary submit-button"
                  disabled={submitState === 'loading'}
                >
                  {submitState === 'loading'
                    ? contactForm.submittingLabel
                    : contactForm.submitLabel}
                  <Send size={18} />
                </button>
              </motion.form>
            </div>
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
    </div>
  );
}
