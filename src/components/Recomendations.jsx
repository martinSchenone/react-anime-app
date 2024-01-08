import { useRef, useEffect, Suspense } from "react";
import { register } from "swiper/element/bundle";
import { Error } from "./Error";
import { Loading } from "./Loading";


export const Recomendations = ({ recommendationsList, error, isLoading }) => {
  const swiperElementRef = useRef(null);
  useEffect(() => {
    register();

    const params = {
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        568: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
      },
    };
    Object.assign(swiperElementRef.current, params);

    swiperElementRef.current.initialize();
  }, []);

  const results = recommendationsList?.map((anime) => anime.entry).slice(0, 10);
  const onlyResult = results?.map((r) => r[0]);

  return (
    <>
      <section className="shadow-2xl my-10 p-2 min-h-[50dvh]">
        <div className="max-w-6xl mx-auto  text-2xl  uppercase ">
          <h1 className="w-fit border-b-2">recommended animes to watch</h1>
        </div>
          <div className="max-w-6xl mx-auto my-10  w-full">
            {isLoading && <Loading />}
            {error && <Error error={error} />}
            <swiper-container
              init="false"
              ref={swiperElementRef}
              navigation="true"
              loop="true"
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
            >
              {onlyResult &&
                onlyResult?.map((anime) => (
                  <swiper-slide key={anime.mal_id}>
                    <div className="flex flex-col  items-center justify-center gap-5 p-4  h-[25rem] lg:h-[30rem]">
                      <div
                        className="text-center  shadow-none flex 
              "
                      >
                        <h1 className="text-xl border-b-2">
                          <a target="_blank" rel="noreferrer" href={anime.url}>
                            {anime.title.length > 25
                              ? `${anime.title.substring(0, 20)}...`
                              : anime.title}
                          </a>
                        </h1>
                      </div>
                      <div className="max-w-6xl mx-auto rounded-xl overflow-hidden  shadow-none   ">
                        <a
                          href={anime.url}
                          target="_blank"
                          rel="noreferrer"
                          className="relative "
                        >
                          <img
                            src={anime.images.webp.large_image_url}
                            className="h-full w-full relative z-10 hover:opacity-30 shadow-none hover:scale-125 transition-all "
                          />
                        </a>
                      </div>
                    </div>
                  </swiper-slide>
                ))}
            </swiper-container>
          </div>
      </section>
    </>
  );
};
