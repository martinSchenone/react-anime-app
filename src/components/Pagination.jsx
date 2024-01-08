export const Pagination = ({prevPage,nextPage}) => {
  return (
    <div className="join grid grid-cols-2 pt-10 gap-2 ">
      <button className="join-item btn text-white text-lg" onClick={prevPage}>
        Previous page
      </button>
      <button className="join-item btn text-white text-lg" onClick={nextPage}>
        Next
      </button>
    </div>
  );
};
