import { Link } from "react-router-dom"

export default function SearchMovies({ searchMovies, searchValue }){
    return(
        <>
            <div className="search">
                {searchValue && (
                    <div>
                    <h2>Search Results</h2>
                    <ul className='popular-movies'>
                        {searchMovies.map(movie => (
                        <li className='movie-item' key={movie.id}>
                            <Link to={`/movie/${movie.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                <p>{movie.title}</p>
                            </Link>
                        </li>
                        ))}
                    </ul>
                    </div>
                )}  
            </div>
        </>
    )
}