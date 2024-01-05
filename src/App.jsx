import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { getPath } from "./utils/api";
import { AnimeHome } from "./components/AnimeHome";
import { Recomendations } from "./components/Recomendations";
import { Navbar } from "./components/Navbar";
import { UpcomingAnimes } from "./components/UpcomingAnimes";
import { StarAnimes } from "./components/StarAnimes";
import { SearchComp } from "./components/SearchComp";
function App() {
  const [recommendationsList, setRecommendationsList] = useState(null);
  const [animeList, setAnimeList] = useState(null);
  const [upAnimes, setUpAnimes] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const sectionRef = useRef();
  let hasNext = animeList?.pagination.has_next_page;
  let lastPage = animeList?.pagination.last_visible_page;

  const nextPage = () => {
    if (hasNext) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
    window.scrollTo(0, sectionRef.current.offsetTop);
  };
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(lastPage);
    }
    window.scrollTo(0, sectionRef.current.offsetTop);
  };
  useEffect(() => {
    Promise.all([
      getPath("/recommendations/anime"),
      getPath(`/seasons/now?page=${page}&limit=8`),
      getPath("/top/anime?filter=upcoming&limit=8"),
      setIsLoading(true),
    ])
      .then(([resRecommendations, resSeasons, resUpcoming]) => {
        return Promise.all([resRecommendations, resSeasons, resUpcoming]);
      })
      .then(([dataRecomendations, dataSeasons, dataUpcoming]) => {
        setRecommendationsList(dataRecomendations);
        setAnimeList(dataSeasons);
        setUpAnimes(dataUpcoming);
        setIsLoading(false);
      })
      .catch((e) => setError(e));

    return () => {
      setAnimeList(null);
      setError(null);
    };
    // getPath("/seasons/now")
    //   .then((data) => {
    //     setAnimeList(data);
    //     setError(null);
    //   })
    //   .catch((err) => {
    //     setError(err);
    //     setAnimeList(null);
    //   })
    //   .finally(() => setIsLoading(false));
  }, [page]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Recomendations
                  error={error}
                  isLoading={isLoading}
                  recommendationsList={recommendationsList?.data}
                />
                <section
                  ref={sectionRef}
                  className="flex flex-wrap max-w-7xl mx-auto flex-col md:flex-row min-h-screen items-start"
                >
                  <div className="flex-[2]">
                    <AnimeHome
                      page={page}
                      prevPage={prevPage}
                      nextPage={nextPage}
                      animeList={animeList?.data}
                      error={error}
                      isLoading={isLoading}
                    />
                  </div>
                  <div className="flex-1">
                    <UpcomingAnimes
                      error={error}
                      isLoading={isLoading}
                      upAnimes={upAnimes}
                    />
                  </div>
                </section>
              </>
            }
          ></Route>
          <Route path="/star_animes" element={<StarAnimes />}></Route>
          <Route path="/search/:anime" element={<SearchComp />}></Route>

          <Route
            path="*"
            element={
              <>
                <div className="flex flex-col items-center justify-center  min-h-screen gap-5 text-2xl font bold ">
                  <h1 className="">
                    the page you are looking for does not exist
                  </h1>
                  <button className="btn bg-slate-500 text-black outline-none border-none">
                    <Link to={"/"}>HOME</Link>
                  </button>
                </div>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
