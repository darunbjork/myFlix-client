import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

const data = {
      Username: username,
      Password: password
    };
  
    fetch("https://flixster-movies-7537569b59ac.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      //console.log("response json", response.json());
      return response.json();
    })
    .then(async (data) => {
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        console.log("data.user:", data.user);
        alert("no such user");
      }
<<<<<<< Updated upstream
      
    })
    .catch((e) => {
      alert("Something went wrong");
    });
  };

  
  

=======
    })
    .catch((err) => console.log("error", err));
};
 
>>>>>>> Stashed changes
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={5} // Adding minLength attribute with a value of 5
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8} // Adding minLength attribute with a value of 8 for password
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
