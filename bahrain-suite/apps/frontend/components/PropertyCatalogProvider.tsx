'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { apiGetAuthenticated } from '../lib/api';
import { AUTH_CHANGED_EVENT, getStoredToken } from '../lib/auth';

export type PropertyCatalogItem = {
  id: string;
  name: string;
  code: string;
  accentColor?: string | null;
};

type Ctx = {
  items: PropertyCatalogItem[];
  loading: boolean;
  refresh: () => void;
  getMeta: (id: string) => PropertyCatalogItem | undefined;
};

const PropertyCatalogContext = createContext<Ctx | null>(null);

export function usePropertyCatalog(): Ctx | null {
  return useContext(PropertyCatalogContext);
}

export function PropertyCatalogProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<PropertyCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const refresh = useCallback(() => setReloadKey((k) => k + 1), []);

  const getMeta = useCallback(
    (id: string) => items.find((p) => p.id === id),
    [items],
  );

  useEffect(() => {
    function onAuth() {
      setReloadKey((k) => k + 1);
    }
    window.addEventListener(AUTH_CHANGED_EVENT, onAuth);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, onAuth);
  }, []);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setItems([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const j = (await apiGetAuthenticated(
          '/properties?limit=200&page=1',
          token,
        )) as { items?: PropertyCatalogItem[] };
        const list = j.items ?? [];
        if (!cancelled) setItems(list);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const value = useMemo<Ctx>(
    () => ({
      items,
      loading,
      refresh,
      getMeta,
    }),
    [items, loading, refresh, getMeta],
  );

  return (
    <PropertyCatalogContext.Provider value={value}>
      {children}
    </PropertyCatalogContext.Provider>
  );
}
