import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
const [movies, setMovies] = useState([
    {
        id: 1,
        Title: 'Pulp Fiction',
        Description: "A nonlinear narrative weaves together the lives of various characters, including hitmen, a boxer, and a gangster's wife, in this iconic Quentin Tarantino film.",
        Genre: {
          Name: 'Drama, Crime',
          Description: 'A Quentin Tarantino crime drama with a unique narrative style.'
        },
        Director: {
          Name: 'Quentin Tarantino',
          Bio: 'Quentin Jerome Tarantino is an American filmmaker known for his distinctive style.',
          Birth: 1963
        },
        ImageURL: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
        Featured: false
      },
      {
        id: 2,
        Title: 'Saving Private Ryan',
        Description: 'During World War II, a group of soldiers is sent to retrieve a paratrooper whose brothers have been killed in action, leading to intense combat sequences and a profound exploration of sacrifice.',
        Genre: {
          Name: 'Drama, War',
          Description: 'A Steven Spielberg war film depicting the harrowing realities of WWII.'
        },
        Director: {
          Name: 'Steven Spielberg',
          Bio: 'Steven Spielberg is a renowned filmmaker known for his diverse body of work.',
          Birth: 1946
        },
        ImageURL: 'https://upload.wikimedia.org/wikipedia/en/a/ac/Saving_Private_Ryan_poster.jpg',
        Featured: false
      },
      {
        id: 3,
        Title: 'Kill Bill: Vol. 1',
        Description: "A former assassin, known as 'The Bride,' embarks on a vengeful journey to eliminate her former associates after they betrayed her on her wedding day.",
        Genre: {
          Name: 'Action, Thriller',
          Description: "Quentin Tarantino's thrilling action-packed revenge saga."
        },
        Director: {
          Name: 'Quentin Tarantino',
          Bio: 'Quentin Jerome Tarantino is an American filmmaker celebrated for his storytelling style.',
          Birth: 1963
        },
        ImageURL: 'https://upload.wikimedia.org/wikipedia/en/2/2c/Kill_Bill_Volume_1.png',
        Featured: false
      },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);
  
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
            key={movie.id}
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