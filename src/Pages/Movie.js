import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";

function Movie() {
  const API_IMG = "https://image.tmdb.org/t/p/w500/";
  const [filterStatus, setFilterStatus] = useState("now_playing");
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [openTab, setOpenTab] = useState(1);
  const navigate = useNavigate();

  const fetchMovies = async (type, page, filterStatus) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${type}?api_key=c75d96c32b97c8e7dd7ef5d195680227&&page=${page}
        `
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  // console.log("movie", movie);

  const Detail = async (item) => {
    navigate(`${item.id}`, {
      state: {
        id: item.id,
        type: "movie",
      },
    });
  };

  const changeStatus = (status) => {
    setFilterStatus(status);
    setPage(1);
    fetchMovies(status);
  };

  useEffect(() => {
    fetchMovies(filterStatus, page);
  }, [filterStatus, page]);

  return (
    <>
      {isLoading ? (
        <img
          className="h-16 w-16 mx-auto mt-4"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
      ) : (
        <div className="container mx-auto">
          <div className="flex text-sm font-medium text-center text-gray-500  dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <a
                  onClick={() => {
                    setOpenTab(1);
                    changeStatus("now_playing");
                  }}
                  className={` ${
                    openTab === 1
                      ? "active border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : ""
                  } inline-block py-4 rounded-t-lg cursor-pointer`}
                >
                  Now Playing
                </a>
              </li>
              <li className="mr-2">
                <a
                  onClick={() => {
                    setOpenTab(2);
                    changeStatus("popular");
                  }}
                  className={` ${
                    openTab === 2
                      ? "active border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : ""
                  } inline-block p-4  rounded-t-lg cursor-pointer `}
                  aria-current="page"
                >
                  Popular
                </a>
              </li>
              <li className="mr-2">
                <a
                  onClick={() => {
                    setOpenTab(3);
                    changeStatus("upcoming");
                  }}
                  className={` ${
                    openTab === 3
                      ? "active border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : ""
                  } inline-block p-4  rounded-t-lg cursor-pointer `}
                  aria-current="page"
                >
                  Upcoming
                </a>
              </li>
              <li className="mr-2">
                <a
                  onClick={() => {
                    setOpenTab(4);
                    changeStatus("top_rated");
                  }}
                  className={` ${
                    openTab === 4
                      ? "active border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : ""
                  } inline-block p-4  rounded-t-lg cursor-pointer `}
                  aria-current="page"
                >
                  Top Rated
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 px-3 gap-4 mb-9  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 md:px-3 xl:px-0   ">
            {data.results?.map((item) => (
              <a
                key={item.id}
                onClick={() => Detail(item)}
                className="rounded  overflow-hidden transform transition duration-500 hover:scale-105 shadow-lg cursor-pointer"
              >
                <img
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="w-full image"
                  src={
                    item.poster_path
                      ? API_IMG + item.poster_path
                      : "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"
                  }
                  alt="Sunset in the mountains"
                />
                <div className="rating"></div>
                <div className="px-6 py-4">
                  <p className="font-bold text-base truncate overflow-hidden  mb-2">
                    {item.name ? item.name : item.title}
                  </p>
                  <p>
                    {item.release_date
                      ? item.release_date
                      : item.first_air_date}
                  </p>
                </div>
              </a>
            ))}
          </div>
          <Pagination
            page={page}
            setPage={setPage}
            data={data}
            isLoading={isLoading}
          />
        </div>
      )}
    </>
  );
}

export default Movie;
