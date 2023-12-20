document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const movieDetails = document.getElementById('movieDetails');

    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value;

        if (searchTerm.trim() !== '') {
            // Fetch movie data from OMDB API
            fetch(`https://www.omdbapi.com/?apikey=YOUR_API_KEY&t=${searchTerm}`)
                .then(response => response.json())
                .then(data => {
                    // Display movie data on the app
                    displayMovieDetails(data);
                })
                .catch(error => {
                    console.error('Error fetching movie details:', error);
                });
        }
    });

    function displayMovieDetails(movie) {
        if (movie.Response === 'True') {
            movieDetails.innerHTML = `
                <div class="movie-info">
                    <h2>${movie.Title}</h2>
                    <img src="${movie.Poster}" alt="${movie.Title} Poster" class="movie-poster">
                    <p><strong>Year:</strong> ${movie.Year}</p>
                    <p><strong>Genre:</strong> ${movie.Genre}</p>
                    <p><strong>Director:</strong> ${movie.Director}</p>
                    <p><strong>Actors:</strong> ${movie.Actors}</p>
                    <p><strong>Plot:</strong> ${movie.Plot}</p>
                </div>
            `;
        } else {
            movieDetails.innerHTML = `<p>No movie found with the title "${searchInput.value}".</p>`;
        }
    }
});
