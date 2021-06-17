import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-200 w-full px-4 sm:px-8 py-5 mt-auto">
      <div className="flex flex-col h-36">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <span
              id="logo"
              className="font-semibold text-4xl tracking-tight text-black"
            >
              Rent Car
            </span>
          </Link>
        </div>
        <span className="self-center mt-auto text-red-800 font-semibold text-sm">
          Creado por:
          <span className="opacity-75 ml-2 text-red-600">
            Freddy L. Paredes B. (A00100796)
          </span>
        </span>
      </div>
    </footer>
  );
}
