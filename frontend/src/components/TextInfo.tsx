import { TextWithLabel } from ".";

export function TextInfo(props: {
  label: string;
  value: string | number | Date | boolean | null | undefined;
}) {
  return (
    <div className="mb-4">
      <TextWithLabel label={props.label} value={props.value} />
      <hr />
    </div>
  );
}
