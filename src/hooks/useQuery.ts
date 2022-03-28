import React from "react";
import { useLocation } from "react-router-dom";

export default function useQuery(): Record<string, string> {
  const { search } = useLocation();
  const searchParams = React.useMemo(() => new URLSearchParams(search), [search]);

  const query: Record<string, string> = {};
  for (const p of searchParams) {
    query[p[0]] = p[1];
  }

  return query;
}
