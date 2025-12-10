"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../lib/store";
import { openModal, logout } from "../store/authSlice";

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((s) => s.auth);

  const hide = pathname === "/" || pathname === "/choose-plan";
  if (hide) return null;

  const itemClass = (active: boolean, disabled?: boolean) =>
    `flex items-center gap-2 px-4 py-2 rounded-md ${
      active ? "bg-zinc-100" : ""
    } ${disabled ? "cursor-not-allowed text-zinc-400" : "hover:bg-zinc-100"}`;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-56 border-r border-zinc-200 bg-white hidden md:block">
      <nav className="py-3 space-y-1">
        <Link href="/for-you" className={itemClass(pathname === "/for-you")}>For you</Link>
        <Link href="/library" className={itemClass(pathname === "/library")}>Library</Link>
        <span className={itemClass(false, true)}>Highlights</span>
        <span className={itemClass(false, true)}>Search</span>
        <Link href="/settings" className={itemClass(pathname === "/settings")}>Settings</Link>
        <span className={itemClass(false, true)}>Help & Support</span>
        {loggedIn ? (
          <button className={itemClass(false)} onClick={() => dispatch(logout())}>Logout</button>
        ) : (
          <button className={itemClass(false)} onClick={() => dispatch(openModal())}>Login</button>
        )}
      </nav>
    </aside>
  );
}