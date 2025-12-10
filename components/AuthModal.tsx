"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../lib/store";
import { closeModal, guestLogin, login, register } from "../store/authSlice";

export default function AuthModal() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const modalOpen = useAppSelector((s) => s.auth.modalOpen);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!modalOpen) return null;

  const validate = () => {
    if (!email.includes("@") || !email.includes(".")) {
      setError("Invalid email");
      return false;
    }
    if (mode === "register" && password.length < 6) {
      setError("Short password (min 6 chars)");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (mode === "login") {
      dispatch(login({ email }));
    } else {
      dispatch(register({ email }));
    }
    router.push("/for-you");
  };

  const handleGuest = () => {
    dispatch(guestLogin());
    router.push("/for-you");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white dark:bg-zinc-900 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {mode === "login" ? "Login" : "Register"}
          </h2>
          <button
            className="text-sm text-zinc-500 hover:text-zinc-700"
            onClick={() => dispatch(closeModal())}
            aria-label="Close auth modal"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm bg-white dark:bg-black"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm bg-white dark:bg-black"
          />
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <div className="flex items-center gap-2">
            <button
              className="flex-1 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black px-3 py-2 text-sm"
              onClick={handleSubmit}
            >
              {mode === "login" ? "Login" : "Register"}
            </button>
            <button
              className="flex-1 rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm"
              onClick={handleGuest}
            >
              Guest login
            </button>
          </div>
          <button
            className="text-sm text-zinc-600 dark:text-zinc-400"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login"
              ? "No account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}