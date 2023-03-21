import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./MovieDetail.css";
import { ScrollRestoration } from "react-router-dom";

function MovieDetail() {
  const settings = {
    className: "mx-3 lg:mx-0",
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    swipeToSlide: true,
    pauseOnHover: true,
    // rows: 4,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 432,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };
  const [isLoading, setIsLoading] = useState(false);
  const [cast, setCast] = useState("");
  const [video, setVideo] = useState("");
  const location = useLocation();
  const [detail, setDetail] = useState("");
  const API_IMG = "https://image.tmdb.org/t/p/w300/";

  useEffect(() => {
    fetchDetail();
    fetchCredit();
    fetchVideo();
  }, []);

  const type = location.state.type ? location.state.type : "movie";

  const fetchDetail = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.themoviedb.org/3/${type}/${location.state.id}?api_key=c75d96c32b97c8e7dd7ef5d195680227&language=en-US`
      );
      setDetail(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const fetchCredit = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/${location.state.id}/credits?api_key=c75d96c32b97c8e7dd7ef5d195680227`
    );
    setCast(res.data);
  };

  const fetchVideo = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/${location.state.id}/videos?api_key=c75d96c32b97c8e7dd7ef5d195680227&language=en-US`
    );
    setVideo(res.data.results[0]?.key);
  };

  return (
    <section className="min-h-screen">
      {isLoading ? (
        <img
          className="h-16 w-16 mx-auto mt-4"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
      ) : (
        <div className="mx-3">
          <div className="container lg:flex mx-auto pt-6">
            <img
              className="bg-cover flex-none h-96 lg:rounded-l lg:rounded-t-none lg:w-48 lg:h-auto  overflow-hidden rounded-t text-center w-full"
              title="Woman holding a mug"
              src={API_IMG + detail.poster_path}
            />
            <div className="border-r w-full border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div>
                <div className="font-bold text-xl mb-2">
                  {detail.title ? detail.title : detail.name}
                </div>
                <p className="mb-2">
                  <span className="font-bold">{detail.tagline}</span>
                </p>
                <p className="text-gray-700 text-base mb-2">
                  {detail.overview}
                </p>
                <div className="pt-4 pb-2">
                  {detail.genres?.map((item) => (
                    <span
                      key={item.id}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <a
                    className="bg-red-600 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    <svg
                      className="w-5 h-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                    </svg>
                    <span> Play Trailer</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="pt-4 container md:mx-auto">
        <h2 className="md:mx-0 mx-3 mb-4">Cast</h2>
        <Slider {...settings}>
          {cast.cast?.map((item) => (
            <div
              key={item.id}
              className="rounded overflow-hidden transform transition duration-500 hover:scale-105 shadow-md"
            >
              <img
                data-te-ripple-init
                data-te-ripple-color="light"
                className="w-full image"
                src={
                  item.profile_path != null
                    ? API_IMG + item.profile_path
                    : "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"
                }
                alt="Sunset in the mountains"
              />
              <div className="rating"></div>
              <div className="px-6 py-4">
                <p className="font-bold text-base truncate overflow-hidden  mb-2">
                  {item.name ? item.name : item.title}
                </p>
                <p>{item.character}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <ScrollRestoration />
    </section>
  );
}

export default MovieDetail;
