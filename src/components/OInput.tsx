import { Input } from "antd";

const OInput = ({
  label,
  labelClassName,
  adjLabelIcon,
  type,
  value,
  changeHandler,
  addOnBefore,
  inputClassName,
  placeholder,
  divClassName,
}: {
  label: string;
  adjLabelIcon?: JSX.Element;
  type: string;
  inputClassName?: string;
  value: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addOnBefore?: string | JSX.Element;
  placeholder?: string;
  divClassName?: string;
  labelClassName?: string;
}) => {
  return (
    <div className={divClassName}>
      <label className={`font-bold ${labelClassName}`}>
        {label} {adjLabelIcon ? adjLabelIcon : ""}
      </label>
      <Input
        type={type}
        className={inputClassName}
        value={value}
        onChange={changeHandler}
        placeholder={placeholder}
        addonBefore={addOnBefore}
      />
    </div>
  );
};

export default OInput;
