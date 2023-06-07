import clsx from "clsx";
import { IconType } from "react-icons";

interface ButtonProps {
  text?: string;
  secondary?: boolean;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
  fullWidth?: boolean;
  style?: string;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  text,
  secondary,
  disabled,
  type,
  onClick,
  fullWidth,
  style,
  icon: Icon 
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `
        border-[1px] 
        flex 
        items-center 
        justify-center 
        font-bold 
        p-2 
        rounded-md
        gap-2
      `,
        secondary
          ? "text-gray-100 bg-gray-900"
          : "text-gray-600 border-gray-200",
        disabled && "opacity-70",
        fullWidth && "w-full",
        style && style
      )}
    >
      {text}
      {Icon && <Icon size={24} />}
    </button>
  );
};

export default Button;
