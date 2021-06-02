import { NavLink, NavLinkProps } from "react-router-dom";
import { RouteName } from "src/layout";
import { LocationDescriptor } from "history";

export type ButtonColor = "primary" | "secondary" | "warning" | "info";

interface ColoredButton {
  color?: ButtonColor;
}

interface LinkButtonProps {
  route?: RouteName;
}

const PRIMARY_COLOR =
  "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white ring ring-transparent focus:ring-red-300";
const SECONDARY_COLOR =
  "bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white ring ring-transparent focus:ring-gray-400";
const INFO_COLOR =
  "bg-blue-400 hover:bg-blue-500 active:bg-blue-500 text-black ring ring-transparent focus:ring-blue-200";
const WARNING_COLOR =
  "bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-500 text-black ring ring-transparent focus:ring-yellow-200";

// prettier-ignore
export type ButtonProps = ColoredButton & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

// prettier-ignore
export type LinkProps<S = unknown> = ColoredButton & LinkButtonProps & React.PropsWithoutRef<Partial<NavLinkProps<S>>> & React.RefAttributes<HTMLAnchorElement>;

export const MainButton: React.FC<ButtonProps> = ({
  className,
  color,
  ...props
}) => {
  const btnColor = getColor(color);

  return (
    <button {...props} className={getClassNames(btnColor, className)}>
      {props.children}
    </button>
  );
};

export const LinkButton: React.FC<LinkProps> = ({
  className,
  color,
  to,
  route,
  ...props
}) => {
  if (to == null && route == null) {
    throw new Error("LinkButton require 'to' or 'route' property");
  }

  const btnColor = getColor(color);
  const location: LocationDescriptor = to
    ? (to as any)
    : { pathname: route?.path, state: route?.name };

  return (
    <NavLink
      {...props}
      to={location}
      className={getClassNames(btnColor, className) + "inline-block"}
    >
      {props.children}
    </NavLink>
  );
};

// prettier-ignore
function getClassNames(btnColor: string, className?: string) {
  return `${btnColor} py-2 px-6 rounded shadow focus:outline-none ${className || ""}`;
}

function getColor(buttonColor?: ButtonColor) {
  switch (buttonColor) {
    case "primary":
      return PRIMARY_COLOR;
    case "secondary":
      return SECONDARY_COLOR;
    case "warning":
      return WARNING_COLOR;
    case "info":
      return INFO_COLOR;
    default:
      return PRIMARY_COLOR;
  }
}
