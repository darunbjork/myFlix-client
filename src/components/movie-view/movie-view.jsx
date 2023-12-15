import Col from 'react-bootstrap/Col';
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.ImageURL} alt={movie.Title} />
        </div>
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
       
  <button
  onClick={onBackClick}
  className="back-button"
  style={{ cursor: "pointer" }}> Back </button>
</div>
); };


