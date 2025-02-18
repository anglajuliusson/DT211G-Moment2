"use strict"

let courses = [];

// Funktionen körs när sidan har laddats
window.onload = () => {
    loadCourses();

    // Händelsehanterare för sökruta
    document.getElementById("search").addEventListener("input", filterData);
}

// Funktion som hämtar information
async function loadCourses() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json"); // Hämta json-fil
            if (!response.ok) {
                throw new Error("Fel vid anslutning till data...") // Felmeddelande om json-filen inte kan läsas in korrekt
            }
        courses = await response.json(); // Omvandlar till array eller objekt
        printCourses(courses);

        console.table(courses); // Skriver ut informationen i en tabell
    } catch(error) {
        console.error("error"); // Om något går fel skrivs felmeddelande ut
        document.querySelector("#error").innerHTML = "<p>Fel vid anslutning - prova igen senare</p>"; // Felmeddelande till användare
    };
}

function printCourses(data) {
    const coursesEl = document.getElementById("table");

    // Rensa DOM
    coursesEl.innerHTML = "";

    // Sortera i bokstavsordning
    data.sort();

    console.table(data);

    // Skriv ut till DOM
    data.forEach (course => {
        coursesEl.innerHTML += `<table>${course.code} ${course.coursename} ${course.progression}</table>`;
    });
}

function filterData() {
    const searchPhrase = document.getElementById("search").value;

    // Filtrera ut
    const filteredData = courses.filter(course => 
        course.coursename.toLowerCase().includes(searchPhrase.toLowerCase()) || // Kursnamn
        course.code.toLowerCase().includes(searchPhrase.toLowerCase()) // Kurskod
    );

    printCourses(filteredData);
}