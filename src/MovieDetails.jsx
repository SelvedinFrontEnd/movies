import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ratingPng from './rating.png'
import popularityPng from './trending.png'

const apiKey = 'f749b76067c5956562b6d19445c2349c'; // Replace this with your TMDb API key

function MovieDetails({ favorites, setFavorites }) {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    setIsFavorite(favorites.some(favorite => favorite.id === movieDetails?.id));
  }, [favorites, movieDetails]);

  const addToFavorites = () => {
    if (!isFavorite) {
      const newFavorite = {
        id: movieDetails.id,
        title: movieDetails.title,
        poster_path: movieDetails.poster_path
      };
      setFavorites(prevFavorites => [...prevFavorites, newFavorite]);
    } else {
      setFavorites(prevFavorites => prevFavorites.filter(favorite => favorite.id !== movieDetails.id));
    }
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <hr />
      <div className='movie-details'>
        <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
        <div className='right-details'>
          <div className='details-header'>
            <h2 className='title'>{movieDetails.title}</h2>
            <div className='rating'>
              <div className='gray'>              
                RATING:
              </div>
              <div className='rating-flex'>
                <img className='rating-icon' src={ratingPng} alt="rating-icon" />
                <div className='rating-num'>{movieDetails.vote_average.toFixed(1)}/10</div>
              </div>
            </div>

            <div className='popularity'>
              <div className='gray'>
                POPULARITY:
              </div>
              <div className='rating-flex'>
                <img className='rating-icon' src={popularityPng} alt="popularity-icon" />
                <div className='rating-num'>{movieDetails.popularity.toFixed(0)}</div>
              </div>
            </div>
          </div>

          <p className='description'>{movieDetails.overview}</p>

          <div className='bottom-details'>
            <p className='release gray'>Release date: {movieDetails.release_date}</p>
            <div className='add-to-fav' onClick={addToFavorites}>
              {isFavorite ? "REMOVE FROM FAVORITES" : "ADD TO FAVORITES"}
            </div> 
          </div>
          
        </div>
      </div>
      <hr />
    </>
  );
}

export default MovieDetails;
