import { Wrench } from 'lucide-react';
import { stackGroups, type StackTool } from '../../content/stack';
import { Reveal } from '../ui/Reveal';
import { TechIcon } from '../ui/TechIcon';

function ToolMark({ tool }: { tool: StackTool }) {
  if (tool.brand) {
    return <TechIcon slug={tool.brand} size={13} className="shrink-0 text-text-muted" />;
  }
  if (tool.Icon) {
    return <tool.Icon size={13} className="shrink-0 text-text-faint" />;
  }
  return null;
}

export function Stack() {
  return (
    <Reveal as="section" className="mt-14 border-t border-border pt-10">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-accent">
          <Wrench size={15} />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-text">Tools in rotation</h3>
          <p className="font-mono text-xs text-text-faint">What I reach for, day to day</p>
        </div>
      </div>

      <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {stackGroups.map((group) => (
          <div key={group.label}>
            <p className="flex items-center gap-2 font-mono text-kicker uppercase text-text-faint">
              <group.Icon size={13} className="text-text-muted" />
              {group.label}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg px-2.5 py-1 text-xs text-text-muted transition-colors hover:border-border-strong hover:text-text"
                >
                  <ToolMark tool={tool} />
                  {tool.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
