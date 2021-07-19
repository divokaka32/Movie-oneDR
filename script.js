$('.search-button').on('click', function () {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=906cdda&s=' + $('.input-keyword').val(),
        success: result => {
            const movieDetail = result.Search;
            // console.log(movieDetail);
            // Card
            let cards = '';
            movieDetail.forEach(m => {
                cards += showCards(m);
            });
            $('.movie-container').html(cards);
            // Modal
            $('.modal-detail-button').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=906cdda&i=' + $(this).data('imdbid'),
                    success: m => {
                        const movieDetail = showMovieDetail(m);
                        $('.modal-body').html(movieDetail);
                    },
                    error: e => {
                        console.log(e.responseText)
                    }
                })
            })
        },
        error: e => {
            console.log(e.responseText);
        }
    });

})


function showCards(m) {
    return `<div class="col-md-4 my-3">
                <div class="card" style="width: 18rem">
                <img src="${m.Poster}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetail" data-imdbid="${m.imdbID}">Detail</a>
                </div>
                </div>
            </div>`
}

function showMovieDetail(a) {
    return `<div class="container">
                <div class="row">
                <div class="col-md-3">
                    <img src="${a.Poster}" class="img-fluid" />
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item">
                        <h4>${a.Title}</h4>
                        (${a.Year})
                    </li>
                    <li class="list-group-item"><strong>Genre : </strong>${a.Genre}</li>
                    <li class="list-group-item"><strong>Directors : </strong>${a.Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${a.Actors}</li>
                    <li class="list-group-item"><strong>Rating IMDb : </strong>${a.Ratings[0].Value}</li>
                    <li class="list-group-item"><strong>Plot : </strong>${a.Plot}</li>
                    </ul>
                </div>
                </div>
            </div>`
}