"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Book } from "./BookCard";

export default function SearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const show = useMemo(() => {
    return pathname !== "/" && pathname !== "/choose-plan";
  }, [pathname]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!show) return;
    if (!query) {
      setResults([]);
      return;
    }
    setLoading(true);
    const handle = setTimeout(() => {
      const url = `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
        query
      )}`;
      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Search failed");
          return res.json();
        })
        .then((data) => setResults(data as Book[]))
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(handle);
  }, [query, show]);

  if (!show) return null;

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books by title or author…"
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm bg-white w-64"
      />
      {query && (
        <div className="absolute mt-2 w-[28rem] max-w-[80vw] z-50 rounded-md border border-zinc-200 bg-white shadow-lg">
          {loading ? (
            <div className="p-3 text-sm text-zinc-600">Searching…</div>
          ) : error ? (
            <div className="p-3 text-sm text-red-600">{error}</div>
          ) : results.length === 0 ? (
            <div className="p-3 text-sm text-zinc-600">No results</div>
          ) : (
            <ul className="max-h-80 overflow-auto">
              {results.map((r) => (
                <li
                  key={r.id}
                  className="px-3 py-2 hover:bg-zinc-100 cursor-pointer"
                  onClick={() => router.push(`/book/${r.id}`)}
                >
                  <div className="text-sm font-medium line-clamp-1">{r.title}</div>
                  <div className="text-xs text-zinc-600 line-clamp-1">{r.author}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}