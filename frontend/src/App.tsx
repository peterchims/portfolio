import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Database,
  FolderKanban,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { SectionHeading } from './components/SectionHeading';
import { StatusPill } from './components/StatusPill';
import { sendContactRequest, trackInteraction } from './lib/api';
import { usePortfolioContent } from './hooks/usePortfolioContent';
import type { ContactPayload } from './types/portfolio';

const initialForm: ContactPayload = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
};

const socialIcons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

function App() {
  const { content, health, source, loading } = usePortfolioContent();
  const [form, setForm] = useState<ContactPayload>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const healthTone =
    source === 'api' && health?.status === 'ok' ? 'good' : source === 'api' ? 'neutral' : 'warn';
  const healthLabel =
    source === 'api' && health?.status === 'ok'
      ? 'API online'
      : loading
        ? 'Checking runtime'
        : 'Fallback content';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionState(null);

    try {
      const result = await sendContactRequest(form);
      setSubmissionState({
        type: 'success',
        message: `${result.message} Ref: ${result.submissionId}`,
      });
      setForm(initialForm);
      void trackInteraction({
        event: 'contact_submit',
        section: 'contact',
        label: 'portfolio-contact',
      });
    } catch (error) {
      setSubmissionState({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Message could not be delivered right now.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="accent-orb left-[-8rem] top-16 h-72 w-72 bg-[var(--accent-sand)]/50" />
        <div className="accent-orb right-[-5rem] top-[18rem] h-96 w-96 bg-[var(--accent-teal)]/20" />
        <div className="accent-orb bottom-[-7rem] left-1/3 h-80 w-80 bg-[var(--accent-copper)]/15" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-6 sm:px-6 lg:px-8">
        <header className="paper-panel sticky top-4 z-30 mb-10 flex items-center justify-between rounded-full px-5 py-3 reveal-up">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ink-strong)] text-sm font-bold uppercase tracking-[0.2em] text-[var(--bg-panel)]">
              PO
            </span>
            <span>
              <span className="block text-sm font-semibold text-[var(--ink-strong)]">
                {content.profile.name}
              </span>
              <span className="mono-label text-[var(--ink-muted)]">
                {content.profile.role}
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--ink-soft)] md:flex">
            <a href="#work">Work</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#systems">Systems</a>
            <a href="#contact">Contact</a>
          </nav>

          <a
            href={content.profile.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--ink-strong)] px-4 py-2 text-sm font-semibold text-[var(--bg-panel)] transition-transform duration-200 hover:-translate-y-0.5"
            onClick={() =>
              void trackInteraction({
                event: 'cta_click',
                section: 'header',
                label: 'resume-download',
              })
            }
          >
            Resume
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </header>

        <main className="space-y-10" id="top">
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]" id="hero">
            <div className="section-frame grid-wash reveal-up">
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <StatusPill label={healthLabel} tone={healthTone} />
                <StatusPill label={content.profile.availability} />
              </div>

              <p className="section-label mb-5">Full-stack delivery for serious product work</p>
              <h1 className="display-title max-w-4xl text-5xl text-[var(--ink-strong)] sm:text-6xl lg:text-7xl">
                {content.profile.headline}
              </h1>
              <p className="body-copy mt-6 max-w-2xl text-lg leading-8 sm:text-xl">
                {content.profile.summary}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-copper)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[color:var(--ink-strong)]"
                  onClick={() =>
                    void trackInteraction({
                      event: 'cta_click',
                      section: 'hero',
                      label: 'start-project',
                    })
                  }
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line-soft)] bg-white/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--ink-strong)] transition-all duration-200 hover:-translate-y-0.5"
                >
                  View selected work
                </a>
              </div>

              <div className="mt-12 grid gap-4 md:grid-cols-3">
                {content.heroMetrics.map(metric => (
                  <article key={metric.label} className="lift-card rounded-[24px] border border-[var(--line-soft)] bg-white/70 p-5">
                    <p className="text-2xl font-extrabold text-[var(--ink-strong)]">
                      {metric.value}
                    </p>
                    <p className="mt-2 font-semibold text-[var(--ink-strong)]">
                      {metric.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
                      {metric.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="section-frame reveal-up [animation-delay:120ms]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-label">Runtime Snapshot</p>
                  <h2 className="mt-3 text-2xl font-extrabold text-[var(--ink-strong)]">
                    Portfolio now runs like an application, not a template.
                  </h2>
                </div>
                <div className="rounded-2xl bg-[var(--ink-strong)] p-3 text-[var(--bg-panel)]">
                  <Server className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {content.systemSignals.map(signal => (
                  <div
                    key={signal.label}
                    className="rounded-[22px] border border-[var(--line-soft)] bg-white/70 p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="mono-label text-[var(--ink-muted)]">{signal.label}</p>
                      <StatusPill
                        label={signal.value}
                        tone={signal.tone === 'accent' ? 'good' : 'neutral'}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
                      {signal.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 rounded-[24px] border border-dashed border-[var(--line-soft)] bg-[var(--bg-panel)]/80 p-5">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-[var(--accent-teal)]" />
                  <span className="font-semibold text-[var(--ink-strong)]">
                    Health endpoint
                  </span>
                </div>
                <p className="text-sm leading-6 text-[var(--ink-soft)]">
                  {health
                    ? `Environment: ${health.environment}. Uptime: ${Math.floor(health.uptimeSeconds)}s.`
                    : 'Runtime health will appear here once the API is reachable.'}
                </p>
                <p className="mono-label text-[var(--ink-muted)]">
                  source: {source}
                </p>
              </div>
            </aside>
          </section>

          <section className="section-frame reveal-up [animation-delay:180ms]" id="work">
            <SectionHeading
              eyebrow="Selected Work"
              title="Focused builds with clearer product direction."
              description="The rebuild trims the usual portfolio noise and makes the work easier to assess: what the product is, what changed, and what stack carried the execution."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {content.featuredProjects.map(project => (
                <article
                  key={project.title}
                  className="lift-card flex h-full flex-col rounded-[28px] border border-[var(--line-soft)] bg-white/72 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mono-label text-[var(--ink-muted)]">
                        {project.category} / {project.year}
                      </p>
                      <h3 className="mt-3 text-2xl font-extrabold text-[var(--ink-strong)]">
                        {project.title}
                      </h3>
                    </div>
                    <FolderKanban className="h-5 w-5 text-[var(--accent-copper)]" />
                  </div>

                  <p className="mt-5 text-sm leading-7 text-[var(--ink-soft)]">
                    {project.summary}
                  </p>
                  <p className="mt-4 rounded-[20px] bg-[var(--bg-panel)] px-4 py-3 text-sm leading-6 text-[var(--ink-strong)]">
                    {project.impact}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map(item => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--line-soft)] bg-white px-3 py-1 text-xs font-medium text-[var(--ink-soft)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--ink-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--bg-panel)]"
                      >
                        Live
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-dashed border-[var(--line-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-muted)]">
                        Private build
                      </span>
                    )}
                    {project.codeUrl ? (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--line-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-strong)]"
                      >
                        Code
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]" id="capabilities">
            <div className="section-frame reveal-up [animation-delay:220ms]">
              <SectionHeading
                eyebrow="Capabilities"
                title="Frontend polish and backend ownership in the same lane."
                description="The point of this rebuild is not just to look better. It is to prove the portfolio can support real content, real submissions, and a real production path."
              />

              <div className="mt-8 space-y-4">
                {content.servicePillars.map((pillar, index) => {
                  const icons = [Layers3, Database, Workflow];
                  const Icon = icons[index] || Terminal;

                  return (
                    <article
                      key={pillar.title}
                      className="lift-card rounded-[24px] border border-[var(--line-soft)] bg-white/70 p-5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-[var(--bg-panel)] p-3 text-[var(--accent-copper)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-extrabold text-[var(--ink-strong)]">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
                        {pillar.description}
                      </p>
                      <ul className="mt-4 space-y-2 text-sm text-[var(--ink-strong)]">
                        {pillar.bullets.map(item => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent-gold)]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="section-frame reveal-up [animation-delay:260ms]" id="systems">
              <SectionHeading
                eyebrow="Technical Stack"
                title="A portfolio contract that can grow without collapsing into hard-coded edits."
                description="The backend exposes site content, accepts validated contact requests, and supports lightweight interaction tracking. The frontend consumes those contracts and still degrades cleanly if the API is offline."
              />

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {content.stackGroups.map(group => (
                  <article
                    key={group.title}
                    className="rounded-[24px] border border-[var(--line-soft)] bg-white/70 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-[var(--accent-teal)]" />
                      <h3 className="text-lg font-extrabold text-[var(--ink-strong)]">
                        {group.title}
                      </h3>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map(item => (
                        <span
                          key={item}
                          className="rounded-full bg-[var(--bg-panel)] px-3 py-2 text-xs font-medium text-[var(--ink-strong)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 grid gap-4 rounded-[28px] border border-[var(--line-soft)] bg-[var(--ink-strong)] p-6 text-[var(--bg-panel)] md:grid-cols-3">
                <div>
                  <p className="mono-label text-[var(--accent-sand)]">endpoint</p>
                  <p className="mt-3 text-lg font-bold">GET /api/site</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Delivers structured content for the frontend shell.
                  </p>
                </div>
                <div>
                  <p className="mono-label text-[var(--accent-sand)]">submission</p>
                  <p className="mt-3 text-lg font-bold">POST /api/contact</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Validates and persists business-ready contact requests.
                  </p>
                </div>
                <div>
                  <p className="mono-label text-[var(--accent-sand)]">runtime</p>
                  <p className="mt-3 text-lg font-bold">GET /api/health</p>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Exposes environment and uptime for production checks.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="section-frame reveal-up [animation-delay:300ms]">
            <SectionHeading
              eyebrow="Execution Model"
              title="How I work when the brief is vague but the delivery still needs to land."
              description="This is the difference between cosmetic redesign and actual engineering ownership: defining the contract, structuring the system, and shipping a path that can survive handoff."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {content.processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="lift-card rounded-[24px] border border-[var(--line-soft)] bg-white/72 p-5"
                >
                  <p className="mono-label text-[var(--accent-copper)]">0{index + 1}</p>
                  <h3 className="mt-4 text-xl font-extrabold text-[var(--ink-strong)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]" id="contact">
            <div className="section-frame reveal-up [animation-delay:340ms]">
              <SectionHeading
                eyebrow="Contact"
                title="If the work matters, make the brief specific."
                description="Use the form for product builds, redesigns, frontend rescue, API wiring, or portfolio-quality upgrades that need real engineering behind them."
              />

              <div className="mt-8 space-y-4">
                <a
                  href={`mailto:${content.profile.email}`}
                  className="lift-card flex items-center gap-4 rounded-[24px] border border-[var(--line-soft)] bg-white/70 p-5"
                >
                  <Mail className="h-5 w-5 text-[var(--accent-copper)]" />
                  <div>
                    <p className="mono-label text-[var(--ink-muted)]">Email</p>
                    <p className="font-semibold text-[var(--ink-strong)]">
                      {content.profile.email}
                    </p>
                  </div>
                </a>
                <a
                  href={`tel:${content.profile.phone.replace(/\s+/g, '')}`}
                  className="lift-card flex items-center gap-4 rounded-[24px] border border-[var(--line-soft)] bg-white/70 p-5"
                >
                  <Phone className="h-5 w-5 text-[var(--accent-copper)]" />
                  <div>
                    <p className="mono-label text-[var(--ink-muted)]">Phone</p>
                    <p className="font-semibold text-[var(--ink-strong)]">
                      {content.profile.phone}
                    </p>
                  </div>
                </a>
                <div className="lift-card flex items-center gap-4 rounded-[24px] border border-[var(--line-soft)] bg-white/70 p-5">
                  <MapPin className="h-5 w-5 text-[var(--accent-copper)]" />
                  <div>
                    <p className="mono-label text-[var(--ink-muted)]">Location</p>
                    <p className="font-semibold text-[var(--ink-strong)]">
                      {content.profile.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-[26px] border border-dashed border-[var(--line-soft)] bg-[var(--bg-panel)]/80 p-5">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-[var(--accent-teal)]" />
                  <p className="font-semibold text-[var(--ink-strong)]">
                    Best fit work
                  </p>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                  Redesigns that need better hierarchy, backend integration for frontend-heavy products, and production cleanups where the current codebase feels normal but not convincing.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {content.socialLinks.map(link => {
                  const Icon = socialIcons[link.label as keyof typeof socialIcons] || ArrowUpRight;

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--line-soft)] bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--ink-strong)]"
                    >
                      <Icon className="h-4 w-4" />
                      {link.handle}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="section-frame reveal-up [animation-delay:380ms]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-label">Contact Form</p>
                  <h2 className="mt-3 text-3xl font-extrabold text-[var(--ink-strong)]">
                    Send a scoped request.
                  </h2>
                </div>
                <div className="rounded-2xl bg-[var(--bg-panel)] p-3 text-[var(--accent-teal)]">
                  <Terminal className="h-5 w-5" />
                </div>
              </div>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="mono-label text-[var(--ink-muted)]">Name</span>
                    <input
                      required
                      name="name"
                      value={form.name}
                      onChange={event =>
                        setForm(current => ({ ...current, name: event.target.value }))
                      }
                      className="form-input"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="mono-label text-[var(--ink-muted)]">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={event =>
                        setForm(current => ({ ...current, email: event.target.value }))
                      }
                      className="form-input"
                      placeholder="you@company.com"
                    />
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="mono-label text-[var(--ink-muted)]">Company</span>
                    <input
                      name="company"
                      value={form.company}
                      onChange={event =>
                        setForm(current => ({ ...current, company: event.target.value }))
                      }
                      className="form-input"
                      placeholder="Company or team"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="mono-label text-[var(--ink-muted)]">Project type</span>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={event =>
                        setForm(current => ({
                          ...current,
                          projectType: event.target.value,
                        }))
                      }
                      className="form-input"
                    >
                      <option value="">Select one</option>
                      <option value="portfolio rebuild">Portfolio rebuild</option>
                      <option value="frontend system">Frontend system</option>
                      <option value="backend integration">Backend integration</option>
                      <option value="full product build">Full product build</option>
                    </select>
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="mono-label text-[var(--ink-muted)]">Budget</span>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={event =>
                        setForm(current => ({ ...current, budget: event.target.value }))
                      }
                      className="form-input"
                    >
                      <option value="">Select one</option>
                      <option value="under-1k">Under $1k</option>
                      <option value="1k-3k">$1k - $3k</option>
                      <option value="3k-7k">$3k - $7k</option>
                      <option value="7k-plus">$7k+</option>
                    </select>
                  </label>
                  <label className="space-y-2">
                    <span className="mono-label text-[var(--ink-muted)]">Timeline</span>
                    <select
                      name="timeline"
                      value={form.timeline}
                      onChange={event =>
                        setForm(current => ({ ...current, timeline: event.target.value }))
                      }
                      className="form-input"
                    >
                      <option value="">Select one</option>
                      <option value="asap">ASAP</option>
                      <option value="2-weeks">Within 2 weeks</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </label>
                </div>

                <label className="space-y-2">
                  <span className="mono-label text-[var(--ink-muted)]">Project brief</span>
                  <textarea
                    required
                    name="message"
                    rows={7}
                    value={form.message}
                    onChange={event =>
                      setForm(current => ({ ...current, message: event.target.value }))
                    }
                    className="form-input min-h-[180px] resize-y"
                    placeholder="What needs to change, what currently feels weak, and what outcome you need from the rebuild."
                  />
                </label>

                {submissionState ? (
                  <div
                    className={`rounded-[22px] border px-4 py-3 text-sm ${
                      submissionState.type === 'success'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-950'
                        : 'border-red-500/25 bg-red-500/10 text-red-900'
                    }`}
                  >
                    {submissionState.message}
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-6 text-[var(--ink-soft)]">
                    This form posts to the backend and stores the request with validation and rate limiting.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink-strong)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--bg-panel)] transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending...' : 'Send request'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
