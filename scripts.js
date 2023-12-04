const apiKey = 'a92b5abe6a7ea076625c6b4ed05cb1d9';

window.onload = function () {
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  fetch(popularMoviesUrl)
    .then(response => response.json())
    .then(data => {
      displayPopularMovies(data.results);
    })
    .catch(error => {
      console.error('Error fetching popular movies:', error);
    });
};

function displayPopularMovies(movies) {
  const popularMoviesList = document.getElementById('popularMoviesList');

  movies.forEach(movie => {
    const title = movie.title;
    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300';

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `<img src="${poster}" alt="${title}">`;

    movieElement.addEventListener('click', () => {
      getMovieDetails(movie.id);
    });

    popularMoviesList.appendChild(movieElement);
  });
}

function getMovieDetails(movieId) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  fetch(movieDetailsUrl)
    .then(response => response.json())
    .then(movie => {
      displayMovieDetails(movie);
    })
    .catch(error => {
      console.error('Error fetching movie details:', error);
    });
}

function displayMovieDetails(movie) {
  const movieDetails = document.getElementById('movieDetails');
  movieDetails.innerHTML = '';

  const title = movie.title;
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300';
  const overview = movie.overview;
  const releaseDate = movie.release_date;
  const rating = movie.vote_average;

  const detailsElement = document.createElement('div');
  detailsElement.innerHTML = `
    <h2>${title}</h2>
    <img src="${poster}" alt="${title}">
    <p>${overview}</p>
    <p>Release Date: ${releaseDate}</p>
    <p>Rating: ${rating}</p>
  `;

  movieDetails.appendChild(detailsElement);
}

function searchMovies() {
  const searchTerm = document.getElementById('searchInput').value.trim();
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      displaySearchResults(data.results);
    })
    .catch(error => {
      console.error('Error searching movies:', error);
    });
}

function displaySearchResults(results) {
  const popularMoviesList = document.getElementById('popularMoviesList');
  popularMoviesList.innerHTML = '';

  results.forEach(movie => {
    const title = movie.title;
    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300';

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `<img src="${poster}" alt="${title}">`;

    movieElement.addEventListener('click', () => {
      getMovieDetails(movie.id);
    });

    popularMoviesList.appendChild(movieElement);
  });
}


function openMovieDetailsWindow(movie) {
  const movieDetailsWindow = window.open('', 'Movie Details', 'width=600,height=400');
  
  const title = movie.title;
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300';
  const overview = movie.overview;
  const releaseDate = movie.release_date;
  const rating = movie.vote_average;
  const trailerKey = movie.trailer_key; 

  const detailsHTML = `
    <h2>${title}</h2>
    <img src="${poster}" alt="${title}">
    <p>${overview}</p>
    <p>Release Date: ${releaseDate}</p>
    <p>Rating: ${rating}</p>
    ${trailerKey ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allowfullscreen></iframe>` : ''}
  `;

  movieDetailsWindow.document.body.innerHTML = detailsHTML;
}


function displayPopularMovies(movies) {
  const popularMoviesList = document.getElementById('popularMoviesList');

  movies.forEach(movie => {
    const title = movie.title;
    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300';

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `<img src="${poster}" alt="${title}">`;

    movieElement.addEventListener('click', () => {
      openMovieDetailsWindow(movie);
    });

    popularMoviesList.appendChild(movieElement);
  })
}


