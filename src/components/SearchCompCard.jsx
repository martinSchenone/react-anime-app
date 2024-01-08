export const SearchCompCard = ({ animeList }) => {
  return (
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
  );
};
