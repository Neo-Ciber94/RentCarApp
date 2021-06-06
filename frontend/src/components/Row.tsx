import "./Row.css";

export const Row: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 justify-between responsive-row">
      {children}
    </div>
  );
};
