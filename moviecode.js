const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'application/json',
        
    }
};

let movie;
let searchedMovie;
let movieCards;

let printtitle = () => {
    return (data) => {
        movie = data['results'];
        movie.forEach((a) => {
            let movieIndex = movie.indexOf(a)
            let movieTitle = a['title'];
            let movieOverview = a['overview'];
            let movieImage = a['poster_path'];
            let movieCardHTML = `
            <input type="button" class="cardbtn" id="button${movieIndex}">
            <label for="button${movieIndex}" class="card" id="card${movieIndex}">
               <div class="imagesection">
                    <img class="cardimage" id="carimage" 
                        src="https://image.tmdb.org/t/p/original${movieImage}" alt="...">
                </div>
                <div class="textsection">
                    <h5 class="cardtitle" id="title${movieIndex}">${movieTitle}</h5>
                    <p class="cardtext">${movieOverview}'</p>
                </div>
            </label>`



            document.querySelector("#cardrow" + movieIndex % 3).innerHTML += movieCardHTML;
        })
        movieCards = document.querySelectorAll(".cardbtn");
        //resolve(movieCards);
    }

}

let loading = function () {
    window.onload = () => {
        const btn = document.querySelector("#searchbtn");
        btn.addEventListener("click", clickBtn);

        document.querySelector('#input').addEventListener("keydown", (e) => {
            if (e.code == 'Enter') {
                btn.click();
            }
        })
        
    }
}

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(printtitle())
    .then(loading())
    .catch(err => console.error(err));


let clickBtn = () => {
    searchedMovie = [];
    const a = document.querySelector("#input").value.toLowerCase();
    movie.forEach((i) => {
        let title = i["title"];
        if (title.toLowerCase().includes(a)) {
            searchedMovie.push(i);
        }
    })
    document.querySelectorAll(".cardrow").forEach(function (i) {
        i.innerHTML = ``;
    })
    searchedMovie.forEach((a) => {
        let movieIndex = searchedMovie.indexOf(a)
        let movieTitle = a['title'];
        let movieOverview = a['overview'];
        let movieImage = a['poster_path'];
        let movieCardHTML = `
        <input type="button" class="cardbtn" id="button${movieIndex}">
        <label for="button${movieIndex}" class="card" id="card${movieIndex}">
           <div class="imagesection">
                <img class="cardimage" id="carimage" 
                    src="https://image.tmdb.org/t/p/original${movieImage}" alt="...">
            </div>
            <div class="textsection">
                <h5 class="cardtitle" id="title${movieIndex}">${movieTitle}</h5>
                <p class="cardtext">${movieOverview}'</p>
            </div>
        </label>`
        document.querySelector("#cardrow" + movieIndex % 3).innerHTML += movieCardHTML;
    })
}


// window.onload = () => {
//     const btn = document.querySelector("#searchbtn");
//     btn.addEventListener("click", clickBtn);

//     document.querySelector('#input').addEventListener("keydown", (e) => {
//         if (e.code == 'Enter') {
//             btn.click();
//         }
//     })
// }


/* data['results'] 내부 키들...
id : 278
original_title : "The Shawshank Redemption"
overview : 요약
poster_path : "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"
title : "The Shawshank Redemption"
*/
