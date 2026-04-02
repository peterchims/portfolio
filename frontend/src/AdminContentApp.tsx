import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Loader2,
  LogOut,
  Plus,
  Save,
  Shield,
  Trash2,
} from 'lucide-react';
import {
  fetchAdminSiteContent,
  updateAdminSiteContent,
  validateAdminSession,
} from './lib/api';
import type {
  FeaturedProject,
  HeroMetric,
  ProcessStep,
  PortfolioContent,
  ProjectMetric,
  SelectOption,
  ServicePillar,
  SocialLink,
  StackGroup,
  SystemSignal,
} from './types/portfolio';

const STORAGE_KEY = 'portfolio-admin-token';
const tabs = ['overview', 'sections', 'projects', 'contact'] as const;
type AdminTab = (typeof tabs)[number];

function splitLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function joinLines(values: string[]): string {
  return values.join('\n');
}

function metricsToText(metrics: ProjectMetric[]): string {
  return metrics.map((metric) => `${metric.label}: ${metric.value}`).join('\n');
}

function textToMetrics(value: string): ProjectMetric[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(':');
      return {
        label: label?.trim() || 'Metric',
        value: rest.join(':').trim(),
      };
    })
    .filter((metric) => metric.value);
}

function createEmptyProject(): FeaturedProject {
  return {
    title: 'New Project',
    year: new Date().getFullYear().toString(),
    category: 'Digital product',
    imageUrl: '',
    summary: '',
    impact: '',
    spotlight: '',
    highlights: [],
    metrics: [
      { label: 'Focus', value: '' },
      { label: 'Scope', value: '' },
      { label: 'Priority', value: '' },
    ],
    stack: [],
    liveUrl: null,
    codeUrl: null,
  };
}

function createEmptyHeroMetric(): HeroMetric {
  return {
    value: 'Value',
    label: 'Metric label',
    detail: '',
  };
}

function createEmptySocialLink(): SocialLink {
  return {
    label: 'LinkedIn',
    href: 'https://',
    handle: '@yourhandle',
  };
}

function createEmptyServicePillar(): ServicePillar {
  return {
    title: 'New capability',
    description: '',
    bullets: [],
  };
}

function createEmptyStackGroup(): StackGroup {
  return {
    title: 'New stack group',
    items: [],
  };
}

function createEmptyProcessStep(): ProcessStep {
  return {
    title: 'New process step',
    description: '',
  };
}

function createEmptySystemSignal(): SystemSignal {
  return {
    label: 'Signal label',
    value: 'Signal value',
    detail: '',
    tone: 'support',
  };
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={5}
          className="min-h-28 rounded-2xl border border-white/10 bg-[#12171c] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-300/60 focus:outline-none"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-h-12 rounded-2xl border border-white/10 bg-[#12171c] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-300/60 focus:outline-none"
        />
      )}
    </label>
  );
}

function OptionEditor({
  label,
  options,
  onChange,
}: {
  label: string;
  options: SelectOption[];
  onChange: (options: SelectOption[]) => void;
}) {
  return (
    <Field
      label={label}
      multiline
      value={options.map((option) => `${option.value}: ${option.label}`).join('\n')}
      onChange={(value) => {
        const nextOptions = value
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => {
            const [rawValue, ...rawLabel] = line.split(':');
            return {
              value: rawValue?.trim() || '',
              label: rawLabel.join(':').trim() || rawValue?.trim() || '',
            };
          })
          .filter((option) => option.value && option.label);

        onChange(nextOptions);
      }}
      placeholder="value: Label"
    />
  );
}

export default function AdminContentApp() {
  const [tokenInput, setTokenInput] = useState('');
  const [token, setToken] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [content, setContent] = useState<PortfolioContent | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedToken = window.sessionStorage.getItem(STORAGE_KEY) || '';

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setContent(null);
      return;
    }

    let active = true;
    setIsLoading(true);
    setError('');

    void fetchAdminSiteContent(token)
      .then((payload) => {
        if (!active) {
          return;
        }

        setContent(payload);
      })
      .catch((loadError) => {
        if (!active) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Unable to load admin content.'
        );
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  const featuredProjects = content?.featuredProjects ?? [];

  const updateContent = (updater: (current: PortfolioContent) => PortfolioContent) => {
    setContent((current) => (current ? updater(current) : current));
  };

  const handleLogin = async () => {
    if (!tokenInput.trim()) {
      setError('Enter the admin token configured on the backend.');
      return;
    }

    setIsAuthenticating(true);
    setError('');
    setMessage('');

    try {
      const result = await validateAdminSession(tokenInput.trim());
      window.sessionStorage.setItem(STORAGE_KEY, tokenInput.trim());
      setToken(tokenInput.trim());
      setMessage(result.message);
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : 'Unable to validate admin token.'
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(STORAGE_KEY);
    setToken('');
    setTokenInput('');
    setContent(null);
    setMessage('');
    setError('');
  };

  const handleSave = async () => {
    if (!token || !content) {
      return;
    }

    setIsSaving(true);
    setError('');
    setMessage('');

    try {
      const payload = await updateAdminSiteContent(token, content);
      setContent(payload.data);
      setMessage('Content saved successfully.');
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : 'Unable to save content right now.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const updateProjectAt = (
    index: number,
    updater: (project: FeaturedProject) => FeaturedProject
  ) => {
    updateContent((current) => ({
      ...current,
      featuredProjects: current.featuredProjects.map((project, projectIndex) =>
        projectIndex === index ? updater(project) : project
      ),
    }));
  };

  const moveProject = (index: number, direction: -1 | 1) => {
    updateContent((current) => {
      const nextProjects = [...current.featuredProjects];
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= nextProjects.length) {
        return current;
      }

      [nextProjects[index], nextProjects[targetIndex]] = [
        nextProjects[targetIndex],
        nextProjects[index],
      ];

      return {
        ...current,
        featuredProjects: nextProjects,
      };
    });
  };

  const removeProject = (index: number) => {
    updateContent((current) => ({
      ...current,
      featuredProjects: current.featuredProjects.filter((_, projectIndex) => projectIndex !== index),
    }));
  };

  const addProject = () => {
    updateContent((current) => ({
      ...current,
      featuredProjects: [...current.featuredProjects, createEmptyProject()],
    }));
    setActiveTab('projects');
  };

  if (!token) {
    return (
      <main className="min-h-screen bg-[#081017] px-4 py-10 text-slate-100">
        <div className="mx-auto grid max-w-lg gap-6 rounded-[28px] border border-white/10 bg-[#0f151c] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.38)]">
          <div className="grid gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b7791f] text-white">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/70">
                Admin editor
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-white">
                Portfolio content manager
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Enter the backend admin token to load and edit the live content contract.
              </p>
            </div>
          </div>

          <Field
            label="Admin token"
            value={tokenInput}
            onChange={setTokenInput}
            placeholder="PORTFOLIO_ADMIN_TOKEN"
          />

          {error ? (
            <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={() => void handleLogin()}
            disabled={isAuthenticating}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-amber-300/20 bg-[#b7791f] px-4 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:border-amber-200/40 disabled:opacity-70"
          >
            {isAuthenticating ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Validating
              </>
            ) : (
              <>
                <Shield size={16} />
                Enter admin editor
              </>
            )}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#081017] px-4 py-6 text-slate-100 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-5">
        <header className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.34)] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/70">
              Protected admin section
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white">
              Portfolio content editor
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Edit the same backend content model the public site consumes from `/api/site`.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={!content || isSaving}
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-amber-300/20 bg-[#b7791f] px-4 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px] disabled:opacity-70"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save changes
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-white/10 bg-[#12171c] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/20"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-2xl px-4 py-2 text-sm font-semibold capitalize transition ${
                activeTab === tab
                  ? 'bg-[#b7791f] text-white'
                  : 'border border-white/10 bg-[#0f151c] text-slate-300 hover:border-white/20'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {message ? (
          <p className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            {message}
          </p>
        ) : null}

        {error ? (
          <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        {isLoading || !content ? (
          <div className="rounded-[28px] border border-white/10 bg-[#0f151c] p-10 text-center text-slate-300">
            <div className="inline-flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              Loading content
            </div>
          </div>
        ) : null}

        {content && activeTab === 'overview' ? (
          <section className="grid gap-5 lg:grid-cols-2">
            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
              <h2 className="text-lg font-semibold text-white">Profile</h2>
              <Field label="Name" value={content.profile.name} onChange={(value) => updateContent((current) => ({ ...current, profile: { ...current.profile, name: value } }))} />
              <Field label="Role" value={content.profile.role} onChange={(value) => updateContent((current) => ({ ...current, profile: { ...current.profile, role: value } }))} />
              <Field label="Headline" value={content.profile.headline} onChange={(value) => updateContent((current) => ({ ...current, profile: { ...current.profile, headline: value } }))} multiline />
              <Field label="Summary" value={content.profile.summary} onChange={(value) => updateContent((current) => ({ ...current, profile: { ...current.profile, summary: value } }))} multiline />
              <Field label="Location" value={content.profile.location} onChange={(value) => updateContent((current) => ({ ...current, profile: { ...current.profile, location: value } }))} />
              <Field label="Email" value={content.profile.email} onChange={(value) => updateContent((current) => ({ ...current, profile: { ...current.profile, email: value } }))} />
              <Field label="Phone" value={content.profile.phone} onChange={(value) => updateContent((current) => ({ ...current, profile: { ...current.profile, phone: value } }))} />
              <Field label="Availability" value={content.profile.availability} onChange={(value) => updateContent((current) => ({ ...current, profile: { ...current.profile, availability: value } }))} multiline />
              <Field label="Resume URL" value={content.profile.resumeUrl} onChange={(value) => updateContent((current) => ({ ...current, profile: { ...current.profile, resumeUrl: value } }))} />
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
              <h2 className="text-lg font-semibold text-white">Hero and header</h2>
              <Field label="Hero eyebrow" value={content.hero.eyebrow} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, eyebrow: value } }))} />
              <Field label="Hero panel label" value={content.hero.panelEyebrow} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, panelEyebrow: value } }))} />
              <Field label="Hero panel title" value={content.hero.panelTitle} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, panelTitle: value } }))} multiline />
              <Field label="Header CTA label" value={content.hero.headerCta.label} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, headerCta: { ...current.hero.headerCta, label: value } } }))} />
              <Field label="Header CTA link" value={content.hero.headerCta.href} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, headerCta: { ...current.hero.headerCta, href: value } } }))} />
              <Field label="Primary CTA label" value={content.hero.primaryCta.label} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, primaryCta: { ...current.hero.primaryCta, label: value } } }))} />
              <Field label="Primary CTA link" value={content.hero.primaryCta.href} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, primaryCta: { ...current.hero.primaryCta, href: value } } }))} />
              <Field label="Secondary CTA label" value={content.hero.secondaryCta.label} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, secondaryCta: { ...current.hero.secondaryCta, label: value } } }))} />
              <Field label="Secondary CTA link" value={content.hero.secondaryCta.href} onChange={(value) => updateContent((current) => ({ ...current, hero: { ...current.hero, secondaryCta: { ...current.hero.secondaryCta, href: value } } }))} />
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">Hero metrics</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    These cards appear under the hero summary.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateContent((current) => ({
                      ...current,
                      heroMetrics: [...current.heroMetrics, createEmptyHeroMetric()],
                    }))
                  }
                  className="inline-flex min-h-10 items-center gap-2 rounded-2xl border border-amber-300/20 bg-[#b7791f] px-4 py-2 text-sm font-semibold text-white"
                >
                  <Plus size={16} />
                  Add metric
                </button>
              </div>

              {content.heroMetrics.map((metric, index) => (
                <div key={`${metric.label}-${index}`} className="grid gap-3 rounded-2xl border border-white/8 bg-[#12171c] p-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        updateContent((current) => ({
                          ...current,
                          heroMetrics: current.heroMetrics.filter((_, metricIndex) => metricIndex !== index),
                        }))
                      }
                      className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <Field label="Value" value={metric.value} onChange={(value) => updateContent((current) => ({ ...current, heroMetrics: current.heroMetrics.map((item, metricIndex) => metricIndex === index ? { ...item, value } : item) }))} />
                  <Field label="Label" value={metric.label} onChange={(value) => updateContent((current) => ({ ...current, heroMetrics: current.heroMetrics.map((item, metricIndex) => metricIndex === index ? { ...item, label: value } : item) }))} />
                  <Field label="Detail" value={metric.detail} onChange={(value) => updateContent((current) => ({ ...current, heroMetrics: current.heroMetrics.map((item, metricIndex) => metricIndex === index ? { ...item, detail: value } : item) }))} multiline />
                </div>
              ))}
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5 lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">Social links</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    These links appear in the hero and contact sections.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateContent((current) => ({
                      ...current,
                      socialLinks: [...current.socialLinks, createEmptySocialLink()],
                    }))
                  }
                  className="inline-flex min-h-10 items-center gap-2 rounded-2xl border border-amber-300/20 bg-[#b7791f] px-4 py-2 text-sm font-semibold text-white"
                >
                  <Plus size={16} />
                  Add link
                </button>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {content.socialLinks.map((link, index) => (
                  <div key={`${link.label}-${index}`} className="grid gap-3 rounded-2xl border border-white/8 bg-[#12171c] p-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          updateContent((current) => ({
                            ...current,
                            socialLinks: current.socialLinks.filter((_, linkIndex) => linkIndex !== index),
                          }))
                        }
                        className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <Field label="Label" value={link.label} onChange={(value) => updateContent((current) => ({ ...current, socialLinks: current.socialLinks.map((item, linkIndex) => linkIndex === index ? { ...item, label: value } : item) }))} />
                    <Field label="Href" value={link.href} onChange={(value) => updateContent((current) => ({ ...current, socialLinks: current.socialLinks.map((item, linkIndex) => linkIndex === index ? { ...item, href: value } : item) }))} />
                    <Field label="Handle" value={link.handle} onChange={(value) => updateContent((current) => ({ ...current, socialLinks: current.socialLinks.map((item, linkIndex) => linkIndex === index ? { ...item, handle: value } : item) }))} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {content && activeTab === 'sections' ? (
          <section className="grid gap-5 lg:grid-cols-2">
            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
              <h2 className="text-lg font-semibold text-white">Loader and footer</h2>
              <Field label="Loader title" value={content.loader.title} onChange={(value) => updateContent((current) => ({ ...current, loader: { ...current.loader, title: value } }))} />
              <Field label="Loader subtitle" value={content.loader.subtitle} onChange={(value) => updateContent((current) => ({ ...current, loader: { ...current.loader, subtitle: value } }))} multiline />
              <Field label="Footer tagline" value={content.footer.tagline} onChange={(value) => updateContent((current) => ({ ...current, footer: { ...current.footer, tagline: value } }))} multiline />
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
              <h2 className="text-lg font-semibold text-white">Navigation</h2>
              {content.siteNavigation.map((item, index) => (
                <div key={item.id} className="grid gap-3 rounded-2xl border border-white/8 bg-[#12171c] p-4">
                  <Field label="Nav id" value={item.id} onChange={(value) => updateContent((current) => ({ ...current, siteNavigation: current.siteNavigation.map((navItem, navIndex) => navIndex === index ? { ...navItem, id: value } : navItem) }))} />
                  <Field label="Nav label" value={item.label} onChange={(value) => updateContent((current) => ({ ...current, siteNavigation: current.siteNavigation.map((navItem, navIndex) => navIndex === index ? { ...navItem, label: value } : navItem) }))} />
                </div>
              ))}
            </div>

            {([
              ['services', content.sections.services],
              ['projects', content.sections.projects],
              ['process', content.sections.process],
              ['contact', content.sections.contact],
            ] as const).map(([key, section]) => (
              <div key={key} className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
                <h2 className="text-lg font-semibold capitalize text-white">{key} section</h2>
                <Field
                  label="Kicker"
                  value={section.kicker}
                  onChange={(value) =>
                    updateContent((current) => ({
                      ...current,
                      sections: {
                        ...current.sections,
                        [key]: { ...current.sections[key], kicker: value },
                      },
                    }))
                  }
                />
                <Field
                  label="Title"
                  value={section.title}
                  onChange={(value) =>
                    updateContent((current) => ({
                      ...current,
                      sections: {
                        ...current.sections,
                        [key]: { ...current.sections[key], title: value },
                      },
                    }))
                  }
                  multiline
                />
                <Field
                  label="Copy"
                  value={section.copy}
                  onChange={(value) =>
                    updateContent((current) => ({
                      ...current,
                      sections: {
                        ...current.sections,
                        [key]: { ...current.sections[key], copy: value },
                      },
                    }))
                  }
                  multiline
                />
              </div>
            ))}

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5 lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">Service pillars</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Manage the capability cards in the services section.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateContent((current) => ({
                      ...current,
                      servicePillars: [...current.servicePillars, createEmptyServicePillar()],
                    }))
                  }
                  className="inline-flex min-h-10 items-center gap-2 rounded-2xl border border-amber-300/20 bg-[#b7791f] px-4 py-2 text-sm font-semibold text-white"
                >
                  <Plus size={16} />
                  Add pillar
                </button>
              </div>

              {content.servicePillars.map((pillar, index) => (
                <div key={`${pillar.title}-${index}`} className="grid gap-3 rounded-2xl border border-white/8 bg-[#12171c] p-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        updateContent((current) => ({
                          ...current,
                          servicePillars: current.servicePillars.filter((_, pillarIndex) => pillarIndex !== index),
                        }))
                      }
                      className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <Field label="Title" value={pillar.title} onChange={(value) => updateContent((current) => ({ ...current, servicePillars: current.servicePillars.map((item, pillarIndex) => pillarIndex === index ? { ...item, title: value } : item) }))} />
                  <Field label="Description" value={pillar.description} onChange={(value) => updateContent((current) => ({ ...current, servicePillars: current.servicePillars.map((item, pillarIndex) => pillarIndex === index ? { ...item, description: value } : item) }))} multiline />
                  <Field label="Bullets" value={joinLines(pillar.bullets)} onChange={(value) => updateContent((current) => ({ ...current, servicePillars: current.servicePillars.map((item, pillarIndex) => pillarIndex === index ? { ...item, bullets: splitLines(value) } : item) }))} multiline placeholder="One bullet per line" />
                </div>
              ))}
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">Process steps</h2>
                <button
                  type="button"
                  onClick={() =>
                    updateContent((current) => ({
                      ...current,
                      processSteps: [...current.processSteps, createEmptyProcessStep()],
                    }))
                  }
                  className="inline-flex min-h-10 items-center gap-2 rounded-2xl border border-amber-300/20 bg-[#b7791f] px-4 py-2 text-sm font-semibold text-white"
                >
                  <Plus size={16} />
                  Add step
                </button>
              </div>

              {content.processSteps.map((step, index) => (
                <div key={`${step.title}-${index}`} className="grid gap-3 rounded-2xl border border-white/8 bg-[#12171c] p-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        updateContent((current) => ({
                          ...current,
                          processSteps: current.processSteps.filter((_, stepIndex) => stepIndex !== index),
                        }))
                      }
                      className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <Field label="Title" value={step.title} onChange={(value) => updateContent((current) => ({ ...current, processSteps: current.processSteps.map((item, stepIndex) => stepIndex === index ? { ...item, title: value } : item) }))} />
                  <Field label="Description" value={step.description} onChange={(value) => updateContent((current) => ({ ...current, processSteps: current.processSteps.map((item, stepIndex) => stepIndex === index ? { ...item, description: value } : item) }))} multiline />
                </div>
              ))}
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">Stack groups</h2>
                <button
                  type="button"
                  onClick={() =>
                    updateContent((current) => ({
                      ...current,
                      stackGroups: [...current.stackGroups, createEmptyStackGroup()],
                    }))
                  }
                  className="inline-flex min-h-10 items-center gap-2 rounded-2xl border border-amber-300/20 bg-[#b7791f] px-4 py-2 text-sm font-semibold text-white"
                >
                  <Plus size={16} />
                  Add group
                </button>
              </div>

              {content.stackGroups.map((group, index) => (
                <div key={`${group.title}-${index}`} className="grid gap-3 rounded-2xl border border-white/8 bg-[#12171c] p-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        updateContent((current) => ({
                          ...current,
                          stackGroups: current.stackGroups.filter((_, groupIndex) => groupIndex !== index),
                        }))
                      }
                      className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <Field label="Title" value={group.title} onChange={(value) => updateContent((current) => ({ ...current, stackGroups: current.stackGroups.map((item, groupIndex) => groupIndex === index ? { ...item, title: value } : item) }))} />
                  <Field label="Items" value={joinLines(group.items)} onChange={(value) => updateContent((current) => ({ ...current, stackGroups: current.stackGroups.map((item, groupIndex) => groupIndex === index ? { ...item, items: splitLines(value) } : item) }))} multiline placeholder="One item per line" />
                </div>
              ))}
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5 lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-white">System signals</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    These compact cards appear in the hero-side panel.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    updateContent((current) => ({
                      ...current,
                      systemSignals: [...current.systemSignals, createEmptySystemSignal()],
                    }))
                  }
                  className="inline-flex min-h-10 items-center gap-2 rounded-2xl border border-amber-300/20 bg-[#b7791f] px-4 py-2 text-sm font-semibold text-white"
                >
                  <Plus size={16} />
                  Add signal
                </button>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {content.systemSignals.map((signal, index) => (
                  <div key={`${signal.label}-${index}`} className="grid gap-3 rounded-2xl border border-white/8 bg-[#12171c] p-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          updateContent((current) => ({
                            ...current,
                            systemSignals: current.systemSignals.filter((_, signalIndex) => signalIndex !== index),
                          }))
                        }
                        className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <Field label="Label" value={signal.label} onChange={(value) => updateContent((current) => ({ ...current, systemSignals: current.systemSignals.map((item, signalIndex) => signalIndex === index ? { ...item, label: value } : item) }))} />
                    <Field label="Value" value={signal.value} onChange={(value) => updateContent((current) => ({ ...current, systemSignals: current.systemSignals.map((item, signalIndex) => signalIndex === index ? { ...item, value } : item) }))} />
                    <Field label="Detail" value={signal.detail} onChange={(value) => updateContent((current) => ({ ...current, systemSignals: current.systemSignals.map((item, signalIndex) => signalIndex === index ? { ...item, detail: value } : item) }))} multiline />
                    <Field label="Tone" value={signal.tone} onChange={(value) => updateContent((current) => ({ ...current, systemSignals: current.systemSignals.map((item, signalIndex) => signalIndex === index ? { ...item, tone: value === 'accent' ? 'accent' : 'support' } : item) }))} placeholder="support or accent" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {content && activeTab === 'projects' ? (
          <section className="grid gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
              <div>
                <h2 className="text-lg font-semibold text-white">Featured projects</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Add image URLs, simplify copy, and control the mobile cinematic project switcher.
                </p>
              </div>

              <button
                type="button"
                onClick={addProject}
                className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-amber-300/20 bg-[#b7791f] px-4 py-3 text-sm font-semibold text-white transition hover:translate-y-[-1px]"
              >
                <Plus size={16} />
                Add project
              </button>
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5 lg:grid-cols-2">
              <h2 className="text-lg font-semibold text-white lg:col-span-2">Project showcase labels</h2>
              <Field label="Highlights label" value={content.projectShowcase.highlightsLabel} onChange={(value) => updateContent((current) => ({ ...current, projectShowcase: { ...current.projectShowcase, highlightsLabel: value } }))} />
              <Field label="Metrics label" value={content.projectShowcase.metricsLabel} onChange={(value) => updateContent((current) => ({ ...current, projectShowcase: { ...current.projectShowcase, metricsLabel: value } }))} />
              <Field label="Stack label" value={content.projectShowcase.stackLabel} onChange={(value) => updateContent((current) => ({ ...current, projectShowcase: { ...current.projectShowcase, stackLabel: value } }))} />
              <Field label="Live label" value={content.projectShowcase.liveLabel} onChange={(value) => updateContent((current) => ({ ...current, projectShowcase: { ...current.projectShowcase, liveLabel: value } }))} />
              <Field label="Source label" value={content.projectShowcase.sourceLabel} onChange={(value) => updateContent((current) => ({ ...current, projectShowcase: { ...current.projectShowcase, sourceLabel: value } }))} />
              <Field label="Private project note" value={content.projectShowcase.privateLabel} onChange={(value) => updateContent((current) => ({ ...current, projectShowcase: { ...current.projectShowcase, privateLabel: value } }))} multiline />
            </div>

            {featuredProjects.map((project, index) => (
              <article key={`${project.title}-${index}`} className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/70">
                      Project {index + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{project.title || 'Untitled project'}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => moveProject(index, -1)} className="rounded-xl border border-white/10 bg-[#12171c] p-2 text-slate-300 hover:border-white/20">
                      <ArrowUp size={16} />
                    </button>
                    <button type="button" onClick={() => moveProject(index, 1)} className="rounded-xl border border-white/10 bg-[#12171c] p-2 text-slate-300 hover:border-white/20">
                      <ArrowDown size={16} />
                    </button>
                    <button type="button" onClick={() => removeProject(index)} className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-200 hover:border-red-400/30">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Title" value={project.title} onChange={(value) => updateProjectAt(index, (current) => ({ ...current, title: value }))} />
                  <Field label="Category" value={project.category} onChange={(value) => updateProjectAt(index, (current) => ({ ...current, category: value }))} />
                  <Field label="Year" value={project.year} onChange={(value) => updateProjectAt(index, (current) => ({ ...current, year: value }))} />
                  <Field label="Image URL" value={project.imageUrl ?? ''} onChange={(value) => updateProjectAt(index, (current) => ({ ...current, imageUrl: value }))} placeholder="/images/projects/project-cover.jpg" />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Spotlight" value={project.spotlight} onChange={(value) => updateProjectAt(index, (current) => ({ ...current, spotlight: value }))} multiline />
                  <Field label="Summary" value={project.summary} onChange={(value) => updateProjectAt(index, (current) => ({ ...current, summary: value }))} multiline />
                </div>

                <Field label="Impact" value={project.impact} onChange={(value) => updateProjectAt(index, (current) => ({ ...current, impact: value }))} multiline />

                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Highlights" value={joinLines(project.highlights)} onChange={(value) => updateProjectAt(index, (current) => ({ ...current, highlights: splitLines(value) }))} multiline placeholder="One highlight per line" />
                  <Field label="Stack" value={joinLines(project.stack)} onChange={(value) => updateProjectAt(index, (current) => ({ ...current, stack: splitLines(value) }))} multiline placeholder="One stack item per line" />
                </div>

                <Field label="Metrics" value={metricsToText(project.metrics)} onChange={(value) => updateProjectAt(index, (current) => ({ ...current, metrics: textToMetrics(value) }))} multiline placeholder="Focus: Budgeting" />

                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Live URL" value={project.liveUrl ?? ''} onChange={(value) => updateProjectAt(index, (current) => ({ ...current, liveUrl: value || null }))} />
                  <Field label="Code URL" value={project.codeUrl ?? ''} onChange={(value) => updateProjectAt(index, (current) => ({ ...current, codeUrl: value || null }))} />
                </div>
              </article>
            ))}
          </section>
        ) : null}

        {content && activeTab === 'contact' ? (
          <section className="grid gap-5 lg:grid-cols-2">
            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
              <h2 className="text-lg font-semibold text-white">Contact form shell</h2>
              <Field label="Details label" value={content.contactForm.detailsLabel} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, detailsLabel: value } }))} />
              <Field label="Helper text" value={content.contactForm.helperText} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, helperText: value } }))} multiline />
              <Field label="Submit label" value={content.contactForm.submitLabel} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, submitLabel: value } }))} />
              <Field label="Submitting label" value={content.contactForm.submittingLabel} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, submittingLabel: value } }))} />
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
              <h2 className="text-lg font-semibold text-white">Field labels and placeholders</h2>
              <Field label="Name label" value={content.contactForm.fields.name.label} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, name: { ...current.contactForm.fields.name, label: value } } } }))} />
              <Field label="Name placeholder" value={content.contactForm.fields.name.placeholder} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, name: { ...current.contactForm.fields.name, placeholder: value } } } }))} />
              <Field label="Email label" value={content.contactForm.fields.email.label} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, email: { ...current.contactForm.fields.email, label: value } } } }))} />
              <Field label="Email placeholder" value={content.contactForm.fields.email.placeholder} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, email: { ...current.contactForm.fields.email, placeholder: value } } } }))} />
              <Field label="Company label" value={content.contactForm.fields.company.label} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, company: { ...current.contactForm.fields.company, label: value } } } }))} />
              <Field label="Company placeholder" value={content.contactForm.fields.company.placeholder} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, company: { ...current.contactForm.fields.company, placeholder: value } } } }))} />
              <Field label="Message label" value={content.contactForm.fields.message.label} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, message: { ...current.contactForm.fields.message, label: value } } } }))} />
              <Field label="Message placeholder" value={content.contactForm.fields.message.placeholder} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, message: { ...current.contactForm.fields.message, placeholder: value } } } }))} multiline />
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
              <h2 className="text-lg font-semibold text-white">Project type options</h2>
              <Field label="Project type label" value={content.contactForm.fields.projectType.label} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, projectType: { ...current.contactForm.fields.projectType, label: value } } } }))} />
              <Field label="Project type placeholder" value={content.contactForm.fields.projectType.placeholder} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, projectType: { ...current.contactForm.fields.projectType, placeholder: value } } } }))} />
              <OptionEditor label="Project type options" options={content.contactForm.fields.projectType.options} onChange={(options) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, projectType: { ...current.contactForm.fields.projectType, options } } } }))} />
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-[#0f151c] p-5">
              <h2 className="text-lg font-semibold text-white">Budget and timeline options</h2>
              <Field label="Budget label" value={content.contactForm.fields.budget.label} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, budget: { ...current.contactForm.fields.budget, label: value } } } }))} />
              <Field label="Budget placeholder" value={content.contactForm.fields.budget.placeholder} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, budget: { ...current.contactForm.fields.budget, placeholder: value } } } }))} />
              <OptionEditor label="Budget options" options={content.contactForm.fields.budget.options} onChange={(options) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, budget: { ...current.contactForm.fields.budget, options } } } }))} />
              <Field label="Timeline label" value={content.contactForm.fields.timeline.label} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, timeline: { ...current.contactForm.fields.timeline, label: value } } } }))} />
              <Field label="Timeline placeholder" value={content.contactForm.fields.timeline.placeholder} onChange={(value) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, timeline: { ...current.contactForm.fields.timeline, placeholder: value } } } }))} />
              <OptionEditor label="Timeline options" options={content.contactForm.fields.timeline.options} onChange={(options) => updateContent((current) => ({ ...current, contactForm: { ...current.contactForm, fields: { ...current.contactForm.fields, timeline: { ...current.contactForm.fields.timeline, options } } } }))} />
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
