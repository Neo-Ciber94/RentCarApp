interface NavDropdownProps {
  name: string;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ name, ...props }) => {
  return (
    <div className="dropdown cursor-pointer">
      <div className="text-gray-400 p-4 hover:bg-red-600 hover:text-white dropdown-btn select-none">
        {name}
        <i className="fa fa-caret-down ml-2"></i>
      </div>
      <div className="dropdown-content bg-gray-100 lg:bg-white shadow-inner lg:shadow">
        {props.children}
      </div>
    </div>
  );
};
