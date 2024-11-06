import React from "react";
import InputField from "../atoms/Input";

type Props = {
  error: string;
  name: string;
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  type: string;
  value: string;
};

const InputLabels = (props: Props) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {props.label}
      </label>
      <InputField
        error={props.error}
        label={props.label}
        name={props.name}
        onChange={props.onChange}
        type={props.type}
        value={props.value}
      />
      {props.error && (
        <p className="text-red-500 text-xs mt-1">{props.error}</p>
      )}
    </div>
  );
};

export default InputLabels;
