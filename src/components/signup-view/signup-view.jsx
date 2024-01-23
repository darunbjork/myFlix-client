import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './SignUpView.scss'; // Import your SCSS file for styling

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to perform navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    try {
      const response = await fetch(
        "https://flixster-movies-7537569b59ac.herokuapp.com/users",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setError("Signup failed. Please check your inputs.");
        return;
      }

      alert("Signup successful");
      navigate('/login'); // Redirect to the login page after successful signup

    } catch (error) {
      console.error("Error: ", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="background-magic">
        {/* Decorative elements */}
        <div className="stars"></div>
        <div className="shining-spots"></div>
        <h1 className="welcome-text">Welcome to the MyFlix Web Application</h1>
        <p className="create-account-text">Create an account</p>
      </div>
      <Form onSubmit={handleSubmit} className="mt-5">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formUsername">
  <Form.Label>Username:</Form.Label>
  <Form.Control
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    minLength="5"
    required
    autoComplete="username"
  />
</Form.Group>
<Form.Group controlId="formPassword">
  <Form.Label>Password:</Form.Label>
  <Form.Control
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    autoComplete="current-password"
  />
</Form.Group>
<Form.Group controlId="formEmail">
  <Form.Label>Email:</Form.Label>
  <Form.Control
    type="email"
    placeholder="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
</Form.Group>
<Form.Group controlId="formBirthday">
  <Form.Label>Birthday:</Form.Label>
  <Form.Control
    type="date"
    value={birthday}
    onChange={(e) => setBirthday(e.target.value)}
  />
</Form.Group>

        <Button type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
    </div>
  );
};
