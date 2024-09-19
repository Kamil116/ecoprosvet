import {db} from '../../firebaseConfig.js';
import {collection, query, where, getDocs} from 'firebase/firestore';

export const getEventWithId = async (eventId) => {
    try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("id", "==", eventId));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                console.log("Event found:", doc.id, doc.data());
            });
        } else {
            console.log("No event found with the given ID.");
        }
    } catch (e) {
        console.error("Error fetching event: ", e);
    }
};
