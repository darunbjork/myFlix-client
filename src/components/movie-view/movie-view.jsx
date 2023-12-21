import { useParams, useNavigate } from 'react-router-dom';
import './movie-view.scss';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const navigate = useNavigate(); // Add this line to access the navigation functionality

  if (!movies || movies.length === 0) {
    return <div>No movies available!</div>; 
  }

  const movie = movies.find((m) => m._id === movieId);

  if (!movie) {
    return <div>Movie not found!</div>; 
  }

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous route
  };

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
      <button onClick={handleBackClick} className="back-button" style={{ cursor: 'pointer' }}>
        Back
      </button>
    </div>
  );
};
