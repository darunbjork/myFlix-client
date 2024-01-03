import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, FormControl, FormGroup, FormLabel, Alert, Spinner } from 'react-bootstrap';

export const ProfileView = ({ user: loggedInUser, token, movies, setUser }) => {
  const [userData, setUserData] = useState({ ...loggedInUser });
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    setUserData({ ...loggedInUser });
  }, [loggedInUser]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://flixster-movies-7537569b59ac.herokuapp.com/users/${loggedInUser.username}`, {
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
        const errorMessage = await response.text();
        setUpdateSuccess(false);
        setUpdateError(errorMessage);
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
        const response = await fetch(`https://flixster-movies-7537569b59ac.herokuapp.com/users/${loggedInUser.username}`, {
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

  return (
    <Container>
      <Row className="justify-content-md-center mx-3 my-4">
        {updateSuccess && <Alert variant="success">Profile updated!</Alert>}
        {updateError && <Alert variant="danger">Update failed: {updateError}</Alert>}
        {deleteSuccess && <Alert variant="success">Your account has been deleted.</Alert>}
        {deleteError && <Alert variant="danger">Account deletion failed: {deleteError}</Alert>}

        <Col md={6}>
          <h2 className="profile-title">Update info</h2>
          <Form className="my-profile" onSubmit={handleUpdate}>
            <FormGroup>
              <FormLabel>Username</FormLabel>
              <FormControl
                type="text"
                value={userData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                value={userData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                value={userData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Birthday</FormLabel>
              <FormControl
                type="text"
                value={userData.birthday}
                onChange={(e) => handleInputChange('birthday', e.target.value)}
              />
            </FormGroup>
            <div className="d-grid gap-2" style={{ marginTop: '10px' }}>
              <Button variant="primary" type="submit" style={{ marginBottom: '10px' }}>
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
            <p><strong>Username:</strong> {loggedInUser.username}</p>
            <p><strong>Email:</strong> {loggedInUser.email}</p>
            <p><strong>Birthday:</strong> {loggedInUser.birthday}</p>

          </div>
        </Col>
      </Row>
    </Container>
  );
};
