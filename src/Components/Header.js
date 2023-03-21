import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import "./Header.css";

function Header(props) {
  const { search } = props;
  const [open, setOpen] = useState(false);
  const API_IMG = "https://image.tmdb.org/t/p/w500/";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);

  const searchReq = (event) => {
    // try {
    event.preventDefault();
    //   const res = await axios.get(
    //     `https://api.themoviedb.org/3/search/multi?api_key=c75d96c32b97c8e7dd7ef5d195680227&query=${searchText}&page=${page}`
    //   );
    //   setData(res.data);
    //   console.log(page);
    navigate(`/search-result`, {
      state: {
        search: searchText,
      },
    });
    event.target.reset();
    // } catch (error) {
    //   console.log(error);
    // }
    // setIsLoading(false);
  };

  // useEffect(() => {
  //   window.scroll(0, 0);
  //   searchReq(searchText);
  //   // eslint-disable-next-line
  // }, [type, page]);
  return (
    <>
      <div className=" mx-auto">
        <nav className=" bg-img flex mb-0 lg:-mb-12 items-center justify-between flex-wrap bg-blue-900 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <Link to="/" className="font-semibold text-xl tracking-tight">
              MoviesList
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              onClick={() => {
                setOpen(!open);
              }}
              className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path
                  className={`${open ? "hidden" : "block"}`}
                  d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                />

                <path
                  className={`${open ? "block" : "hidden"}`}
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              open ? "block" : "hidden"
            }  w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
          >
            <div className="text-base lg:flex-grow">
              <NavLink
                to="movie"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Movies
              </NavLink>
              <NavLink
                to="tv-show"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                TV Shows
              </NavLink>
            </div>
          </div>
        </nav>
        <div className="w-full parent container mx-auto mb-4">
          <form onSubmit={(item) => searchReq(item)}>
            <label>
              <input
                className="input border border-gray-400 input shadow-lg shadow-lg"
                tabIndex="1"
                autoCorrect="off"
                autoComplete="off"
                spellCheck="false"
                placeholder="Search Here.."
                onChange={(e) => setSearchText(e.target.value)}
              />
            </label>
            <a
              className="input-group-text input_button flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
              </svg>
            </a>
          </form>
        </div>
      </div>
    </>
  );
}

export default Header;
