// Open the Modal
function openModal() {
  document.getElementById("myModal").style.display = "block";
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

// Rankings code
let players = [
  { name: "Carlos Alcaraz", country: "Spain", rank: 1 },
  { name: "Novak Djokovic", country: "Serbia", rank: 2 },
  { name: "Jannik Sinner", country: "Italy", rank: 3 },
  { name: "Felix Auger Aliassime", country: "Canada", rank: 4 },
  { name: "Daniil Medvedev", country: "Russia", rank: 5 },
  { name: "Alexander Zverev", country: "Germany", rank: 6 },
  { name: "Stefanos Tsitsipas", country: "Greece", rank: 7 },
  { name: "Andrey Rublev", country: "Russia", rank: 8 },
  { name: "Grigor Dimitrov", country: "Bulgaria", rank: 9 },
  { name: "Rafael Nadal", country: "Spain", rank: 10 }
];

function updateRankings() {
  const tableBody = document.getElementById("rankingsTable").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear existing rows

  players.forEach(player => {
    const row = document.createElement("tr");
    const rankCell = document.createElement("td");
    const nameCell = document.createElement("td");
    const countryCell = document.createElement("td");

    rankCell.textContent = player.rank;
    nameCell.textContent = player.name;
    countryCell.textContent = player.country;

    row.appendChild(rankCell);
    row.appendChild(nameCell);
    row.appendChild(countryCell);
    tableBody.appendChild(row);
  });
}

// Function to randomly change the rankings
function shuffleRankings() {
  players.sort(() => Math.random() - 0.5);
  players.forEach((player, index) => {
    player.rank = index + 1;
  });
  updateRankings();
}

// Ensure the DOM is fully loaded before running the code
document.addEventListener("DOMContentLoaded", function() {
  // Initial call to display the rankings
  updateRankings();

  // Set an interval to shuffle the rankings every 10 seconds
  setInterval(shuffleRankings, 10000);
});