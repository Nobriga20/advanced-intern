"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../lib/store";
import { logout, openModal } from "../store/authSlice";
import SearchBar from "./SearchBar";

export default function Header() {
  const dispatch = useAppDispatch();
  const { loggedIn, user } = useAppSelector((s) => s.auth);

  const pathname = usePathname();
  const showSearch = pathname !== "/" && pathname !== "/choose-plan";

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-white">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-semibold" aria-label="Go to home">
          Summarist
        </Link>
        <nav className="hidden sm:flex items-center gap-3 text-sm text-zinc-600">
          <Link href="/for-you">For You</Link>
          <Link href="/choose-plan">Choose Plan</Link>
          <Link href="/settings">Settings</Link>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        {showSearch && <SearchBar />}
        {loggedIn ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-600">
              {user?.email}
            </span>
            <button
              className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="rounded-md bg-zinc-900 text-white px-3 py-2 text-sm"
            onClick={() => dispatch(openModal())}
          >
            Login / Register
          </button>
        )}
      </div>
    </header>
  );
}