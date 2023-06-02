import clsx from "clsx";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister
} from 'react-hook-form';

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
      <label htmlFor={id} className="text-gray-800 font-bold ml-[2px]">{label}</label>  
      <input 
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        pattern={pattern}
        className={clsx(`
        border-gray-200
        border-[1px]
        rounded-md
        p-3
        font-normal
        mt-1
      `,
      errors[id] && "focus:ring-rose-500",
      disabled && "opacity-50 cursor-default"
      )}
      />
    </div>
  );
}
export default Input;