import { useState, useEffect } from "react";
import { db } from "../db/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { FavAnimeCard } from "./FavAnimeCard";
export const StarAnimes = () => {
  const [favAnimes, setFavAnimes] = useState([]);
  const [load, setIsLoad] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

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
      console.error(error);
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
      <div className="mt-20 min-h-screen max-w-6xl mx-auto  rounded w-full p-4 shadow-2xl my-5 relative">
        <div
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}
          className="grid gap-10"
        >
          {load && (
            <>
              <div className="flex gap-10 items-center justify-center">
                <span className="animate-spin w-6 h-6 text-white bg-white"></span>
                <h1 className="text-3xl">Loading animes...</h1>
              </div>
            </>
          )}
          {isDeleted && (
            <>
              <div className="toast z-10 toast-middle toast-center">
                <div className="alert alert-info">
                  <span>Anime deleted succefully</span>
                </div>
              </div>
            </>
          )}
          {favAnimes.length == 0 && (
            <h1 className="my-52 text-center text-2xl font-semibold max-w-sm justify-self-center">
              There are no animes saved in favorites yet
            </h1>
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
      </div>
    </>
  );
};
