'use client';

import React, { useId, useMemo, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Cpu,
  Eye,
  RadioTower,
  Truck,
} from 'lucide-react';
import styles from './brand-showcase.module.css';

const brand = {
  blue: '#114A9F',
  red: '#C70F14',
  yellow: '#E4BE16',
  dark: '#0A0F1C',
  cyan: '#00C2FF',
  white: '#FFFFFF',
};

type ModuleKey = 'GLOBAL' | 'FMS' | 'AVL' | 'IOTS' | 'EAGLE_EYE';

const moduleMeta: Record<
  ModuleKey,
  { label: string; subtitle: string; icon: ReactNode; accent: string }
> = {
  GLOBAL: {
    label: 'Axtella Global',
    subtitle: 'Enterprise digital operations platform',
    icon: <Cpu className={styles.iconSm} aria-hidden />,
    accent: brand.blue,
  },
  FMS: {
    label: 'Axtella FMS',
    subtitle: 'Fleet management system',
    icon: <Truck className={styles.iconSm} aria-hidden />,
    accent: brand.cyan,
  },
  AVL: {
    label: 'Axtella AVL',
    subtitle: 'Advanced vehicle tracking',
    icon: <RadioTower className={styles.iconSm} aria-hidden />,
    accent: '#2563EB',
  },
  IOTS: {
    label: 'Axtella IoTs',
    subtitle: 'Smart connected IoT platform',
    icon: <Cpu className={styles.iconSm} aria-hidden />,
    accent: '#14B8A6',
  },
  EAGLE_EYE: {
    label: 'Axtella Eagle Eye',
    subtitle: 'AI surveillance and insight engine',
    icon: <Eye className={styles.iconSm} aria-hidden />,
    accent: '#7C3AED',
  },
};

function AxtellaMark({
  animated = true,
  size = 88,
}: {
  animated?: boolean;
  size?: number;
}) {
  const uid = useId().replace(/:/g, '');
  const gradId = `axtella-grad-${uid}`;
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      initial={animated ? { opacity: 0, scale: 0.9 } : false}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.5 }}
      className={styles.markShrink}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={brand.red} />
          <stop offset="52%" stopColor={brand.yellow} />
          <stop offset="100%" stopColor={brand.blue} />
        </linearGradient>
      </defs>
      <motion.path
        d="M18 98 L50 24 Q55 14 66 24 L100 98 Q82 81 58 81 Q36 81 18 98 Z"
        fill={`url(#${gradId})`}
        animate={animated ? { y: [0, -2, 0] } : undefined}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
      />
      <motion.circle
        cx="83"
        cy="31"
        r="5"
        fill={brand.white}
        animate={
          animated ? { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] } : undefined
        }
        transition={{ repeat: Infinity, duration: 1.8 }}
      />
    </motion.svg>
  );
}

function BrandWordmark({
  moduleKey,
  dark = false,
}: {
  moduleKey: ModuleKey;
  dark?: boolean;
}) {
  const meta = moduleMeta[moduleKey];
  return (
    <div className={styles.brandRow}>
      <AxtellaMark />
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            className={styles.wordmarkTitle}
            style={{ color: dark ? brand.white : brand.blue }}
          >
            xtella
          </span>
          {moduleKey !== 'GLOBAL' ? (
            <span
              className={styles.moduleBadge}
              style={{ backgroundColor: meta.accent, color: brand.white }}
            >
              {moduleKey.replace('_', ' ')}
            </span>
          ) : null}
        </div>
        <div
          className={styles.wordmarkSub}
          style={{ color: dark ? '#CBD5E1' : '#475569' }}
        >
          {meta.subtitle}
        </div>
      </div>
    </div>
  );
}

function TopLoader() {
  return (
    <div className={styles.topLoader} aria-hidden>
      <motion.div
        className={styles.topLoaderBar}
        style={{
          background: `linear-gradient(90deg, ${brand.red} 0%, ${brand.yellow} 45%, ${brand.blue} 100%)`,
        }}
        initial={{ width: '12%' }}
        animate={{ width: ['12%', '58%', '84%', '100%'] }}
        transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
      />
    </div>
  );
}

function SplashScreen({ moduleKey }: { moduleKey: ModuleKey }) {
  return (
    <div className={styles.splashWrap}>
      <div className={styles.splashInner}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}
        >
          <AxtellaMark size={108} />
        </motion.div>
        <motion.h2
          className={styles.splashTitle}
          style={{ color: brand.blue }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {moduleMeta[moduleKey].label}
        </motion.h2>
        <motion.p
          className={styles.splashLead}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          Initializing platform modules, secure services, and live operations.
        </motion.p>
        <motion.div
          className={styles.progressTrack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <motion.div
            className={styles.progressBar}
            style={{
              background: `linear-gradient(90deg, ${brand.red}, ${brand.yellow}, ${brand.blue})`,
            }}
            initial={{ x: '-100%' }}
            animate={{ x: ['-100%', '0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function ShowcaseButton({
  variant = 'default',
  className = '',
  style,
  onClick,
  children,
}: {
  variant?: 'default' | 'outline';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: ReactNode;
}) {
  const v =
    variant === 'outline' ? styles.btnOutline : styles.btnDefault;
  return (
    <button
      type="button"
      className={`${styles.btn} ${v} ${className}`.trim()}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function LoginCard({ moduleKey }: { moduleKey: ModuleKey }) {
  return (
    <div className={styles.loginCard}>
      <div className={styles.loginCardContent}>
        <div className={styles.loginHero} style={{ backgroundColor: brand.dark }}>
          <motion.div
            className={styles.loginHeroGlow}
            style={{
              background: `radial-gradient(circle at top right, ${brand.cyan} 0%, transparent 34%), radial-gradient(circle at bottom left, ${brand.red} 0%, transparent 28%)`,
            }}
            animate={{ opacity: [0.16, 0.28, 0.16] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className={styles.loginHeroInner}>
            <BrandWordmark moduleKey={moduleKey} dark />
            <div style={{ marginTop: '3rem' }}>
              <h3>Secure operations access</h3>
              <p>
                Use role-based access for operations, finance, maintenance,
                investor statements, and live dashboards.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.loginFormCol}>
          <div className={styles.loginFormInner}>
            <h4 style={{ color: brand.blue }}>Sign in</h4>
            <p>Access the unified property and operations platform.</p>
            <div className={styles.formStack}>
              <input
                className={styles.input}
                placeholder="Email"
                type="email"
                autoComplete="off"
                readOnly
                aria-label="Email (demo)"
              />
              <input
                className={styles.input}
                placeholder="Password"
                type="password"
                autoComplete="off"
                readOnly
                aria-label="Password (demo)"
              />
              <ShowcaseButton
                className={styles.btnBlock}
                style={{ backgroundColor: brand.blue, color: brand.white }}
              >
                Sign in
              </ShowcaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarBrand({ moduleKey }: { moduleKey: ModuleKey }) {
  const nav = [
    'Dashboard',
    'Bookings',
    'Units',
    'Tenants',
    'Finance',
    'Reports',
    'Approvals',
  ];
  return (
    <div className={styles.sidebarDemo}>
      <aside
        className={styles.sidebarAside}
        style={{ backgroundColor: brand.dark }}
      >
        <BrandWordmark moduleKey={moduleKey} dark />
        <div className={styles.navStack}>
          {nav.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={styles.navItem}
            >
              <span>{item}</span>
              <ChevronRight className={styles.iconSm} aria-hidden />
            </motion.div>
          ))}
        </div>
      </aside>
      <section className={styles.sidebarMain}>
        <div className={styles.kpiGrid}>
          {[
            { title: 'Occupancy', value: '87%' },
            { title: 'Receivables', value: 'BHD 12,450' },
            { title: 'Open Approvals', value: '14' },
          ].map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <div className={styles.kpiCard}>
                <div className={styles.kpiCardBody}>
                  <div className={styles.kpiLabel}>{card.title}</div>
                  <div
                    className={styles.kpiValue}
                    style={{ color: brand.blue }}
                  >
                    {card.value}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function BrandSwitcher({
  value,
  onChange,
}: {
  value: ModuleKey;
  onChange: (v: ModuleKey) => void;
}) {
  return (
    <div className={styles.switcher}>
      {(Object.keys(moduleMeta) as ModuleKey[]).map((key) => (
        <ShowcaseButton
          key={key}
          variant={value === key ? 'default' : 'outline'}
          onClick={() => onChange(key)}
          style={
            value === key
              ? { backgroundColor: moduleMeta[key].accent, color: brand.white }
              : undefined
          }
        >
          <span style={{ marginRight: '0.5rem', display: 'inline-flex' }}>
            {moduleMeta[key].icon}
          </span>
          {moduleMeta[key].label}
        </ShowcaseButton>
      ))}
    </div>
  );
}

export default function AxtellaAnimatedBrandingUiIntegration() {
  const [moduleKey, setModuleKey] = useState<ModuleKey>('GLOBAL');
  const meta = useMemo(() => moduleMeta[moduleKey], [moduleKey]);

  return (
    <div className={styles.page}>
      <TopLoader />
      <div className={`${styles.maxW} ${styles.stackLg}`}>
        <div className={styles.stackMd}>
          <div className={styles.kicker}>Animated Branding + UI Integration</div>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title} style={{ color: brand.blue }}>
                Axtella white-label system
              </h1>
              <p className={styles.lead}>
                Unified animated brand treatment for FMS, AVL, IoTs, and Eagle
                Eye across splash, login, sidebar, and dashboard UI.
              </p>
            </div>
            <BrandSwitcher value={moduleKey} onChange={setModuleKey} />
          </div>
        </div>

        <div className={`${styles.cardGlow} ${styles.cardGlowInner}`}>
          <BrandWordmark moduleKey={moduleKey} />
          <div
            className={styles.pill}
            style={{ backgroundColor: meta.accent, color: brand.white }}
          >
            {meta.subtitle}
          </div>
        </div>

        <div className={styles.grid2}>
          <div>
            <div className={styles.sectionLabel}>Splash / Loader</div>
            <SplashScreen moduleKey={moduleKey} />
          </div>
          <div>
            <div className={styles.sectionLabel}>Login Integration</div>
            <LoginCard moduleKey={moduleKey} />
          </div>
        </div>

        <div>
          <div className={styles.sectionLabel}>
            Sidebar + Dashboard Integration
          </div>
          <SidebarBrand moduleKey={moduleKey} />
        </div>
      </div>
    </div>
  );
}
