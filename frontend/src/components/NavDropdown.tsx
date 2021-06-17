import { useRef, useState } from "react";
import "./NavDropdown.css";

type DropdownBehaviour = "hover" | "click";

interface NavDropdownProps {
  name: string;
  behaviour?: DropdownBehaviour;
}

export const NavDropdown: React.FC<NavDropdownProps> = (props) => {
  const { behaviour = "hover" } = props;

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

  const divRef = useRef<HTMLDivElement>(null);

  const handleSetOpen = () => {
    const open = !isOpen;
    const element = divRef.current!;

    if (open) {
      const height = Array.from(element.children).reduce((prev, cur) => {
        const style = window.getComputedStyle(cur);

        // prettier-ignore
        const py = parseFloat(style.paddingBottom) + parseFloat(style.paddingTop);
        const my = parseFloat(style.marginBottom) + parseFloat(style.marginTop);
        return parseFloat(style.height) + prev + py + my - 16;
      }, 0);

      element.style.height = height + "px";
    } else {
      element.style.height = "0px";
    }

    setOpen(open);
  };

  return (
    <div className="dropdown cursor-pointer">
      <button
        className="nav-link dropdown-btn select-none"
        onClick={handleSetOpen}
      >
        {props.name}
        <i className="fa fa-caret-down ml-2"></i>
      </button>
      <div
        ref={divRef}
        className={`dropdown-content bg-gray-100 lg:bg-white shadow-inner lg:shadow flex flex-col overflow-hidden transition-all duration-300`}
      >
        {props.children}
      </div>
    </div>
  );
};
