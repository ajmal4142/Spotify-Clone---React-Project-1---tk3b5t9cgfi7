import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import "./likedPage.css";
import { useNavigate } from "react-router-dom";
import favoriteimg from "./favoriteimg.jpg";

function LikedPage() {
  const [{ favorites }, dispatch] = useStateProvider();
  console.log("fav", favorites);
  const navigate = useNavigate();
  const handleSongClick = () => {
    navigate("/song");
  };
  return (
    <div className="LikedPage">
      <div className="likedBody">
        <div
          style={{
            display: "flex",
            height: "300px",
            marginBottom: "23px",
            background: "#6459ac",
          }}>
          <div className="mainSection">
            <Typography variant="h4" sx={{ mt: "85px" }}>
              Favourite Songs
            </Typography>
            <img
              src={favoriteimg}
              style={{
                width: "120px",
                height: "120px",
                display: "flex",
                alignSelf: "baseline",
                marginLeft: "16px",
              }}
            />
          </div>
          <div
            style={{
              border: "1px solid",
              height: "1px",
            }}></div>
        </div>
        <Box display="flex" flexWrap="wrap" gap="20px" ml="25px" mr="25px">
          {favorites?.map((music) => (
            <Box key={music.id}>
              <Card
                sx={{ maxWidth: 160 }}
                // onClick={() => {
                //   handleCardClick();
                // }}
                onClick={handleSongClick}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="129"
                    width="100"
                    image={music.thumbnail}
                    alt="Song Image"
                  />
                  <button className="play_btn">
                    <FaPlay className="buttonIcon" />
                  </button>
                  <CardContent sx={{ background: "#000000", color: "#ffffff" }}>
                    <h3 className="title">{music.title}</h3>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>

        <Footer />
      </div>
    </div>
  );
}

export default LikedPage;
