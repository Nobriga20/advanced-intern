"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../lib/store";
import { openModal } from "../../../store/authSlice";
import type { Book } from "../../../components/BookCard";

async function fetchBook(id: string) {
  const url = `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch book");
  return res.json();
}

export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loggedIn, user } = useAppSelector((s) => s.auth);
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

  const requireAuth = (premium: boolean) => {
    if (!loggedIn) {
      dispatch(openModal());
      return false;
    }
    if (premium && !user?.subscribed) {
      router.push("/choose-plan");
      return false;
    }
    return true;
  };

  const onRead = () => {
    if (!book) return;
    if (!requireAuth(!!book.subscriptionRequired)) return;
    // For now, reading is just staying on this page where content is shown
  };

  const onListen = () => {
    if (!book) return;
    if (!requireAuth(!!book.subscriptionRequired)) return;
    router.push(`/player/${book.id}`);
  };

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!book) return <div className="p-6">Book not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-2">{book.title}</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">By {book.author}</p>
      {book.summary && (
        <div className="prose dark:prose-invert max-w-none mb-6">
          <h2>Summary</h2>
          <p>{book.summary}</p>
        </div>
      )}
      <div className="flex items-center gap-3">
        <button
          className="rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black px-4 py-2 text-sm"
          onClick={onRead}
        >
          Read
        </button>
        <button
          className="rounded-md border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm"
          onClick={onListen}
        >
          Listen
        </button>
      </div>
    </div>
  );
}