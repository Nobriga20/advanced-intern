"use client";

import { useEffect, useRef, useState } from "react";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const skip = (secs: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.currentTime + secs, duration));
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
    <div className="w-full rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
      <audio ref={audioRef} src={src} />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            className="rounded-md border px-3 py-2 text-sm"
            onClick={() => skip(-10)}
          >
            ◀︎ 10s
          </button>
          <button
            className="rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black px-4 py-2 text-sm"
            onClick={togglePlay}
          >
            {playing ? "Pause" : "Play"}
          </button>
          <button
            className="rounded-md border px-3 py-2 text-sm"
            onClick={() => skip(10)}
          >
            10s ▶︎
          </button>
        </div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {formatTime(duration)}
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={1}
        value={currentTime}
        onChange={onSeek}
        className="w-full"
      />
      <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {formatTime(currentTime)}
      </div>
    </div>
  );
}