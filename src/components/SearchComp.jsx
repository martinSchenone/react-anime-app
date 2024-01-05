import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { getPath } from "../utils/api";
/*  TERMINAR EL SEARCH COMPONENT */
export const SearchComp = () => {
  const { anime } = useParams();
  const [animeList, setAnimeList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(null);
  const [page, setPage] = useState(1);
  const sectionRef = useRef();
  const nextPage = () => {
    let hasNext = animeList?.pagination.has_next_page;
    if (hasNext) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
    window.scrollTo(0, sectionRef.current.offsetTop);
  };
  const prevPage = () => {
    let lastPage = animeList?.pagination.last_visible_page;

    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(lastPage);
    }
    window.scrollTo(0, sectionRef.current.offsetTop);
  };
  // const getAnime = async (q) => {
  //   try {
  //     const res = await fetch(`https://api.jikan.moe/v4/anime?q=${q}&limit=10`);
  //     if (res.status >= 404) {
  //       throw new Error({ error: "ha" });
  //     }
  //     const data = await res.json();
  //     setSearchedAnimes(data.data);
  //   } catch (error) {
  //     setHasError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getSearch = () => {
    getPath(`/anime?q=${anime}&page=${page}&limit=12`)
      .then((data) => {
        setAnimeList(data);
      })
      .catch((err) => {
        setHasError(err);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getSearch();
    window.scrollTo(0, 0);
    // getAnime(anime);
    return () => {
      setAnimeList("");
      setLoading(false);
    };
  }, [anime, page]);
  return (
    <>
      {loading && <Loading loading={loading} />}
      {hasError && <Error error={hasError} />}

      <section ref={sectionRef} className="p-5 min-h-screen">
        <div className="text-2xl font-semibold mt-10 flex justify-between">
          <h1>
            Results for:{" "}
            <span className="uppercase">
              {anime.length > 30 ? `${anime.substring(0, 30)}...` : anime}
            </span>
          </h1>
          <span>{page}</span>
        </div>

        <div
          className=" pt-10 grid gap-12 min-h-screen"
          style={{ gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))" }}
        >
          {animeList && (
            <>
              {animeList.data.map((searchedAnime) => (
                <div
                  key={searchedAnime.mal_id}
                  className="flex flex-col gap-10  items-center justify-between border-gray-600 border-2 rounded-xl   overflow-hidden "
                >
                  <div className="h-full w-full hover:scale-105 transition-all cursor-pointer ">
                    <img
                      src={searchedAnime.images.webp.large_image_url}
                      className="h-full w-full max-h-80 object-cover"
                    />
                  </div>
                  <div className="pb-5">
                    <h1 className="text-xl font-bold text-center">
                      {searchedAnime.title.length > 25
                        ? `${searchedAnime.title.substring(0, 20)}...`
                        : searchedAnime.title}
                    </h1>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="join grid grid-cols-2 pt-10 gap-2">
          <button className="join-item btn " onClick={prevPage}>
            Previous page
          </button>
          <button className="join-item btn " onClick={nextPage}>
            Next
          </button>
        </div>
      </section>
    </>
  );
};
