"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 text-zinc-600">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm">© {new Date().getFullYear()} Summarist. All rights reserved.</p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link href="/about" className="hover:text-zinc-800">About</Link>
            <Link href="/contact" className="hover:text-zinc-800">Contact</Link>
            <Link href="/help" className="hover:text-zinc-800">Help</Link>
            <Link href="/privacy" className="hover:text-zinc-800">Privacy</Link>
            <Link href="/terms" className="hover:text-zinc-800">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}