import React, { useEffect, useState } from "react";
import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import "./home.css";
import Cards from "../Card/Cards";
import AlbumSongs from "../Card/AlbumSongs";
import { useStateProvider } from "../utils/StateProvider";
import Footer from "./Footer";
import favoriteimg from "./favoriteimg.jpg";

function Home() {
  const navigate = useNavigate();
  const [musicList, setMusicList] = useState([]);
  const [{ selectedCard, favorites, list }, dispatch] = useStateProvider();
  // const [screenWid, SetScreenWid] = useState(0);
  const projectId = "f104bi07c490";

  useEffect(() => {
    axios
      .get(`https://academics.newtonschool.co/api/v1/music/album`, {
        headers: {
          projectId: projectId,
        },
      })
      .then((response) => {
        dispatch({ type: "SET_List", payload: response.data.data });
        setMusicList(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching music data:", error);
      });
  }, []);

  useEffect(() => {
    console.log("Updated musicList:", musicList);
  }, [musicList]);
  useEffect(() => {
    if (selectedCard) {
      console.log("Selected Card:", selectedCard);
    }
  }, [selectedCard]);

  // useEffect(() => {
  //   calculateColumns();
  //   console.log(screenWid);
  // }, [screenWidth]);
  const displayedMusic = musicList.slice(1, 6);
  const displayedMusic_two = musicList.slice(6, 11);
  const displayedMusic_three = musicList.slice(12, 17);
  const width = window.screen.width;
  useEffect(() => {
    console.log(width);
  }, [width]);

  return (
    <div className="homePage">
      <div className="homeBody">
        {favorites.length !== 0 && localStorage.getItem("jwtToken") ? (
          <Card sx={{ maxWidth: 200 }} onClick={() => navigate("/liked-song")}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={favoriteimg}
                alt="green iguana"
              />
              <CardContent sx={{ background: "#000000", color: "#ffffff" }}>
                <Typography gutterBottom variant="h5" component="div">
                  Liked Songs
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ) : null}
        <div className="sections">
          <span className="sectionHeading">Albums</span>
          <Link to="/showall" style={{ color: "white", paddingRight: "15px" }}>
            Show All
          </Link>
        </div>
        <div className="sectionGrid">
          {displayedMusic.map((music) => (
            <Cards key={music._id} music={music} />
          ))}
        </div>
        <div className="sections">
          <span className="sectionHeading">Songs</span>
          <Link to="/showall" style={{ color: "white", paddingRight: "15px" }}>
            Show All
          </Link>
        </div>
        <div className="sectionGrid">
          {displayedMusic_two.map((music) => (
            <Cards key={music._id} music={music} />
          ))}
        </div>
        <div className="sections">
          <span className="sectionHeading">Spotify List</span>
          <Link to="/showall" style={{ color: "white", paddingRight: "15px" }}>
            Show All
          </Link>
        </div>
        <div className="sectionGrid" style={{ marginBottom: "75px" }}>
          {displayedMusic_three.map((music) => (
            <Cards key={music._id} music={music} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;

// "64ce7c0bbbbada037c35edaa"
