'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  branchActive,
  type NavNode,
  getVisibleNav,
} from '../lib/nav-tree';

function NavBadgePill({ node }: { node: NavNode }) {
  if (node.navBadge === 'soon') {
    return (
      <span className="nav-badge nav-badge--soon" title="Coming soon">
        Soon
      </span>
    );
  }
  if (node.navBadge === 'live') {
    return (
      <span className="nav-badge nav-badge--live" title="Live data">
        Live
      </span>
    );
  }
  return null;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`nav-chevron${open ? ' nav-chevron--open' : ''}`}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function NavBranch({
  node,
  pathname,
  depth,
  openSet,
  toggle,
}: {
  node: NavNode;
  pathname: string;
  depth: number;
  openSet: Set<string>;
  toggle: (id: string) => void;
}) {
  const hasKids = !!(node.children && node.children.length);
  const open = openSet.has(node.id);
  const active = branchActive(node, pathname);
  const selfExact =
    node.href &&
    (node.href === '/'
      ? pathname === '/'
      : pathname === node.href || pathname.startsWith(`${node.href}/`));

  if (hasKids) {
    return (
      <li className="nav-tree-item">
        <div
          className={`nav-tree-row nav-tree-row--parent${active ? ' nav-tree-row--active-branch' : ''}`}
          style={{ paddingInlineStart: 8 + depth * 10 }}
        >
          {node.href ? (
            <Link
              href={node.href}
              className={`nav-tree-link nav-tree-link--parent${selfExact ? ' active' : ''}`}
            >
              <span className="nav-tree-link-inner">
                {node.label}
                <NavBadgePill node={node} />
              </span>
            </Link>
          ) : (
            <span className="nav-tree-link nav-tree-link--parent nav-tree-link--nohref">
              {node.label}
            </span>
          )}
          <button
            type="button"
            className="nav-tree-toggle"
            aria-expanded={open}
            aria-label={open ? `Collapse ${node.label}` : `Expand ${node.label}`}
            onClick={() => toggle(node.id)}
          >
            <Chevron open={open} />
          </button>
        </div>
        {open ? (
          <ul className="nav-tree-children">
            {node.children!.map((ch) => (
              <NavBranch
                key={ch.id}
                node={ch}
                pathname={pathname}
                depth={depth + 1}
                openSet={openSet}
                toggle={toggle}
              />
            ))}
          </ul>
        ) : null}
      </li>
    );
  }

  if (!node.href) return null;

  return (
    <li className="nav-tree-item">
      <Link
        href={node.href}
        className={`nav-tree-link${pathname === node.href ? ' active' : ''}`}
        style={{ paddingInlineStart: 14 + depth * 10 }}
      >
        <span className="nav-tree-link-inner">
          {node.label}
          <NavBadgePill node={node} />
        </span>
      </Link>
    </li>
  );
}

export function SidebarNav({ role }: { role: string | null }) {
  const pathname = usePathname();
  const visible = useMemo(() => getVisibleNav(role), [role]);

  const defaultOpen = useMemo(() => {
    const s = new Set<string>();
    const walk = (nodes: NavNode[]) => {
      for (const n of nodes) {
        if (n.children?.length) {
          s.add(n.id);
          walk(n.children);
        }
      }
    };
    walk(visible);
    return s;
  }, [visible]);

  const [openSet, setOpenSet] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      Array.from(defaultOpen).forEach((id) => next.add(id));
      const walk = (nodes: NavNode[]) => {
        for (const n of nodes) {
          if (n.children?.length) {
            if (branchActive(n, pathname)) next.add(n.id);
            walk(n.children);
          }
        }
      };
      walk(visible);
      return next;
    });
  }, [pathname, visible, defaultOpen]);

  const toggle = useCallback((id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <ul className="nav-tree">
      {visible.map((node) => (
        <NavBranch
          key={node.id}
          node={node}
          pathname={pathname}
          depth={0}
          openSet={openSet}
          toggle={toggle}
        />
      ))}
    </ul>
  );
}
