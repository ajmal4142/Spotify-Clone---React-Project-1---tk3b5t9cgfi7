import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import logo from "../../layouts/logo.png";

const Forgot = () => {
  const [, dispatch] = useStateProvider();
  const [email, setEmail] = useState("");
  const [userName, SetUserName] = useState("");
  const [CurrPassword, SetCurrPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const navigate = useNavigate();
  const projectId = "f104bi07c490";

  let headersList = {
    projectId: projectId,
    "Content-Type": "application/json",
  };

  let reqOptions = {
    url: "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
    method: "PATCH",
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
        await navigate("/login");
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      alert(error, errMsg);
    }
  };

  const handleLogin = () => {
    const bodyContent = JSON.stringify({
      name: userName,
      email: email,
      passwordCurrent: CurrPassword,
      password: newPassword,
    });

    reqOptions.data = bodyContent;

    login();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleUserNameChange = (event) => {
    SetUserName(event.target.value);
  };

  const handleCurrentPasswordChange = (event) => {
    SetCurrPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setnewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        background: "#000",
        "@media (maxWidth: 781px)": {
          px: 0,
        },
      }}>
      <Box
        sx={{
          background: "#504848",
          py: "2.5rem",
          textAlign: "center",
          width: "50%",
          mx: "auto",
        }}
        className="login-container">
        <img
          src={logo}
          style={{ width: "50%", cursor: "pointer" }}
          onClick={() => navigate("/")}
        />
        <Typography
          variant="h5"
          sx={{ fontSize: "30px", my: "3rem", fontWeight: 600 }}>
          Change Your Password
        </Typography>
        <div className="login-border"></div>
        <form className="form" onSubmit={handleSubmit}>
          <Box sx={{ textAlign: "left", py: "1rem" }}>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              className="email-field"
              value={userName}
              onChange={handleUserNameChange}
            />
          </Box>
          <Box sx={{ textAlign: "left", py: "1rem" }}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="email-field"
              value={email}
              onChange={handleEmailChange}
            />
          </Box>
          <Box sx={{ textAlign: "left", py: "1rem" }}>
            <label htmlFor="newpassword" className="form-label">
              Current Password
            </label>
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              placeholder="Current Password"
              className="email-field"
              value={CurrPassword}
              onChange={handleCurrentPasswordChange}
            />
          </Box>
          <Box sx={{ textAlign: "left", py: "1rem" }}>
            <label htmlFor="newpassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              placeholder="New Password"
              className="email-field"
              value={newPassword}
              onChange={handleNewPasswordChange}
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
        </form>
        <div className="login-border"></div>
        <p className="sign-up-text">
          <span className="sign-up-info">Don't have an account? </span>
          <Link to="/signup" className="sign-up-link">
            Sign up for Spotify
          </Link>
        </p>
      </Box>
    </div>
  );
};

export default Forgot;
