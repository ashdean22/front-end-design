let names = ["Carlos Alcaraz", "Novak Djokovic", "Jannik Sinner", "Felix Auger Aliassime", "Daniil Medvedev", "Alexander Zverev", "Stefanos Tsitsipas", "Andrey Rublev", "Grigor Dimitrov", "Rafael Nadal", "Ben Shelton", "Taylor Fritz", "Frances Tiafoe", "Tommy Paul", "Casper Ruud", "Naomi Osaka", "Iga Swiatek", "Aryna Sabalenka", "Elena Rybakina", "Ons Jabeur", "Jessica Pegula", "Coco Gauff", "Victoria Azarenka", "Maria Sakkari", "Barbora Krejcikova", "Elina Svitolina", "Bianca Andreescu", "Emma Raducanu", "Leylah Fernandez", "Madison Keys"];
console.log(names);

let age = [19, 34, 20, 21, 25, 24, 23, 22, 30, 35, 20, 24, 23, 25, 22, 23, 20, 24, 22, 27, 26, 19, 32, 27, 25, 28, 21, 20, 19, 26];
console.log(age);

let country = ["Spain", "Serbia", "Italy", "Canada", "Russia", "Germany", "Greece", "Russia", "Bulgaria", "Spain", "USA", "Japan", "Poland", "Belarus", "Kazakhstan", "Tunisia", "Norway", "Czech Republic", "Ukraine"];
console.log(country);

// Validate if arrays are empty or not.
if (names.length === 0) {
    console.log("Error: Names array is empty");
} else if (age.length === 0) {
    console.log("Error: Ranking array is empty");
} else if (country.length === 0) {
    console.log("Error: Country array is empty");
} else {
    console.log("All arrays contain data");
}

// Create and append elements to create a way for users to search for tennis players by their name.
const searchContainer = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');
const resultDiv = document.createElement('div');

// Setting attributes and properties for the search functionality.
searchInput.placeholder = "Enter player name";
searchInput.setAttribute('list', 'players-list');
searchButton.textContent = "Search Player";
resultDiv.id = 'result';


// Append elements
searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchButton);
searchContainer.appendChild(resultDiv);

// Change this line to use the existing div3 class in the players HTML file
const targetDiv = document.querySelector('.div3');
if (targetDiv) {
    targetDiv.appendChild(searchContainer);
} else {
    console.error("Could not find the targeted div with class 'div3'");
}

// This function to displays player information, based on user's selection using a for loop.
function displayPlayerInfo() {
    const playerName = searchInput.value;
    let playerFound = false;

    for (let i = 0; i < names.length; i++) {
        if (names[i].toLowerCase() === playerName.toLowerCase()) {
            const playerAge = age[i];
            const playerCountry = country[i];
            resultDiv.innerHTML = `Player: ${names[i]}<br>Age: ${playerAge}<br>Country: ${playerCountry}`;
            playerFound = true;
            break;
        }
    }

    if (!playerFound) {
        resultDiv.innerHTML = "Player not found.";
    }
}

// Add event listener to the search button
searchButton.addEventListener('click', displayPlayerInfo);
