$('document').ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    })
});


function getMovies(searchText){
    axios.get('http://www.omdbapi.com/?apikey=ecb68feb&s='+searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index,movie) => {
                output += `
                    <div class="col-md-4">
                        <div class="bg-light well text-center mb-3">
                            <img src="${movie.Poster}" class="mb-3">
                            <br>
                            <span class="bold italic">${movie.Title}</span>
                            <br>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-danger mt-3 mb-3" href="#">Movie Details</a>
                        </div>
                    </div>
                `;
            });
            $('#movies').html(output)
        }).catch((error) => {
            console.log(error);
        });
}

function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com/?apikey=ecb68feb&i='+movieId)
        .then((response) => {
            let movie = response.data;

            let output = `
                <div class="row">
                    <div class="col-md-4"> 
                        <img src="${movie.Poster}" class="thumbnail" />
                    </div>
                    <div class="col-md-8 text-center"> 
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well bg-light col-md-12 p-3 text-center">
                        <h3>Plot</h3>
                            ${movie.Plot}
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-outline-danger">View IMDB</a>
                        <a href="index.html" class="btn btn-outline-dark">Go Back To Search </a>
                    </div>
                </div>
            `;
            $('#movie').html(output)    ;
        }).catch((error) => {
            console.log(error);
        });
}