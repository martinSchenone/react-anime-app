import { NavLink, Outlet } from "react-router-dom";
import { SearchComponent } from "./SearchComponent";
export const Layout = () => {
  return (
    <>
      <div className="drawer bg-slate-900 -tracking-tighter block">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-slate-900">
          {/* Navbar */}
          <div className="w-full navbar bg-[#b3c7f7] text-slate-800">
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
            <div className="flex-1 px-2 mx-2 text-2xl font-bold -tracking-tight">
              <NavLink to={"/"}>
                <h1 className="hover:scale-105 transition-all">ANIMEX</h1>
              </NavLink>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal items-center gap-10 text-xl">
                {/* Navbar menu content here */}
                <NavLink
                  to={"/"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? " text-blue-400 after:flex transition-all after:h-[2px]  after:opacity-100 after:bg-black"
                      : ""
                  }
                >
                  HOME
                </NavLink>
                <NavLink
                  to={"/star_animes"}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "  pending"
                      : isActive
                      ? " text-blue-400 after:flex transition-all after:h-[2px]  after:opacity-100 after:bg-black"
                      : ""
                  }
                >
                  FAVORITES
                </NavLink>
                <SearchComponent />
              </ul>
            </div>
          </div>
          <Outlet />
        </div>
        <div className="drawer-side  z-10 text-slate-800">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay "
          >
          </label>
          <ul className="menu p-4 w-[min(250px,80%)] min-h-full bg-[#b3c7f8] gap-5 text-xl">
            {/* Sidebar content here */}
            <NavLink
              to={"/"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "  pending"
                  : isActive
                  ? " text-blue-400 after:flex transition-all after:h-[2px]  after:opacity-100 after:bg-black"
                  : ""
              }
            >
              HOME
            </NavLink>
            <NavLink
              to={"/star_animes"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "  pending"
                  : isActive
                  ? " text-blue-400 after:flex transition-all after:h-[2px] after:opacity-100 after:bg-black"
                  : ""
              }
            >
              FAVORITES
            </NavLink>
            <SearchComponent />
          </ul>
        </div>
      </div>
    </>
  );
};
