import React from "react";
import "./signUp.css";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup");
  };
  return (
    <Box className="signup">
      <Box>
        <p className="head">PREVIEW OF SPOTIFY</p>
        <p className="signPara">
          Sign up to get unlimited Songs and podcasts with occassional ads. No
          credit card needed
        </p>
      </Box>
      <button className="signButton" onClick={handleClick}>
        Sign Up free
      </button>
    </Box>
  );
}

export default SignUp;
