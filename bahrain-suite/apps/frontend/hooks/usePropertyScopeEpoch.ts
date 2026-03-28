'use client';

import { useEffect, useState } from 'react';
import { PROPERTY_SCOPE_CHANGED_EVENT } from '../lib/property-scope';

/** Bumps when the global property scope changes (header or programmatic). */
export function usePropertyScopeEpoch(): number {
  const [epoch, setEpoch] = useState(0);
  useEffect(() => {
    const fn = () => setEpoch((e) => e + 1);
    window.addEventListener(PROPERTY_SCOPE_CHANGED_EVENT, fn);
    return () => window.removeEventListener(PROPERTY_SCOPE_CHANGED_EVENT, fn);
  }, []);
  return epoch;
}
