import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";

const Search = () => {
  const API_IMG = "https://image.tmdb.org/t/p/w500/";

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);
  const location = useLocation();
  const search = location.state.search;

  const searchReq = async (event, searchText) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=c75d96c32b97c8e7dd7ef5d195680227&query=${search}&page=${page}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const Detail = async (item) => {
    navigate(`${item.id}`, {
      state: {
        id: item.id,
        type: item?.media_type,
      },
    });
  };

  useEffect(() => {
    window.scroll(0, 0);
    searchReq(search, page);
  }, [search, page]);
  return (
    <section className="pt-12 container mx-auto mb-4">
      <h1 className="text-2xl font-bold mb-9">Result search for {search}</h1>
      {/* <div className="w-full parent container mx-auto mb-4">
        <form onSubmit={searchReq}>
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
      </div> */}
      {isLoading ? (
        <img
          className="h-16 w-16 mx-auto mt-4"
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
      ) : (
        <div className="grid grid-cols-2 px-3 gap-4  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 md:px-3 xl:px-0 ">
          {data.results?.map((item) => (
            <a
              key={item.id}
              onClick={() => Detail(item)}
              className="rounded  overflow-hidden transform transition duration-500 hover:scale-105 shadow-lg cursor-pointer"
            >
              <img
                className="w-full image"
                src={
                  item.poster_path
                    ? API_IMG + item.poster_path
                    : "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"
                }
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
      )}
      <Pagination
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        data={data}
      />
    </section>
  );
};

export default Search;
