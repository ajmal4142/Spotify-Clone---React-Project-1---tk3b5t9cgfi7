import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./components/home/Home";
import SideBar from "./components/sideBar/SideBar";
import { Box } from "@mui/material";
import Search from "./components/home/Search";
import AlbumSongs from "./components/Card/AlbumSongs";
import { useStateProvider } from "./components/utils/StateProvider";
import NavBar from "./components/home/NavBar";
import SongCards from "./components/Card/SongCards";
import SongBar from "./components/Card/SongBar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Footer from "./components/home/Footer";
import ArtistSong from "./components/Card/ArtistSong";
import SignUp from "./components/sideBar/SignUp";
import LikedPage from "./components/home/LikedPage";
import Premium from "./layouts/Premium";
import Forgot from "./components/Login/Forgot";
import ShowAll from "./components/home/ShowAll";

const App = () => {
  const location = useLocation();
  const [{ selectedCard, selectedSong, selectedArtist, token }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");

    if (storedToken) {
      dispatch({ type: "SET_TOKEN", payload: storedToken });
    }
  }, []);

  return (
    <>
      {location.pathname === "/signup" ? (
        <Signup />
      ) : location.pathname === "/login" ? (
        <Login />
      ) : location.pathname === "/premium" ? (
        <Premium />
      ) : location.pathname === "/forgot" ? (
        <Forgot />
      ) : (
        <Main />
      )}
    </>
  );
};

const Main = () => {
  const location = useLocation();
  const [
    { selectedCard, selectedSong, selectedArtist, token, favorites },
    dispatch,
  ] = useStateProvider();

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");

    if (storedToken) {
      dispatch({ type: "SET_NAME", payload: storedToken });
    }
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (
      Array.isArray(storedFavorites) &&
      storedFavorites.length > 0 &&
      storedToken
    ) {
      dispatch({ type: "ADD_FAVORITE", payload: storedFavorites });
    }
  }, []);
  const width = window.screen.width;

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/album"
            element={selectedCard ? <AlbumSongs /> : <Home />}
          />
          <Route
            path="/song"
            element={selectedSong ? <SongCards /> : <Home />}
          />
          <Route
            path="/artist"
            element={selectedArtist ? <ArtistSong /> : <Home />}
          />
          <Route
            path="/liked-song"
            element={favorites ? <LikedPage /> : <Home />}
          />
          <Route path="/showall" element={<ShowAll />} />
        </Routes>
        {token ? <SongBar /> : <SignUp />}
      </div>
    </div>
  );
};

export default App;
