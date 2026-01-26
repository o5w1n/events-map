/**
 * Script to set up ACSC WEEK as a parent event with all SRC Week sub-events
 * 
 * Run this script with: node scripts/setup-acsc-week.js
 * 
 * This will:
 * 1. Create or update the ACSC WEEK parent event
 * 2. Create all 7 SRC Week sub-events linked to ACSC WEEK
 */

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, doc, setDoc, Timestamp, getDocs } = require("firebase/firestore");

// Firebase config (same as your app)
const firebaseConfig = {
    apiKey: "AIzaSyDuN6juHEvgPnfybXaReHN4iSHJJTuu1WA",
    authDomain: "scem-a64b0.firebaseapp.com",
    projectId: "scem-a64b0",
    storageBucket: "scem-a64b0.firebasestorage.app",
    messagingSenderId: "131958480425",
    appId: "1:131958480425:web:1623e0bcded3d89eaec638",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper to create a Timestamp from a date string
const toTimestamp = (dateStr) => Timestamp.fromDate(new Date(dateStr + "T00:00:00"));

// ACSC WEEK parent ID - Change this to match your event sequence
const ACSC_WEEK_ID = 7;

// The parent event (ACSC WEEK / SRC WEEK)
const acscWeekParent = {
    id: ACSC_WEEK_ID,
    name: "ACSC WEEK",
    description: "A week of exciting activities celebrating the Academic City Student Council! Join us for rock shows, appreciation days, games, sports, movies, awards, and an epic concert!",
    date: toTimestamp("2026-02-22"), // Week starts Feb 22
    emoji: "🎊",
    isParent: true,
    isBoss: true,
    imageUrl: "",
    formUrl: "",
};

// All SRC Week sub-events (children of ACSC WEEK)
const srcWeekEvents = [
    {
        id: 701,
        name: "Sunday Rock Show",
        description: "SRC Week Launch - Kick off the week with an electrifying rock show performance!",
        date: toTimestamp("2026-02-22"),
        emoji: "🎸",
        parentId: ACSC_WEEK_ID,
        isBoss: false,
        imageUrl: "",
        formUrl: "", // Add registration form URL here
    },
    {
        id: 702,
        name: "Staff & Faculty Appreciation Day",
        description: "A special day to honor and appreciate our amazing staff and faculty members.",
        date: toTimestamp("2026-02-23"),
        emoji: "👨‍🏫",
        parentId: ACSC_WEEK_ID,
        isBoss: false,
        imageUrl: "",
        formUrl: "",
    },
    {
        id: 703,
        name: "Health & Games Night",
        description: "Focus on wellness with health activities and fun games for everyone!",
        date: toTimestamp("2026-02-24"),
        emoji: "🎮",
        parentId: ACSC_WEEK_ID,
        isBoss: false,
        imageUrl: "",
        formUrl: "",
    },
    {
        id: 704,
        name: "Sports & Jersey Day",
        description: "Show your team spirit! Wear your favorite sports jersey and join the activities.",
        date: toTimestamp("2026-02-25"),
        emoji: "⚽",
        parentId: ACSC_WEEK_ID,
        isBoss: false,
        imageUrl: "",
        formUrl: "",
    },
    {
        id: 705,
        name: "Mental Health & Movie Night",
        description: "Relax and unwind with mental health awareness activities followed by a movie screening.",
        date: toTimestamp("2026-02-26"),
        emoji: "🎬",
        parentId: ACSC_WEEK_ID,
        isBoss: false,
        imageUrl: "",
        formUrl: "",
    },
    {
        id: 706,
        name: "SRC Awards Night",
        description: "Celebrate excellence! Join us for the prestigious SRC Awards ceremony.",
        date: toTimestamp("2026-02-27"),
        emoji: "🏆",
        parentId: ACSC_WEEK_ID,
        isBoss: false,
        imageUrl: "",
        formUrl: "",
    },
    {
        id: 707,
        name: "Concert Night",
        description: "The grand finale of SRC Week! An unforgettable concert experience.",
        date: toTimestamp("2026-02-28"),
        emoji: "🎤",
        parentId: ACSC_WEEK_ID,
        isBoss: true, // This is a featured event
        imageUrl: "",
        formUrl: "",
    },
];

async function setupACSCWeek() {
    console.log("🚀 Starting ACSC WEEK setup...\n");

    try {
        // First, let's see what events already exist
        console.log("📋 Checking existing events...");
        const snapshot = await getDocs(collection(db, "events"));
        const existingEvents = {};
        snapshot.docs.forEach((doc) => {
            const data = doc.data();
            existingEvents[data.id] = { docId: doc.id, ...data };
        });
        console.log(`   Found ${Object.keys(existingEvents).length} existing events\n`);

        // Create/Update ACSC WEEK parent
        console.log("📦 Setting up ACSC WEEK parent event...");
        const parentDocId = existingEvents[ACSC_WEEK_ID]?.docId || `event_${ACSC_WEEK_ID}`;
        await setDoc(doc(db, "events", parentDocId), acscWeekParent);
        console.log(`   ✅ ACSC WEEK (ID: ${ACSC_WEEK_ID}) - Created/Updated\n`);

        // Create/Update all child events
        console.log("📦 Setting up SRC Week sub-events...");
        for (const event of srcWeekEvents) {
            const eventDocId = existingEvents[event.id]?.docId || `event_${event.id}`;
            await setDoc(doc(db, "events", eventDocId), event);
            console.log(`   ✅ ${event.name} (ID: ${event.id}) - Created/Updated`);
        }

        console.log("\n🎉 ACSC WEEK setup complete!");
        console.log("\n📌 Summary:");
        console.log(`   Parent: ACSC WEEK (ID: ${ACSC_WEEK_ID})`);
        console.log(`   Children: ${srcWeekEvents.length} sub-events`);
        console.log("\n💡 The events will be hidden on the roadmap until Feb 22, 2026.");
        console.log("   When unlocked, users can click ACSC WEEK to see all 7 activities!");

    } catch (error) {
        console.error("❌ Error setting up ACSC WEEK:", error);
        process.exit(1);
    }

    process.exit(0);
}

// Run the setup
setupACSCWeek();
