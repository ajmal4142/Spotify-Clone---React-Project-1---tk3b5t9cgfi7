import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import Cards from "../Card/Cards";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShowAll = () => {
  const navigate = useNavigate();
  const [musicList, setMusicList] = useState([]);
  const [{ selectedCard, favorites }, dispatch] = useStateProvider();
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

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        right: 0,
        top: 0,
      }}>
      <div
        className="homeBody"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "20px",
        }}>
        {musicList.map((music) => (
          <Cards music={music} key={music._id} />
        ))}
      </div>
    </div>
  );
};

export default ShowAll;
