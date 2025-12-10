"use client";

import { useState } from "react";
import BookCard, { Book } from "../../components/BookCard";

// Placeholder local state for saved/finished books.
export default function LibraryPage() {
  const [saved] = useState<Book[]>([]);
  const [finished] = useState<Book[]>([]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Library</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Saved Books</h2>
        {saved.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">No saved books yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {saved.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        )}
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-3">Finished Books</h2>
        {finished.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">No finished books yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {finished.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}