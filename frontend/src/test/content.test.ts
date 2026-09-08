import { describe, expect, it } from 'vitest';
import { projects } from '../content/projects';
import { navItems } from '../content/nav';
import { profile } from '../content/profile';

describe('content integrity', () => {
  it('every project has a unique slug and a complete case study', () => {
    const slugs = new Set<string>();
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9-]+$/);
      expect(slugs.has(project.slug)).toBe(false);
      slugs.add(project.slug);

      expect(project.caseStudy.problem.length).toBeGreaterThan(20);
      expect(project.caseStudy.approach.length).toBeGreaterThan(20);
      expect(project.caseStudy.decisions.length).toBeGreaterThan(0);
      expect(project.caseStudy.outcome.length).toBeGreaterThan(20);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it('navigation ids are page-section anchors', () => {
    for (const item of navItems) {
      expect(item.id).toMatch(/^[a-z]+$/);
      expect(item.label.length).toBeGreaterThan(0);
    }
  });

  it('profile exposes the essentials', () => {
    expect(profile.email).toContain('@');
    expect(profile.socials.length).toBeGreaterThanOrEqual(2);
    expect(profile.resumeUrl).toMatch(/\.pdf$/);
  });
});
