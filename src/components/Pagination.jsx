export const Pagination = ({prevPage,nextPage}) => {
  return (
    <div className="join grid grid-cols-2 pt-10 gap-2">
      <button className="join-item btn " onClick={prevPage}>
        Previous page
      </button>
      <button className="join-item btn " onClick={nextPage}>
        Next
      </button>
    </div>
  );
};
