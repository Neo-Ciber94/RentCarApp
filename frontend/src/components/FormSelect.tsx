import { Field } from "formik";

type SelectOption = {
  label: string;
  value: string | number;
};

interface Props {
  label: string;
  options: SelectOption[] | Record<string, string | number>;
  error?: string | undefined;
  touched?: boolean | undefined;
  defaultOption?: string | undefined;
}

// prettier-ignore
type SelectProps = Props & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

export const FormSelect: React.FC<SelectProps> = ({
  error,
  touched,
  defaultOption,
  ...props
}) => {
  let options: JSX.Element[] = [];
  const errorClass = error && touched ? "border-red-600" : "";

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
        {...props}
        as="select"
        name={props.name}
        className={`w-full shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorClass}`}
      >
        {defaultOption && <option label={defaultOption} hidden />}
        {options}
      </Field>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
