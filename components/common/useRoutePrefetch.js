"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

function normalizeRoutes(routes) {
  return [
    ...new Set(
      routes
        .filter((route) => typeof route === "string")
        .filter((route) => route.startsWith("/"))
        .filter((route) => !route.startsWith("//"))
        .filter((route) => !route.includes("#"))
    ),
  ];
}

function scheduleIdle(callback) {
  if (typeof window === "undefined") return undefined;

  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(callback, 250);
  return () => window.clearTimeout(id);
}

export default function useRoutePrefetch(routes = []) {
  const router = useRouter();
  const routeKey = routes.join("|");
  const normalizedRoutes = useMemo(() => normalizeRoutes(routes), [routeKey]);

  const prefetchRoute = useCallback(
    (route) => {
      if (!route || !route.startsWith("/") || route.startsWith("//")) return;

      try {
        router.prefetch(route);
      } catch {
        // Prefetch is an optimization; navigation should continue normally if it is unavailable.
      }
    },
    [router]
  );

  useEffect(() => {
    if (normalizedRoutes.length === 0) return undefined;

    return scheduleIdle(() => {
      normalizedRoutes.forEach(prefetchRoute);
    });
  }, [normalizedRoutes, prefetchRoute]);

  return prefetchRoute;
}
