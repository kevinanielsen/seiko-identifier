import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  type?: string;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  required?: boolean;
  pattern?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  disabled,
  id,
  type,
  register,
  errors,
  required,
  pattern,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        pattern={pattern}
        className={clsx(
          `
        input input-bordered
      `,
          errors[id] && "input-error",
        )}
      />
    </div>
  );
};
export default Input;
