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
      className="inline-flex items-center gap-2.5"
      aria-label={`${profile.name} — home`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-text text-[0.7rem] font-semibold tracking-wide text-bg">
        {initials(profile.name)}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-text">{profile.name}</span>
        <span className="text-[0.7rem] text-text-faint">{profile.role}</span>
      </span>
    </Link>
  );
}
