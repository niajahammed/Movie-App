const API_KEY = "da99b8a46a743f9cb89fc6527d422c87";
const BASE_URL = `https://api.themoviedb.org/3/`;
const IMAGE_BASE_URL = `https://image.tmdb.org/t/p/w500`;

async function trendingMovies () {
  const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}`;

  try {
  await fetch (url)
          .then((res) => res.json())
          .then((data) => displayTrendingMovies(data.results.slice(0, 4)));
  } catch (error) {
    alert("Error fetching trending movies");
  }
}

async function showHomeView (e) {
  if (e) e.preventDefault();

  
}

let trendingMovieArr = [];

function displayTrendingMovies (movies) {
  let trendingMovieHTML = "";

  movies.forEach((movie) => {
    const posterUrl = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';

    trendingMovieHTML += `
      <a href="">
        <img src="${posterUrl}" alt="">
        <h2 class="text-2xl font-bold text-gray-800 my-4">${movie.original_title}</h2>
        <p class="text-md text-gray-600">${movie.overview.slice(0, 50)}...</p>
      </a>
    `;
  });
  document.getElementById("movieContainer").innerHTML = trendingMovieHTML;
}

async function allTrendingMovies (e) {
  if (e) e.preventDefault();

  const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}`;

  try {
    await fetch (url)
            .then((res) => res.json())
            .then((data) => displayTrendingMovies(data.results));

    const sectionTitle = document.querySelector("h2.text-2xl.font-bold.mb-6");
    if (sectionTitle) sectionTitle.textContent = "All Trending Movies";

    const seeMoreBtn = document.getElementById("seeMoreBtn");
    if (seeMoreBtn) seeMoreBtn.style.display = "none";

    updateNavState("Trending");
  } catch (error) {
    console.error("Error fetching all trending movies:", error);
  }
}
allTrendingMovies();

function updateNavState(activeNavText) {
  const navLinks = document.querySelectorAll("aside nav a");

  navLinks.forEach((link) => {
    if (link.textContent.trim() === activeNavText) {
      link.className = "block text-red-500 font-semibold";
    } else {
      link.className = "block text-gray-500";
    }
  });
}