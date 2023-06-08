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
  aria?: string;
  hover?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  secondary,
  disabled,
  type,
  onClick,
  fullWidth,
  style,
  icon: Icon,
  aria,
  hover,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={text ? text : aria}
      className={clsx(
        `
        border
        flex 
        items-center 
        justify-center 
        font-bold 
        p-2 
        rounded-md
        gap-2
        shadow
      `,
        secondary
          ? "text-gray-100 bg-gray-900"
          : "text-gray-600 border-gray-200",
        disabled && "opacity-70",
        fullWidth && "w-full",
        style && style,
        hover &&
          "transition hover:transition duration-300 hover:duration-300 hover:drop-shadow-md hover:shadow-sky-200"
      )}
    >
      {text}
      {Icon && <Icon size={24} />}
    </button>
  );
};

export default Button;
