import clsx from "clsx";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister
} from 'react-hook-form';

interface InputProps {
  id: string;
  label?: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  disabled,
  id,
  register,
  errors,
  required,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="text-gray-800 font-bold ml-[2px]">{label}</label>  
      <input 
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
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