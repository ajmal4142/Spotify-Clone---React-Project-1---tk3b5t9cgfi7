import React, { useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useStateProvider } from "../utils/StateProvider";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function NavBar() {
  const navigate = useNavigate();
  const [{ searchClicked, token, name }, dispatch] = useStateProvider();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const projectId = "f104bi07c490";

  const handleSearchInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/music/song?filter=`,
        {
          headers: {
            projectId: projectId,
          },
          params: {
            filter: JSON.stringify({ title: query }),
          },
        },
      );

      console.log(query);
      console.log("Response status:", response.status);
      console.log("Response status text:", response.statusText);

      const data = response.data;
      console.log("data", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleLogOut = () => {
    dispatch({ type: "SET_NAME", payload: null });
    dispatch({ type: "SET_TOKEN", payload: null });
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(isOpen);
  };

  const sideList = () => (
    <List>
      <ListItem
        button
        onClick={() => {
          navigate("/");
        }}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          navigate("/search");
        }}>
        <ListItemText primary="Search" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          navigate("/premium");
        }}>
        <ListItemText primary="Premium" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          navigate("/liked-song");
        }}>
        <ListItemText primary="Favorites" />
      </ListItem>
      {!token ? (
        <>
          <ListItem
            button
            onClick={() => {
              navigate("/signup");
            }}>
            <ListItemText primary="Sign Up" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("/login");
            }}>
            <ListItemText primary="Log In" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button>
            <ListItemText
              onClick={() => {
                navigate("/forgot");
              }}
              primary="Change Password"
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              onClick={() => {
                navigate("/login");
              }}
              primary="Log Out"
            />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <div>
      <div className="navBar">
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <FaLessThan className="backNForward" />
            <FaGreaterThan className="backNForward" />
          </div>
          <AppBar
            position="static"
            sx={{
              background: "black",
              width: "60px",
              display: "none",
              "@media (max-width: 711px)": {
                display: "flex",
              },
            }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            {sideList()}
          </Drawer>
        </div>

        {searchClicked && (
          <div className="searchBarSection">
            <SearchIcon style={{ marginLeft: "10px", marginRight: "10px" }} />
            <input
              type="text"
              id="searchBar"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>
        )}

        {token ? (
          <div>
            <Link
              to="/premium"
              className="premiumLink"
              style={{ paddingRight: "10px" }}>
              Premium
            </Link>
            <Link to="/" className="logInLink" onClick={handleLogOut}>
              Log out
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/premium" className="premiumLink">
              Premium
            </Link>
            <Link to="/signup" className="signUpLink">
              Sign Up
            </Link>
            <Link to="/login" className="logInLink">
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
