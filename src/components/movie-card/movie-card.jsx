import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick, isFavorite, toggleFavorite }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.ImageURL} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="primary" onClick={() => onMovieClick(movie)}>Open</Button>
          </Link>
          <Button variant={isFavorite ? 'danger' : 'primary'} onClick={toggleFavorite}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.number.isRequired
    }).isRequired,
    ImageURL: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};
