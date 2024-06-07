import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./LoginView.css";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic form validation
    if (!username || !password) {
      setValidationError("Please enter both username and password.");
      return;
    }

    const name = encodeURIComponent(username);
    const userPassword = encodeURIComponent(password);

    fetch(`https://myflix-movie-app-3823c24113de.herokuapp.com/login?Username=${name}&Password=${userPassword}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: {}
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          setValidationError("Invalid username or password. Please check your credentials.");
        }
      })
      .catch((e) => {
        setValidationError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <Form onSubmit={handleSubmit} className="sparkle-form">
          {validationError && <Alert variant="danger">{validationError}</Alert>}
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              autoComplete="username"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginView;
