"use client";

import { useEffect, useState } from "react";
import BookCard, { Book } from "../../components/BookCard";

async function fetchBooks(status: "selected" | "recommended" | "suggested") {
  const url = `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=${status}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${status} books`);
  return res.json();
}

export default function ForYouPage() {
  const [selected, setSelected] = useState<Book | null>(null);
  const [recommended, setRecommended] = useState<Book[]>([]);
  const [suggested, setSuggested] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([
      fetchBooks("selected"),
      fetchBooks("recommended"),
      fetchBooks("suggested"),
    ])
      .then(([sel, rec, sug]) => {
        if (!mounted) return;
        setSelected(sel as Book);
        setRecommended(rec as Book[]);
        setSuggested(sug as Book[]);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">For You</h1>
      {loading && (
        <div className="space-y-4">
          <div className="h-48 rounded-lg bg-zinc-200 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-48 rounded-lg bg-zinc-200 animate-pulse" />
            ))}
          </div>
        </div>
      )}
      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}
      {!loading && selected && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Selected Book</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BookCard book={selected} />
          </div>
        </section>
      )}
      {!loading && recommended?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Recommended Books</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recommended.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>
      )}
      {!loading && suggested?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-3">Suggested Books</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {suggested.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}