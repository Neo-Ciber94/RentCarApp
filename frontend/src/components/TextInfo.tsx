import { TextWithLabel } from ".";

interface TextInfoProps {
  label: string;
  value: string | number | Date | boolean | null | undefined;
  className?: string;
}

export function TextInfo(props: TextInfoProps) {
  return (
    <div className={`mb-4 ${props.className || ""}`}>
      <TextWithLabel label={props.label} value={props.value} />
      <hr />
    </div>
  );
}
