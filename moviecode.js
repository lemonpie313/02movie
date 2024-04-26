const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGFhZWZmNTk2ZTdhZTEzODMxZGRlOTRhYWE0YTgxYiIsInN1YiI6IjY2MjYzNTlmNjNkOTM3MDE0YTcxOWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lWKw5grKuXOHrKv9iGfhk2x7VNULIlT17SauDeWb6VY'
    }
};

let movieCollection = [];
let searchedMovie = {};

let printtitle = function () {
    return (data) => {
        let movie = data['results'];
        let movieTitle;
        let movieOverview;
        let movieImage;
        let movieIndex;
        movie.forEach((a) => {
            movieIndex = movie.indexOf(a)
            movieTitle = a['title'];
            movieOverview = a['overview'];
            movieImage = a['poster_path'];
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
            movieCollection.push(movieTitle);
        })
    }
}



fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(printtitle())
    .catch(err => console.error(err));


let clickbtn = function () {
    searchedMovie = {};
    //let n = 0;
    let a = document.querySelector("#input").value.toLowerCase();
    console.log("입력값 : " + a);
    movieCollection.forEach(function (title) {
        if (title.toLowerCase().includes(a)) {
            console.log(title + "검색 완료");
            //searchedMovie[n]["movieTitle"] = title;
            //searchedMovie[n]["movieOverview"] = querySelector("#"+n).text;
            //n+=1;
        } else {
            console.log(`${a}와 ${title}는 일치하지 않음`);
        }
    })
    document.querySelectorAll(".cardrow").forEach( function (i) {
        i.innerHTML = ``;
    })
    //console.log(searchedMovie);



}

window.onload = function () { //페이지 로드시 자동으로 수행되는 전용 콜백함수
    let btn = document.querySelector("#searchbtn");
    btn.addEventListener("click", clickbtn); //html 로드가 다 되기도 전에 js에서 html 영역을 참조하려 해서 에러나기 때문에, window.onload에 할당해줘야함
}


/* data['results'] 내부 키들...
id : 278
original_title : "The Shawshank Redemption"
overview : 요약
poster_path : "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"
title : "The Shawshank Redemption"
*/