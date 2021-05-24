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

export const PrimaryButton: React.FC<ButtonProps> = ({
  className,
  color,
  ...props
}) => {
  const btnColor = getColor(color);

  return (
    <button
      className={`${btnColor} text-xl py-3 px-8 rounded-lg shadow focus:outline-none ${
        className || ""
      }`}
    >
      {props.children}
    </button>
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
