import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './movie-view.scss'; // Import SCSS file for styling

export const MovieView = ({ movies, isFavorite, toggleFavorite, deleteFavorite }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  if (!movies || movies.length === 0) {
    return <div>No movies available!</div>;
  }

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(movie._id);
  };

  const handleDeleteFavorite = () => {
    deleteFavorite(movie._id);
  };

  const [favoriteMovies, setFavoriteMovies] = useState([]);


  const handleAddFavoriteMovie = () => {
    // Check if the movie is already in favorites to avoid duplicates
    if (!favoriteMovies.some((movieItem) => movieItem._id === movie._id)) {
      // Add the current movie to favorites
      setFavoriteMovies([...favoriteMovies, movie]);
      console.log('Adding movie to favorites...');
    } else {
      console.log('Movie already in favorites!');
    }
  };
  
  const handleDeleteFavoriteMovie = () => {
    // Filter out the current movie from favorites
    const updatedFavorites = favoriteMovies.filter((movieItem) => movieItem._id !== movie._id);
    setFavoriteMovies(updatedFavorites);
    console.log('Deleting movie from favorites...');
  };
  


  return (
    <div className="movie-view-container">
      <div
        className="movie-card"
        onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
      >
        <div className="movie-card-image">
          <img src={movie.ImageURL} alt={movie.Title} />
        </div>
        <div className="movie-details">
          <div>
            <span>Title: </span>
            <span>{movie.Title}</span>
          </div>
          <div>
            <span>Director: </span>
            <span>{movie.Director.Name}</span>
          </div>
          <div>
            <span>Description: </span>
            <span>{movie.Description}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <div>
            <Button className="back-button" onClick={handleBackClick}>
              Back
            </Button>
            {isFavorite !== undefined && (
              <div>
                <Button className="add-favorite-button" onClick={handleToggleFavorite}>
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Button>
                {isFavorite && (
                  <Button className="delete-favorite-button" variant="danger" onClick={handleDeleteFavorite}>
                    Delete
                  </Button>
                )}
              </div>
            )}
            {/* Custom buttons */}
            <Button className="custom-button" onClick={handleAddFavoriteMovie}>
              Add Favorite Movie
            </Button>
            <Button className="custom-button" variant="danger" onClick={handleDeleteFavoriteMovie}>
              Delete Favorite Movie
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
