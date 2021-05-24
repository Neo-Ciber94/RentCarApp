import { NavLink, NavLinkProps } from "react-router-dom";

export type ButtonColor = "primary" | "secondary" | "warning";

interface ColoredButton {
  color?: ButtonColor;
}

const PRIMARY_COLOR =
  "bg-red-600 hover:bg-red-800 active:bg-red-700 text-white";
const SECONDARY_COLOR =
  "bg-gray-600 hover:bg-gray-800 active:bg-gray-700 text-white";
const WARNING_COLOR =
  "bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-400 text-color";

// prettier-ignore
type ButtonProps = ColoredButton & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

// prettier-ignore
type LinkProps<S = unknown> = ColoredButton & React.PropsWithoutRef<NavLinkProps<S>> & React.RefAttributes<HTMLAnchorElement>;

export const MainButton: React.FC<ButtonProps> = ({
  className,
  color,
  ...props
}) => {
  const btnColor = getColor(color);

  return (
    <button
      {...props}
      className={`${btnColor} py-2 px-6 rounded-lg shadow focus:outline-none ${
        className || ""
      }`}
    >
      {props.children}
    </button>
  );
};

export const LinkButton: React.FC<LinkProps> = ({
  className,
  color,
  ...props
}) => {
  const btnColor = getColor(color);

  return (
    <NavLink
      {...props}
      className={`${btnColor} py-2 px-6 rounded-lg shadow focus:outline-none text-center ${
        className || ""
      }`}
    >
      {props.children}
    </NavLink>
  );
};

function getColor(buttonColor?: ButtonColor) {
  switch (buttonColor) {
    case "primary":
      return PRIMARY_COLOR;
    case "secondary":
      return SECONDARY_COLOR;
    case "warning":
      return WARNING_COLOR;
    default:
      return PRIMARY_COLOR;
  }
}
