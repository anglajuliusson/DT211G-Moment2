"use strict"

let coursename = [];
let progression = [];
let coursecode = [];

// Funktionen körs när sidan har laddats
window.onload = () => {
    loadCourses();
}

// Funktion som hämtar information
async function loadCourses() {
    try {
        const response = await fetch("https://webbutveckling.miun.se/files/ramschema_ht24.json"); // Hämta json-fil
            if (!response.ok) {
                throw new Error("Fel vid anslutning till data...") // Felmeddelande om json-filen inte kan läsas in korrekt
            }
        const data = await response.json(); // Omvandlar till array eller objekt

        console.table(data); // Skriver ut informationen i en tabell
    } catch(error) {
        console.error("error"); // Om något går fel skrivs felmeddelande ut
    };
}