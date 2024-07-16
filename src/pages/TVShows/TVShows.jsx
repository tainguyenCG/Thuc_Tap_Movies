import { useEffect, useRef, useState } from "react";
import "./TVShows.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TVShows = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const navigate = useNavigate();
  const cardsRef = useRef();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODEzNDkwZjI5YzhlNDA2M2YwMTIxYzgyNTcwMGIyMSIsIm5iZiI6MTcyMTAyMjA4Ni45NTQ3NzksInN1YiI6IjY2OTRiNDhhYTIwNTc5YjUyMGE3ZWQ1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xBvaeROSlqCCz7ODlYnrqPC7PVVujoE3KLpQ2BbpTBE",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "top_rated"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="TVShows-cards">
      <img
        src={back_arrow_icon}
        alt=""
        onClick={() => {
          navigate("/");
        }}
        className="img2"
      />
      <h2>{title ? title : "TV Shows movie"}</h2>
      <div className="TVShows-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="TVShows" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TVShows;
