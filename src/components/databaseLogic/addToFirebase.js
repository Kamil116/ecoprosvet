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
            checkedIn: false,
        });
        console.log("Event added successfully");
    } catch (e) {
        console.error("Error adding event: ", e);
    }
};

// addToFirebase({
//         id: 2,
//         title: "Лекция",
//         date: "2024-10-01",
//         location: "Парк Горького, Москва",
//         coordinates: [37.6017, 55.7158],
//         description: "Познавательная лекция о природе.",
//         type: "Лекция"
//     },
// )
//
// addToFirebase({
//     id: 2,
//     title: "Субботник",
//     date: "2024-10-05",
//     location: "Московский государственный университет",
//     coordinates: [37.5408, 55.7033],
//     description: "Участие в субботнике для очистки территории.",
//     type: "Экологическое мероприятие"
// });
//
// addToFirebase({
//     id: 3,
//     title: "квест «Вокруг света с Речкиным»",
//     date: "2024-09-21",
//     location: "ВДНХ, Москва",
//     coordinates: [37.618525, 55.832940],
//     description: "Увлекательный квест по достопримечательностям.",
//     type: "Квест"
// });
//
// addToFirebase({
//     id: 4,
//     title: "ЛЕКЦИЯ «Его высочество – жираф!»",
//     date: "2024-10-05",
//     location: "Дарвиновский музей, Москва",
//     coordinates: [37.561526, 55.690643],
//     description: "Интересная лекция о жирафах.",
//     type: "Лекция"
// });
//
// addToFirebase({
//     id: 5,
//     title: "Обзорная экскурсия в \"Лесной сказке\"",
//     date: "2024-09-21",
//     location: "Москва экоцентр «Лесная сказка»",
//     coordinates: [37.547459, 55.585118],
//     description: "Экскурсия по экотропам.",
//     type: "Экскурсия"
// });
//
// addToFirebase({
//     id: 6,
//     title: "Тематическое занятие \"День леса\"",
//     date: "2024-09-22",
//     location: "Москва экоцентр «Лесная сказка»",
//     coordinates: [37.547459, 55.585118],
//     description: "Тематическое занятие по лесным экосистемам.",
//     type: "Тематическое занятие"
// });
