import star from "../assets/star.svg";

export const FavAnimeCard = ({ anime, deleteFavAnime }) => {
  return (
    <div className="flex flex-col  items-center text-center  gap-5 text-xl font-bold rounded bg-[#818FB4] text-black relative ">
      <div className=" ">
        <img src={anime?.images?.webp.large_image_url} className="" />
      </div>
      <div className="px-2 pb-10">
        <h1>{anime.title}</h1>
        <div className="score absolute top-0 left-0 bg-[#F5E8C7] p-2 rounded-br-xl text-md text-[#363062] flex gap-2 items-center justify-center">
          <img src={star} className="w-5 h-5" />
          <h2 className="">{anime.score || "1"}</h2>
        </div>
      </div>
      <div className="">
        <button
          className="text-sm absolute bottom-1 left-1 p-1 bg-red-500 rounded text-whi "
          onClick={() => deleteFavAnime(anime)}
        >
          Delete from favorites
        </button>
      </div>
    </div>
  );
};
