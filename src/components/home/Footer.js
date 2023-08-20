import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import "./home.css";
import { useStateProvider } from "../utils/StateProvider";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [{ token }, dispatch] = useStateProvider();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "SET_TOKEN", payload: null });
    dispatch({ type: "SET_NAME", payload: null });

    navigate("/");
  };
  return (
    <footer
      style={{ margin: "auto", paddingBottom: "50px", paddingTop: "30px" }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ marginRight: "40px" }}>
            <Typography
              sx={{ mb: 1.5, fontSize: "19px", fontWeight: 800 }}
              variant="body2"
              align="center">
              Company
            </Typography>
            <Typography
              sx={{ mb: 1.5, display: "flex", flexDirection: "column" }}
              variant="body2"
              align="center">
              <a className="footeras" href="/about">
                About
              </a>
              <br />
              <a className="footeras" href="/jobs">
                Jobs
              </a>
              <br />
              <a className="footeras" href="/for-the-record">
                For the Record
              </a>
            </Typography>
          </div>
          <div style={{ marginRight: "40px" }}>
            <Typography
              sx={{ mb: 1.5, fontSize: "19px", fontWeight: 800 }}
              variant="body2"
              align="center">
              Communities
            </Typography>
            <Typography
              sx={{ mb: 1.5, display: "flex", flexDirection: "column" }}
              variant="body2"
              align="center">
              {token ? (
                <a className="footeras" href="/" onClick={handleLogout}>
                  Log out
                </a>
              ) : null}

              <br />
              <a className="footeras" href="/developers">
                Developers
              </a>
              <br />
              <a className="footeras" href="/advertising">
                Advertising
              </a>
              <br />
              <a className="footeras" href="/investors">
                Investors
              </a>
              <br />
              <a className="footeras" href="/vendors">
                Vendors
              </a>
            </Typography>
          </div>
          <div id="footercontent">
            <Typography
              sx={{ mb: 1.5, fontSize: "19px", fontWeight: 800 }}
              variant="body2"
              align="center">
              Useful Links
            </Typography>
            <Typography
              sx={{ mb: 1.5, display: "flex", flexDirection: "column" }}
              variant="body2"
              align="center">
              <a className="footeras" href="/for-artists">
                For Artists
              </a>
              <br />
              <a className="footeras" href="/free-mobile-app">
                Free Mobile App
              </a>
            </Typography>
          </div>
        </div>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: "20px", pb: "20px" }}>
          © {new Date().getFullYear()} Spotify AB
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
