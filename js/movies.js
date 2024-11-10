const api_key = "87794ea630567b2918fba49716980dec"
 const IMAGE_URL ="https://image.tmdb.org/t/p/w500/" 

 document.addEventListener("DOMContentLoaded",()=>{

  getTrendMovies();
  displayMovies()
 })

 function setHero(data){
     const hero_img = document.getElementById("hero-img")
     
     const hero_title = document.getElementById("hero-title")
     const hero_desc = document.getElementById("hero-description")
     const user = document.getElementById("user")

    const randomIndex = Math.floor (Math.random() * data.results.length);

    const imgUrl = `${IMAGE_URL}${data.results[randomIndex].poster_path}`;
    hero_img.src = imgUrl;
    hero_title.textContent = data.results[randomIndex].title
    hero_desc.textContent = data.results[randomIndex].overview

    const onlineUser = JSON.parse(localStorage.getItem("onlineUser"))
    user.textContent = onlineUser.username
 }

 async function getTrendMovies() {

  try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`);

    const data = await response.json()
    setHero(data);

  } catch (error) {


      
  }
}
 async function fetchMovies(endPoint){

  try {

    const response = await fetch(`https://api.themoviedb.org/3/movie/${endPoint}?api_key=${api_key}`);

    const data = await response.json()
    
    return data.results;
    
    
  } catch (error) {

    
  }
 }

async function displayMovies() {
   const playingNow = await fetchMovies("now_playing");
   const movieGrid = document.getElementById("now-playing");

   

   
   playingNow.map((movie) => {
      movieGrid.innerHTML += ` 
      <div class="movie-card">
      <img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}">
      <div class="movie-card-overlay">
        <div class="overlay-buttons">
          <button class="button" onclick="handlePlay(${movie.id})">▶</button>
          <button class="button">
            +
          </button>
        </div>
      </div>
    </div> 
      `
   });
}
