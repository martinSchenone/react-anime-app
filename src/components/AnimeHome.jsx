import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../db/firebase";
import { useState } from "react";
import { AnimeListCard } from "./AnimeListCard";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { Pagination } from "./Pagination";
import { Suspense } from "react";

export const AnimeHome = ({
  animeList,
  error,
  isLoading,
  nextPage,
  prevPage,
  page,
}) => {
  const [wasAdded, setWasAdded] = useState(false);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

  const addFavAnime = async (anime) => {
    const data = await getDocs(collection(db, "favoriteAnimes"));
    const existingIds = data.docChanges().map((doc) => doc.doc.data().mal_id);
    const match = existingIds.find((animeId) => animeId == anime.mal_id);

    try {
      if (!match) {
        await addDoc(collection(db, "favoriteAnimes"), { ...anime });
        setWasAdded(true);
      } else {
        setIsAlreadyAdded(true);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <section className=" w-full p-2 min-h-screen">
        <div className="text-2xl font-semibold uppercase my-5">
          <h1 className="w-fit border-b-2">Trending Animes now</h1>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {wasAdded && (
              <div className="toast z-10 toast-middle toast-center max-w-xs  font-bold text-neutral-900 uppercase">
                <div className="alert alert-info text-xs  md:text-lg">
                  <span>Anime successfully added to favorites!</span>
                </div>
                <div className="alert alert-success w-full py-0 flex items-center">
                  <button
                    className="btn-block btn-success  text-xs md:text-lg text-center"
                    onClick={() => setWasAdded(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {isAlreadyAdded && (
              <div className="toast z-10 toast-middle toast-center font-bold text-neutral-900 uppercase">
                <div className="alert alert-error text-xs  md:text-lg">
                  <span>Anime is already in favorites!</span>
                </div>
                <div className="alert alert-success w-full py-0 flex items-center">
                  <button
                    className="btn-block btn-success  text-xs md:text-lg text-center "
                    onClick={() => setIsAlreadyAdded(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {animeList && (
              <div
                className=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
                  gap: "3rem",
                }}
              >
                {animeList?.map((anime) => (
                  <AnimeListCard
                    key={anime.id}
                    addFavAnime={addFavAnime}
                    anime={anime}
                  />
                ))}
              </div>
            )}
          </>
        )}
        {error && <Error error={error} />}

        <Pagination prevPage={prevPage} nextPage={nextPage} />
      </section>
    </>
  );
};
