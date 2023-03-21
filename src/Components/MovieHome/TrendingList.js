import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function TrendingList() {
  const API_IMG = "https://image.tmdb.org/t/p/w500/";
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const navigate = useNavigate();
  // const settings = {
  //   infinite: true,
  //   speed: 100,
  //   slidesToShow: 5,
  //   slidesToScroll: 1,
  //   lazyLoad: true,
  //   arrows: false,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  //   swipeToSlide: true,
  //   pauseOnHover: true,
  //   // rows: 4,
  //   // slidesPerRow: 1,
  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         arrows: false,
  //       },
  //     },
  //   ],
  // };
  const fetchMovies = async (type) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/${type}/day?api_key=c75d96c32b97c8e7dd7ef5d195680227`
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const Detail = async (item) => {
    navigate(`${item.media_type}/${item.id}`, {
      state: {
        id: item.id,
        type: item?.media_type,
      },
    });
  };

  useEffect(() => {
    fetchMovies("movie");
  }, []);

  return (
    <>
      {isLoading ? (
        <img
          className="h-16 w-16 mx-auto mt-4"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
      ) : (
        <div>
          <div className="flex text-sm font-medium text-center text-gray-500  dark:text-gray-400 dark:border-gray-700">
            <h1 className="inline-block text-xl font-bold p-4 rounded-t-lg">
              Trending
            </h1>
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <a
                  onClick={() => {
                    setOpenTab(1);
                    fetchMovies("movie");
                  }}
                  className={` ${
                    openTab === 1
                      ? "active border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : ""
                  } inline-block p-4 rounded-t-lg cursor-pointer`}
                >
                  Movie
                </a>
              </li>
              <li className="mr-2">
                <a
                  onClick={() => {
                    setOpenTab(2);
                    fetchMovies("tv");
                  }}
                  className={` ${
                    openTab === 2
                      ? "active border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500"
                      : ""
                  } inline-block p-4  rounded-t-lg cursor-pointer `}
                  aria-current="page"
                >
                  TV Shows
                </a>
              </li>
            </ul>
          </div>
          {/* <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500  dark:text-gray-400 mb-3">
            <li className="mr-2">
              <a
                onClick={() => {
                  setOpenTab(1);
                  fetchMovies("movie");
                }}
                activeClasses
                aria-current="page"
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1 ? "text-white-600" : "text-red")
                }
              >
                Trending Movie
              </a>
            </li>
            <li className="mr-2">
              <a
                onClick={() => {
                  setOpenTab(2);
                  fetchMovies("tv");
                }}
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2 ? "text-white-600" : "text-red bg-white")
                }
              >
                Trending Tv-shows
              </a>
            </li>
          </ul> */}
          {/* <div className="button_container flex">
            <h2 className="mb-3 mr-4">Trending</h2>
            <button
              className="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              onClick={() => {
                fetchMovies("movie");
              }}
            >
              Trending Movies
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
              onClick={() => {
                fetchMovies("tv");
              }}
            >
              Trending TV
            </button>
          </div> */}
          {/* <Slider {...settings}>
          {data.results?.map((item) => (
            <a
              onClick={() => alert("test")}
              className="rounded card overflow-hidden shadow-lg cursor-pointer"
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
        </Slider> */}
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
                  src={API_IMG + item.poster_path}
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
        </div>
      )}
    </>
  );
}

export default TrendingList;
