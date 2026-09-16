const API_KEY = "da99b8a46a743f9cb89fc6527d422c87";
const BASE_URL = `https://api.themoviedb.org/3/`;
const IMAGE_BASE_URL = `https://image.tmdb.org/t/p/w500`;

async function trendingMovies () {
  const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}`;

  await fetch (url)
          .then((res) => res.json())
          .then((data) => displayTrendingMovies(data.results.slice(0, 4)));
}
trendingMovies();

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

