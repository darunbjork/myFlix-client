import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss';

export const MovieCard = ({ movie, onMovieClick, isFavorite, addFav, removeFav, showOpenButton = true }) => {
  const [enlargedImage, setEnlargedImage] = useState(false);

  const toggleEnlarged = () => {
    setEnlargedImage(!enlargedImage);
  };


  return (
    <Card>
      <div
        className={`image-container ${enlargedImage ? "enlarged" : ""}`}
        onClick={toggleEnlarged}
      >
        <Card.Img variant="top" src={movie.ImageURL} />
      </div>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        {showOpenButton && ( // Check showOpenButton prop before rendering the button
         <Button variant="primary" onClick={() => onMovieClick(movie)}>
         Open
          </Button>
           )}
          </Link>
          {isFavorite ? (
            <Button className="my-2 me-2" variant="danger" onClick={() => removeFav(movie._id)}>Remove Fav</Button>
          ) : (
            <Button className="my-2 me-2" variant="success" onClick={() => addFav(movie._id)}>Add Fav</Button>
          )}
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
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.number.isRequired,
    }).isRequired,
    ImageURL: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func,
  isFavorite: PropTypes.bool, // Marked as optional
  showOpenButton: PropTypes.bool, 
};

export default MovieCard;