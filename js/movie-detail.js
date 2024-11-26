const API_KEY = "cde69b8ab4588148413d2dbdc4565071";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`
    );
    if (!response.ok) {
      console.log("not found");
      return;
    }
    return await response.json();
  } catch (error) {
    console.log("errr ka ", error);
  }
}

function renderMoviesDetails(movie) {
  const app = document.getElementById("app");
  const trailer = movie.videos.results.find(
    (video) =>
      video.type === "Trailer" &&
      (video.name === "Official Trailer" || video.name.includes("Trailer"))
  );
  const trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}`
    : null;

  app.innerHTML = `
    <div class="hero-video">
      <div class="trailer-container">
        <iframe src="${trailerUrl}?autoplay=1&mute=1" autoplay muted allowfullscreen></iframe>
      </div>
            
      
      <div class="hero-content">
        <h1 class="hero-title">${movie.title}</h1>
        <div class="hero-details">
          <span class="star">⭐ ${movie.vote_average.toFixed(1)}</span>
          <span>${new Date(movie.release_date).getFullYear()}</span>
          <span>${movie.runtime} min</span>
        </div>
        <p>${movie.overview}</p>
        <div>
          <button class="button play" onclick="playTrailer('${trailerUrl}')">▶ Play Trailer</button>
          <button class="button list" onclick="toggleList()">+ Add to My List</button>
        </div>
      </div>
    </div>

   
    
    

    <div class="cast-section">
      <h2>Cast</h2>
      <div class="cast-grid">
        ${movie.credits.cast
          .slice(0, 6)
          .map(
            (actor) => `
            <div class="card">
              <img src="${IMAGE_BASE_URL}${actor.profile_path}" alt="${actor.name}">
              <h3>${actor.name}</h3>
              <p>${actor.character}</p>
            </div>
          `
          )
          .join("")}
      </div>
    </div>
  `;
}

fetchMovieDetails(movieId)
  .then(renderMoviesDetails)
  .catch((error) => {
    const app = document.getElementById("app");

    app.innerHTML = `<div>Failed to load movie details. Please try again later.</div>`;
  });

function playTrailer(trailerUrl) {
  const trailerDisplay = document.getElementById("trailer-display");
  const trailerIframe = document.getElementById("trailer-iframe");

  if (trailerUrl) {
    trailerIframe.src = `${trailerUrl}?autoplay=1&mute=1`;
    trailerDisplay.style.visibility = "visible";
  } else {
    alert("Trailer not found");
  }
}

function closeTrailer() {
  const trailerDisplay = document.getElementById("trailer-display");
  const trailerIframe = document.getElementById("trailer-iframe");

  trailerDisplay.style.visibility = "hidden";
  trailerIframe.src = "";
}