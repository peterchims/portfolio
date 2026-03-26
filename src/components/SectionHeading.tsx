interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="section-label">{eyebrow}</p>
      <h2 className="display-title text-3xl text-[var(--ink-strong)] md:text-5xl">
        {title}
      </h2>
      <p className="body-copy text-base leading-7 md:text-lg">{description}</p>
    </div>
  );
}
