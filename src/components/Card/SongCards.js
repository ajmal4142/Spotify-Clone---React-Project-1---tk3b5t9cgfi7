import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { Box, Typography, createTheme } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FaPlay } from "react-icons/fa";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Footer from "../home/Footer";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function SongCards({ album }) {
  const [musicList, setMusicList] = useState([]);
  const navigate = useNavigate();
  const [{ selectedCard, selectedSong, favorites, token }, dispatch] =
    useStateProvider();
  const projectId = "f104bi07c490";

  const handleSongClick = (song, id) => {
    dispatch({ type: "SET_SELECTED_SONG", payload: song });
    dispatch({ type: "SET_SELECTED_ID", payload: id });
    if (token) {
      navigate("/song");
    } else {
      navigate("/login");
    }
  };

  const handleArtistClick = (artistId) => {
    dispatch({
      type: "SET_SELECTED_ARTIST",
      payload: artistId,
    });
    navigate("/artist");
  };

  const isFavorite = (song) => {
    console.log(song.album);
    const songId = song.album;
    return favorites.includes(songId);
  };

  const handleCheckLike = (song) => {};

  useEffect(() => {
    var favoritesData = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedSelectedSong = {
      ...selectedSong,
      color: favoritesData.some((item) => item._id === selectedSong._id),
    };

    dispatch({ type: "SET_SELECTED_SONG", payload: updatedSelectedSong });
  }, []);

  const handleFavoriteClick = (song) => {
    if (!token) {
      alert("Please Login");
    } else {
      var favoritesData = JSON.parse(localStorage.getItem("favorites")) || [];
      const updatedSelectedSong = {
        ...selectedSong,
        color: favoritesData.some((item) => item._id === selectedSong._id)
          ? false
          : true,
      };

      dispatch({ type: "SET_SELECTED_SONG", payload: updatedSelectedSong });
      dispatch({ type: "TOGGLE_FAVORITE", payload: selectedSong });

      const isSongInFavorites = favoritesData.some(
        (item) => item._id === song._id,
      );

      if (!isSongInFavorites) {
        favoritesData.push(song);
      } else {
        const updatedFavorites = favoritesData.filter(
          (item) => item._id !== song._id,
        );
        favoritesData = updatedFavorites;
      }

      localStorage.setItem("favorites", JSON.stringify(favoritesData));
    }
  };

  useEffect(() => {
    var favoritesData = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedSelectedSong = {
      ...selectedSong,
      color: favoritesData.some((item) => item._id === selectedSong._id),
    };

    if (updatedSelectedSong.color !== selectedSong.color) {
      dispatch({ type: "SET_SELECTED_SONG", payload: updatedSelectedSong });
    }
    console.log("After dispatch - selectedSong:", selectedSong);
  }, [selectedSong]);
  useEffect(() => {
    console.log("After dispatch - favorites:", favorites);
  }, [favorites]);

  useEffect(() => {
    const fetchArtistData = async (artistId) => {
      try {
        const response = await axios.get(
          `https://academics.newtonschool.co/api/v1/music/artist/${artistId}`,
          {
            headers: {
              projectId: projectId,
            },
          },
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching artist data:", error);
        return null;
      }
    };

    const updateMusicList = async () => {
      const artistDataPromises = selectedSong.artist.map((artistId) =>
        fetchArtistData(artistId),
      );
      const artistData = await Promise.all(artistDataPromises);
      setMusicList(artistData.filter((data) => data !== null));
    };

    updateMusicList();
  }, [selectedSong.artist, projectId]);

  const dateCalculator = (str) => {
    var utcDate = new Date(str);
    var localOffset = new Date().getTimezoneOffset();
    var localTime = new Date(utcDate.getTime() - localOffset * 60000);

    return localTime.toLocaleString();
  };
  const style = {
    container: {
      display: "table-cell",
      color: "white",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  };
  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 80px)",
        position: "relative",
        width: "100%",
        right: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "linear-gradient(to bottom, #223c59, #121212)",
      }}>
      <div className="albumBody">
        <Box>
          <div className="onImage">
            <Box display="flex" width="100%" justifyContent="space-evenly">
              <img
                src={selectedSong.thumbnail}
                style={{ width: "150px", height: "150px" }}
              />
              <Typography
                variant="h4"
                sx={{
                  marginTop: "20px",
                  ml: "10px",
                  fontSize: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "monospace",
                  textAlign: "center",
                  "@media(max-width:550px)": {
                    fontSize: "19px",
                  },
                }}>
                {selectedSong.title} from ({selectedCard.title} Album)
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ marginTop: "20px" }}>
              {selectedCard.artists[0].name}
            </Typography>
            <Typography
              variant="h"
              sx={{ marginTop: "20px", marginBottom: "10px" }}>
              34,134,343 Followers . {selectedCard.songs.length}{" "}
              {selectedCard.songs.length <= 1 ? "song" : "songs"}
            </Typography>
          </div>
          <div
            style={{
              border: "1px solid",
              height: "1px",
            }}></div>
        </Box>
        <div style={{ background: "#223c59", paddingTop: "20px" }}>
          <div style={{ display: "flex", background: "#223c59" }}>
            <button className="faplayclass">
              <FaPlay className="faplay" />
            </button>
            {selectedSong?.color && token ? (
              <FavoriteIcon
                onClick={() => handleFavoriteClick(selectedSong)}
                sx={{
                  width: "40px",
                  height: "40px",
                  marginLeft: "20px",
                  cursor: "pointer",
                  color: "pink",
                }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => handleFavoriteClick(selectedSong)}
                sx={{
                  width: "40px",
                  height: "40px",
                  marginLeft: "20px",
                  cursor: "pointer",
                }}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#223c59",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}>
            <Typography variant="h6" sx={{ ml: "20px" }}>
              Popular Tracks by{" "}
            </Typography>
            <Typography sx={{ ml: "20px" }}>
              {selectedCard.artists[0].name}{" "}
            </Typography>
            <TableContainer sx={{ background: "#223c59" }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white", paddingLeft: "20px" }}>
                      #
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>Title</TableCell>
                    <TableCell align="right" sx={style.container}>
                      Date Of Release
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedCard.songs.map((song, id) => (
                    <TableRow
                      key={song._id}
                      onClick={() => handleSongClick(song, song._id)}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        color: "white",
                        cursor: "pointer",
                      }}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ color: "white", paddingLeft: "20px" }}>
                        {id + 1}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                        }}>
                        <img
                          src={song.thumbnail}
                          alt="Thumbnail"
                          className="thumbnails"
                          style={{
                            marginRight: "10px",
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />{" "}
                        {song.title}
                      </TableCell>
                      <TableCell align="right" sx={style.container}>
                        {dateCalculator(song.dateOfRelease)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Typography fontFamily={"serif"} variant="h5" m={2}>
            Recommented Artists
          </Typography>
          <Box sx={{ pb: 5 }}>
            {musicList.map((data, index) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px",
                  cursor: "pointer",
                  "&:hover": { background: "rgb(28, 48, 71)" },
                }}
                key={index}
                onClick={() => {
                  handleArtistClick(data);
                }}>
                <img
                  src={data.data.image}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "30px",
                  }}
                />
                <Typography variant="h6" fontWeight={600} ml={2}>
                  {data.data.name}
                </Typography>
              </div>
            ))}
          </Box>
          <Footer />
        </div>
      </div>
    </Box>
  );
}

export default SongCards;
