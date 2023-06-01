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
        w-full
      `,
        secondary
          ? "text-gray-100 bg-gray-900"
          : "text-gray-600 border-gray-200 ",
        disabled && "opacity-70"
      )}
    >
      <Icon />
      {text}
    </button>
  );
};

export default AuthSocialButton;
