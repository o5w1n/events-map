// import { collection, getDocs, Timestamp } from "firebase/firestore";
// import { db } from "./firebase";

// export interface Event {
//   id: number;
//   name: string;
//   description: string;
//   date: Timestamp;
//   imageUrl: string;
//   isBoss: boolean;
//   formUrl?: string;
// }

// export async function getEvents(): Promise<Event[]> {
//   try {
//     const snapshot = await getDocs(collection(db, "events"));
    
//     console.log("📦 Total documents found:", snapshot.docs.length);
    
//     const events = snapshot.docs.map((doc, index) => {
//       const data = doc.data();
//       const eventId = data.id !== undefined ? data.id : index + 1;
      
//       console.log(`Event ${index}:`, {
//         documentId: doc.id,
//         dataId: data.id,
//         finalId: eventId,
//         name: data.name,
//       });
      
//       return {
//         id: eventId,
//         name: data.name || "Unnamed Event",
//         description: data.description || "No description",
//         date: data.date,
//         imageUrl: data.imageUrl || "https://via.placeholder.com/400x300",
//         isBoss: data.isBoss || false,
//         formUrl: data.formUrl || "",
//       } as Event;
//     });

//     // Sort by ID
//     const sortedEvents = events.sort((a, b) => a.id - b.id);

//     console.log("✅ Events BEFORE sorting:", events.map(e => ({ id: e.id, name: e.name })));
//     console.log("✅ Events AFTER sorting:", sortedEvents.map(e => ({ id: e.id, name: e.name })));
    
//     return sortedEvents;
    
//   } catch (error) {
//     console.error("❌ Error fetching events:", error);
//     return [];
//   }
// }


import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface Event {
  id: number;
  name: string;
  description: string;
  date: Timestamp;
  imageUrl: string;
  isBoss: boolean;
  formUrl?: string;
  type?: string;
}

export async function getEvents(): Promise<Event[]> {
  try {
    const snapshot = await getDocs(collection(db, "events"));
    
    console.log("📦 Total documents found:", snapshot.docs.length);
    
    const events = snapshot.docs.map((doc, index) => {
      const data = doc.data();
      const eventId = data.id !== undefined ? data.id : index + 1;
      
      console.log(`Event ${index}:`, {
        documentId: doc.id,
        dataId: data.id,
        finalId: eventId,
        name: data.name,
        type: data.type,
      });
      
      return {
        id: eventId,
        name: data.name || "Unnamed Event",
        description: data.description || "No description",
        date: data.date,
        imageUrl: data.imageUrl || "https://via.placeholder.com/400x300",
        isBoss: data.isBoss || false,
        formUrl: data.formUrl || "",
        type: data.type || "social",
      } as Event;
    });

    // Sort by ID
    const sortedEvents = events.sort((a, b) => a.id - b.id);

    console.log("✅ Events BEFORE sorting:", events.map(e => ({ id: e.id, name: e.name, type: e.type })));
    console.log("✅ Events AFTER sorting:", sortedEvents.map(e => ({ id: e.id, name: e.name, type: e.type })));
    
    return sortedEvents;
    
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return [];
  }
}
