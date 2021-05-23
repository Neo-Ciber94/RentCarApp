interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const PrimaryButton: React.FC<ButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={`bg-red-600 hover:bg-red-800 text-white text-xl py-3 px-8 rounded-lg shadow active:bg-red-700 focus:outline-none ${
        className || ""
      }`}
    >
      {props.children}
    </button>
  );
};
