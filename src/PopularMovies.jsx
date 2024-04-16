import { Link } from 'react-router-dom';

export default function PopularMovies({ popularMovies }){
    return(
        <>
            <div className="popular">
                <h2>Popular Movies</h2>
                <ul className='popular-movies'>
                {popularMovies.map(movie => (
                    <li className='movie-item' key={movie.id}>
                        <Link to={`/movie/${movie.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                            <p>{movie.title}</p>
                        </Link>
                    </li>
                ))}
                </ul>
            </div>
        </>
    )
}