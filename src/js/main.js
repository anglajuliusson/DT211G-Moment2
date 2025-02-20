"use strict"

let courses = [];
let sorted = true;

// Funktionen körs när sidan har laddats
window.onload = () => {
    loadCourses();

    // Händelsehanterare för sökruta
    document.getElementById("search").addEventListener("input", filterData);

    // Händelsehanterare för sortering 
    document.getElementById("code").addEventListener("click", sortCode);
    document.getElementById("coursename").addEventListener("click", sortCourses);
    document.getElementById("progression").addEventListener("click", sortProgression);
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
    const tableBody = document.getElementById("table-body");

    // Rensa DOM
    tableBody.innerHTML = "";

    // Sortera
    data.sort();

    console.table(data);

    // Skriv ut till DOM
    data.forEach (course => {
        tableBody.innerHTML += `
            <tr>
                <td>${course.code}</td>
                <td>${course.coursename}</td>
                <td>${course.progression}</td>
            </tr>
        `; // Skriver ut i tbody
    });
}
 // Funktion för sökruta
function filterData() {
    const searchPhrase = document.getElementById("search").value;

    // Filtrera ut
    const filteredData = courses.filter(course => 
        course.coursename.toLowerCase().includes(searchPhrase.toLowerCase()) || // Kursnamn
        course.code.toLowerCase().includes(searchPhrase.toLowerCase()) // Kurskod
    );

    printCourses(filteredData);
}
// Funktion för sortering av kurskod
function sortCode() {
    sorted = !sorted; // Gör så att den kan växla från fallande till stigande
    courses.sort((a, b) => {
        if (sorted){
            return b.code.localeCompare(a.code); 
        } else {
            return a.code.localeCompare(b.code);
        }
    });
    printCourses(courses);
}
// Funktion för sortering av kursnamn
function sortCourses() {
    sorted = !sorted; // Gör så att den kan växla från fallande till stigande
    courses.sort((a, b) => {
        if (sorted){
            return b.coursename.localeCompare(a.coursename); // A-Z
        } else {
            return a.coursename.localeCompare(b.coursename); // Z-A
        }
    });
    printCourses(courses);
}
// Funktion för sortering progression
function sortProgression() {
    sorted = !sorted; // Gör så att den kan växla från fallande till stigande
    courses.sort((a, b) => {
        if (sorted){
            return b.progression.localeCompare(a.progression); // A-B
        } else {
            return a.progression.localeCompare(b.progression); // B-A
        }
    });
    printCourses(courses);
}