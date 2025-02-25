import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoHome } from "react-icons/io5";
const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODEzNDkwZjI5YzhlNDA2M2YwMTIxYzgyNTcwMGIyMSIsIm5iZiI6MTcyMTAyMjA4Ni45NTQ3NzksInN1YiI6IjY2OTRiNDhhYTIwNTc5YjUyMGE3ZWQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xBvaeROSlqCCz7ODlYnrqPC7PVVujoE3KLpQ2BbpTBE",
    },
  };
  const handelHome = () => {
    navigate("/");
  };
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt=""
        onClick={() => {
          navigate(-1);
        }}
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>

        <IoHome size={30} onClick={handelHome} className="Go-home" />

        <p>{apiData.name}</p>

        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
