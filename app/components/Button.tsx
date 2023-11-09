import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      className={`
      relative
      disabled:opacity-60
      disabled:cursor-not-allowed
      rounded-xl
      transition
      w-full
      ${
        outline
          ? "hover:bg-rose-500 hover:text-white hover:border-gray-300 transition"
          : " hover:bg-white hover:text-black hover:border-black transition"
      }
      ${outline ? "bg-white" : "bg-rose-500"}
      ${outline ? "border-black" : "border-gray-300"}
      ${outline ? "text-black" : "text-white"}
      ${small ? "py-2" : "py-3"}
      ${small ? "text-sm" : "text-md"}
      ${small ? "font-light" : "font-semibold"}
      ${small ? "border-[1px]" : "border-2"}
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
