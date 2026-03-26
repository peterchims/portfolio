interface StatusPillProps {
  label: string;
  tone?: 'good' | 'neutral' | 'warn';
}

const toneClasses: Record<NonNullable<StatusPillProps['tone']>, string> = {
  good: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-900',
  neutral: 'border-[var(--line-soft)] bg-white/70 text-[var(--ink-strong)]',
  warn: 'border-amber-500/25 bg-amber-500/10 text-amber-900',
};

export function StatusPill({
  label,
  tone = 'neutral',
}: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
