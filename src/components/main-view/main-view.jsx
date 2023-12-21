import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Row, Col, Container } from 'react-bootstrap';
import { NavigationBar } from '../navigation-bar/navigation-bar';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (token) {
      fetch(`https://flixster-movies-7537569b59ac.herokuapp.com/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
              Name: doc.Genre?.Name || '',
              Description: doc.Genre?.Description || '',
            },
            Director: {
              Name: doc.Director?.Name || '',
              Bio: doc.Director?.Bio || '',
              Birth: doc.Director?.Birth || 0,
            },
            ImageURL: doc.ImageURL,
            Featured: doc.Featured || false,
          }));

          setMovies(moviesFromApi);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [token]);

  return (
    <Router>
      <NavigationBar user={user} onLoggedOut={() => setUser(null)} />
      <Container className="main-container">
        <Routes>
          <Route
            path="/movies/:movieId"
            element={<MovieView movies={movies} onBackClick={() => setSelectedMovie(null)} />}
          />
          <Route
            path="/login"
            element={<LoginView onLoggedIn={(userData, userToken) => {
              setUser(userData);
              setToken(userToken);
            }} />}
          />
          <Route
            path="/signup"
            element={<SignupView />}
          />
          <Route
            path="/"
            element={
              <>
                {user ? (
                  <>
                    {selectedMovie === null && (
                      <div className="message">Please select a movie to view details.</div>
                    )}
                    <Row className="justify-content-md-center">
                      {movies.map((movie) => (
                        <Col key={movie._id} md={4} lg={3} className="movie-card-col">
                          <MovieCard
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
                          />
                        </Col>
                      ))}
                    </Row>
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )}
              </>
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};
