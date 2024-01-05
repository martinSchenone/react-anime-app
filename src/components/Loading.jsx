export const Loading = () => {
  return (
    <div className="grid min-h-screen">
      <div className="flex flex-col items-center justify-center gap-5">
        <svg
          className="animate-spin h-10 w-10 mr-3 bg-slate-50"
          viewBox="0 0 24 24"
        ></svg>
        <h1 className="text-3xl">Loading animes...</h1>
      </div>
    </div>
  );
};
