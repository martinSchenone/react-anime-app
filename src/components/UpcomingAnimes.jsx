import { Error } from "./Error";
import { Loading } from "./Loading";

export const UpcomingAnimes = ({ upAnimes, isLoading, error }) => {
  const results = upAnimes?.data?.map((anime) => anime);

  return (
    <>
      <div className="p-2 border-l-slate-500 border-l behavior overflow-y-scroll h-[100rem]">
        <div className="text-2xl font-semibold uppercase my-3 flex justify-center w-full">
          <h1 className="w-fit border-b-2"> Up coming animes</h1>
        </div>
        {isLoading && <Loading />}
        {error && <Error error={error} />}
        {results?.map((anime) => (
          <div
            key={anime.mal_id}
            className=" flex flex-col gap-5 p-5 justify-center"
          >
            <img
              src={anime.images.webp.large_image_url}
              className="aspect-[4/3] object-cover"
            />
            <h1 className="self-center text-center">{anime.title}</h1>
          </div>
        ))}
      </div>
    </>
  );
};
