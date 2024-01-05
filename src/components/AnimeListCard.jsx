import star from "../assets/star.svg";

export const AnimeListCard = ({ anime, addFavAnime }) => {
  return (
    <div
      key={anime.mal_id}
      className="relative  flex flex-col justify-between  gap-2 "
    >
      <a
        href={anime.url}
        target="_blank"
        rel="noreferrer"
        className="relative flex flex-col items-center gap-5 text-center "
      >
        <div className="img relative">
          <span className="absolute left-0 top-1 mx-1 bg-red-600 p-1 font-semibold cursor-pointer text-md">
            INFO
          </span>
          <img
            src={anime.images.webp.large_image_url}
            className="aspect-[9/16] object-cover"
          />
        </div>
        <div className="font-semibold">
          <h1>{anime.title.substring(0, 50)}...</h1>
        </div>
      </a>
      <button
        onClick={() => {
          addFavAnime(anime);
        }}
        className=" mx-1 bg-amber-300 p-1 text-neutral-950 font-semibold flex items-center gap-2 btn btn-sm w-fit hover:bg-amber-400 border-none"
      >
        <span>ADD TO</span>
        <img src={star} className="w-5 h-5" />
      </button>
    </div>
  );
};
