import React, { useState } from "react";
import axios from "axios";

function Authentication(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);

  const authenticate = async (user, pw) => {
    return axios.post("/api/author/v1/auth", {
      headers: {
        authorization: "Basic " + window.btoa(user + ":" + pw),
      },
    });
  };

  const login = () => {
    setInvalidLogin(false);
    authenticate(username, password)
      .then((response) => {
        axios.interceptors.request.use((config) => {
          config.headers.authorization =
            "Basic " + window.btoa(username + ":" + password); //response.config.headers.authorization;
          return config;
        });
        props.history.push("/app/services");
      })
      .catch((e) => {
        console.log(e);
        setInvalidLogin(true);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      {invalidLogin && <div>Invalid login.</div>}
      <div className="container">
        <input
          type="text"
          // value={username}
          onInput={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          // value={password}
          onInput={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="btn btn-success" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Authentication;
