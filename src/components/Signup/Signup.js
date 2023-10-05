import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import "./signup.css"; // Make sure to import your custom CSS if needed
import axios from "axios";

import logo from "../../layouts/logo.png";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Signup = () => {
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [gender, setGender] = useState("male");
  const [marketingChecked, setMarketingChecked] = useState(false);
  const [shareDataChecked, setShareDataChecked] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const projectId = "f104bi07c490";

  let headersList = {
    projectId: projectId,
    "Content-Type": "application/json",
  };

  let reqOptions = {
    url: "https://academics.newtonschool.co/api/v1/user/signup",
    method: "POST",
    headers: headersList,
  };

  const login = async () => {
    try {
      let response = await axios.request(reqOptions);
      console.log(response);
      if (response.status === 201) {
        console.log(response);
        setUserData(response);
        console.log(userData);
        alert("SuccessFully SignedUp");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      console.error(error, errMsg);
      if (errMsg === "User already exists") {
        alert("User already exist");
      } else {
        console.log("error");
      }
    }
  };
  const handleSignUp = () => {
    const bodyContent = JSON.stringify({
      name: username,
      email: email,
      password: password,
      appType: "music",
    });

    reqOptions.data = bodyContent; // Update the data in the request options

    login();
  };

  return (
    <div style={{ background: "white", margin: "-10px" }}>
      <Container
        maxWidth="sm"
        className="container"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          color: "black",
        }}>
        <div className="form-container">
          <img
            src={logo}
            style={{ width: "50%", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h4"
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              my: "33px",
              fontWeight: 900,
              fontSize: "25px",
              // "@media (max-width: 500px)": {
              //   fontSize: "25px",
              // },
            }}>
            Sign up for free to start listening.
          </Typography>
          <form className="signup-form" onSubmit={handleFormSubmit}>
            <FormControl fullWidth margin="normal">
              <label for="email">What's your email?</label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <label for="password">Create a password</label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password is hidden"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <label for="username">What should we call you?</label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Enter a profile name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormControl>

            <div className="birthdate-input">
              <FormControl className="input-group" margin="normal">
                <label>Year</label>
                <Input
                  type="text"
                  id="year"
                  name="year"
                  placeholder="YYYY"
                  maxLength="4"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl className="input-group" margin="normal">
                <label>Month</label>
                <Input
                  type="text"
                  id="month"
                  name="month"
                  placeholder="MM"
                  maxLength="2"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl className="input-group" margin="normal">
                <label>Day</label>
                <Input
                  type="text"
                  id="day"
                  name="day"
                  placeholder="DD"
                  maxLength="2"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  required
                />
              </FormControl>
            </div>

            <FormControl fullWidth margin="normal">
              <label for="gender" style={{ marginBottom: "15px" }}>
                What's your gender?
              </label>
              <Select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="non-binary">Non-binary</MenuItem>
                <MenuItem value="other">Other</MenuItem>
                <MenuItem value="prefer-not-say">Prefer not to say</MenuItem>
              </Select>
            </FormControl>

            <Box class="checkbox-container">
              <input
                type="checkbox"
                id="marketing"
                name="marketing"
                checked={marketingChecked}
                onChange={(e) => setMarketingChecked(e.target.checked)}
              />
              <label for="marketing">
                I would prefer not to receive marketing messages from Spotify
              </label>
            </Box>

            <Box className="checkbox-container">
              <input
                type="checkbox"
                id="shareData"
                name="shareData"
                checked={shareDataChecked}
                onChange={(e) => setShareDataChecked(e.target.checked)}
              />
              <label for="shareData">
                Share my registration data with Spotify's content for providers.
              </label>
            </Box>

            <button
              onClick={handleSignUp}
              type="submit"
              className="signup-button">
              Sign Up
            </button>
          </form>

          <Typography
            variant="body2"
            className="policy-link"
            sx={{ fontSize: "10px" }}>
            By clicking on sign-up, you agree to{" "}
            <Link to="/" className="text-black">
              Spotify's Terms and Conditions of Use
            </Link>{" "}
            and{" "}
            <Link to="/" className="text-black">
              Spotify's Privacy Policy
            </Link>
            .
          </Typography>

          <Typography
            variant="body2"
            className="login-link"
            sx={{ textAlign: "center", fontSize: "18px", my: "20px" }}>
            Have an account? <Link to="/login">Log in</Link>.
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
