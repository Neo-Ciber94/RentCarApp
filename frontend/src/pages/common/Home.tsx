import { Link } from "react-router-dom";
import { BaseRoutes } from "src/layout";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <div className="w-full bg-image relative">
        <div className="text-sm md:text-2xl absolute bottom-4 right-7 font-extralight text-white">
          Rent a car anywhere
        </div>
      </div>
      {/* Motto */}
      <div className="p-6 flex items-center flex-col md:flex-row">
        <span className="text-lg md:text-2xl font-medium">
          We have a car for you anywhere for everywhere
        </span>
        <Link
          to={{
            pathname: BaseRoutes.reservations.path,
            state: BaseRoutes.reservations.name,
          }}
          className="bg-red-600 hover:bg-red-800 rounded-lg mt-5 md:mt-0 ml-auto text-white p-3 text-center text-xl w-full md:w-2/6 shadow"
        >
          Reserve
        </Link>
      </div>
      {/* Cards */}
      <div className="flex flex-col md:flex-row justify-evenly items-center p-6 gap-3">
        <Card icon="fa fa-car" title="More than 40 cars" />
        <Card icon="fas fa-building" title="More than 34 offices" />
        <Card icon="fas fa-mobile-alt" title="Reserve from home" />
      </div>
    </div>
  );
}

function Card(props: { icon: string; title: string }) {
  return (
    <div
      className="rounded-md bg-white shadow-lg hover:shadow-xl transition-all duration-200 p-4 border border-gray-100 
      transform hover:scale-105 my-4"
      style={{ maxWidth: 280 }}
    >
      <div className="text-red-600 flex flex-row items-center justify-center p-3 text-7xl h-32">
        <i className={props.icon}></i>
      </div>
      <hr className="my-2" />
      <div className="text-lg text-center font-semibold my-2">
        {props.title}
      </div>
      <div className="text-sm text-justify">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem sapiente
        pariatur ipsa delectus. Eum quaerat modi perspiciatis porro totam
        placeat quasi, molestias distinctio reprehenderit laborum dolores
        accusamus amet officiis nihil!
      </div>
    </div>
  );
}
