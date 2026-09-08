import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { profile } from '../../content/profile';
import { contactForm, sectionIntros } from '../../content/site';
import { sendContactRequest } from '../../lib/api';
import { trackInteraction } from '../../lib/analytics';
import type { ContactPayload } from '../../types/portfolio';
import { buttonClass } from '../ui/button-classes';
import { Reveal } from '../ui/Reveal';
import { Section, SectionHeader } from '../ui/Section';

const EMPTY: ContactPayload = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const fieldClass =
  'w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-text placeholder:text-text-faint focus-visible:border-accent';
const labelClass = 'text-xs font-medium uppercase tracking-[0.12em] text-text-faint';

export function Contact() {
  const [data, setData] = useState<ContactPayload>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');

  const update = (key: keyof ContactPayload) => (value: string) =>
    setData((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setFeedback('');
    try {
      const response = await sendContactRequest(data);
      setStatus('success');
      setFeedback(`${response.message} Reference: ${response.submissionId}`);
      setData(EMPTY);
      trackInteraction({ event: 'contact_submit', section: 'contact', label: 'success' });
    } catch (error) {
      setStatus('error');
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Unable to send your message right now. Email me directly instead.',
      );
    }
  };

  return (
    <Section id="contact">
      <SectionHeader {...sectionIntros.contact} />

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="space-y-6">
          <div>
            <p className={labelClass}>Direct</p>
            <div className="mt-3 space-y-2 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="block text-text hover:text-accent"
              >
                {profile.email}
              </a>
              <a href={`tel:${profile.phone}`} className="block text-text-muted hover:text-text">
                {profile.phone}
              </a>
              <p className="text-text-muted">{profile.location}</p>
            </div>
          </div>
          <p className="max-w-xs text-sm text-text-muted">{profile.availability}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-text-muted underline-offset-4 hover:text-text hover:underline"
              >
                {social.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal
          as="section"
          delay={1}
          className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
        >
          <h3 className="sr-only">Project brief form</h3>
          <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <span className={labelClass}>Name</span>
                <input
                  className={fieldClass}
                  type="text"
                  required
                  autoComplete="name"
                  value={data.name}
                  onChange={(e) => update('name')(e.target.value)}
                />
              </label>
              <label className="grid gap-1.5">
                <span className={labelClass}>Email</span>
                <input
                  className={fieldClass}
                  type="email"
                  required
                  autoComplete="email"
                  value={data.email}
                  onChange={(e) => update('email')(e.target.value)}
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <span className={labelClass}>Company</span>
                <input
                  className={fieldClass}
                  type="text"
                  autoComplete="organization"
                  value={data.company}
                  onChange={(e) => update('company')(e.target.value)}
                />
              </label>
              <label className="grid gap-1.5">
                <span className={labelClass}>{contactForm.fields.projectType.label}</span>
                <select
                  className={fieldClass}
                  required
                  value={data.projectType}
                  onChange={(e) => update('projectType')(e.target.value)}
                >
                  <option value="">Select one</option>
                  {contactForm.fields.projectType.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <span className={labelClass}>{contactForm.fields.budget.label}</span>
                <select
                  className={fieldClass}
                  value={data.budget}
                  onChange={(e) => update('budget')(e.target.value)}
                >
                  <option value="">Select budget</option>
                  {contactForm.fields.budget.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5">
                <span className={labelClass}>{contactForm.fields.timeline.label}</span>
                <select
                  className={fieldClass}
                  value={data.timeline}
                  onChange={(e) => update('timeline')(e.target.value)}
                >
                  <option value="">Select timeline</option>
                  {contactForm.fields.timeline.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-1.5">
              <span className={labelClass}>Project brief</span>
              <textarea
                className={`${fieldClass} min-h-[8rem] resize-y`}
                required
                rows={5}
                value={data.message}
                onChange={(e) => update('message')(e.target.value)}
              />
            </label>

            {feedback ? (
              <p
                role="status"
                aria-live="polite"
                className={
                  status === 'error'
                    ? 'text-sm text-negative'
                    : 'text-sm text-positive'
                }
              >
                {feedback}
              </p>
            ) : (
              <p className="text-xs text-text-faint">{contactForm.helperText}</p>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`${buttonClass('primary', 'lg')} justify-self-start`}
            >
              {status === 'submitting' ? contactForm.submittingLabel : contactForm.submitLabel}
              <Send size={16} />
            </button>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
