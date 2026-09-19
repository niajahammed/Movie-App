const API_KEY = "da99b8a46a743f9cb89fc6527d422c87";
const BASE_URL = "https://api.themoviedb.org/3/";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

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

// for trending movies
async function fetchTrendingMovies () {
  const trendingMovieUrl = `${BASE_URL}trending/movie/week?api_key=${API_KEY}`;

  try {
    await fetch (trendingMovieUrl)
            .then ((res) => res.json())
            .then ((data) => displayTrendingMovies(data.results.slice(0, 4)));
  } catch (error) {
    console.error("Error fetching trending movies: ", error);
  }
}
fetchTrendingMovies();

// display trending movies
function displayTrendingMovies (movies) {
  let trendingMovieHTML = "";

  movies.forEach ((movie) => {
    const movieImageUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;

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
    await fetch (trendingTVUrl)
              .then ((res) => res.json())
              .then ((data) => displayTrendingTV(data.results.slice(0, 4)));
   } catch (error) {
    console.error("Error fetching trending TV: ", error);
   }
}
fetchTrendingTV();

// display trending TV 
function displayTrendingTV (shows) {
  let trendingTVHTML = "";

  shows.forEach ((show) => {
    const TVImageUrl = `${IMAGE_BASE_URL}${show.poster_path}`;

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