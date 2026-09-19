const API_KEY = "da99b8a46a743f9cb89fc6527d422c87";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const htmlElement = document.documentElement;
const themeBtn = document.getElementById("themeBtn");


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

// for display search items 
function displaySearchResults (results) {
  const moviesTitle = document.getElementById("moviesTitle");
  const tvTitle = document.getElementById("tvTitle");
  const noDisplay = document.getElementById("noDisplay");

  const movies = results ? results.filter((item) => item.media_type === "movie") : [];
  const tvShows = results ? results.filter((item) => item.media_type === "tv") : [];

  if (!results || results.length === 0 || (movies.length === 0 && tvShows.length === 0)) {
    if (moviesTitle) {
      moviesTitle.style.display = "none";
    }
    if (tvTitle) {
      tvTitle.style.display = "none";
    }

    document.getElementById("trending-movies").innerHTML = "";
    document.getElementById("trending-tv").innerHTML = "";

    if (noDisplay) {
      noDisplay.innerHTML = `<p class="text-xl font-semibold text-rose-600 dark:text-rose-500 text-center my-8">
        Nothing found!
      </p>`
    }
    return;
  }

  if (noDisplay) {
    noDisplay.innerHTML = "";
  }
  if (moviesTitle) {
    moviesTitle.style.display = movies.length > 0 ? "block" : "none";
  }
  if (tvTitle) {
    tvTitle.style.display = tvShows.length > 0 ? "block" : "none";
  }

  displayTrendingMovies(movies);
  displayTrendingTV(tvShows);
}

searchBtn.addEventListener("click", () => {
  searchItems();
});