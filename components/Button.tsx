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
        btn
        shrink
      `,
        secondary && "btn-neutral",
        fullWidth && "w-full",
        style && style,
      )}
    >
      {text}
      {Icon && <Icon size={24} />}
    </button>
  );
};

export default Button;
