import "./NavDropdown.css";

interface NavDropdownProps {
  name: string;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ name, ...props }) => {
  // const [open, setOpen] = useState(false);

  // const toggleDropdown = useCallback(() => setOpen(!open), []);

  return (
    <div className="dropdown cursor-pointer">
      <div className="nav-link dropdown-btn select-none">
        {name}
        <i className="fa fa-caret-down ml-2"></i>
      </div>
      <div className="dropdown-content bg-gray-100 lg:bg-white shadow-inner lg:shadow">
        {props.children}
      </div>
    </div>
  );
};
