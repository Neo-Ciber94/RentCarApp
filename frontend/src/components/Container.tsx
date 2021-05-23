interface ContainerProps {
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`container mx-auto p-4 ${className || ""}`}>{children}</div>
  );
};
