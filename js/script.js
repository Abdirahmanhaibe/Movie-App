// Vanila JS
var searchInput = document.querySelector('.search');
var cardWrapper = document.querySelector('main');

function noMatch() {
    cardWrapper.innerHTML = '<p class="no-search">No results found </p>'
}

function displayMatches(matches) {
    cardWrapper.innerHTML = '';

    if (!matches) {
        noMatch()
    } else {
        for (var matchObj of matches) {
            cardWrapper.insertAdjacentHTML('beforeend', `
            <div class="movie-card" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
            url(${matchObj.Poster});">
            <h3>${matchObj.Title}</h3>
            <p>RElease year: ${matchObj.Year}</p>
            <a href="https://www.imdb.com/title/${matchObj.imdbID}" target='_blank'>View more info</a>
            </div> `);
    
        }
    }



}


function fetchMovies(event) {
    var keyCode = event.keyCode;
    var searchText = searchInput.value.toLowerCase().trim();

    if (keyCode === 13 && searchText) {

        var respnsePromise = fetch(`https://www.omdbapi.com/?apikey=20dc4c7f&s=${searchText}`);

        function handleResponse(responseObj) {
            return responseObj.json()
        }

        respnsePromise
            .then(handleResponse)
            .then(function (data) {
                displayMatches(data.Search)
                searchInput.value = '';
            });



    }
}


function init() {
    searchInput.addEventListener('keydown', fetchMovies);
}

init();


// JQuery






















