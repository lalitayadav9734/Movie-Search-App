import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieSearch = () => {
  const [query, setQuery] = useState(''); 
  const [movies, setMovies] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const imageBaseURL = 'https://image.tmdb.org/t/p/w200'; 

  const fetchMovies = async () => {
    setLoading(true);
    setError(null); 
    try {
      const response = await fetch(
         `https://api.themoviedb.org/3/search/movie?api_key=0203dbda4c8c1ef81dc831fe30a4775d&query=${query}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data.results); 
    } catch (err) {
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };
   function handleReset(){
    setQuery('');
   }

  
  useEffect(() => {
    if (query) {
      fetchMovies(); 
    } else {
      setMovies([]); 
    }
  }, [query]); 
  return (
    <div style={{ padding: '20px',
        backgroundColor:'black',

     }}>
      <h1 style={{color:'white'}}>Movie Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for a movie"
        style={{
            padding:'10px',
            width: '300px',
            marginBottom: '20px',
           
        }}
      />
      <button  style={{
            padding:'10px',
            width: '100px',
            marginBottom: '20px',
           
           
        }}onClick={handleReset}>Remove</button>
      {loading && <p>Loading...</p>} 
      {error && <p style={{ color: 'red' }}>{error}</p>} 

      <div style={{
        display:'flex',
        flexWrap: 'wrap',
        gap:'20px'
      }}>
    {movies.length > 0 ? (movies.map((movie) => (
        <div 
        key={movie.id}
        style={{
            border:'1px solid #ccc',
            borderRadius: '10px',
            padding: '15px',
            width: '200px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}>
            {movie.poster_path ? (
                <img src={`${imageBaseURL}${movie.poster_path}`}
                alt={movie.title}
                style={{width: '100%',
                    borderRadius: '8px'
                }}/>): (
                    <div
                      style={{
                        width: '100%',
                        height: '300px',
                        backgroundColor: '#ccc',
                        borderRadius: '8px',
                        color:'white',
                      }}
                    >
                      No Image Available
                    </div>
                  )}
                   <h2 style={{ fontSize: '18px', margin: '10px 0' ,color:'white'}}>
                {movie.title}
              </h2>
              <p style={{ fontSize: '14px',color:'white' }}>
                {movie.release_date ? `Release Date: ${movie.release_date}` : 'Release Date Unavailable'}
              </p>
              <p style={{ fontSize: '14px',color:'white' }}>
                Rating: {movie.vote_average || 'N/A'}
              </p>
            <Link to={`/movie/${movie.id}`}>
             <button
              style={{
                padding: '10px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>More Info</button>
            </Link>
     </div>
          ))
        ) : (
          !loading && <p style={{color:'white'}} >No movies found.</p> 
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
