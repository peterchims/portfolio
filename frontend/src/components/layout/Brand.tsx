import { Link } from 'react-router-dom';
import { profile } from '../../content/profile';

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group inline-flex items-center gap-2.5"
      aria-label={`${profile.name} — home`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-text text-[0.68rem] font-semibold tracking-wide text-bg transition-transform duration-200 group-hover:-rotate-6">
        {initials(profile.name)}
      </span>
      <span className="hidden flex-col leading-tight sm:flex">
        <span className="text-[0.82rem] font-semibold tracking-tight text-text">{profile.name}</span>
        <span className="text-[0.66rem] uppercase tracking-[0.12em] text-text-faint">
          {profile.role}
        </span>
      </span>
    </Link>
  );
}
