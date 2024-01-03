import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./LoginView.css";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = encodeURIComponent(username);
    const userPassword = encodeURIComponent(password);

    fetch(`https://flixster-movies-7537569b59ac.herokuapp.com/login?Username=${name}&Password=${userPassword}`, {
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
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };
  return (
    <div className="login-container">
      <div className="login-form-container">
        <Form onSubmit={handleSubmit} className="sparkle-form">
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
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