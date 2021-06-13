import { Field } from "formik";
import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { FormInput } from ".";
import "./FormFile.css";

interface FormFileProps {
  label: string;
  name: string;
  className?: string;
  onFile: (name: string, file: File) => void;
}

export const FormFile: React.FC<FormFileProps> = ({
  label,
  name,
  className,
  onFile,
}) => {
  const [file, setFile] = useState<File>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>();

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  });

  return (
    <div className={`my-1 ${className || ""}`}>
      <Label text={label} />
      {imagePreviewUrl != null && (
        <div className="mb-2 rounded-lg overflow-hidden shadow-md border border-gray-500 border-opacity-25">
          <img
            className="w-full object-cover"
            alt={file?.name ?? "vehicle"}
            style={{ maxHeight: 300 }}
            src={imagePreviewUrl}
          />
        </div>
      )}

      <div className="flex flex-row h-9 justify-items-center items-center">
        <div
          className={`relative whitespace-nowrap 
          break-words bg-red-600 hover:bg-red-700 h-full
          text-white text-md cursor-pointer rounded-tl-md rounded-bl-md
          flex flex-row items-center justify-center
          py-2 px-4 ring ring-transparent focus-within:ring-red-300`}
        >
          <Field
            title=""
            name={name}
            type="file"
            value=""
            className="absolute opacity-0 w-full top-0 left-0 bottom-0 right-0 overflow-hidden cursor-pointer m-0 p-0"
            accept="image/png, image/jpeg"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const imageFile = e.currentTarget.files![0];
              onFile(name, imageFile);
              setFile(imageFile);
              setImagePreviewUrl(URL.createObjectURL(imageFile));
            }}
          />

          <span>Choose File</span>
        </div>

        <div
          className={`whitespace-nowrap overflow-hidden overflow-ellipsis 
            border border-gray-400 rounded-tr-md rounded-br-md 
            bg-white h-full px-4 py-2 text-gray-600 text-sm w-full ${
              file == null ? "text-opacity-50" : ""
            }`}
        >
          {file?.name || "No file selected"}
        </div>
      </div>
    </div>
  );

  //   return (
  //     <FormInput
  //       label={label}
  //       name={name}
  //       type="file"
  //       value=""
  //       accept="image/png, image/jpeg"
  //       onChange={(e) => {
  //         const imageFile = e.currentTarget.files![0];
  //         onFile(name, imageFile);
  //         setFile(imageFile);
  //         setImagePreviewUrl(URL.createObjectURL(imageFile));
  //       }}
  //     >
  //       {imagePreviewUrl != null && (
  //         <div className="mb-2 rounded-lg overflow-hidden shadow-md border-gray-300">
  //           <img
  //             className="w-full object-cover"
  //             alt={file?.name ?? "vehicle"}
  //             style={{ maxHeight: 300 }}
  //             src={imagePreviewUrl}
  //           />
  //         </div>
  //       )}
  //     </FormInput>
  //   );
};

const Label: React.FC<{ text: string }> = (props) => {
  return (
    <div className="block text-gray-700 text-base font-bold mb-2">
      {props.text}
    </div>
  );
};
