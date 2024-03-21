import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { FaBars } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

import Menu from "./Menu";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 space-x-4 bg-primary">
      <h1 className="text-lg md:text-xl font-extrabold text-txt">
        <Link to="/">Cultural Exchange</Link>
      </h1>

      {path === "/" && (
        <div className="max-w-md mx-auto md:w-[2500px] bg-txt rounded-lg">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-txt overflow-hidden">
            <div
              className="grid place-items-center h-full w-12 text-gray-300"
              onClick={() =>
                navigate(prompt ? "?search=" + prompt : navigate("/"))
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  className="cursor-pointer"
                />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search..."
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* <div className="max-w-md mx-auto md:w-[2500px]">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                onClick={() =>
                  navigate(prompt ? "?search=" + prompt : navigate("/"))
                }
                className="cursor-pointer"
              />
            </svg>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search..."
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      </div> */}

      {/* {path === "/" && (
        <div className="flex justify-center items-center space-x-0">
          <p
            onClick={() =>
              navigate(prompt ? "?search=" + prompt : navigate("/"))
            }
            className="cursor-pointer"
          >
            <BsSearch />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none px-3 "
            placeholder="Search a post"
            type="text"
          />
        </div>
      )} */}
      <div className="text-txt hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/write"><MdAddCircleOutline className="h-6 w-6" /></Link>
            {/* <Link to="/write">Write</Link> */}
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars color="#FEFEFE" />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars color="#FEFEFE" />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
