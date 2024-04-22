//사이트 코드 복붙만 함
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOGFhZWZmNTk2ZTdhZTEzODMxZGRlOTRhYWE0YTgxYiIsInN1YiI6IjY2MjYzNTlmNjNkOTM3MDE0YTcxOWRmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lWKw5grKuXOHrKv9iGfhk2x7VNULIlT17SauDeWb6VY'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));