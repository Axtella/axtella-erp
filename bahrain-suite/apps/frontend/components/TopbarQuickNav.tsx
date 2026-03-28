'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getVisibleNav, type NavNode } from '../lib/nav-tree';

function collectLinks(node: NavNode): { href: string; label: string }[] {
  const out: { href: string; label: string }[] = [];
  function walk(n: NavNode) {
    if (n.href) out.push({ href: n.href, label: n.label });
    if (n.children) n.children.forEach(walk);
  }
  walk(node);
  return out;
}

export function TopbarQuickNav({ role }: { role: string | null }) {
  const visible = useMemo(() => getVisibleNav(role), [role]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current?.contains(e.target as Node)) return;
      setOpen(false);
    }
    if (open) {
      document.addEventListener('mousedown', onDoc);
      return () => document.removeEventListener('mousedown', onDoc);
    }
  }, [open]);

  const sections = visible.filter((n) => n.id !== 'home');

  return (
    <div className="topbar-quick-nav" ref={ref}>
      <button
        type="button"
        className="topbar-quick-nav-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="topbar-quick-nav-trigger-label">Modules</span>
        <span
          className={`topbar-quick-nav-caret${open ? ' topbar-quick-nav-caret--open' : ''}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="topbar-quick-nav-panel" role="menu">
          <div className="topbar-quick-nav-panel-head">
            <span className="topbar-quick-nav-panel-title">Go to module</span>
            <Link
              href="/"
              className="topbar-quick-nav-home-link"
              role="menuitem"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </div>
          <div className="topbar-quick-nav-grid">
            {sections.map((node) => {
              const links = collectLinks(node);
              if (links.length === 0) return null;
              return (
                <div key={node.id} className="topbar-quick-nav-col">
                  <div className="topbar-quick-nav-heading">{node.label}</div>
                  <ul className="topbar-quick-nav-list">
                    {links.map((l) => (
                      <li key={`${node.id}-${l.href}`}>
                        <Link
                          href={l.href}
                          role="menuitem"
                          onClick={() => setOpen(false)}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
