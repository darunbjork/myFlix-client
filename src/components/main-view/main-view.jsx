import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
const [movies, setMovies] = useState([]);

const [selectedMovie, setSelectedMovie] = useState(null);

useEffect(() => {
  fetch("https://flixster-movies-7537569b59ac.herokuapp.com/movies")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
   
        const moviesFromApi = data.map((doc) => ({
          _id: doc._id,
          Title: doc.Title,
          Description: doc.Description,
          Genre: {
            Name: doc.Genre?.Name || "",
            Description: doc.Genre?.Description || ""
          },
          Director: {
            Name: doc.Director?.Name || "",
            Bio: doc.Director?.Bio || "",
            Birth: doc.Director?.Birth || 0
          },
          ImageURL: doc.ImageURL,
          Featured: doc.Featured || false
        }));
        setMovies(moviesFromApi);
    
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      // Handle errors or set a specific state to display an error message
    });
}, []);

    if (selectedMovie) {
      return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      );
    }
  
    if (movies.length === 0) {
      return <div>The list is empty!</div>;
    }
  
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
        {/* Adding a styled message when no movie is selected */}
        {selectedMovie === null && (
          <div style={{ backgroundColor: 'lightgrey', padding: '10px', margin: '5px' }}>
            Please select a movie to view details.
          </div>
        )}
      </div>
    );
  };