import React, { useEffect, useRef } from 'react';
import { Navbar, Nav, NavbarText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navigation.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
  const textRef = useRef(null);
  const colors = ['#ff6347', '#ffd700', '#7fff00', '#40e0d0', '#9370db']; // Define your colors here

  useEffect(() => {
    let currentIndex = 0;
    const textElement = textRef.current;

    const changeColor = () => {
      textElement.style.color = colors[currentIndex];
      currentIndex = (currentIndex + 1) % colors.length;
    };

    const interval = setInterval(changeColor, 1000); // Change color every second (adjust as needed)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleLogout = () => {
    if (typeof onLoggedOut === 'function') {
      onLoggedOut();
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
        <Nav className="d-lg-none">
          <Nav.Link href="#search">
            <i className="bi bi-search"></i>
          </Nav.Link>
        </Nav>
        <NavbarText ref={textRef} className="navbar-text d-none d-lg-block flex-fill text-center">
        Explore Your Favorite Films
        </NavbarText>
        <Nav>
          {!user ? (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
            </>
          ) : (
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
