"use client";

import { useEffect, useState } from "react";
import { getEvents, Event } from "@/lib/getEvents";
import dynamic from "next/dynamic";
import Image from "next/image";

const EventMap = dynamic(() => import("@/component/EventMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-2xl border border-[var(--border)] bg-[var(--card)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-[var(--muted)] text-sm">Loading events...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading events:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary)] flex items-center justify-center shadow-md">
            <span className="text-2xl text-white">📍</span>
          </div>
          <p className="text-[var(--muted)]">Loading events...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-[var(--background)]">
        <div className="max-w-md text-center bg-[var(--card)] rounded-2xl p-8 shadow-sm border border-[var(--border)]">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-red-50 flex items-center justify-center">
            <span className="text-3xl">😔</span>
          </div>
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">
            Something went wrong
          </h2>
          <p className="text-[var(--muted)] text-sm">{error}</p>
        </div>
      </main>
    );
  }

  const unlockedCount = events.filter(
    (e) => !e.date || new Date() >= e.date.toDate(),
  ).length;

  return (
    <main className="min-h-screen bg-[var(--background)] doodle-bg">
      {/* Header */}
      <header className="pt-8 pb-6 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Branding */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 hover:scale-105 transition-transform duration-300">
                <Image
                  src="/acsc-logo.svg"
                  alt="ACSC Logo"
                  fill
                  className="object-contain drop-shadow-sm"
                  sizes="56px"
                />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-[var(--foreground)] tracking-tight">
                  ACSC Event{" "}
                  <span className="text-[var(--primary)]">Roadmap</span>
                </h1>
                <p className="text-[var(--muted)] text-sm font-medium">
                  By ACity Student Council
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
                <span className="text-sm text-[var(--muted)]">Progress: </span>
                <span className="font-semibold text-[var(--primary)]">
                  {unlockedCount}
                </span>
                <span className="text-[var(--muted)]"> / {events.length}</span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mt-6">
            <p className="text-[var(--muted)]">
              Unlock your{" "}
              <span className="font-semibold text-[var(--foreground)]">
                campus experience
              </span>
              , one event at a time.
            </p>
          </div>
        </div>
      </header>

      {/* Map */}
      <section className="px-4 md:px-6 pb-8">
        <div className="max-w-5xl mx-auto">
          {events.length === 0 ?
            <div className="text-center py-16 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-[var(--background)] flex items-center justify-center">
                <span className="text-3xl">📭</span>
              </div>
              <h2 className="text-lg font-medium text-[var(--foreground)] mb-2">
                No events yet
              </h2>
              <p className="text-[var(--muted)] text-sm">
                Check back soon for upcoming events!
              </p>
            </div>
          : <EventMap events={events} />}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[var(--muted)] text-sm">
            © {new Date().getFullYear()} Academic City Student Council
          </p>
          <p className="text-[var(--muted)] text-sm">
            Made with <span className="text-[var(--primary)]">♥</span> by ACSC
          </p>
        </div>
      </footer>
    </main>
  );
}
