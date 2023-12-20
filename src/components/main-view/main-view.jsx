import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch(`https://flixster-movies-7537569b59ac.herokuapp.com/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
            Description: doc.Genre?.Description || "",
          },
          Director: {
            Name: doc.Director?.Name || "",
            Bio: doc.Director?.Bio || "",
            Birth: doc.Director?.Birth || 0,
          },
          ImageURL: doc.ImageURL,
          Featured: doc.Featured || false,
        }));

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle errors or set a specific state to display an error message
      });
  }, [token]);

  if (!user) {
    return (
      <Row className="justify-content-md-center">
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      </Row>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <Row className="justify-content-md-center mb-3">
          <Col md={12}>
            <Button onClick={() => setUser(null)}>Logout</Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={() => setSelectedMovie(null)}
            />
          </Col>
        </Row>
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <Row className="justify-content-md-center">
        <Col>
          <div>The list is empty!</div>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row className="justify-content-md-center mb-3">
        <Col md={12}>
          <Button onClick={() => setUser(null)}>Logout</Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={12}>
          {selectedMovie === null && (
            <div className="message">
              Please select a movie to view details.
            </div>
          )}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        {movies.map((movie) => (
          <Col key={movie._id} md={3}>
            <MovieCard
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ))}
      </Row>
      <style>
        {`
          .message {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
            color: white;
            background-color: black;
            padding: 10px;
          }
        `}
      </style>
    </>
  );
};
