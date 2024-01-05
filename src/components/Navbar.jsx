import { NavLink } from "react-router-dom";
import { SearchComponent } from "./SearchComponent";
export const Navbar = () => {
  return (
    <div className="drawer bg-sky-900 -tracking-tighter">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-sky-900">
        {/* Navbar */}
        <div className="w-full navbar bg-sky-900">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 text-2xl font-bold -tracking-tight"><h1>ANIMEX</h1></div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal items-center gap-10 text-xl">
              {/* Navbar menu content here */}
              <NavLink
                to={"/"}
                className={"cursor-pointer transition-all "}
              >
                HOME
              </NavLink>
              <NavLink
                to={"/star_animes"}
                className={"cursor-pointer transition-all "}
              >
                FAVORITES
              </NavLink>
              <SearchComponent />
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side  z-10">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-sky-900 gap-5 text-xl">
          {/* Sidebar content here */}
          <NavLink
            to={"/"}
            className={"cursor-pointer transition-all "}
          >
            HOME
          </NavLink>
          <NavLink
            to={"/star_animes"}
            className={"cursor-pointer transition-all "}
          >
            FAVORITES
          </NavLink>
          <SearchComponent />
        </ul>
      </div>
    </div>
  );
};
