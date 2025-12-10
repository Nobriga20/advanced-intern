"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/store";
import { setPlan, setSubscribed, setTrial } from "../../store/authSlice";

export default function ChoosePlanPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const subscribe = (plan: "premium" | "premium-plus") => {
    dispatch(setPlan(plan));
    dispatch(setSubscribed(true));
    dispatch(setTrial(billing === "yearly")); // simulate 7-day trial for yearly
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-1">Choose Plan</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mb-6">
        Select Monthly or Yearly billing. Yearly includes a 7-day free trial.
      </p>

      <div className="mb-6">
        <div className="inline-flex rounded-full border border-zinc-300 dark:border-zinc-700 overflow-hidden">
          <button
            className={`px-4 py-2 text-sm ${billing === "monthly" ? "bg-zinc-900 text-white" : ""}`}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 text-sm ${billing === "yearly" ? "bg-zinc-900 text-white" : ""}`}
            onClick={() => setBilling("yearly")}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold mb-2">Premium</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Access summaries and audio.</p>
          <p className="text-2xl font-bold mb-4">{billing === "monthly" ? "$9/mo" : "$90/yr"}</p>
          <button
            className="rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black px-4 py-2 text-sm"
            onClick={() => subscribe("premium")}
          >
            {billing === "yearly" ? "Start 7-day free trial" : "Subscribe"}
          </button>
        </div>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
          <h2 className="text-lg font-semibold mb-2">Premium Plus</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Everything in Premium, plus extras.</p>
          <p className="text-2xl font-bold mb-4">{billing === "monthly" ? "$14/mo" : "$140/yr"}</p>
          <button
            className="rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black px-4 py-2 text-sm"
            onClick={() => subscribe("premium-plus")}
          >
            {billing === "yearly" ? "Start 7-day free trial" : "Subscribe"}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <details className="rounded-md border border-zinc-200 dark:border-zinc-800 p-4">
          <summary className="cursor-pointer font-medium">What’s included?</summary>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Summaries, audio, and curated lists tailored to you.</p>
        </details>
        <details className="rounded-md border border-zinc-200 dark:border-zinc-800 p-4">
          <summary className="cursor-pointer font-medium">Can I cancel?</summary>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Yes, anytime from settings. Trial ends automatically if not canceled.</p>
        </details>
        <details className="rounded-md border border-zinc-200 dark:border-zinc-800 p-4">
          <summary className="cursor-pointer font-medium">Is there a student discount?</summary>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Not yet, but we’re working on it.</p>
        </details>
      </div>

      {user?.subscribed && (
        <p className="mt-6 text-sm text-green-600">Subscribed to {user.plan}{user.trialActive ? " (trial active)" : ""}</p>
      )}
    </div>
  );
}