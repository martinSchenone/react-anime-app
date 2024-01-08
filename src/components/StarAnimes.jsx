import { useState, useEffect } from "react";
import { db } from "../db/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { FavAnimeCard } from "./FavAnimeCard";
import { Loading } from "./Loading";
export const StarAnimes = () => {
  const [favAnimes, setFavAnimes] = useState([]);
  const [load, setIsLoad] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState(null)
  // referencia de la DB
  const favAnimesCollection = collection(db, "favoriteAnimes");

  const getFavAnimes = async () => {
    try {
      const querySnapShot = await getDocs(favAnimesCollection);
      if (querySnapShot) {
        const data = querySnapShot.docs.map((favAnime) => ({
          id: favAnime.id,
          ...favAnime.data(),
        }));
        setFavAnimes(data);
      }
    } catch (error) {
      setError(error)
    } finally {
      setIsLoad(false);
    }
  };
  const deleteFavAnime = async (anime) => {
    try {
      await deleteDoc(doc(db, "favoriteAnimes", anime.id));
      setIsDeleted(true);
      await getFavAnimes();
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsDeleted(false);
      }, 2000);
    }
  };

  useEffect(() => {
    getFavAnimes();
  }, []);
  return (
    <>
      <div className="mt-20 min-h-screen max-w-6xl mx-auto  rounded w-full p-4 shadow-2xl bg-sky-950 my-5 relative">
        {load && <Loading />}
        <div
          style={{ gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))" }}
          className="grid gap-10"
        >
          {isDeleted && (
            <>
              <div className="toast z-10 toast-middle toast-center">
                <div className="alert alert-info">
                  <span>Anime deleted succefully</span>
                </div>
              </div>
            </>
          )}
          {favAnimes &&
            favAnimes.map((anime) => (
              <FavAnimeCard
                key={anime.mal_id}
                anime={anime}
                deleteFavAnime={deleteFavAnime}
              />
            ))}
        </div>
        {favAnimes.length == 0 && (
            <div className="flex justify-center items-center w-full border border-gray-600 rounded">
            <h1 className="my-52 p-2 text-center text-3xl font-semibold max-w-md justify-self-center w-full  mx-auto">
              There are no animes saved in favorites yet
            </h1>
            </div>
          )}
      </div>
    </>
  );
};
