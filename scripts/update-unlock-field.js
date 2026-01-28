/**
 * Script to update existing events with the isUnlocked field
 * 
 * Run this script with: node scripts/update-unlock-field.js
 * 
 * This will set isUnlocked: true for events that should be immediately open for registration
 * and isUnlocked: false for events that should remain locked.
 */

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, doc, updateDoc, getDocs } = require("firebase/firestore");

// Firebase config
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

// ========================================
// CONFIGURE WHICH EVENTS TO UNLOCK HERE
// ========================================
// Add the event IDs that should be unlocked (open for registration)
// Leave empty if you want all events to stay locked initially
const EVENTS_TO_UNLOCK = [
    // Example: 1, 2, 3 would unlock events with those IDs
    // Uncomment and modify the line below:
    // 1, 2  // Akwaaba Night, Hobby to Cash
];

async function updateUnlockField() {
    console.log("🔧 Updating events with isUnlocked field...\n");

    try {
        const snapshot = await getDocs(collection(db, "events"));
        console.log(`📋 Found ${snapshot.docs.length} events\n`);

        for (const docSnapshot of snapshot.docs) {
            const data = docSnapshot.data();
            const eventId = data.id;
            const shouldUnlock = EVENTS_TO_UNLOCK.includes(eventId);

            await updateDoc(doc(db, "events", docSnapshot.id), {
                isUnlocked: shouldUnlock,
            });

            const status = shouldUnlock ? "🔓 UNLOCKED" : "🔒 LOCKED";
            console.log(`   ${status} - ${data.name} (ID: ${eventId})`);
        }

        console.log("\n✅ All events updated!");
        console.log("\n💡 To unlock specific events:");
        console.log("   1. Edit EVENTS_TO_UNLOCK array in this script, OR");
        console.log("   2. Go to Firebase Console and set isUnlocked: true on individual events");

    } catch (error) {
        console.error("❌ Error updating events:", error);
        process.exit(1);
    }

    process.exit(0);
}

updateUnlockField();
