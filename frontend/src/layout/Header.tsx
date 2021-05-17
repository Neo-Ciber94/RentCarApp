import { useState } from "react";
import { Icon } from "react-native-elements";
import "./Header.css";

export default function Header() {
  const [isOpen, setToggleMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-5 px-3 shadow-md">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a href="#">
          <span className="font-semibold text-4xl tracking-tight text-red-600">
            Rent Car
          </span>
        </a>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setToggleMenu(!isOpen)}
          className="flex items-center text-4xl focus:outline-none p-2 rounded hover:text-red-600 hover:border-red-600 focus:border-red-600"
        >
          {isOpen ? (
            <span className="material-icons text-4xl">close</span>
          ) : (
            <span className="material-icons text-4xl">menu</span>
          )}
        </button>
      </div>

      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto transition-all ease-out duration-200 lg:h-0 ${
          isOpen ? "max-h-52" : "max-h-0"
        }`}
        id="menu"
      >
        <div className="text-2xl ml-auto">
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-red-600 mr-4"
          >
            Reserve
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-red-600 mr-4"
          >
            Vehicles
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-400 hover:text-red-600 mr-4"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
}
