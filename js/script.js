const global = {
    currentPage: window.location.pathname,
};

// Get Popular Movies
async function showPopularMovies() {
    const {results} = await fetchDataFromAPI('/movie/popular');

    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
                <a href="movie-details.html?id=1">
                ${
                    movie.poster_path
                        ? `
                    <img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt=${movie.title} />`
                        : `
                    <img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt=${movie.title} />`
                }
                </a>
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">
                        <small class="text-muted">Release: ${
                            movie.release_date
                        }</small>
                    </p>
                </div>
        `;
        document.getElementById('popular-movies').appendChild(div);
    });
}

// Fetch data from TMDB
async function fetchDataFromAPI(endpoint) {
    const API_URL = 'https://api.themoviedb.org/3';

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
    };

    const response = await fetch(
        `${API_URL}/${endpoint}?language=en-US`,
        options
    );

    const data = await response.json();
    return data;
}

// Highlight Active Link
function highlightActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

// Init App
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            showPopularMovies();
            break;
        case '/shows.html':
            console.log('Shows');
            break;
        case '/movie-details.html':
            console.log('Movie Details');
            break;
        case '/tv-details.html':
            console.log('TV Details');
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
