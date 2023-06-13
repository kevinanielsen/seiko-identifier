import clsx from "clsx";
import { IconType } from "react-icons";


interface AuthSocialButtonProps {
  text?: string;
  icon: IconType;
  secondary?: boolean;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  text,
  icon: Icon,
  secondary,
  disabled,
  type,
  onClick
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx("btn btn-outline",
        secondary && "btn-neutral",
        disabled && "disabled"
      )}
    >
      <Icon size={20} />
      {text}
    </button>
  );
};

export default AuthSocialButton;
