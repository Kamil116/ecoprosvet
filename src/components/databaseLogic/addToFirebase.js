import {db} from '../../firebaseConfig.js';
import {collection, addDoc} from 'firebase/firestore';

export const addToFirebase = async (eventDetails) => {
    try {
        await addDoc(collection(db, "events"), {
            id: eventDetails.id,
            title: eventDetails.title,
            type: eventDetails.type,
            date: eventDetails.date,
            location: eventDetails.location,
            coordinates: eventDetails.coordinates,
            description: eventDetails.description,
            imageUrl: eventDetails.imageUrl,
            checkedIn: false,
        });
        console.log("Event added successfully");
    } catch (e) {
        console.error("Error adding event: ", e);
    }
};

const addSampleEvents = async () => {
    const sampleEvents = [
        {
            id: 8,
            title: "Лекция",
            date: "2024-10-01",
            location: "Парк Горького, Москва",
            coordinates: [37.6017, 55.7158],
            description: "Познавательная лекция о природе.",
            type: "Лекция",
            imageUrl: "https://vdpo74.ru/sites/default/files/kisspng-training-expert-management-education-learning-skills-certificate-icon-5ad7b06644d2b3.7959881215240848382819_0.jpg"
        },
        {
            id: 9,
            title: "квест «Вокруг света с Речкиным»",
            date: "2024-09-21",
            location: "ВДНХ, Москва",
            coordinates: [37.618525, 55.832940],
            description: "Увлекательный квест по достопримечательностям.",
            type: "Квест",
            imageUrl: "https://w7.pngwing.com/pngs/194/954/png-transparent-computer-icons-waypoint-map-others-angle-text-rectangle.png"

        },
        {
            id: 10,
            title: "Лекция",
            date: "2024-10-01",
            location: "Парк Горького, Москва",
            coordinates: [37.6017, 55.7158],
            description: "Познавательная лекция о природе.",
            type: "Лекция",
            imageUrl: "https://vdpo74.ru/sites/default/files/kisspng-training-expert-management-education-learning-skills-certificate-icon-5ad7b06644d2b3.7959881215240848382819_0.jpg"
        },
        {
            id: 11,
            title: "квест «Вокруг света с Речкиным»",
            date: "2024-09-21",
            location: "ВДНХ, Москва",
            coordinates: [37.618525, 55.832940],
            description: "Увлекательный квест по достопримечательностям.",
            type: "Квест",
            imageUrl: "https://w7.pngwing.com/pngs/194/954/png-transparent-computer-icons-waypoint-map-others-angle-text-rectangle.png"

        }

    ];

    try {
        for (const event of sampleEvents) {
            const docRef = await addDoc(collection(db, 'approval'), event);
            console.log('Event added with ID: ', docRef.id);
        }
    } catch (e) {
        console.error('Error adding sample events: ', e);
    }
};

addSampleEvents();
