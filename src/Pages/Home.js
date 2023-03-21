import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import TrendingList from "../Components/MovieHome/TrendingList";
import PopularList from "../Components/MovieHome/PopularList";

function MovieHome() {
  return (
    <section className="container mx-auto">
      <TrendingList />
      <PopularList />
    </section>
  );
}

export default MovieHome;
