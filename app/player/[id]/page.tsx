"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Book } from "../../../components/BookCard";
import AudioPlayer from "../../../components/AudioPlayer";

async function fetchBook(id: string) {
  const url = `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
}

export default function PlayerPage() {
  const params = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = params?.id as string;
    if (!id) return;
    setLoading(true);
    fetchBook(id)
      .then((b) => setBook(b))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params?.id]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!book) return <div className="p-6">Book not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-2">{book.title}</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4 whitespace-pre-line">{book.summary}</p>
      {book.audioLink ? (
        <AudioPlayer src={book.audioLink} />
      ) : (
        <p>No audio available.</p>
      )}
    </div>
  );
}