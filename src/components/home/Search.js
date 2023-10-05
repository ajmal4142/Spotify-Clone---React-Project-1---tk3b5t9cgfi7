import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import "./search.css";
import { FaGreaterThan, FaLessThan, FaPlay } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";

function Search() {
  const [{ searchSong }, dispatch] = useStateProvider();

  // const navigate = useNavigate();
  // const projectId = "f104bi07c490";

  // useEffect(() => {
  //   const fetchArtistData = async (artistId) => {
  //     try {
  //       const response = await axios.get(
  //         `https://academics.newtonschool.co/api/v1/music/artist/${artistId}`,
  //         {
  //           headers: {
  //             projectId: projectId,
  //           },
  //         },
  //       );
  //       console.log("responce", response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching artist data:", error);
  //       return null;
  //     }
  //   };

  //   const updateMusicList = async () => {
  //     const artistDataPromises = searchSong?.artist?.map((artistId) =>
  //       fetchArtistData(artistId._id),
  //     );
  //     const artistData = await Promise.all(artistDataPromises);
  //     setMusicList(artistData.filter((data) => data !== null));
  //     console.log("musicList", musicList);
  //     console.log("seachSong", searchSong);
  //   };

  //   updateMusicList();
  // }, [searchSong?.artist, projectId]);

  const handleCardClick = () => {
    dispatch({ type: "SET_SELECTED_SONG", payload: searchSong });
  };
  return (
    <div style={{ marginTop: "50px" }}>
      {searchSong ? (
        <div className="card " style={{ margin: "auto" }}>
          <Card
            sx={{ maxWidth: 160, ml: "40px" }}
            onClick={() => {
              handleCardClick();
            }}>
            <CardActionArea sx={{ width: "90%" }}>
              <CardMedia
                component="img"
                height="129"
                width="100"
                image={searchSong?.thumbnail}
                alt="green iguana"
              />
              <button className="play_btn">
                <FaPlay className="buttonIcon" />
              </button>
              <CardContent sx={{ background: "#000000", color: "#ffffff" }}>
                <h3 className="title">{searchSong?.title}</h3>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}

export default Search;
