import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);



  useEffect(() => {
    if (!token) return;

    fetch('https://flixster-movies-7537569b59ac.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          _id: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          Genre: {
            Name: movie.Genre?.Name || '',
            Description: movie.Genre?.Description || '',
          },
          Director: {
            Name: movie.Director?.Name || '',
            Bio: movie.Director?.Bio || '',
            Birth: movie.Director?.Birth || 0,
          },
          ImageURL: movie.ImageURL,
          Featured: movie.Featured || false,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, [token]);

  // Add Favorite Movie
  const addFav = (id) => {
    fetch(`https://flixster-movies-7537569b59ac.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to add');
        }
      })
      .then((userData) => {
        if (userData) {
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
        }
      })
      .catch((error) => {
        console.error('Error adding favorite:', error);
        alert('Failed to add');
      });
  };

  // Remove Favorite Movie
  const removeFav = (id) => {
    fetch(`https://flixster-movies-7537569b59ac.herokuapp.com/users/${user.Username}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to remove');
        }
      })
      .then((userData) => {
        if (userData) {
          localStorage.setItem('user', JSON.stringify(userData));
          const favMovies = userData.FavoriteMovies.filter(f => f !== id);
          setUser(prevState => ({
            ...prevState,
            FavoriteMovies: favMovies
          }));
        }
      })
      .catch((error) => {
        console.error('Error removing favorite:', error);
        alert('Failed to remove');
      });
  };

  // Function to handle genre search
  const handleGenreSearch = (event) => {
    event.preventDefault();
    const genreToSearch = searchTerm.toLowerCase();

    // Filter movies based on the genre
    const filtered = movies.filter((movie) =>
      movie.Genre.Name.toLowerCase().includes(genreToSearch)
    );

    setFilteredMovies(filtered);
  };
  return (
    <Router>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }}
        onGenreSearch={handleGenreSearch} // Pass the onGenreSearch function as a prop
      />
      <Container>
        <Row className="justify-content-center my-5">
          <Routes>
            <Route path="/signup" element={<SignupView />} />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(userData, userToken) => {
                          setUser(userData);
                          setToken(userToken);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>There are no movies</Col>
                  ) : (
                    <Col md={12}>
                      <MovieView
                        movies={movies}
                      // removeFav={removeFav}
                      // addFav={addFav}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col key={movie._id} md={4} lg={3} className="movie-card-col">
                          <MovieCard
                            movie={movie}
                            isFavorite={user.FavoriteMovies.includes(movie._id)}
                            removeFav={removeFav}
                            addFav={addFav}
                            onMovieClick={(newSelectedMovie) => {
                              // Handle the selection of a movie
                              // Example: setSelectedMovie(newSelectedMovie)
                            }}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  {!user ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Col>
                      <ProfileView
                        user={user}
                        movies={movies}
                        removeFav={removeFav}
                        addFav={addFav}
                        setUser={setUser}
                        token={token}
                      />
                    </Col>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </Router>
  );
}