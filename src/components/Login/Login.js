import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import logo from "../../layouts/logo.png";

const Login = () => {
  const [, dispatch] = useStateProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const projectId = "f104bi07c490";

  let headersList = {
    projectId: projectId,
    "Content-Type": "application/json",
  };

  let reqOptions = {
    url: "https://academics.newtonschool.co/api/v1/user/login",
    method: "POST",
    headers: headersList,
  };

  const login = async () => {
    try {
      let response = await axios.request(reqOptions);
      console.log(response);
      if (response.status === 200) {
        console.log(response);
        dispatch({ type: "SET_NAME", payload: response.data.name });
        dispatch({ type: "SET_TOKEN", payload: response.data.token });
        localStorage.setItem("jwtToken", response.data.token);
        localStorage.setItem("userName", response.data.name);
        await navigate("/");
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      console.error(error, errMsg);
      if(errMsg==="Incorrect EmailId or Password"){
        alert("Incorrect EmailId or Password")
      }
    }
  };

  const handleLogin = () => {
    const bodyContent = JSON.stringify({
      email: email,
      password: password,
      appType: "music",
    });

    reqOptions.data = bodyContent;

    login();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ background: "#191919" }}>
      <Box>
        <Box
          sx={{
            background: "#000000",
            py: "2.5rem",
            textAlign: "center",
            width: "50%",
            mx: "auto",
            "@media(max-width:900px)": {
              width: "80%",
            },
            "@media(max-width:500px)": {
              width: "95%",
            },
          }}
          className="login-container">
          <img
            src={logo}
            style={{ width: "50%", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h5"
            sx={{
              fontSize: "2.5rem",
              my: "3rem",
              fontWeight: 600,
              "@media(max-width:900px)": {
                fontSize: "1.5rem",
              },
              "@media(max-width:500px)": {
                fontSize: "1rem",
              },
            }}>
            Log in to Spotify
          </Typography>
          <div className="login-border"></div>
          <form className="form" onSubmit={handleSubmit}>
            <Box sx={{ textAlign: "left", py: "1rem" }}>
              <label htmlFor="email" className="form-label">
                Email or username
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email or username"
                className="email-field"
                value={email}
                onChange={handleEmailChange}
              />
            </Box>
            <Box sx={{ textAlign: "left", py: "1rem" }}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="email-field"
                value={password}
                onChange={handlePasswordChange}
              />
            </Box>
            <Box className="w-full text-left py-4">
              <input
                onClick={handleLogin}
                type="submit"
                value="Log in"
                className="submit-button"
              />
            </Box>
            <Box sx={{ textAlign: "left", py: "1rem" }}>
              <Link to="/forgot" className="forgot-password-link">
                Forgot Password?
              </Link>
            </Box>
          </form>
          <div className="login-border"></div>
          <p className="sign-up-text">
            <span className="sign-up-info">Don't have an account? </span>
            <Link to="/signup" className="sign-up-link">
              Sign up for Spotify
            </Link>
          </p>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
