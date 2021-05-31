interface TextProps {
  label: string;
  value: string | number | Date | boolean | null | undefined;
}

export const TextWithLabel: React.FC<TextProps> = ({ label, value }) => {
  return (
    <div>
      <div className="font-bold">{label}</div>
      <div className="col-span-2">{value}</div>
    </div>
  );
};
