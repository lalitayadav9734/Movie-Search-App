import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
    const {id} = useParams();
    const[movie,setMovie] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

async function fetchDetails(){
    try{
        const api= await fetch( `https://api.themoviedb.org/3/movie/${id}?api_key=0203dbda4c8c1ef81dc831fe30a4775d`);
        if(!api.ok){
            throw new Error('Failed to fetch movie details')
        }
        const data = api.json();
        setMovie(data);
    }catch(err){
        setError(err.message);
    }finally{
        setLoading(false)
    }
}

useEffect(()=> {
    fetchDetails();

},[id]);

if(loading) return <p>Loading movie details..</p>;
if(error) return <p>Error: {error}</p>;
if (!movie) return <p>No movie found.</p>;

return (
    <div style={{ padding: '20px' }}>
      <h1>{movie.title}</h1>
      {movie.poster_path ? (
        <img
          src={`${imageBaseURL}${movie.poster_path}`}
          alt={movie.title}
          style={{ width: '300px', borderRadius: '8px' }}
        />
      ) : (
        <div>No Image Available</div>
      )}
      <p>{movie.overview || 'No overview available.'}</p>
      <p>Release Date: {movie.release_date || 'N/A'}</p>
      <p>Rating: {movie.vote_average || 'N/A'}</p>

    
      <p>
        Genres:{' '}
        {movie.genres && movie.genres.length > 0
          ? movie.genres.map((genre) => genre.name).join(', ')
          : 'No genres available'}
      </p>
      <p>Runtime: {movie.runtime || 'N/A'} minutes</p>
    </div>
  );
};

export default MovieDetails;
