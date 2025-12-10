"use client";

import Image from "next/image";
import Link from "next/link";

export type Book = {
  id: string;
  author: string;
  title: string;
  subTitle?: string;
  imageLink: string;
  audioLink?: string;
  totalRating?: number;
  averageRating?: number;
  keyIdeas?: string[];
  type?: string;
  status?: string;
  subscriptionRequired?: boolean;
  summary?: string;
  tags?: string[];
  bookDescription?: string;
  authorDescription?: string;
};

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="group relative rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-black hover:shadow-md transition-shadow"
    >
      {book.subscriptionRequired && (
        <span className="absolute right-2 top-2 z-10 rounded-full bg-amber-500 text-white px-2 py-1 text-xs">
          Premium
        </span>
      )}
      <div className="aspect-[3/4] relative">
        {/* Use next/image when possible; fallback to img for external links */}
        {book.imageLink?.startsWith("/") ? (
          <Image src={book.imageLink} alt={book.title} fill className="object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={book.imageLink} alt={book.title} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2">{book.title}</h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-1">{book.author}</p>
      </div>
    </Link>
  );
}