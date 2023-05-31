import clsx from "clsx";

interface ButtonProps {
  text?: string;
  children?: React.ReactNode;
  secondary?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  children,
  secondary,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
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
      {children}
      {text}
    </button>
  );
};

export default Button;
