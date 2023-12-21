import React, { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col, Form, Button, FormControl, FormGroup, FormLabel, Modal } from 'react-bootstrap';

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const favMov = user.favoriteMovies ? movies.filter((movie) => user.favoriteMovies.includes(movie._id)) : [];

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      name: name,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch(`https://flixster-movies-7537569b59ac.herokuapp.com/users/${user.name}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const updatedUser = await response.json();
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert('Profile updated!');
        } else {
          const errorMessage = await response.text();
          console.log(errorMessage);
          alert('Update failed.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Update failed.');
      });
  };

  const handleDelete = () => {
    fetch(`https://flixster-movies-7537569b59ac.herokuapp.com/users/${user.name}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          localStorage.removeItem('user');
          alert('Your account has been deleted');
        } else {
          alert('Something went wrong.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Something went wrong.');
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mx-3 my-4">
        <h2 className="profile-title">Favorite movies</h2>
        {favMov.map((movie) => (
          <Col key={movie._id} className="m-3">
            <MovieCard movie={movie} token={token} setUser={setUser} user={user} />
          </Col>
        ))}
      </Row>

      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="profile-title">Update info</h2>
          <Form className="my-profile" onSubmit={handleUpdate}>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Birthday</FormLabel>
              <FormControl
                type="text"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </FormGroup>

            <div className="d-flex justify-content-between">
              <Button className="update" type="submit">
                Update
              </Button>
              <Button className="delete" onClick={handleDelete}>
                Delete Account
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
