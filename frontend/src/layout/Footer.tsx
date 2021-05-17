import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 bg-gray-100 w-full h-40 px-3 py-5 flex flex-col">
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
      <span className="self-center mt-auto text-gray-600 font-semibold text-sm">
        Creado por:
        <span className="opacity-75">Freddy L. Paredes B. (2018 - 1001)</span>
      </span>
    </footer>
  );
}
