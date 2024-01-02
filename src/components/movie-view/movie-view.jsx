// MovieView.jsx

import React from 'react';
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
            <Button className="custom-button">Add Favorite Movie</Button>
            <Button className="custom-button" variant="danger">Delete Favorite Movie</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
