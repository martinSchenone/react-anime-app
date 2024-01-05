export const Error = ({ error }) => {
  return (
    <div className="grid place-content-center min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="self-center text-2xl font-bold">
          there was an error: {error.message}
        </h1>
      </div>
    </div>
  );
};
