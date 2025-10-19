// import { useState, useRef, useEffect } from "react";
// import { Event } from "@/lib/getEvents";

// interface CandyCrushMapProps {
//   events: Event[];
// }

// export default function EventMap({ events }: CandyCrushMapProps) {
//   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
//   const [zoom, setZoom] = useState(1);
//   const [isMobile, setIsMobile] = useState(false);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   // Detect mobile device
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Simple sort by ID
//   const sortedEvents = [...events].sort((a, b) => a.id - b.id);

//   // Responsive spacing based on device
//   const eventSpacing = isMobile ? 200 : 300;
//   const circleSize = isMobile ? "w-24 h-24" : "w-36 h-36";

//   // Generate path points for HORIZONTAL winding road
//   const generatePathPoints = (index: number, total: number) => {
//     const baseX = (isMobile ? 150 : 200) + index * eventSpacing;
//     const amplitude = isMobile ? 80 : 120;
//     const frequency = 0.6;

//     const offsetY = Math.sin(index * frequency) * amplitude;
//     const centerY = isMobile ? 200 : 300;
//     const y = centerY + offsetY;

//     return { x: baseX, y: y };
//   };

//   const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
//   const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.6));
//   const handleResetZoom = () => setZoom(1);

//   const totalWidth =
//     sortedEvents.length * eventSpacing + (isMobile ? 300 : 400);
//   const containerHeight = isMobile ? 400 : 600;

//   return (
//     <div
//       className={`relative w-full bg-gradient-to-r from-red-200 via-pink-200 to-red-100 rounded-2xl overflow-hidden shadow-2xl border-4 border-red-300 ${
//         isMobile ? "h-[450px]" : "h-[700px]"
//       }`}
//     >
//       {/* Zoom Controls - Hidden on mobile for cleaner UI */}
//       {!isMobile && (
//         <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg z-20 flex flex-col gap-2">
//           <button
//             onClick={handleZoomIn}
//             className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-bold text-xl transition flex items-center justify-center shadow-lg"
//             title="Zoom In"
//           >
//             +
//           </button>
//           <button
//             onClick={handleResetZoom}
//             className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-bold text-xs transition flex items-center justify-center shadow-lg"
//             title="Reset Zoom"
//           >
//             100%
//           </button>
//           <button
//             onClick={handleZoomOut}
//             className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-bold text-xl transition flex items-center justify-center shadow-lg"
//             title="Zoom Out"
//           >
//             −
//           </button>
//         </div>
//       )}

//       {/* Mobile Zoom Controls - Compact version */}
//       {isMobile && (
//         <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg z-20 flex gap-1">
//           <button
//             onClick={handleZoomOut}
//             className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 active:from-red-600 active:to-red-700 text-white rounded-lg font-bold text-lg transition shadow-lg"
//           >
//             −
//           </button>
//           <button
//             onClick={handleZoomIn}
//             className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 active:from-red-600 active:to-red-700 text-white rounded-lg font-bold text-lg transition shadow-lg"
//           >
//             +
//           </button>
//         </div>
//       )}

//       {/* Scrollable container with zoom */}
//       <div
//         ref={scrollContainerRef}
//         className="relative w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-transparent"
//         style={{
//           cursor: "grab",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         <div
//           className="relative transition-transform duration-300"
//           style={{
//             width: `${totalWidth}px`,
//             height: `${containerHeight}px`,
//             transform: isMobile ? "scale(1)" : `scale(${zoom})`,
//             transformOrigin: "top left",
//           }}
//         >
//           {/* Decorative clouds */}
//           <div
//             className={`absolute bg-white rounded-full opacity-70 blur-md ${
//               isMobile
//                 ? "w-20 h-12 top-10 left-50"
//                 : "w-32 h-20 top-20 left-100"
//             }`}
//           ></div>
//           <div
//             className={`absolute bg-white rounded-full opacity-60 blur-md ${
//               isMobile
//                 ? "w-24 h-14 top-60 right-100"
//                 : "w-40 h-24 top-100 right-200"
//             }`}
//           ></div>
//           {!isMobile && (
//             <>
//               <div className="absolute top-400 left-500 w-36 h-22 bg-white rounded-full opacity-50 blur-md"></div>
//               <div className="absolute top-150 right-400 w-28 h-18 bg-white rounded-full opacity-65 blur-md"></div>
//             </>
//           )}

//           {/* SVG Path connecting all events */}
//           <svg
//             className="absolute inset-0 w-full h-full pointer-events-none"
//             style={{ zIndex: 1 }}
//           >
//             <defs>
//               <linearGradient
//                 id="pathGradient"
//                 x1="0%"
//                 y1="0%"
//                 x2="100%"
//                 y2="0%"
//               >
//                 <stop
//                   offset="0%"
//                   style={{ stopColor: "#DC2626", stopOpacity: 1 }}
//                 />
//                 <stop
//                   offset="50%"
//                   style={{ stopColor: "#F43F5E", stopOpacity: 1 }}
//                 />
//                 <stop
//                   offset="100%"
//                   style={{ stopColor: "#E11D48", stopOpacity: 1 }}
//                 />
//               </linearGradient>
//             </defs>
//             <path
//               d={sortedEvents
//                 .map((event, index) => {
//                   const { x, y } = generatePathPoints(
//                     index,
//                     sortedEvents.length
//                   );
//                   return `${index === 0 ? "M" : "L"} ${x} ${y}`;
//                 })
//                 .join(" ")}
//               fill="none"
//               stroke="url(#pathGradient)"
//               strokeWidth={isMobile ? "12" : "16"}
//               strokeLinecap="round"
//               strokeDasharray={isMobile ? "20,10" : "25,15"}
//               className="drop-shadow-lg"
//               style={{
//                 filter: "drop-shadow(0 4px 8px rgba(220, 38, 38, 0.3))",
//               }}
//             />
//           </svg>

//           {/* Event Nodes */}
//           <div className="relative w-full h-full" style={{ zIndex: 2 }}>
//             {sortedEvents.map((event, index) => {
//               const eventDate = event.date ? event.date.toDate() : new Date();
//               const now = new Date();
//               const isLocked = event.date ? now < eventDate : false;
//               const position = generatePathPoints(index, sortedEvents.length);

//               return (
//                 <div
//                   key={`event-${event.id}`}
//                   className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
//                   style={{
//                     left: `${position.x}px`,
//                     top: `${position.y}px`,
//                   }}
//                 >
//                   {/* Event Node */}
//                   <button
//                     onClick={() => setSelectedEvent(event)}
//                     className={`relative group ${
//                       isLocked
//                         ? "cursor-not-allowed"
//                         : "cursor-pointer active:scale-95 md:hover:scale-110"
//                     } transition-transform duration-300`}
//                   >
//                     {/* Glow effect for unlocked events - RED CANDY GLOW */}
//                     {!isLocked && (
//                       <div
//                         className={`absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500 opacity-70 animate-pulse ${
//                           isMobile ? "blur-xl" : "blur-2xl"
//                         }`}
//                       ></div>
//                     )}

//                     {/* Main circle */}
//                     <div
//                       className={`relative ${circleSize} rounded-full flex flex-col items-center justify-center border-4 shadow-2xl transition-all ${
//                         event.isBoss
//                           ? "bg-gradient-to-br from-red-400 via-pink-400 to-rose-400 border-red-600 ring-4 ring-red-500 ring-offset-2 md:ring-offset-4"
//                           : isLocked
//                           ? "bg-gradient-to-br from-gray-300 to-gray-400 border-gray-500"
//                           : "bg-gradient-to-br from-red-300 via-pink-300 to-rose-300 border-red-500"
//                       }`}
//                     >
//                       {/* {Large emoji instead of image */} */}
//                       <div
//                         className={`${
//                           isMobile ? "text-4xl" : "text-6xl"
//                         } drop-shadow-lg`}
//                       >
//                         {event.isBoss
//                           ? "👑"
//                           : event.name.includes("Welcome")
//                           ? "🎉"
//                           : event.name.includes("Dance")
//                           ? "💃"
//                           : "🎊"}
//                       </div>



//                       {/* Lock overlay */}
//                       {isLocked && (
//                         <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
//                           <span className={isMobile ? "text-4xl" : "text-6xl"}>
//                             🔒
//                           </span>
//                         </div>
//                       )}

//                       {/* Boss crown */}
//                       {event.isBoss && !isLocked && (
//                         <div
//                           className={`absolute drop-shadow-2xl animate-bounce ${
//                             isMobile ? "-top-8 text-5xl" : "-top-12 text-7xl"
//                           }`}
//                         >
//                           👑
//                         </div>
//                       )}

//                       {/* Event number badge - RED CANDY */}
//                       <div
//                         className={`absolute bg-white rounded-full flex items-center justify-center border-4 border-red-500 font-bold text-red-600 shadow-lg ${
//                           isMobile
//                             ? "-bottom-2 w-10 h-10 text-base"
//                             : "-bottom-4 w-14 h-14 text-xl"
//                         }`}
//                       >
//                         {event.id}
//                       </div>
//                     </div>

//                     {/* Event name label - RED CANDY */}
//                     <div
//                       className={`absolute left-1/2 transform -translate-x-1/2 text-center ${
//                         isMobile ? "-bottom-16 w-32" : "-bottom-24 w-48"
//                       }`}
//                     >
//                       <p
//                         className={`font-bold text-white drop-shadow-xl bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg ${
//                           isMobile ? "text-xs px-2 py-1" : "text-base px-4 py-2"
//                         }`}
//                       >
//                         {event.name}
//                       </p>
//                     </div>

//                     {/* Stars for unlocked events */}
//                     {!isLocked && (
//                       <div
//                         className={`absolute left-1/2 transform -translate-x-1/2 flex gap-1 ${
//                           isMobile ? "-top-6" : "-top-10"
//                         }`}
//                       >
//                         {[1, 2, 3].map((star) => (
//                           <span
//                             key={`star-${event.id}-${star}`}
//                             className={`text-red-500 drop-shadow-lg ${
//                               isMobile ? "text-xl" : "text-3xl"
//                             }`}
//                           >
//                             💎
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </button>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Event Details Modal - Mobile optimized - RED CANDY */}
//       {selectedEvent && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//           onClick={() => setSelectedEvent(null)}
//         >
//           <div
//             className={`bg-white rounded-3xl shadow-2xl transform scale-100 animate-in relative border-4 border-red-300 ${
//               isMobile ? "p-4 max-w-sm w-full" : "p-6 max-w-md w-full"
//             }`}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close button */}
//             <button
//               onClick={() => setSelectedEvent(null)}
//               className={`absolute bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full font-bold hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 transition flex items-center justify-center shadow-lg ${
//                 isMobile
//                   ? "top-2 right-2 w-8 h-8 text-xl"
//                   : "top-4 right-4 w-10 h-10 text-2xl"
//               }`}
//             >
//               ×
//             </button>

//             {/* Large Emoji Display */}
//             <div className={`text-center mb-4 ${isMobile ? "text-7xl" : "text-9xl"}`}>
//               {selectedEvent.isBoss
//                 ? "👑"
//                 : selectedEvent.name.includes("Welcome")
//                 ? "🎉"
//                 : selectedEvent.name.includes("Dance")
//                 ? "💃"
//                 : "🎊"}
//             </div>

//             {/* Boss badge */}
//             {selectedEvent.isBoss && (
//               <div
//                 className={`bg-gradient-to-r from-red-400 to-pink-400 text-red-900 rounded-full text-center font-bold animate-pulse border-2 border-red-500 ${
//                   isMobile ? "px-3 py-1 text-sm mb-2" : "px-4 py-2 mb-3"
//                 }`}
//               >
//                 👑 BOSS EVENT 👑
//               </div>
//             )}

//             {/* Event details */}
//             <h2
//               className={`font-bold text-red-600 text-center ${
//                 isMobile ? "text-xl mb-1" : "text-3xl mb-2"
//               }`}
//             >
//               {selectedEvent.name}
//             </h2>

//             <p
//               className={`text-gray-700 text-center leading-relaxed ${
//                 isMobile ? "text-sm mb-3" : "mb-4"
//               }`}
//             >
//               {selectedEvent.description}
//             </p>

//             {selectedEvent.date && (
//               <div
//                 className={`bg-red-100 rounded-xl border-2 border-red-300 ${
//                   isMobile ? "p-2 mb-3" : "p-3 mb-4"
//                 }`}
//               >
//                 <p
//                   className={`text-red-700 font-medium text-center ${
//                     isMobile ? "text-xs" : "text-sm"
//                   }`}
//                 >
//                   📅{" "}
//                   {selectedEvent.date.toDate().toLocaleDateString("en-US", {
//                     weekday: isMobile ? undefined : "long",
//                     month: "short",
//                     day: "numeric",
//                     year: "numeric",
//                     hour: "numeric",
//                     minute: "2-digit",
//                   })}
//                 </p>
//               </div>
//             )}

//             {/* Lock status */}
// {selectedEvent.date && new Date() < selectedEvent.date.toDate() ? (
//   <div className={`bg-red-100 border-2 border-red-400 rounded-xl text-center ${isMobile ? "p-3 mb-3" : "p-4 mb-4"}`}>
//     <p className={`text-red-700 font-bold ${isMobile ? "text-sm" : ""}`}>
//       🔒 Unlocks {selectedEvent.date.toDate().toLocaleDateString()}
//     </p>
//   </div>
// ) : (
//   <div className={`bg-red-100 border-2 border-red-400 rounded-xl text-center ${isMobile ? "p-3 mb-3" : "p-4 mb-4"}`}>
//     <p className={`text-red-700 font-bold ${isMobile ? "text-sm" : ""}`}>
//       ✅ Event Available Now!
//     </p>
//   </div>
// )}

//             {/* Sign-Up Button */}
//             {selectedEvent.formUrl && (
//               <a
//                 href={selectedEvent.formUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`block w-full text-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
//                   isMobile ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"
//                 }`}
//               >
//                 🎫 Sign Up Now
//               </a>
//             )}
//           </div>
//         </div>
//       )}
//       {/* Scroll indicator - Mobile optimized */}
//       <div
//         className={`absolute left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border-2 border-red-300 ${
//           isMobile ? "bottom-2 px-4 py-2" : "bottom-6 px-6 py-3"
//         }`}
//       >
//         <p
//           className={`font-bold text-red-600 flex items-center gap-2 ${
//             isMobile ? "text-xs" : "text-sm"
//           }`}
//         >
//           <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-500 opacity-75"></span>
//           <span className="relative">
//             {isMobile ? "← Swipe →" : "← Scroll to explore →"}
//           </span>
//         </p>
//       </div>

//       {/* Event Counter - Mobile optimized */}
//       <div
//         className={`absolute right-6 bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-sm rounded-full shadow-lg text-white ${
//           isMobile ? "bottom-2 px-3 py-1" : "bottom-6 px-4 py-2"
//         }`}
//       >
//         <p className={`font-bold ${isMobile ? "text-xs" : "text-sm"}`}>
//           {sortedEvents.length} Events
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState, useRef, useEffect } from "react";
import { Event } from "@/lib/getEvents";

interface CandyCrushMapProps {
  events: Event[];
}

export default function EventMap({ events }: CandyCrushMapProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Simple sort by ID
  const sortedEvents = [...events].sort((a, b) => a.id - b.id);

  // Responsive spacing based on device
  const eventSpacing = isMobile ? 200 : 300;
  const circleSize = isMobile ? "w-24 h-24" : "w-36 h-36";

  // Get emoji based on event type
  const getEventEmoji = (eventType?: string): string => {
    switch (eventType) {
      case "social":
        return "🎉";
      case "sports":
        return "⚽";
      case "academic":
        return "🧠";
      case "creative":
        return "🎬";
      default:
        return "🎊";
    }
  };

  // Generate path points for HORIZONTAL winding road
  const generatePathPoints = (index: number, total: number) => {
    const baseX = (isMobile ? 150 : 200) + index * eventSpacing;
    const amplitude = isMobile ? 80 : 120;
    const frequency = 0.6;

    const offsetY = Math.sin(index * frequency) * amplitude;
    const centerY = isMobile ? 200 : 300;
    const y = centerY + offsetY;

    return { x: baseX, y: y };
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.6));
  const handleResetZoom = () => setZoom(1);

  const totalWidth =
    sortedEvents.length * eventSpacing + (isMobile ? 300 : 400);
  const containerHeight = isMobile ? 400 : 600;

  return (
    <div
      className={`relative w-full bg-gradient-to-r from-red-200 via-pink-200 to-red-100 rounded-2xl overflow-hidden shadow-2xl border-4 border-red-300 ${
        isMobile ? "h-[450px]" : "h-[700px]"
      }`}
    >
      {/* Zoom Controls - Hidden on mobile for cleaner UI */}
      {!isMobile && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg z-20 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-bold text-xl transition flex items-center justify-center shadow-lg"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={handleResetZoom}
            className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-lg font-bold text-xs transition flex items-center justify-center shadow-lg"
            title="Reset Zoom"
          >
            100%
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-bold text-xl transition flex items-center justify-center shadow-lg"
            title="Zoom Out"
          >
            −
          </button>
        </div>
      )}

      {/* Mobile Zoom Controls - Compact version */}
      {isMobile && (
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg z-20 flex gap-1">
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 active:from-red-600 active:to-red-700 text-white rounded-lg font-bold text-lg transition shadow-lg"
          >
            −
          </button>
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 active:from-red-600 active:to-red-700 text-white rounded-lg font-bold text-lg transition shadow-lg"
          >
            +
          </button>
        </div>
      )}

      {/* Scrollable container with zoom */}
      <div
        ref={scrollContainerRef}
        className="relative w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-transparent"
        style={{
          cursor: "grab",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          className="relative transition-transform duration-300"
          style={{
            width: `${totalWidth}px`,
            height: `${containerHeight}px`,
            transform: isMobile ? "scale(1)" : `scale(${zoom})`,
            transformOrigin: "top left",
          }}
        >
          {/* Decorative clouds */}
          <div
            className={`absolute bg-white rounded-full opacity-70 blur-md ${
              isMobile
                ? "w-20 h-12 top-10 left-50"
                : "w-32 h-20 top-20 left-100"
            }`}
          ></div>
          <div
            className={`absolute bg-white rounded-full opacity-60 blur-md ${
              isMobile
                ? "w-24 h-14 top-60 right-100"
                : "w-40 h-24 top-100 right-200"
            }`}
          ></div>
          {!isMobile && (
            <>
              <div className="absolute top-400 left-500 w-36 h-22 bg-white rounded-full opacity-50 blur-md"></div>
              <div className="absolute top-150 right-400 w-28 h-18 bg-white rounded-full opacity-65 blur-md"></div>
            </>
          )}

          {/* SVG Path connecting all events */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <linearGradient
                id="pathGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#DC2626", stopOpacity: 1 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#F43F5E", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#E11D48", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              d={sortedEvents
                .map((event, index) => {
                  const { x, y } = generatePathPoints(
                    index,
                    sortedEvents.length
                  );
                  return `${index === 0 ? "M" : "L"} ${x} ${y}`;
                })
                .join(" ")}
              fill="none"
              stroke="url(#pathGradient)"
              strokeWidth={isMobile ? "12" : "16"}
              strokeLinecap="round"
              strokeDasharray={isMobile ? "20,10" : "25,15"}
              className="drop-shadow-lg"
              style={{
                filter: "drop-shadow(0 4px 8px rgba(220, 38, 38, 0.3))",
              }}
            />
          </svg>

          {/* Event Nodes */}
          <div className="relative w-full h-full" style={{ zIndex: 2 }}>
            {sortedEvents.map((event, index) => {
              const eventDate = event.date ? event.date.toDate() : new Date();
              const now = new Date();
              const isLocked = event.date ? now < eventDate : false;
              const position = generatePathPoints(index, sortedEvents.length);

              return (
                <div
                  key={`event-${event.id}`}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                  }}
                >
                  {/* Event Node */}
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className={`relative group ${
                      isLocked
                        ? "cursor-not-allowed"
                        : "cursor-pointer active:scale-95 md:hover:scale-110"
                    } transition-transform duration-300`}
                  >
                    {/* Glow effect for unlocked events - RED CANDY GLOW */}
                    {!isLocked && (
                      <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500 opacity-70 animate-pulse ${
                          isMobile ? "blur-xl" : "blur-2xl"
                        }`}
                      ></div>
                    )}

                    {/* Main circle */}
                    <div
                      className={`relative ${circleSize} rounded-full flex flex-col items-center justify-center border-4 shadow-2xl transition-all ${
                        event.isBoss
                          ? "bg-gradient-to-br from-red-400 via-pink-400 to-rose-400 border-red-600 ring-4 ring-red-500 ring-offset-2 md:ring-offset-4"
                          : isLocked
                          ? "bg-gradient-to-br from-gray-300 to-gray-400 border-gray-500"
                          : "bg-gradient-to-br from-red-300 via-pink-300 to-rose-300 border-red-500"
                      }`}
                    >
                      {/* Large emoji based on type */}
                      <div
                        className={`${
                          isMobile ? "text-4xl" : "text-6xl"
                        } drop-shadow-lg`}
                      >
                        {event.isBoss ? "👑" : getEventEmoji(event.type)}
                      </div>

                      {/* Lock overlay */}
                      {isLocked && (
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                          <span className={isMobile ? "text-4xl" : "text-6xl"}>
                            🔒
                          </span>
                        </div>
                      )}

                      {/* Boss crown */}
                      {event.isBoss && !isLocked && (
                        <div
                          className={`absolute drop-shadow-2xl animate-bounce ${
                            isMobile ? "-top-8 text-5xl" : "-top-12 text-7xl"
                          }`}
                        >
                          👑
                        </div>
                      )}

                      {/* Event number badge - RED CANDY */}
                      <div
                        className={`absolute bg-white rounded-full flex items-center justify-center border-4 border-red-500 font-bold text-red-600 shadow-lg ${
                          isMobile
                            ? "-bottom-2 w-10 h-10 text-base"
                            : "-bottom-4 w-14 h-14 text-xl"
                        }`}
                      >
                        {event.id}
                      </div>
                    </div>

                    {/* Event name label - RED CANDY */}
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 text-center ${
                        isMobile ? "-bottom-16 w-32" : "-bottom-24 w-48"
                      }`}
                    >
                      <p
                        className={`font-bold text-white drop-shadow-xl bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg ${
                          isMobile ? "text-xs px-2 py-1" : "text-base px-4 py-2"
                        }`}
                      >
                        {event.name}
                      </p>
                    </div>

                    {/* Stars for unlocked events */}
                    {!isLocked && (
                      <div
                        className={`absolute left-1/2 transform -translate-x-1/2 flex gap-1 ${
                          isMobile ? "-top-6" : "-top-10"
                        }`}
                      >
                        {[1, 2, 3].map((star) => (
                          <span
                            key={`star-${event.id}-${star}`}
                            className={`text-red-500 drop-shadow-lg ${
                              isMobile ? "text-xl" : "text-3xl"
                            }`}
                          >
                            💎
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Event Details Modal - Mobile optimized - RED CANDY */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className={`bg-white rounded-3xl shadow-2xl transform scale-100 animate-in relative border-4 border-red-300 ${
              isMobile ? "p-4 max-w-sm w-full" : "p-6 max-w-md w-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className={`absolute bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full font-bold hover:from-red-600 hover:to-red-700 active:from-red-700 active:to-red-800 transition flex items-center justify-center shadow-lg ${
                isMobile
                  ? "top-2 right-2 w-8 h-8 text-xl"
                  : "top-4 right-4 w-10 h-10 text-2xl"
              }`}
            >
              ×
            </button>

            {/* Large Emoji Display */}
            <div className={`text-center mb-4 ${isMobile ? "text-7xl" : "text-9xl"}`}>
              {selectedEvent.isBoss ? "👑" : getEventEmoji(selectedEvent.type)}
            </div>

            {/* Boss badge */}
            {selectedEvent.isBoss && (
              <div
                className={`bg-gradient-to-r from-red-400 to-pink-400 text-red-900 rounded-full text-center font-bold animate-pulse border-2 border-red-500 ${
                  isMobile ? "px-3 py-1 text-sm mb-2" : "px-4 py-2 mb-3"
                }`}
              >
                👑 BOSS EVENT 👑
              </div>
            )}

            {/* Event details */}
            <h2
              className={`font-bold text-red-600 text-center ${
                isMobile ? "text-xl mb-1" : "text-3xl mb-2"
              }`}
            >
              {selectedEvent.name}
            </h2>

            <p
              className={`text-gray-700 text-center leading-relaxed ${
                isMobile ? "text-sm mb-3" : "mb-4"
              }`}
            >
              {selectedEvent.description}
            </p>

            {selectedEvent.date && (
              <div
                className={`bg-red-100 rounded-xl border-2 border-red-300 ${
                  isMobile ? "p-2 mb-3" : "p-3 mb-4"
                }`}
              >
                <p
                  className={`text-red-700 font-medium text-center ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                >
                  📅{" "}
                  {selectedEvent.date.toDate().toLocaleDateString("en-US", {
                    weekday: isMobile ? undefined : "long",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}

            {/* Lock status */}
            {selectedEvent.date && new Date() < selectedEvent.date.toDate() ? (
              <div
                className={`bg-red-100 border-2 border-red-400 rounded-xl text-center ${
                  isMobile ? "p-3 mb-3" : "p-4 mb-4"
                }`}
              >
                <p
                  className={`text-red-700 font-bold ${
                    isMobile ? "text-sm" : ""
                  }`}
                >
                  🔒 Unlocks {selectedEvent.date.toDate().toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div
                className={`bg-red-100 border-2 border-red-400 rounded-xl text-center ${
                  isMobile ? "p-3 mb-3" : "p-4 mb-4"
                }`}
              >
                <p
                  className={`text-red-700 font-bold ${
                    isMobile ? "text-sm" : ""
                  }`}
                >
                  ✅ Event Available Now!
                </p>
              </div>
            )}

            {/* Sign-Up Button */}
            {selectedEvent.formUrl && (
              <a
                href={selectedEvent.formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
                  isMobile ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"
                }`}
              >
                🎫 Sign Up Now
              </a>
            )}
          </div>
        </div>
      )}

      {/* Scroll indicator - Mobile optimized */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border-2 border-red-300 ${
          isMobile ? "bottom-2 px-4 py-2" : "bottom-6 px-6 py-3"
        }`}
      >
        <p
          className={`font-bold text-red-600 flex items-center gap-2 ${
            isMobile ? "text-xs" : "text-sm"
          }`}
        >
          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-500 opacity-75"></span>
          <span className="relative">
            {isMobile ? "← Swipe →" : "← Scroll to explore →"}
          </span>
        </p>
      </div>

      {/* Event Counter - Mobile optimized */}
      <div
        className={`absolute right-6 bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-sm rounded-full shadow-lg text-white ${
          isMobile ? "bottom-2 px-3 py-1" : "bottom-6 px-4 py-2"
        }`}
      >
        <p className={`font-bold ${isMobile ? "text-xs" : "text-sm"}`}>
          {sortedEvents.length} Events
        </p>
      </div>
    </div>
  );
}