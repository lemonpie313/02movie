const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'application/json',
        Authorization: ''
    }
};

let movieCard;

//첫 로드
let printtitle = function (data) {
    return new Promise((resolve) => {
        movie = data['results'];
        movie.forEach((a) => {
            let movieIndex = movie.indexOf(a)
            let movieTitle = a['title'];
            let movieOverview = a['overview'];
            let movieImage = a['poster_path'];
            let movieID = a['id'];
            let movieCardHTML = `
            <div class="cardsection" id=cardsection${movieIndex}>
                <input type="button" class="cardbtn" id="button${movieIndex}">
                <label for="button${movieIndex}" class="card" id="card${movieIndex}">
                   <div class="imagesection">
                        <img class="cardimage" id="carimage" 
                            src="https://image.tmdb.org/t/p/original${movieImage}" alt="...">
                    </div>
                    <div class="textsection">
                        <h5 class="cardtitle" id="title${movieIndex}">${movieTitle}</h5>
                        <p class="cardtext">${movieOverview} ${movieID}</p>
                    </div>
                </label>
            </div>`;
            document.querySelector("#cardrow" + movieIndex % 3).insertAdjacentHTML("beforeend", movieCardHTML);
        })
        movieCard = document.querySelectorAll(".cardbtn");
        resolve(movieCard);
    })
}

//카드 클릭시 실행할 함수
let cardAlert = (a) => {
    let number = a.target.id.slice(6);
    let idOfMovie = movie[number]['id'];
    alert("id : " + idOfMovie);
}

//카드 클릭 함수
let clickCard = (movieCards) => {
    movieCards.forEach((a) => {
        a.addEventListener("click", (a) => { cardAlert(a) });
    })
}

//검색버튼 클릭시 실행할 함수
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
        let movieID = a['id'];
        let movieCardHTML = `
            <div class="cardsection" id=cardsection${movieIndex}>
                <input type="button" class="cardbtn" id="button${movieIndex}">
                <label for="button${movieIndex}" class="card" id="card${movieIndex}">
                    <div class="imagesection">
                        <img class="cardimage" id="carimage" 
                            src="https://image.tmdb.org/t/p/original${movieImage}" alt="...">
                    </div>
                    <div class="textsection">
                        <h5 class="cardtitle" id="title${movieIndex}">${movieTitle}</h5>
                        <p class="cardtext">${movieOverview} ${movieID}</p>
                    </div>
                </label>
            </div>`;
        document.querySelector("#cardrow" + movieIndex % 3).innerHTML += movieCardHTML;
    })
    movieCard = document.querySelectorAll(".cardbtn");
}


//검색버튼 클릭 함수
let printsearched = function (data) {
    return new Promise((resolve) => {
        const btn = document.querySelector("#searchbtn");
        btn.addEventListener("click", () => {
            clickBtn();
            console.log(movieCard);
            resolve(movieCard);
        });
        document.querySelector('#input').addEventListener("keydown", (e) => {
            if (e.code == 'Enter') {
                btn.click();
            }
        })
    })
}



fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => printtitle(data))
    .then((a) => clickCard(a))
    .then((data) => printsearched(data))
    .then((a) => clickCard(a));
//.then(data => printsearched(data));
//.catch(err => console.error(err));

