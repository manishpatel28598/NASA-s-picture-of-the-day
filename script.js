const apiKey = "QBNdR6hl75naSTdAx2C99gOdEtJZcEhbQv7LOAiH"; // Replace with your actual NASA API key

const currentDate = new Date().toISOString().split("T")[0];

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById("current-image-container");
const searchHistoryList = document.getElementById("search-history");

function getCurrentImageOfTheDay() {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`)
    .then(response => response.json())
    .then(data => {
      displayImage(data);
    })
    .catch(error => console.error(error));
}

function getImageOfTheDay(date) {
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`)
    .then(response => response.json())
    .then(data => {
      displayImage(data);
      saveSearch(date);
      addSearchToHistory(date);
    })
    .catch(error => console.error(error));
}

function displayImage(data) {
  currentImageContainer.innerHTML = `<img src="${data.url}" alt="${data.title}"><h2>${data.title}</h2>
  
  <p>${data.explanation}</p>`;
}

function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory(date) {
  searchHistoryList.innerHTML = "";
  let searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.forEach(searchDate => {
    const listItem = document.createElement("li");
    listItem.textContent = searchDate;
    listItem.addEventListener("click", () => getImageOfTheDay(searchDate));
    searchHistoryList.appendChild(listItem);
  });
}

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const date = searchInput.value;
  getImageOfTheDay(date);
});

// Call this function to display the current image on page load
getCurrentImageOfTheDay();
