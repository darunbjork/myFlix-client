import React, { useEffect, useRef, useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navigation.scss';

export const NavigationBar = ({ user, onLoggedOut, onGenreSearch }) => {
  const textRef = useRef(null);
  const colors = ['#ff6347', '#ffd700', '#7fff00', '#40e0d0', '#9370db']; 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const textElement = textRef.current;

    const changeColor = () => {
      textElement.style.color = colors[currentIndex];
      currentIndex = (currentIndex + 1) % colors.length;
    };

    const interval = setInterval(changeColor, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    if (typeof onLoggedOut === 'function') {
      onLoggedOut();
    }
  };

  // Inside NavigationBar component
const handleSearch = (e) => {
  e.preventDefault();
  if (typeof onGenreSearch === 'function') {
    onGenreSearch(searchTerm);
    setSearchTerm(''); // Clear search term after search
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
        <Navbar.Text ref={textRef} className="navbar-text d-none d-lg-block flex-fill text-center">
          Explore Your Favorite Films
        </Navbar.Text>
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
