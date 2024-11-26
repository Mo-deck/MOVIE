const api_key = "87794ea630567b2918fba49716980dec"
 const IMAGE_URL ="https://image.tmdb.org/t/p/w500/" 

 document.addEventListener("DOMContentLoaded",()=>{

  getTrendMovies();
  randerMovies()
 })

 const allLists = JSON.parse(localStorage.getItem(("my-list")))

 const onlineUser = JSON.parse(localStorage.getItem('onlineUser')) || null;

const myList = allLists.find(list => list.user === onlineUser.email); 

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

const randerMovies = async()=>{
     const nowPlaying = await fetchMovies('now_playing')
     const upcoming = await fetchMovies('upcoming')
     const topRated = await fetchMovies('top_rated')
     const popular = await fetchMovies('popular')



     

        displayMovies("now-playing", nowPlaying)
        displayMovies("popular", popular)
        displayMovies("upcoming", upcoming)
        displayMovies("top-rated", topRated)
     
}

 async function fetchMovies(endPoint){

  try {

    const response = await fetch(`https://api.themoviedb.org/3/movie/${endPoint}?api_key=${api_key}`);

    const data = await response.json()
    
    return data.results;   
    
  } catch (error) {

    
  }
 }

async function displayMovies(moviedId,movies) {
  //  const playingNow = await fetchMovies("now_playing");
   const movieGrid = document.getElementById(moviedId);

   
 
   movies.map((movie) => {
    
      movieGrid.innerHTML += ` 
      <div class="movie-card">
      <img src="${IMAGE_URL}${movie.poster_path}" alt="${movie.title}">
      <div class="movie-card-overlay">
        <div class="overlay-buttons">
          <button class="button" onclick="handlePlay(${movie.id})">▶</button>
          <button class="button" movieId="${movie.id}" poster_path="${movie.poster_path}" onclick="toggleEvent(this)">
            ${myList.lists.find(mov =>mov.movieId === movie.id) ?"✔️" : "➕"}
          </button>
        </div>
      </div>
    </div> 
      `
   });
}

function scrollRightSection(sectionId){

  const movieGrid =  document.getElementById(sectionId);
  movieGrid.scrollBy({left: 300, behavior: "smooth"})
}
function scrollLeftSection(sectionId){

  const movieGrid =  document.getElementById(sectionId);
  movieGrid.scrollBy({ left: -300, behavior: "smooth"})
}

function toggleEvent(button) {
  const onlineUser = JSON.parse(localStorage.getItem("onlineUser")) || null;
  let allLists = JSON.parse(localStorage.getItem("my-list")) || [];

  const movieId = button.getAttribute("movieId");
  const poster_path = button.getAttribute("poster_path");

  let userIndex = allLists.findIndex((list) => (list.user = onlineUser.email));

  if (userIndex === -1) {
    allLists.push({ user: onlineUser.email, lists: [] });
    userIndex = allLists.length - 1;
  }

  const userLists = allLists[userIndex].lists;

  const movieIndex = userLists.findIndex((mov) => mov.movieId == movieId)

  if (movieIndex === -1) {
    userLists.push({ movieId, poster_path });
    button.textContent = "✔️";
  } else {
    userLists.splice(movieIndex, 1);
    button.textContent = "➕";
  }

  localStorage.setItem("my-list", JSON.stringify(allLists));
}