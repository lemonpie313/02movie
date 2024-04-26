const options = {
    method: 'GET',
    headers: {
        accept: '',
        Authorization: "'
    }
};

let printtitle = function () {
    return (data) => {
        let movie = data['results'];
        let movietitle;
        let movieoverview;
        let movieimage;
        let movieindex;
        movie.forEach((a) => {
            movieindex = movie.indexOf(a)
            movietitle = a['title'];
            movieoverview = a['overview'];
            movieimage = a['poster_path'];
            let moviecardhtml = `
            <div class="card">
               <div class="imagesection">
                    <img class="cardimage"
                        src="https://image.tmdb.org/t/p/original${movieimage}" alt="...">
                </div>
                <div class="textsection">
                    <h5 class="cardtitle">${movietitle}</h5>
                    <p class="cardtext">${movieoverview}'</p>
                </div>
            </div>`
            document.querySelector("#cardrow"+movieindex%3).innerHTML += moviecardhtml;
            console.log(movietitle);
        })
    }
}

let clickbtn = function () {
    console.log("클릭");
}

fetch('', options)
    .then(response => response.json())
    .then(printtitle())
    .catch(err => console.error(err));



/* data['results'] 내부 키들...
id : 278
original_title : "The Shawshank Redemption"
overview : 요약
poster_path : "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"
title : "The Shawshank Redemption"
*/
