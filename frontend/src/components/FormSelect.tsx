import { Field } from "formik";

type SelectOption = {
  label: string;
  value: string | number;
};

interface Props {
  label: string;
  options: SelectOption[] | Record<string, string | number>;
  error?: string;
  touched?: boolean;
  defaultLabel?: string;
}

// prettier-ignore
type SelectProps = Props & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

export const FormSelect: React.FC<SelectProps> = ({
  error,
  touched,
  ...props
}) => {
  let options: JSX.Element[] = [];

  if (Array.isArray(props.options)) {
    options = props.options.map((opt, index) => (
      <option key={index} value={opt.value} label={opt.label} />
    ));
  } else {
    let index = 0;
    for (const key in props.options) {
      const value = props.options[key];
      options.push(<option key={index} value={value} label={key} />);
      index += 1;
    }
  }

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-base font-bold mb-2">
        {props.label}
      </label>
      <Field
        as="select"
        name={props.name}
        className={`w-full shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error && touched && "border-red-600"
        }`}
      >
        {props.defaultLabel && (
          <option value="" selected>
            {props.defaultLabel}
          </option>
        )}
        {options}
      </Field>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
