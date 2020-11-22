async function getMovies(event) {
  const title = event.target.textContent;
  location.href = "/movie/?title=" + title;
}

const movieTitles = document.getElementsByClassName("movie-title");

for (let i = 0; i < movieTitles.length; i++) {
  movieTitles[i].addEventListener("click", getMovies);
}
