import React, { useEffect, useState } from "react";
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
  const [{ searchClicked, token, name, searchSong }, dispatch] =
    useStateProvider();
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(e);
  };
  useEffect(() => {
    console.log(searchSong);
  }, [searchSong]);

  const handleInput = async (e) => {
    if (e.key === "Enter") {
      try {
        let headersList = {
          projectId: "f104bi07c490",
        };

        let reqOptions = {
          url: `https://academics.newtonschool.co/api/v1/music/song?title=${searchQuery}`,
          method: "GET",
          headers: headersList,
        };

        let response = await axios.request(reqOptions);
        const songData = response.data.data[0];

        console.log(songData);
        dispatch({ type: "SET_SEARCH_SONG", payload: songData }); // Providing the Search data to glodal
      } catch (error) {
        console.log(error);
      }
    }
  };
  // const handleSearchInputChange = async (event) => {
  //   const query = event.target.value;
  //   setSearchQuery(query);
  //   try {

  //   } catch (error) {
  //     console.log(searchQuery);
  //     console.error(error);
  //   }
  // };

  const handleLogOut = () => {
    dispatch({ type: "SET_NAME", payload: null });
    dispatch({ type: "SET_TOKEN", payload: null });
    dispatch({ type: "ADD_FAVORITE", payload: [] });
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    localStorage.removeItem("favorites");

    navigate("/");
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
          setOpen(false);
        }}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          dispatch({ type: "SET_SEARCH_CLICKED", payload: true });
          navigate("/search");
          setOpen(false);
        }}>
        <ListItemText primary="Search" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          navigate("/premium");
          setOpen(false);
        }}>
        <ListItemText primary="Premium" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          navigate("/liked-song");
          setOpen(false);
        }}>
        <ListItemText primary="Favorites" />
      </ListItem>
      {!token ? (
        <>
          <ListItem
            button
            onClick={() => {
              navigate("/signup");
              setOpen(false);
            }}>
            <ListItemText primary="Sign Up" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate("/login");
              setOpen(false);
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
                setOpen(false);
              }}
              primary="Change Password"
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              onClick={() => {
                navigate("/login");
                setOpen(false);
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
        <div id="navBarId">
          {/* <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <FaLessThan className="backNForward" />
            <FaGreaterThan className="backNForward" />
          </div> */}
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
              onChange={handleChange}
              onKeyUp={(e) => handleInput(e)}
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
