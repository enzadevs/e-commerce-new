"use client";

import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function UseFetcher(url) {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 1000,
  });

  return {
    data,
    isLoading,
    isError: error,
  };
}
