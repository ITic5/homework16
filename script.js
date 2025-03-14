const apiUrl = "http://www.omdbapi.com/";
let apiKey = "?apiKey=50016d76";

// async function callOMDbApi(params) {
//    const url = apiUrl + apiKey + "&" + params;
//    const response = await fetch(url);
//    return await response.json();
// }
//
// async function getMovieByTitle(title) {
//    let response = await callOMDbApi("t=" + title);
//    console.log(response);
// }
//
// getMovieByTitle("Terminator");

/**
 * Ako u HTML u script tagu stavimo type="module" onda se radi
 * bez getMovieByTitle f-je, nego samo ovo ispod ide
 */
// let response = await callOMDbApi("t=Terminator");
// console.log(response);

// let response = await callOMDbApi("s=Home+Alone&y=1990");
// console.log(response);

//HOMEWORK
let movieName = document.getElementById("movie-name");
let movieYear = document.getElementById("movie-year");
let currentYear = "";
let searchButton = document.getElementById("search-button");
let searchResults = document.getElementById("search-results");

for (let i=1970; i<2026; i++) {
   let year = document.createElement("option");
   year.innerText = i;
   year.value = i;
   movieYear.append(year);
}

movieYear.addEventListener("change", function () {
   currentYear = movieYear.value;
});

async function searchMovies(name, year){
   let url = apiUrl + apiKey + "&s=" + name + "&y=" + year;
   let response = await fetch(url);
   return await response.json();
}

searchButton.addEventListener("click", async function () {
   searchResults.innerHTML = "";

   let name = movieName.value;
   let response = await searchMovies(name, currentYear);

   if (response.Search) {
      for (let movie of response.Search) {
         let searchedMovieWrapper = document.createElement("div");
         let searchedMovieName = document.createElement("h2");
         searchedMovieName.innerText = movie.Title;
         let searchedMovieYear = document.createElement("h4");
         searchedMovieYear.innerText = movie.Year;
         let searchedMoviePoster = document.createElement("img");
         searchedMoviePoster.setAttribute("src", movie.Poster);

         searchedMovieWrapper.append(searchedMovieName, searchedMovieYear, searchedMoviePoster);
         searchResults.append(searchedMovieWrapper);
      }
   } else {
      searchResults.innerHTML = "<p>No results found.</p>";
   }
});


