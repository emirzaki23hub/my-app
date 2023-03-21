import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";

function PopularList() {
  const API_IMG = "https://image.tmdb.org/t/p/w500/";
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();

  const fetchMoviesPopular = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=c75d96c32b97c8e7dd7ef5d195680227"
      );
      // console.log(res);
      setMovie(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Detail = async (item) => {
    navigate(`movie/${item.id}`, {
      state: {
        id: item.id,
        type: "movie",
      },
    });
  };

  useEffect(() => {
    fetchMoviesPopular();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Popular</h2>
      <div className="grid grid-cols-2 px-3 gap-4  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 md:px-3 xl:px-0 ">
        {movie.results?.map((item) => (
          <a
            key={item.id}
            onClick={() => Detail(item)}
            className="rounded  overflow-hidden transform transition duration-500 hover:scale-105 shadow-lg cursor-pointer"
          >
            <img
              className="w-full image"
              src={API_IMG + item.poster_path}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <p className="font-bold text-base truncate overflow-hidden  mb-2">
                {item.name ? item.name : item.title}
              </p>
              <p>
                {item.release_date ? item.release_date : item.first_air_date}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default PopularList;
