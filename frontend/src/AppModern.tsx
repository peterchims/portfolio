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
  Send,
  ShieldCheck,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react';
import { sendContactRequest, trackInteraction } from './lib/api';
import { usePortfolioContent } from './hooks/usePortfolioContent';
import type { ContactPayload } from './types/portfolio';

const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

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

function LoaderScreen({ name }: { name: string }) {
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
        <p className="loader-title">Loading portfolio workspace</p>
        <p className="loader-subtitle">Designing a cleaner view of product delivery.</p>
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

function SiteHeader({
  name,
  onNavigate,
}: {
  name: string;
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
            <small>Portfolio system</small>
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
            href="#contact"
            className="button button-primary header-cta"
            onClick={() => handleNavigate('contact', 'Contact')}
          >
            Start a project
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
                href="#contact"
                className="button button-primary mobile-nav-cta"
                onClick={() => handleNavigate('contact', 'Contact')}
              >
                Start a project
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default function AppModern() {
  const { content, health, source, loading } = usePortfolioContent();
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
  }, [loading]);

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

  const handleResumeClick = () => {
    void trackInteraction({
      event: 'resume_open',
      section: 'hero',
      label: 'resume',
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
    } catch (error) {
      setSubmitState('error');
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send your message right now.'
      );
    }
  };

  const liveState = source === 'api' ? 'Live content feed' : 'Fallback content feed';
  const systemState = health
    ? `${health.status} · ${formatUptime(health.uptimeSeconds)}`
    : 'Service signal pending';

  return (
    <div className="portfolio-shell">
      <AnimatePresence mode="wait">
        {showLoader ? <LoaderScreen name={content.profile.name} /> : null}
      </AnimatePresence>

      <div className="site-glow site-glow-left" aria-hidden="true" />
      <div className="site-glow site-glow-right" aria-hidden="true" />

      <SiteHeader name={content.profile.name} onNavigate={handleNavigate} />

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
                <span className="section-kicker">
                  {content.profile.role} · {content.profile.location}
                </span>
                <span className="status-pill">{liveState}</span>
              </div>

              <h1 className="hero-title">{content.profile.headline}</h1>
              <p className="hero-lead">{content.profile.summary}</p>

              <div className="hero-actions">
                <a
                  href="#projects"
                  className="button button-primary"
                  onClick={() => handleNavigate('projects', 'Projects')}
                >
                  View projects
                  <ArrowRight size={18} />
                </a>

                <a
                  href={content.profile.resumeUrl}
                  className="button button-secondary"
                  onClick={handleResumeClick}
                >
                  Download resume
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
                <p className="mono-label">Operational snapshot</p>
                <span className="status-pill status-pill-strong">
                  {health?.environment ?? 'portfolio'}
                </span>
              </div>

              <h2 className="panel-title">Readable systems with backend discipline.</h2>
              <p className="panel-copy">{content.profile.availability}</p>

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
                  <span>{content.profile.location}</span>
                </div>
                <div>
                  <ShieldCheck size={16} />
                  <span>{systemState}</span>
                </div>
                <div>
                  <Mail size={16} />
                  <a href={`mailto:${content.profile.email}`}>{content.profile.email}</a>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section id="services" className="section-block">
          <div className="shell">
            <SectionIntro
              kicker="Capabilities"
              title="Product work that stays sharp in the interface and stable in delivery."
              copy="The focus here is cleaner hierarchy, stronger contracts, and production-aware execution instead of decorative complexity."
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
              kicker="Featured projects"
              title="Project models shaped around practical product goals."
              copy="Each card below is driven by the portfolio content model, so the UI can present real work without relying on filler copy or generic stock positioning."
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
                    <p className="project-visual-copy">{project.impact}</p>
                  </div>

                  <div className="project-body">
                    <div className="project-title-row">
                      <h3>{project.title}</h3>
                    </div>

                    <p className="project-summary">{project.summary}</p>

                    <div className="chip-row">
                      {project.stack.map((item) => (
                        <span key={`${project.title}-${item}`} className="chip">
                          {item}
                        </span>
                      ))}
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
                          Live site
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
                          Source
                          <ExternalLink size={16} />
                        </a>
                      ) : null}

                      {!project.liveUrl && !project.codeUrl ? (
                        <span className="project-note">
                          Private build. Walkthrough available on request.
                        </span>
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
              kicker="Delivery process"
              title="A build path that keeps the frontend readable and the system maintainable."
              copy="The process is explicit: define the model, shape the system, then ship an interface that does not collapse under growth."
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
              kicker="Contact"
              title="Need a cleaner frontend, a steadier backend, or both."
              copy="Use the form for serious product work, redesigns, implementation support, or delivery cleanup. The request is sent through the shared API layer, not a hard-coded local endpoint."
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
                  <p className="mono-label">Contact details</p>
                  <h3>{content.profile.name}</h3>
                  <p className="contact-copy">{content.profile.availability}</p>
                </div>

                <div className="contact-meta-list">
                  <a href={`mailto:${content.profile.email}`} className="meta-link">
                    <Mail size={16} />
                    <span>{content.profile.email}</span>
                  </a>
                  <a href={`tel:${content.profile.phone}`} className="meta-link">
                    <PhoneCall size={16} />
                    <span>{content.profile.phone}</span>
                  </a>
                  <div className="meta-link meta-link-static">
                    <MapPin size={16} />
                    <span>{content.profile.location}</span>
                  </div>
                </div>

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
                    <span>Name</span>
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
                      placeholder="Your name"
                      required
                    />
                  </label>

                  <label className="field-group">
                    <span>Email</span>
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
                      placeholder="you@company.com"
                      required
                    />
                  </label>
                </div>

                <div className="field-grid two-up">
                  <label className="field-group">
                    <span>Company</span>
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
                      placeholder="Company or team"
                      required
                    />
                  </label>

                  <label className="field-group">
                    <span>Project type</span>
                    <select
                      className="input-control"
                      value={formData.projectType}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          projectType: event.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">Select one</option>
                      <option value="frontend-redesign">Frontend redesign</option>
                      <option value="full-stack-build">Full-stack build</option>
                      <option value="backend-integration">Backend integration</option>
                      <option value="maintenance">Maintenance and cleanup</option>
                    </select>
                  </label>
                </div>

                <div className="field-grid two-up">
                  <label className="field-group">
                    <span>Budget</span>
                    <select
                      className="input-control"
                      value={formData.budget}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          budget: event.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">Select budget</option>
                      <option value="under-2k">Under $2k</option>
                      <option value="2k-5k">$2k to $5k</option>
                      <option value="5k-10k">$5k to $10k</option>
                      <option value="10k-plus">$10k+</option>
                    </select>
                  </label>

                  <label className="field-group">
                    <span>Timeline</span>
                    <select
                      className="input-control"
                      value={formData.timeline}
                      onChange={(event) =>
                        setFormData((current) => ({
                          ...current,
                          timeline: event.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">As soon as possible</option>
                      <option value="2-4-weeks">2 to 4 weeks</option>
                      <option value="1-2-months">1 to 2 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </label>
                </div>

                <label className="field-group">
                  <span>Project brief</span>
                  <textarea
                    className="input-control input-textarea"
                    value={formData.message}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    placeholder="What are you building, what is broken, and what outcome do you need?"
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
                  {submitState === 'loading' ? 'Sending...' : 'Send project brief'}
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
            <p className="mono-label">{content.profile.name}</p>
            <p className="footer-copy">
              Building interfaces that stay readable and systems that stay reliable.
            </p>
          </div>

          <div className="footer-links">
            {navigation.map((item) => (
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
