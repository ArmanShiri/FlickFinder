const global = {
    currentPage: window.location.pathname,
};

// Get Popular Movies
async function displayPopularMovies() {
    const {results} = await fetchDataFromAPI('movie/popular');

    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
                <a href="movie-details.html?id=${movie.id}">
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

// Display Popular Shows
async function displayPopularShows() {
    const {results} = await fetchDataFromAPI('tv/popular');

    results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
                <a href="tv-details.html?id=${show.id}">
                ${
                    show.poster_path
                        ? `
                    <img
                    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt=${show.name} />`
                        : `
                    <img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt=${show.name} />`
                }
                </a>
                <div class="card-body">
                    <h5 class="card-title">${show.name}</h5>
                    <p class="card-text">
                        <small class="text-muted">Release: ${
                            show.first_air_date
                        }</small>
                    </p>
                </div>
        `;
        document.getElementById('popular-shows').appendChild(div);
    });
}

// Display Movie Details
async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1];

    const movie = await fetchDataFromAPI(`movie/${movieId}`);

    // Display Backdrop
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `
        <div class="details-top">
            <div>
                ${
                    movie.poster_path
                        ? `
                    <img 
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}" />
                    `
                        : `
                    <img
                    src="images/no-image.jpg" 
                    class="card-img-top" 
                    alt="${movie.title}" />
                    `
                }
            </div>
            <div>
                    <h2>${movie.title}</h2>
                <p>
                    <i class="fas fa-star text-primary"></i>
                    ${movie.vote_average.toFixed(1)} / 10
                </p>
                    <p class="text-muted">
                    Release Date: ${movie.release_date}
                    </p>
                <p>
                    ${movie.overview}
                </p>
                <h5>Genres</h5>
                <ul class="list-group">
                    ${movie.genres
                        .map(genre => `<li>${genre.name}</li>`)
                        .join('')}
                </ul>
                <a href="${
                    movie.homepage
                }" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
                <li><span class="text-secondary">Budget:</span> $${addCommasToPrice(
                    movie.budget
                )}</li>
                <li><span class="text-secondary">Revenue:</span> $${addCommasToPrice(
                    movie.revenue
                )}</li>
                <li><span class="text-secondary">Runtime:</span> ${
                    movie.runtime
                } minutes</li>
                <li><span class="text-secondary">Status:</span> ${
                    movie.status
                }</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">${movie.production_companies
                .map(company => `<span>${company.name}</span>`)
                .join(', ')}</div>
        </div>
    `;
    document.getElementById('movie-details').appendChild(div);
}

// Dsiplay Show Details
async function dispayShowDetails() {
    const showId = window.location.search.split('=')[1];

    const show = await fetchDataFromAPI(`tv/${showId}`);

    // Display Backdrop
    displayBackgroundImage('show', show.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `
        <div class="details-top">
                <div>
                   ${
                       show.poster_path
                           ? `
                    <img 
                    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt="${show.name}" />
                    `
                           : `
                    <img
                    src="images/no-image.jpg" 
                    class="card-img-top" 
                    alt="${show.name}" />
                    `
                   }
                </div>
                <div>
                    <h2>${show.name}</h2>
                    <p>
                        <i class="fas fa-star text-primary"></i>
                        ${show.vote_average.toFixed(1)} / 10
                    </p>
                    <p class="text-muted">First Air Date: ${
                        show.first_air_date
                    }</p>
                    <p>
                        ${show.overview}
                    </p>
                    <h5>Genres</h5>
                    <ul class="list-group">
                        ${show.genres
                            .map(genre => `<li>${genre.name}</li>`)
                            .join('')}
                    </ul>
                    <a href="${
                        show.homepage
                    }" target="_blank" class="btn">Visit Show Homepage</a>
                </div>
            </div>
            <div class="details-bottom">
                <h2>Show Info</h2>
                <ul>
                    <li><span class="text-secondary">Number Of Episodes:</span> ${
                        show.number_of_episodes
                    }</li>
                    <li>
                        <span class="text-secondary">Last Episode To Air:</span> ${
                            show.last_episode_to_air.name
                        }
                    </li>
                    <li><span class="text-secondary">Status:</span> ${
                        show.status
                    }</li>
                </ul>
                <h4>Production Companies</h4>
                <div class="list-group">${show.production_companies
                    .map(company => `<strong>${company.name}</strong>`)
                    .join(', ')}</div>
            </div>
    `;
    document.getElementById('show-details').appendChild(div);
}

// Display Movie & Show Backdrop
function displayBackgroundImage(type, backgroundPath) {
    const backdropDiv = document.createElement('div');
    backdropDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    backdropDiv.style.backgroundSize = 'cover';
    backdropDiv.style.backgroundPosition = 'center';
    backdropDiv.style.backgroundRepeat = 'no-repeat';
    backdropDiv.style.height = '100vh';
    backdropDiv.style.width = '100vw';
    backdropDiv.style.position = 'absolute';
    backdropDiv.style.top = '0';
    backdropDiv.style.left = '0';
    backdropDiv.style.zIndex = '-1';
    backdropDiv.style.opacity = '0.1';

    if (type === 'movie') {
        document.getElementById('movie-details').appendChild(backdropDiv);
    } else {
        document.getElementById('show-details').appendChild(backdropDiv);
    }
}

// Show and hide Spinner
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

// Funtion to Add Commas to Numbers (Price)
function addCommasToPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

    showSpinner();

    const response = await fetch(
        `${API_URL}/${endpoint}?language=en-US`,
        options
    );
    const data = await response.json();

    hideSpinner();

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
            displayPopularMovies();
            break;
        case '/shows.html':
            displayPopularShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            dispayShowDetails();
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
