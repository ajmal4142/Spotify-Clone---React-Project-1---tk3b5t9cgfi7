import React, { useState, useEffect, useRef } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { BiRepeat, BiShuffle } from "react-icons/bi";
import { FaPause, FaPlay } from "react-icons/fa";
import { PiMicrophoneStageDuotone, PiQueueLight } from "react-icons/pi";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { BsArrowsAngleContract, BsSpeakerFill } from "react-icons/bs";
import { AiOutlineHeart, AiOutlinePlaySquare } from "react-icons/ai";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import "./songBar.css";
import playButton from "./playButton.png";
import { Box } from "@mui/material";

const SongBar = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audiourl, setAudioUrl] = useState("");
  const [{ selectedCard, selectedSong, token }, dispatch] = useStateProvider();

  useEffect(() => {
    if (selectedSong) {
      loadSong(selectedSong.audio_url); // Load the selected song
    }
  }, [selectedSong]);

  const loadSong = (audioUrl) => {
    if (audioRef.current && audioRef.current.src !== audioUrl && token) {
      // Stop the currently playing audio (if any)
      audioRef.current.pause();
      audioRef.current.src = "";

      // Load and play the new song
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setAudioUrl(audioUrl);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  };

  const audioRef = useRef(null);

  const playSong = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseSong = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };
  const handlePrevious = () => {
    if (selectedCard && selectedSong) {
      let index = selectedCard.songs.findIndex((id) => {
        return id._id === selectedSong._id;
      });

      selectedCard.songs.filter((id, ind) => {
        if (ind === index - 1) {
          dispatch({ type: "SET_SELECTED_SONG", payload: id });
        }
      });
    }
  };

  const handleNext = () => {
    if (selectedCard && selectedSong) {
      let index = selectedCard.songs.findIndex((id) => {
        return id._id === selectedSong._id;
      });

      selectedCard.songs.filter((id, ind) => {
        if (ind === index + 1) {
          dispatch({ type: "SET_SELECTED_SONG", payload: id });
        }
      });
    }
  };

  const handlePlayAgain = () => {
    if (selectedSong) {
      audioRef.current.currentTime = 0; // Reset audio time to 0
      playSong();
    }
  };

  return (
    <div className="songBar">
      {selectedSong ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "@media(max-width:370px)": {
              display: "none",
            },
          }}>
          <img src={selectedSong.thumbnail} className="unknownImg" />
          <h4
            style={{
              display: "flex",
              wordWrap: "break-word",
              textAlign: "center",
            }}>
            {selectedSong.title}
          </h4>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "@media(max-width:370px)": {
              display: "none",
            },
          }}>
          <img src={playButton} className="unknownImg" />
          <h4
            style={{
              display: "flex",
              wordWrap: "break-word",
              textAlign: "center",
            }}>
            Unknown Song
          </h4>
        </Box>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}>
        <div style={{ paddingBottom: "10px" }}>
          <BiShuffle className="songIcons" />
          <IoMdSkipBackward onClick={handlePrevious} className="songIcons" />
          {isPlaying ? (
            <FaPause onClick={handlePlayPause} className="songIcons" />
          ) : (
            <FaPlay onClick={handlePlayPause} className="songIcons" />
          )}
          <IoMdSkipForward onClick={handleNext} className="songIcons" />
          <BiRepeat onClick={handlePlayAgain} className="songIcons" />
        </div>
        <audio ref={audioRef} controls className="audioSpotify">
          <source src={audiourl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <Box
        sx={{
          display: "flex",
          "@media(max-width:600px)": { display: "none" },
        }}>
        <BsArrowsAngleContract className="songIcons" />
        <BsSpeakerFill className="songIcons" />
        <PiMicrophoneStageDuotone className="songIcons" />
        <PiQueueLight className="songIcons" />
      </Box>
    </div>
  );
};

export default SongBar;
