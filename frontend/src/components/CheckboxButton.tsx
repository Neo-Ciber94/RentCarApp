interface CheckboxButtonProps {
  text: string;
  checked?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CheckboxButton: React.FC<CheckboxButtonProps> = ({
  text,
  checked,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        checked ? "bg-red-700" : "bg-red-600"
      } hover:bg-red-700 active:bg-red-800 text-white 
        ring ring-transparent focus:ring-red-300 
        py-2 px-6 rounded text-center cursor-pointer focus:outline-none ${className}`}
    >
      {text}
    </button>
  );
};
