import React, { useEffect } from "react";

import { useStateProvider } from "../utils/StateProvider";
import { Box, Typography, createTheme } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FaPlay } from "react-icons/fa";
import "./ArtistSong.css";
import { useNavigate } from "react-router-dom";
import Footer from "../home/Footer";

const theme = createTheme();

const ArtistSong = () => {
  const [{ selectedCard, selectedArtist, selectedSong, favorites }, dispatch] =
    useStateProvider();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("selectedArtist", selectedArtist);
  }, [selectedArtist]);

  const handleSongClick = (song) => {
    dispatch({ type: "SET_SELECTED_SONG", payload: song });
    navigate("/song");
  };
  const isFavorite = (song) => {
    const songId = song.album;
    return favorites.includes(songId);
  };

  const handleFavoriteClick = (song) => {
    if (isFavorite(song)) {
      dispatch({ type: "REMOVE_FAVORITE", payload: song });
    } else {
      if (!token) {
        alert("Please Login");
      } else {
        dispatch({ type: "ADD_FAVORITE", payload: song });
      }
    }
  };
  const handleRemoveFavoriteClick = (song) => {
    if (isFavorite(song)) {
      dispatch({ type: "REMOVE_FAVORITE", payload: song.album });
    }
  };
  const dateCalculator = (str) => {
    var utcDate = new Date(str);
    var localOffset = new Date().getTimezoneOffset();
    var localTime = new Date(utcDate.getTime() - localOffset * 60000);

    return localTime.toLocaleString();
  };
  const styles = {
    container: {
      display: "table-cell",
      color: "white",
      "@media(max-width:600px)": { display: "none" },
    },
    container_two: {
      display: "table-cell",
      color: "white",
      [theme.breakpoints.down("md")]: {
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
      }}>
      <div className="albumBody">
        <Box>
          <div className="onImage">
            <Typography variant="h5" sx={{ marginTop: "20px" }}>
              {selectedArtist.data.name}
            </Typography>
            <Typography variant="h5" sx={{ marginTop: "20px" }}>
              Spotify . 34,134,233 likes . {selectedArtist.data.songs.length}{" "}
              {selectedArtist.data.songs.length <= 1 ? "song" : "songs"}
            </Typography>
          </div>
        </Box>

        <Box>
          <div style={{ display: "flex", background: "#223c59" }}>
            <button className="faplayclass">
              <FaPlay className="faplay" />
            </button>
            {!isFavorite(selectedSong) ? (
              <FavoriteBorderIcon
                onClick={() => handleFavoriteClick(selectedSong)}
                sx={{ width: "40px", height: "40px", marginLeft: "20px" }}
              />
            ) : (
              <FavoriteIcon
                onClick={() => handleFavoriteClick(selectedSong)}
                sx={{
                  width: "40px",
                  height: "40px",
                  marginLeft: "20px",
                  color: "pink",
                }}
              />
            )}
          </div>
          <TableContainer
            component={Paper}
            sx={{
              background: "linear-gradient(to bottom, #223c59, #121212)",
              marginBottom: "47px",
            }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "white", paddingLeft: "20px" }}>
                    #
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>Title</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      display: "table-cell",
                      color: "white",
                      "@media(max-width:600px)": { display: "none" },
                    }}>
                    Album
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      display: "table-cell",
                      color: "white",
                      "@media(max-width:1100px)": { display: "none" },
                    }}>
                    Date Added
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedArtist.data.songs.map((song, id) => (
                  <TableRow
                    key={song._id}
                    onClick={() => handleSongClick(song)}
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
                      align="right"
                      sx={{ color: "white", display: "flex" }}>
                      <div style={{ display: "flex", flex: "auto" }}>
                        <img
                          src={song.thumbnail}
                          alt="Thumbnail"
                          className="thumbnails"
                          style={{ marginRight: "10px" }}
                        />{" "}
                        {song.title}
                      </div>
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        display: "table-cell",
                        color: "white",
                        "@media(max-width:600px)": { display: "none" },
                      }}>
                      {song.title}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        display: "table-cell",
                        color: "white",
                        "@media(max-width:1100px)": { display: "none" },
                      }}>
                      {dateCalculator(song.dateOfRelease)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Footer />
      </div>
    </Box>
  );
};

export default ArtistSong;
