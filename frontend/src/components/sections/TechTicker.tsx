import { stackGroups } from '../../content/stack';
import { TechIcon } from '../ui/TechIcon';
import { Marquee } from '../ui/Marquee';

const tools = stackGroups.flatMap((group) => group.tools);

export function TechTicker() {
  return (
    <div className="border-b border-border bg-bg-subtle py-6">
      <Marquee
        speed={40}
        items={tools.map((tool) => (
          <span key={tool.name} className="inline-flex items-center gap-2">
            {tool.brand && (
              <TechIcon slug={tool.brand} size={14} className="text-text-muted" />
            )}
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-text-faint">
              {tool.name}
            </span>
          </span>
        ))}
      />
    </div>
  );
}
