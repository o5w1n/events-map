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
  emoji?: string; // Custom emoji from Firestore (optional)
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
        emoji: data.emoji,
      });
      
      return {
        id: eventId,
        name: data.name || "Unnamed Event",
        description: data.description || "No description",
        date: data.date,
        imageUrl: data.imageUrl || "",
        isBoss: data.isBoss || false,
        formUrl: data.formUrl || "",
        emoji: data.emoji || undefined, // Read emoji from Firestore if available
      } as Event;
    });

    // Sort by ID
    const sortedEvents = events.sort((a, b) => a.id - b.id);

    console.log("✅ Events loaded:", sortedEvents.map(e => ({ 
      id: e.id, 
      name: e.name, 
      emoji: e.emoji 
    })));
    
    return sortedEvents;
    
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return [];
  }
}
