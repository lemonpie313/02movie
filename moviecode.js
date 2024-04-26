const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: ''
    }
};

let movie;
let searchedMovie;

let printtitle = function () {
    return (data) => {
        movie = data['results'];
        movie.forEach((a) => {
            let movieIndex = movie.indexOf(a)
            let movieTitle = a['title'];
            let movieOverview = a['overview'];
            let movieImage = a['poster_path'];
            let movieCardHTML = `
            <div class="card">
               <div class="imagesection">
                    <img class="cardimage" id="carimage" 
                        src="https://image.tmdb.org/t/p/original${movieImage}" alt="...">
                </div>
                <div class="textsection">
                    <h5 class="cardtitle" id="${movieIndex}">${movieTitle}</h5>
                    <p class="cardtext">${movieOverview}'</p>
                </div>
            </div>`
            document.querySelector("#cardrow" + movieIndex % 3).innerHTML += movieCardHTML;
        })
    }
    
}



fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(printtitle())
    .catch(err => console.error(err));


let clickbtn = function () {
    searchedMovie = [];
    let a = document.querySelector("#input").value.toLowerCase();
    console.log("입력값 : " + a);
    movie.forEach(function (i) {
        let title = i["title"];
        if (title.toLowerCase().includes(a)) {
            searchedMovie.push(i);
        }
    })
    document.querySelectorAll(".cardrow").forEach( function (i) {
        i.innerHTML = ``;
    })
    searchedMovie.forEach( function(a) {
        let movieIndex = searchedMovie.indexOf(a)
            let movieTitle = a['title'];
            let movieOverview = a['overview'];
            let movieImage = a['poster_path'];
            let movieCardHTML = `
            <div class="card">
               <div class="imagesection">
                    <img class="cardimage" id="carimage" 
                        src="https://image.tmdb.org/t/p/original${movieImage}" alt="...">
                </div>
                <div class="textsection">
                    <h5 class="cardtitle" id="${movieIndex}">${movieTitle}</h5>
                    <p class="cardtext">${movieOverview}'</p>
                </div>
            </div>`
            document.querySelector("#cardrow" + movieIndex % 3).innerHTML += movieCardHTML;
        })    
}

window.onload = function () {
    let btn = document.querySelector("#searchbtn");
    btn.addEventListener("click", clickbtn);
}


/* data['results'] 내부 키들...
id : 278
original_title : "The Shawshank Redemption"
overview : 요약
poster_path : "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"
title : "The Shawshank Redemption"
*/
