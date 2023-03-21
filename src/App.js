import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
import Home from "./Pages/Home";
import MovieDetail from "./Pages/MovieDetail";
import Search from "./Pages/Search";
import Movie from "./Pages/Movie";
import Series from "./Pages/Series";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/:type/:id",
          element: <MovieDetail />,
        },
        {
          path: "/search-result",
          element: <Search />,
        },
        {
          path: "/movie",
          element: <Movie />,
        },
        {
          path: "/tv-show",
          element: <Series />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
