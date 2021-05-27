import { Field } from "formik";

interface Props {
  name: string;
  label: string;
  touched?: boolean;
  error?: string;
}

// prettier-ignore
type FormInputProps = Props & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const FormInput: React.FC<FormInputProps> = (props) => {
  const { error, label, name, touched, readOnly = false, ...rest } = props;

  if (readOnly) {
    return (
      <div className="mb-4">
        {!props.hidden && <Label name={name} label={label} />}
        <Field
          {...rest}
          name={name}
          readOnly
          className={`shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border border-gray-300 bg-gray-200 ${
            error && props.touched && "border-red-600"
          }`}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mb-4">
      {!props.hidden && <Label name={name} label={label} />}
      <Field
        {...rest}
        name={name}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error && props.touched && "border-red-600"
        }`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

const Label: React.FC<{ name: string; label: string }> = (props) => {
  return (
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={props.name}
    >
      {props.label}
    </label>
  );
};
