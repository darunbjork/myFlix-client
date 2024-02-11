// navigation-bar.jsx
import React, { useRef, useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './navigation.scss';

export const NavigationBar = ({ user, onLoggedOut, onGenreSearch, searchTerm, setSearchTerm }) => {
  const textRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (typeof onLoggedOut === 'function') {
      onLoggedOut();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (typeof onGenreSearch === 'function') {
      onGenreSearch(searchTerm);
      setSearchTerm(''); // Clear search term for the next search
      navigate('/'); // Use navigate to Movies route after search
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="enlarge-on-hover">
      <Navbar.Brand as={Link} to="/">
        Movies
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {user && (
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
          )}
        </Nav>
        {user && (
          <Navbar.Text
            ref={textRef}
            className="navbar-text d-none d-lg-block flex-fill text-center"
            style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
            }}
          >
            Discover Your Favorite Movies
          </Navbar.Text>
        )}

        <Nav>
          {user ? (
            <>
              <Form onSubmit={handleSearch} className="d-flex me-2">
                <FormControl
                  type="text"
                  placeholder="Search by Genre"
                  className="me-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-info" type="submit">
                  Search
                </Button>
              </Form>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
