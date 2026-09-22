const API_KEY = "da99b8a46a743f9cb89fc6527d422c87";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const homeView = document.getElementById("home-view");
const moviesView = document.getElementById("movies-view");

const homeBtn = document.getElementById("homeBtn");
const moviesBtn = document.getElementById("moviesBtn");

const htmlElement = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

const viewMoreMoviesBtn = document.getElementById("viewMoreMoviesBtn");
const backToHomeBtn = document.getElementById("backToHome");


// for theme 
function toggleTheme () {
  htmlElement.classList.toggle("dark");

  if (htmlElement.classList.contains("dark")) {
    themeBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
}

if (htmlElement.classList.contains("dark")) {
  themeBtn.textContent = "☀️";
} else {
  themeBtn.textContent = "🌙";
}

// for randomize 
function shuffle (array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function switchToMoviesView () {
  homeView.classList.add("hidden");
  moviesView.classList.remove("hidden");

  if (document.getElementById("all-movies-grid").children.length === 0) {
    fetchAllMovies();
  }
}

function switchToHomeView () {
  moviesView.classList.add("hidden");
  homeView.classList.remove("hidden");
}

viewMoreMoviesBtn.addEventListener("click", () => {
  switchToMoviesView();
});
moviesBtn.addEventListener("click", () => {
  switchToMoviesView();
});

// for trending movies
async function fetchTrendingMovies () {
  const trendingMovieUrl = `${BASE_URL}trending/movie/week?api_key=${API_KEY}`;

  try {
    const res = await fetch(trendingMovieUrl);
    const data = await res.json();

    const shuffledMovies = shuffle(data.results);

    displayTrendingMovies(shuffledMovies.slice(0, 4));
  } catch (error) {
    console.error("Error fetching trending movies: ", error);
  }
}
fetchTrendingMovies();

// display trending movies
function displayTrendingMovies (movies) {
  let trendingMovieHTML = "";

  movies.forEach ((movie) => {
    const movieImageUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster";

    trendingMovieHTML += `
      <div class="border border-gray-300 p-2 rounded-md dark:border-gray-700">
        <img src="${movieImageUrl}" alt="${movie.original_title}" class="w-full object-cover mb-2 rounded-md">

        <h3 class="text-xl font-semibold text-gray-600 mb-2 dark:text-gray-200">
          ${movie.original_title}
        </h3>

        <p class="text-gray-500 dark:text-gray-400 mb-1">
          ${movie.overview.slice(0, 30) || "No description available"}...
        </p>
      </div>
    `;
  });
  document.getElementById("trending-movies").innerHTML = trendingMovieHTML;
}

// for trending TV 
async function fetchTrendingTV () {
   const trendingTVUrl = `${BASE_URL}trending/tv/week?api_key=${API_KEY}`;

   try {
    const res = await fetch(trendingTVUrl);
    const data = await res.json();

    const shuffledTv = shuffle(data.results);

    displayTrendingTV(shuffledTv.slice(0, 4));
   } catch (error) {
    console.error("Error fetching trending TV: ", error);
   }
}
fetchTrendingTV();

async function fetchAllMovies () {
  const url = `${BASE_URL}discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayFullMoviesGrid(data.results);
  } catch (error) {
    console.error("Error fetching full movies list: ", error);
  }
}
fetchAllMovies();

function displayFullMoviesGrid (movies) {
  let displayAllHtml = "";

  const container = document.getElementById("all-movies-grid");
  container.innerHTML = "";

  movies.forEach((movie) => {
    const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster";

    displayAllHtml += `
      <div class="border border-gray-300 p-2 rounded-md dark:border-gray-700">
        <img src="${posterUrl}" alt="${movie.original_title}" class="w-full object-cover mb-2 rounded-md">

        <h3 class="text-xl font-semibold text-gray-600 mb-2 dark:text-gray-200">
          ${movie.original_title}
        </h3>

        <p class="text-gray-500 dark:text-gray-400 mb-1">
          ${movie.overview.slice(0, 30) || "No description available"}...
        </p>
      </div>
    `;
    container.innerHTML = displayAllHtml;
  });
}

if (backToHomeBtn) {
  backToHomeBtn.addEventListener("click", () => {
    switchToHomeView();
  });
}

// display trending TV 
function displayTrendingTV (shows) {
  let trendingTVHTML = "";

  shows.forEach ((show) => {
    const TVImageUrl = show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster";

    trendingTVHTML += `
      <div class="border border-gray-300 p-2 rounded-md dark:border-gray-700">
        <img src="${TVImageUrl}" alt="${show.original_name}" class="w-full object-cover mb-2 rounded-md">

        <h3 class="text-xl font-semibold text-gray-600 mb-2 dark:text-gray-200">
          ${show.original_name}
        </h3>

        <p class="text-gray-500 dark:text-gray-400 mb-1">
          ${show.overview.slice(0, 30) || "No description available"}...
        </p>
      </div>
    `;
  });
  document.getElementById("trending-tv").innerHTML = trendingTVHTML;
}

// for searching movies, tv shows 
async function searchItems () {
  if (!searchInput) return;

  const searchUrl = `${BASE_URL}search/multi?api_key=${API_KEY}&query=${searchInput.value}`;

  try {
    await fetch (searchUrl)
            .then ((res) => res.json())
            .then ((data) => displaySearchResults(data.results));
  } catch (error) {
    console.error("Error fetching search results: ", error);
  }

  searchInput.value = "";
}

searchBtn.addEventListener("click", () => {
  searchItems();
});

document.getElementById("viewMoreMoviesBtn").addEventListener("click", () => {
  fetchMoreMovies();
});