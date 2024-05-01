const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGFhZWZmNTk2ZTdhZTEzODMxZGRlOTRhYWE0YTgxYiIsInN1YiI6IjY2MjYzNTlmNjNkOTM3MDE0YTcxOWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lWKw5grKuXOHrKv9iGfhk2x7VNULIlT17SauDeWb6VY'
    }
};

let movie;
let searchedMovie;
let movieCard;
let allData;

let printMovieCards = (movie) => {
    movie.forEach((a) => {
        let movieIndex = movie.indexOf(a)
        let movieTitle = a['title'];
        let movieOverview = a['overview'];
        let movieImage = a['poster_path'];
        let movieRating = a['vote_average'];
        let movieCardHTML = `
        <div class="cardsection" id=cardsection${movieIndex}>
            <input type="button" class="cardbtn" id="button${movieIndex}" style="display: none;">
            <label for="button${movieIndex}" class="card" id="card${movieIndex}">
               <div class="imagesection">
                    <img class="cardimage" id="carimage" 
                        src="https://image.tmdb.org/t/p/original${movieImage}" alt="...">
                </div>
                <div class="textsection">
                    <h5 class="cardtitle" id="title${movieIndex}">${movieTitle}</h5>
                    <p class="rating">rating : ${movieRating}</p>
                    <p class="cardtext">${movieOverview}</p>
                </div>
            </label>
        </div>`;
        document.querySelector("#cardrow" + movieIndex % 3).insertAdjacentHTML("beforeend", movieCardHTML);
    })
}

//첫 로드
let printTitle = function (data) {
    allData = data;
    movie = data['results'];
    searchedMovie = movie;
    printMovieCards(movie);
    movieCard = document.querySelectorAll(".cardbtn");
}


//카드 클릭시 실행할 함수
let cardAlert = (a) => {
    let number = a.target.id.slice(6);
    let idOfMovie = searchedMovie[number]['id'];
    alert("id : " + idOfMovie);
}

//카드 클릭 함수
let clickCard = (movieCards) => {
    movieCards.forEach((a) => {
        a.addEventListener("click", (a) => {
            cardAlert(a);
        });
    });
}

//검색버튼 클릭시 실행할 함수
let clickBtn = () => {
    const a = document.querySelector("#input").value.toLowerCase();
    if (!a) {
        alert("검색어를 입력하세요");
    }
    searchedMovie = movie.filter((i) => {
        return i["title"].toLowerCase().includes(a.toLowerCase())
    })
    document.querySelectorAll(".cardrow").forEach(function (i) {
        i.innerHTML = ``;
    })
    printMovieCards(searchedMovie);
    movieCard = document.querySelectorAll(".cardbtn");
}


//돌아가기 버튼 클릭 함수
let clickBack = () => {
    let resetbtn = document.querySelector("#resetbtn");
    resetbtn.addEventListener("click", () => {
        document.querySelectorAll(".cardrow").forEach(function (i) {
            i.innerHTML = ``;
        });
        printTitle(allData);
        clickCard(movieCard);
    })
}


//검색버튼 클릭 함수
let printSearched = function () {
    const btn = document.querySelector("#searchbtn");
    btn.addEventListener("click", () => {
        clickBtn();
        clickCard(movieCard);
        clickBack();
    });
    document.querySelector('#input').addEventListener("keydown", (e) => {
        if (e.code == 'Enter') {
            btn.click();
        }
    })
}



fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
        printTitle(data);
        clickCard(movieCard);
        printSearched(data);
    })
