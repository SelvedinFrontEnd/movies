import React, { useState, useEffect } from 'react';
import Header from './Header';

const apiKey = 'f749b76067c5956562b6d19445c2349c'; // Replace this with your TMDb API key

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    if (searchValue) {
      searchMoviesByQuery();
    } else {
      setSearchMovies([]);
    }
  }, [searchValue]);

  const fetchPopularMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
      const data = await response.json();
      setPopularMovies(data.results);
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    }
  };

  const searchMoviesByQuery = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchValue}&page=1&include_adult=false`);
      const data = await response.json();
      setSearchMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies by search query:', error);
    }
  };

  return (
    <>
      <Header 
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      />
      {searchValue && (
        <div>
          <h2>Search Results</h2>
          <ul className='popular-movies'>
            {searchMovies.map(movie => (
              <li className='movie-item' key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <p>{movie.title}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2>Popular Movies</h2>
        <ul className='popular-movies'>
          {popularMovies.map(movie => (
            <li className='movie-item' key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='container'></div>
    </>
  );
}

export default App;
