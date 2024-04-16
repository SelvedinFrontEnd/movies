import React, { useState, useEffect } from 'react';
import Header from './Header';
import PopularMovies from './PopularMovies';
import SearchMovies from './SearchMovies';
import MovieDetails from './MovieDetails';
import { Link, Route, Routes } from 'react-router-dom';

const apiKey = 'f749b76067c5956562b6d19445c2349c'; 

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([])

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

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

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
      console.log(data);
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
      <Routes>
        <Route path="/movie/:id" element={<MovieDetails 
                                          favorites={favorites}  
                                          setFavorites={setFavorites}
                                          />} />
      </Routes>
      <SearchMovies 
        searchMovies={searchMovies}
        searchValue={searchValue}
      />
      <PopularMovies 
        popularMovies={popularMovies} 
      />
        <div className='popular'>
        <h2>Favorites</h2>
        <ul className='popular-movies'>
          {favorites.map(favorite => (
            <li className='movie-item' key={favorite.id}>
              <Link to={`/movie/${favorite.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${favorite.poster_path}`} alt={favorite.title} />
                <p>{favorite.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
