"use client";
import { useEffect, useState } from "react";

export default function Toast({ message }: { message: string }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFading(true), 2000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface-muted-dark/70 text-white px-6 py-3 rounded-lg shadow-lg ${fading ? "animate-fade-out" : "animate-fade-in"}`}
    >
      {message}
    </div>
  );
}
