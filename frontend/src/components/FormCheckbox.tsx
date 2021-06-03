import { Field } from "formik";

interface Props {
  label: string;
  error?: string;
  touched?: boolean;
  options?: string[];
}

// prettier-ignore
type FormCheckboxProps = Props & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const FormCheckbox: React.FC<FormCheckboxProps> = (props) => {
  const { error, options } = props;

  if (options && options.length > 0) {
    return (
      <div className="mb-4" role="group" aria-labelledby="checkbox-group">
        <label className="block text-gray-700 text-base font-bold mb-2">
          {props.label}
        </label>
        {options.map((opt) => (
          <div className="flex flex-row gap-4">
            <CheckboxField key={opt} {...props} name={opt} />
            <label className="block text-gray-700 text-base mb-2">{opt}</label>
          </div>
        ))}
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  } else {
    return (
      <div className="mb-4 flex flex-row gap-4">
        <CheckboxField {...props} />
        <label className="block text-gray-700 text-base font-bold mb-2">
          {props.label}
        </label>

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
};

function CheckboxField({ error, touched, name, ...rest }: FormCheckboxProps) {
  const errorClass = error && touched ? "border-red-600" : "";

  return (
    <Field
      {...rest}
      type="checkbox"
      name={name}
      className={`shadow border h-6 w-6 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errorClass}`}
    ></Field>
  );
}
