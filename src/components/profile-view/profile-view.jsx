import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, FormControl, FormGroup, FormLabel, Alert, Spinner } from 'react-bootstrap';
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user: loggedInUser, token, movies, setUser, addFav, removeFav }) => {
  const [userData, setUserData] = useState({
    Username: loggedInUser.Username || '',
    Password: '',
    Email: loggedInUser.Email || '',
    Birthday: loggedInUser.Birthday || '',
  });
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [validated, setValidated] = useState(false);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    try {
      const response = await fetch(`https://flixster-movies-7537569b59ac.herokuapp.com/users/${loggedInUser.Username}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setUpdateSuccess(true);
        setUpdateError(null);
      } else {
        const res = await response.json();
        setUpdateSuccess(false);
        setUpdateError(res?.errors);
      }
    } catch (error) {
      console.error('Error:', error);
      setUpdateSuccess(false);
      setUpdateError('Update failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (confirmDelete) {
      setLoading(true);

      try {
        const response = await fetch(`https://flixster-movies-7537569b59ac.herokuapp.com/users/${loggedInUser.Username}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setUser(null);
          localStorage.removeItem('user');
          setDeleteSuccess(true);
          setDeleteError(null);
        } else {
          const errorMessage = await response.text();
          setDeleteSuccess(false);
          setDeleteError(errorMessage || 'Something went wrong.');
        }
      } catch (error) {
        console.error('Error:', error);
        setDeleteSuccess(false);
        setDeleteError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (key, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // get lists of favorite movies
  const favoriteMovieList = movies.filter(m => loggedInUser.FavoriteMovies.includes(m._id));
  return (
    <Container>
      <Row className="justify-content-md-center mx-3 my-4">
        {updateSuccess && <Alert variant="success">Profile updated!</Alert>}
        {
          // updateError && <Alert variant="danger">Update failed: {updateError}</Alert>
        }
        {deleteSuccess && <Alert variant="success">Your account has been deleted.</Alert>}
        {deleteError && <Alert variant="danger">Account deletion failed: {deleteError}</Alert>}

        <Col md={6}>
          <h2 className="profile-title">Update info</h2>
          <Form className="my-profile" onSubmit={handleUpdate} noValidate validated={validated} >
            <FormGroup>
              <FormLabel>Username</FormLabel>
              <FormControl
                type="text"
                value={userData.Username}
                onChange={(e) => handleInputChange('Username', e.target.value)}
                autoComplete="username"
              />
              <Form.Control.Feedback type="invalid">
                Please provide username.
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                value={userData.Password}
                onChange={(e) => handleInputChange('Password', e.target.value)}
                autoComplete="current-password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide password.
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                value={userData.Email}
                onChange={(e) => handleInputChange('Email', e.target.value)}
                autoComplete="email"
              />
              <Form.Control.Feedback type="invalid">
                Please provide email.
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <FormLabel>Birthday</FormLabel>
              <FormControl
                type="text"
                value={userData.Birthday}
                onChange={(e) => handleInputChange('Birthday', e.target.value)}
                autoComplete="bday"
              />
              <Form.Control.Feedback type="invalid">
                Please provide Birthday.
              </Form.Control.Feedback>
            </FormGroup>
            <div className="d-grid gap-2" style={{ marginTop: '10px' }}>
              <Button variant="primary" type="submit" style={{ marginBottom: '10px' }} onClick={handleUpdate}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Update'}
              </Button>
              <Button variant="danger" onClick={handleDelete} style={{ marginBottom: '10px' }}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Delete Account'}
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={6}>
          <h2 className="profile-title">Your Information</h2>
          <div>
            <p><strong>Username:</strong> {loggedInUser.Username}</p>
            <p><strong>Email:</strong> {loggedInUser.Email}</p>
            <p><strong>Birthday:</strong> {loggedInUser.Birthday}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <h2>Favorite Movies</h2>
        <Row lg={4} md={2} sm={1}>
          {
            favoriteMovieList?.length !== 0 ?
              favoriteMovieList?.map((movie) => (
                <Col key={movie._id}>
                    <MovieCard
            movie={movie}
            removeFav={removeFav}
            addFav={addFav}
            isFavorite={loggedInUser.FavoriteMovies.includes(movie._id)}
            showOpenButton={false} // Pass the prop to hide the "Open" button
          />
                </Col>
              ))
              : <Col>
                <p>There are no favorites Movies</p>
              </Col>
          }
        </Row>
      </Row>
    </Container>
  );
};

export default ProfileView; 