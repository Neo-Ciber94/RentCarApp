import { useState } from "react";
import "./NavDropdown.css";

type DropdownBehaviour = "hover" | "click";

interface NavDropdownProps {
  name: string;
  behaviour?: DropdownBehaviour;
}

export const NavDropdown: React.FC<NavDropdownProps> = (props) => {
  const { behaviour = "click" } = props;

  if (behaviour === "hover") {
    return <HoverableDropdown {...props} />;
  } else {
    return <ClickableDropdown {...props} />;
  }
};

const HoverableDropdown: React.FC<NavDropdownProps> = (props) => {
  return (
    <div className="hoverable dropdown cursor-pointer">
      <div className="nav-link dropdown-btn select-none">
        {props.name}
        <i className="fa fa-caret-down ml-2"></i>
      </div>
      <div className="hoverable dropdown-content bg-gray-100 lg:bg-white shadow-inner lg:shadow">
        {props.children}
      </div>
    </div>
  );
};

const ClickableDropdown: React.FC<NavDropdownProps> = (props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="dropdown cursor-pointer">
      <button
        className="nav-link dropdown-btn select-none"
        onClick={() => setOpen(!isOpen)}
      >
        {props.name}
        <i className="fa fa-caret-down ml-2"></i>
      </button>
      <div
        className={`dropdown-content bg-gray-100 lg:bg-white shadow-inner lg:shadow ${
          isOpen ? "flex flex-col" : "hidden"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};
