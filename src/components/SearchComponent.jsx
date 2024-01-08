import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const SearchComponent = () => {
  const navigate = useNavigate();
  const inputRef = useRef("");
  const handleInput = (e) => {
    inputRef.current = e.target.value.trim().toLowerCase();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${inputRef.current}`);
  };
  return (
    <div className="flex-none gap-2">
      <form className=" form-control relative">
        <input
          placeholder="Search..."
          type="text"
          className="peer text-white relative input input-bordered    w-full text-gray-950  focus:placeholder:translate-y-8 focus:placeholder:transition-all"
          onChange={handleInput}
          required
        ></input>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-ghost btn-square absolute  right-0 bg-gray-800 opacity-0 peer-focus:opacity-100 peer-focus:transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};
