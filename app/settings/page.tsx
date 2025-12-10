"use client";

import { useAppSelector, useAppDispatch } from "../../lib/store";
import { openModal } from "../../store/authSlice";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { user, loggedIn } = useAppSelector((s) => s.auth);
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      {loggedIn ? (
        <div className="space-y-2">
          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-medium">Subscription:</span> {user?.subscribed ? user?.plan : "basic"}
          </p>
          {!user?.subscribed && (
            <a href="/choose-plan" className="inline-block rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black px-3 py-2 text-sm">Upgrade</a>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/login-placeholder.png" alt="Login required" className="w-48 h-48 object-contain" />
          <button
            className="rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black px-3 py-2 text-sm"
            onClick={() => dispatch(openModal())}
          >
            Login to view settings
          </button>
        </div>
      )}
    </div>
  );
}