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
  const trendingUrl = `${BASE_URL}trending/movie/week?api_key=${API_KEY}`;

  try {
    await fetch (trendingUrl)
            .then ((res) => res.json())
            .then ((data) => displayTrendingMovies(data.results.slice(0, 4)));
  } catch (error) {
    console.error("Error fetching trending movies: ", error);
  }
}
fetchTrendingMovies();

function displayTrendingMovies (movies) {
  let trendingHTML = "";

  movies.forEach ((movie) => {
    const trendingImageUrl = `${IMAGE_BASE_URL}${movie.poster_path}`;

    trendingHTML += `
      <div class="border border-gray-300 p-2 rounded-md dark:border-gray-700">
        <img src="${trendingImageUrl}" alt="" class="w-full object-cover mb-2 rounded-md">

        <h3 class="text-xl font-semibold text-gray-600 mb-2 dark:text-gray-200">
          ${movie.original_title}
        </h3>

        <p class="text-gray-500 dark:text-gray-400">
          ${movie.overview.slice(0, 30) || "No description available"}...
        </p>
      </div>
    `;
  });
  document.getElementById("trending-movies").innerHTML = trendingHTML;
}