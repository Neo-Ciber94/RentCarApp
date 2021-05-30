import React, { CSSProperties, useState } from "react";

interface InputProps {
  onChange?: (s: string) => void;
  onReset?: () => void;
}

//prettier-ignore
type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const styles: CSSProperties = {
  position: "absolute",
  top: "calc(50% +  1px)",
  right: 8,
  transform: "translateY(-50%)",
  color: "brown",
};

export const InputWithReset: React.FC<InputProps & Omit<Props, "onChange">> = ({
  onChange,
  onReset,
  defaultValue,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState(defaultValue || "");

  const handleChange = (text: string) => {
    if (text.length > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    setText(text);
    onChange?.(text);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        {...rest}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-lg border border-gray-300 text-lg pl-2 pr-6 py-1 sm:w-auto w-full"
      />
      <i
        className={`fas fa-times cursor-pointer ${visible ? "" : "hidden"}`}
        onClick={() => {
          handleChange("");
          onReset?.();
        }}
        style={styles}
      ></i>
    </div>
  );
};
