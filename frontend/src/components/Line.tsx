interface LineProps {
  height?: number;
  margin?: number;
}

export const Line: React.FC<LineProps> = ({ height = 8, margin = 4 }) => {
  return (
    <div
      className="bg-red-600 w-full shadow"
      style={{ height, marginTop: margin, marginBottom: margin }}
    ></div>
  );
};
