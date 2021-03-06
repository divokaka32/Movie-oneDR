// ketika tombol di ketik
const alertPopup = document.querySelector('.alert-popup');
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    try {
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovie(inputKeyword.value);
        // console.log(movie)
        updateUI(movies);
    } catch (err) {
        // console.log(err)
        if (alertPopup.classList.contains('hilang')) {
            alertPopup.classList.remove('hilang')
            return err;
        }
    } finally {
        setTimeout(() => {
            alertPopup.classList.add('hilang')
        }, 1200)
    }
});

function getMovie(inputKeyword) {
    return fetch('http://www.omdbapi.com/?apikey=eb867953&s=' + inputKeyword)
        .then(response => {
            if (!response.ok) {
                // console.log(response)
                throw new Error(alert(`Incorrect API Key`)); // jika API Key nya salah
            } // throw new Error (isi) => masuk ke catch (err), err = isi
            return response.json();
        })
        .then(response => {
            if (response.Response === "False") { // jika salah memasukkan value (kosong, typo di input)
                // console.log(response)
                if (response.Error === "Incorrect IMDb ID.") {
                    throw new Error(alert('Please fill out this field'));
                } else {
                    throw new Error(alert(response.Error));
                }
            }
            return response.Search;
        })
};

function updateUI(movies) {
    let card = '';
    // movies di looping untuk mengambil setiap dari movie yang tersedia
    movies.forEach(m => {
        // movie ditampung ke dalam card
        card += showCard(m)
    });
    // tangkap baris untuk menampung card movies
    const movieContainer = document.querySelector('.movie-container');
    // card di taruh/cetak ke dalam html
    movieContainer.innerHTML = card;
}

function showCard(m) {
    return `<div class="col-md-4 mt-3">
                <div class="card" style="width: 18rem">
                <img src="${m.Poster}" class="card-img-top" />
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary detail-button" data-bs-toggle="modal" data-bs-target="#MovieDetail" data-imdbid="${m.imdbID}">Detail</a>
                </div>
                </div>
            </div>`
};


// event binding
// ketika klik detail di tekan
document.addEventListener('click', async function (e) {
    if (e.target.classList.contains('detail-button')) {
        // console.log('ok');
        try {
            const imdbid = e.target.dataset.imdbid;
            const movieDetail = await getMovieDetail(imdbid);
            // console.log(movieDetail);
            updateUIDetail(movieDetail);
        } catch (err) {
            return err
        }
    }
});

function getMovieDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=eb867953&i=' + imdbid)
        .then(response => {
            // console.log(response)
            if (!response.ok) {
                throw new Error(alert(response.statusText));
            }
            return response.json();
        })
        .then(response => response)
}

function updateUIDetail(md) {
    let movieDetail = showMovieDetail(md);
    // tangkap modal body
    const modalBody = document.querySelector('.modal-body');
    // isi di masukkan
    modalBody.innerHTML = movieDetail;
}


function showMovieDetail(md) {
    return `<div class="container">
                <div class="row">
                <div class="col-md-3">
                    <img src="${md.Poster}" class="img-fluid" />
                </div>
                <div class="col-md">
                    <ul class="list-group">
                    <li class="list-group-item"><strong>Genre : </strong>${md.Genre}</li>
                    <li class="list-group-item"><strong>Director : </strong>${md.Director}</li>
                    <li class="list-group-item"><strong>Actor : </strong>${md.Actors}</li>
                    <li class="list-group-item"><strong>Rating IMDb : </strong>${md.Ratings[0].Value}</li>
                    <li class="list-group-item"><strong>Plot : </strong>${md.Plot}</li>
                    </ul>
                </div>
                </div>
            </div>`
}


// ALERT
function alert(err) {
    const alerts = `<div class="alert alert-danger d-flex align-items-center" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                        <div>
                        ${err}
                        </div>
                    </div>`;
    return alertPopup.innerHTML = alerts;
}