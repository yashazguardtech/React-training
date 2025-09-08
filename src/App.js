import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const average = (arr) =>
  arr.length ? arr.reduce((acc, cur) => acc + cur, 0) / arr.length : 0;
export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  return (
    <>
      <Navbar>
      <Logo />
      <SearchInput />
      <Result movies={movies} />
      </Navbar>
      <main className="main">
        <MovieList movies={movies} />
        <WatchedList />
      </main>
    </>
  );
}
function Navbar({children}) {
  return (
    <nav className="nav-bar">
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img" aria-label="popcorn">
        🍿
      </span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchInput() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Result({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}



function MovieList({movies}) {
  const [Open, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((o) => !o)}>
        {Open ? "–" : "+"}
      </button>
      {Open && (
        <ul className="list">
          {movies.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <p>
                <span>🗓</span> {movie.Year}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function WatchedList() {
  const [isOpen, setIsOpen] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);
   return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((o) => !o)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        <>
         <Summary watched={watched}/>
         <SummaryList watched={watched}/>
        </>
      )}
    </div>
  );
}
function Summary({watched}){
  const avgImdbRating = average(watched.map((m) => m.imdbRating));
  const avgUserRating = average(watched.map((m) => m.userRating));
  const avgRuntime = average(watched.map((m) => m.runtime));
return(
  <div className="summary">
            <h2>Movies you watched</h2>
            <p>
              <span>#️⃣</span> {watched.length} movies
            </p>
            <p>
              <span>⭐️</span> {avgImdbRating.toFixed(1)}
            </p>
            <p>
              <span>🌟</span> {avgUserRating.toFixed(1)}
            </p>
            <p>
              <span>⏳</span> {avgRuntime.toFixed(0)} min
            </p>
          </div>
)
}
function SummaryList({watched}){
  return(
    <ul className="list">
            {watched.map((movie) => (
              <li key={movie.imdbID}>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
                <h3>{movie.Title}</h3>
                <p>
                  <span>⭐️</span> {movie.imdbRating}
                </p>
                <p>
                  <span>🌟</span> {movie.userRating}
                </p>
                <p>
                  <span>⏳</span> {movie.runtime} min
                </p>
              </li>
            ))}
          </ul>
  )
}
