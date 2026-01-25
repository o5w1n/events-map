"use client";

import { useState, useRef, useEffect } from "react";
import { Event } from "@/lib/getEvents";

interface EventMapProps {
  events: Event[];
}

// --- DOODLE COMPONENTS ---
const DoodleStar = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
  </svg>
);

const DoodleSparkle = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
  </svg>
);

const DoodleBook = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const DoodleGradCap = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const DoodleBulb = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a7 7 0 0 0-7 7c0 2 0 3 2 4.5V15a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1.5c2-1.5 2-2.5 2-4.5a7 7 0 0 0-7-7z" />
  </svg>
);

const DoodleNote = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
  </svg>
);

const DoodleBalloon = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 9a6 6 0 1 0 12 0c0-3.87-2.67-6-6-6S6 5.13 6 9z" />
    <path d="M12 15v5" />
    <path d="m14 20-2 2-2-2" />
  </svg>
);

const DoodleCircle = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeDasharray="4 2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export default function EventMap({ events }: EventMapProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sortedEvents = [...events].sort((a, b) => a.id - b.id);

  const spacing = isMobile ? 160 : 220;
  const nodeSize = isMobile ? 72 : 88;

  const getPosition = (index: number) => {
    const x = (isMobile ? 120 : 180) + index * spacing;
    const amplitude = isMobile ? 70 : 100;
    const y = (isMobile ? 200 : 260) + Math.sin(index * 0.65) * amplitude;
    return { x, y };
  };

  const isEventLocked = (event: Event) => {
    if (!event.date) return false;
    return new Date() < event.date.toDate();
  };

  const getEventEmoji = (event: Event) => {
    return event.emoji || "✨";
  };

  const pathD = sortedEvents
    .map((_, i) => {
      const { x, y } = getPosition(i);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const totalWidth = sortedEvents.length * spacing + (isMobile ? 240 : 360);
  const containerHeight = isMobile ? 420 : 520;

  const unlockedCount = sortedEvents.filter((e) => !isEventLocked(e)).length;

  // Available doodles
  const Doodles = [
    DoodleBook,
    DoodleGradCap,
    DoodleBulb, // Education
    DoodleStar,
    DoodleSparkle,
    DoodleNote,
    DoodleBalloon, // Fun/Party
    DoodleCircle, // Decoration
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center">
            <span className="text-white text-lg">📅</span>
          </div>
          <div>
            <p className="font-semibold text-[var(--foreground)]">
              Semester Roadmap
            </p>
            <p className="text-xs text-[var(--muted)]">
              {sortedEvents.length} events planned
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className={`text-sm ${
                  star <= Math.ceil((unlockedCount / sortedEvents.length) * 3) ?
                    "text-[var(--gold)] animate-twinkle"
                  : "text-[var(--border)]"
                }`}
                style={{ animationDelay: `${star * 0.3}s` }}
              >
                ★
              </span>
            ))}
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-[var(--primary)]">
              {unlockedCount}
            </span>
            <span className="text-sm text-[var(--muted)]">
              /{sortedEvents.length}
            </span>
          </div>
        </div>
      </div>

      {/* Map container */}
      <div
        ref={scrollContainerRef}
        className="relative w-full overflow-x-auto overflow-y-hidden bg-gradient-to-b from-[var(--background)] to-[var(--card)]"
        style={{ height: `${containerHeight}px` }}
      >
        <div
          className="relative"
          style={{ width: `${totalWidth}px`, height: `${containerHeight}px` }}
        >
          {/* BACKGROUND DOODLES LAYER */}
          {/* Dynamically generates doodles along the entire width based on events */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {sortedEvents.map((_, i) => {
              // Render 4 doodles around each event position for more density
              const doodlesForSegment = [0, 1, 2, 3].map((offset) => {
                const seed = i * 13 + offset;
                const DoodleComp = Doodles[seed % Doodles.length];
                const { x } = getPosition(i);

                // Wider spread: -250px to +250px from event center
                const xPos = x + ((seed * 47) % 500) - 250;

                // Random Y (5% to 95%)
                const yPos = ((seed * 73) % 90) + 5;

                // Smaller size: 15px to 40px
                const size = 15 + (seed % 25);

                const rotation = (seed * 30) % 360;
                // Slightly lower opacity for better blending
                const opacity = 0.05 + (seed % 15) / 100; // 0.05 to 0.20

                // Colors: Alternate between primary, muted, gold, foreground
                const colors = [
                  "var(--primary)",
                  "var(--muted)",
                  "var(--gold)",
                  "var(--foreground)",
                ];
                const color = colors[seed % colors.length];

                return (
                  <DoodleComp
                    key={`${i}-${offset}`}
                    className="absolute"
                    style={{
                      left: `${xPos}px`,
                      top: `${yPos}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      color: color,
                      opacity: opacity,
                      transform: `rotate(${rotation}deg)`,
                    }}
                  />
                );
              });
              return doodlesForSegment;
            })}
          </div>

          {/* SVG Path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {/* Base path */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--border)"
              strokeWidth={isMobile ? 6 : 8}
              strokeLinecap="round"
            />

            {/* Colored path */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--primary)"
              strokeWidth={isMobile ? 3 : 4}
              strokeLinecap="round"
              strokeDasharray="12 8"
              className="animate-path"
              opacity="0.5"
            />
          </svg>

          {/* Event Nodes */}
          <div className="relative w-full h-full" style={{ zIndex: 2 }}>
            {sortedEvents.map((event, index) => {
              const position = getPosition(index);
              const locked = isEventLocked(event);

              return (
                <div
                  key={event.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: position.x, top: position.y }}
                >
                  {/* Pulse ring for unlocked */}
                  {!locked && (
                    <div
                      className="absolute inset-0 rounded-full bg-[var(--primary)] animate-ring"
                      style={{ width: nodeSize, height: nodeSize }}
                    />
                  )}

                  {/* Node */}
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className={`
                      relative flex flex-col items-center justify-center rounded-full
                      border-2 transition-smooth cursor-pointer
                      ${
                        locked ?
                          "bg-[var(--background)] border-[var(--border)] opacity-60"
                        : "bg-[var(--card)] border-[var(--primary)] hover:scale-105 shadow-md glow-primary"
                      }
                      ${!locked && "animate-float"}
                    `}
                    style={{
                      width: nodeSize,
                      height: nodeSize,
                      animationDelay: `${index * 0.2}s`,
                    }}
                  >
                    {locked ?
                      <span className="text-2xl opacity-50">🔒</span>
                    : <>
                        <span className="text-2xl">{getEventEmoji(event)}</span>
                      </>
                    }

                    {/* Boss indicator */}
                    {event.isBoss && !locked && (
                      <div className="absolute -top-2 -right-1 w-5 h-5 rounded-full bg-[var(--gold)] flex items-center justify-center shadow-sm">
                        <span className="text-[10px]">👑</span>
                      </div>
                    )}
                  </button>

                  {/* Label */}
                  <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-28 md:w-32 text-center">
                    <p
                      className={`
                      text-xs font-medium truncate
                      ${
                        locked ?
                          "text-[var(--muted-light)]"
                        : "text-[var(--foreground)]"
                      }
                    `}
                    >
                      {event.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center py-3 border-t border-[var(--border)] bg-[var(--background)]">
        <p className="text-[var(--muted)] text-xs">
          ← Scroll to explore all events →
        </p>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-[var(--card)] shadow-xl overflow-hidden hover-lift"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={`
              relative px-6 pt-8 pb-10 text-center
              ${
                isEventLocked(selectedEvent) ?
                  "bg-gradient-to-b from-[var(--border)] to-[var(--card)]"
                : "bg-gradient-to-b from-[var(--primary)] to-[var(--primary-light)]"
              }
            `}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/30 transition-smooth"
              >
                ✕
              </button>

              <div
                className={`
                inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-3 shadow-lg
                ${
                  isEventLocked(selectedEvent) ?
                    "bg-[var(--muted-light)]"
                  : "bg-white"
                }
              `}
              >
                <span className="text-3xl">
                  {isEventLocked(selectedEvent) ?
                    "🔒"
                  : getEventEmoji(selectedEvent)}
                </span>
              </div>

              {/* Stars for unlocked */}
              {!isEventLocked(selectedEvent) && (
                <div className="flex justify-center gap-1 mb-2">
                  {[1, 2, 3].map((star) => (
                    <span
                      key={star}
                      className="text-base text-[var(--gold)] animate-twinkle"
                      style={{ animationDelay: `${star * 0.15}s` }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              <span
                className={`
                inline-block px-3 py-1 rounded-full text-xs font-medium
                ${
                  isEventLocked(selectedEvent) ?
                    "bg-[var(--muted)] text-white"
                  : "bg-white/20 text-white"
                }
              `}
              >
                {selectedEvent.isBoss ?
                  "Featured Event"
                : `Event ${selectedEvent.id}`}
              </span>
            </div>

            {/* Content */}
            <div className="px-6 py-5 -mt-4 bg-[var(--card)] rounded-t-2xl relative">
              <h2 className="text-lg font-bold text-[var(--foreground)] text-center mb-2">
                {selectedEvent.name}
              </h2>

              <p className="text-[var(--muted)] text-sm text-center leading-relaxed mb-4">
                {selectedEvent.description}
              </p>

              {selectedEvent.date && (
                <div className="flex items-center justify-center gap-2 text-sm text-[var(--muted)] mb-4 pb-4 border-b border-[var(--border)]">
                  <span>📅</span>
                  <span>
                    {selectedEvent.date.toDate().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}

              {/* Status */}
              <div
                className={`
                rounded-xl p-4 text-center mb-4
                ${
                  isEventLocked(selectedEvent) ?
                    "bg-[var(--background)] border border-[var(--border)]"
                  : "bg-green-50 border border-green-100"
                }
              `}
              >
                {isEventLocked(selectedEvent) ?
                  <p className="text-[var(--muted)] text-sm">
                    🔒 Opens{" "}
                    {selectedEvent.date?.toDate().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                : <p className="text-[var(--success)] text-sm font-medium">
                    ✓ Open for registration
                  </p>
                }
              </div>

              {/* CTA */}
              {selectedEvent.formUrl && !isEventLocked(selectedEvent) && (
                <a
                  href={selectedEvent.formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-center hover:bg-[var(--primary-light)] transition-smooth shadow-md"
                >
                  Register Now
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
