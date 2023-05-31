interface InputProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  disabled,
}) => {
  return (
    <label className="flex flex-col">
      <p className="text-gray-800 font-bold ml-[2px]">{label}</p>
      <input 
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        className="
          border-gray-200
          border-[1px]
          rounded-md
          p-3
          font-normal
          mt-1
        "
      />
      
    </label>
  );
}
export default Input;