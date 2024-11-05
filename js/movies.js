const api_key = "87794ea630567b2918fba49716980dec"
 const IMAGE_URL ="https://image.tmdb.org/t/p/w500/" 

 document.addEventListener('DOMContentLoaded', async function(){

    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`);

      const data = await response.json()
      setHero(data);

    } catch (error) {

        console.log('error from trending ', error);
        
    }
 })

 function setHero(data){
     const hero_img = document.getElementById("hero-img")
     
     const hero_title = document.getElementById("hero-title")
     const hero_desc = document.getElementById("hero-description")
    const randomIndex = Math.floor (Math.random() * data.results.length);


    const imgUrl = `${IMAGE_URL}${data.results[randomIndex].poster_path}`;
    hero_img.src = imgUrl;
    hero_title.textContent = data.results[randomIndex].title
    hero_desc.textContent = data.results[randomIndex].overview
 }