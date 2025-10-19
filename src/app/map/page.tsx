"use client";
import { useEffect, useState } from "react";
import { getEvents, Event } from "@/lib/getEvents";
import dynamic from "next/dynamic";

// Dynamically import to avoid SSR issues - UPDATED LINE
const CandyCrushMap = dynamic(() => import("@/component/EventMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[800px] rounded-2xl bg-gradient-to-b from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🍬</div>
        <p className="text-white text-xl font-bold">Loading map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    getEvents()
      .then((data) => {
        console.log("🔥 Fetched events:", data);
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading events:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (!isClient) return null;
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce"></div>
          <p className="text-white text-2xl font-bold">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Events</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-900 via-red-500 to-stone-500 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-2xl">
            ACSC Event Map
          </h1>
          <p className="text-xl text-neutral-100 font-semibold">
            Complete {events.length} epic events this semester!
          </p>
        </div>

        {/* Candy Crush Style Map */}
        {events.length === 0 ? (
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-12 border border-white/20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-white text-xl">No events found!</p>
            <p className="text-blue-200 mt-2">Add events to your Firestore database.</p>
          </div>
        ) : (
          <CandyCrushMap events={events} />
        )}
      </div>
    </main>
  );
}