type ButtonProps = {
    text?: string | number;
    type: string;
    styles?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    iconLeft?: React.ReactNode; 
    iconRight?: React.ReactNode; 
    onlyIcon?: React.ReactNode;
}

export const Button = ({
  text,
  type,
  styles,
  onClick,
  disabled,
  iconLeft,
  iconRight,
  onlyIcon,
}: ButtonProps) => {
  const greyStyle = `
        py-[9px] border-s-dark-grey text-s-dark-grey 
        hover:text-s-white hover:bg-s-black 
        disabled:text-s-dark-grey disabled:border-s-dark-grey 
        disabled:bg-transparent border bg-transparent 
        hover:border-s-black
    `;
  const redStyle = `
        py-[10px] text-s-white bg-s-red 
        hover:bg-s-light-red 
        disabled:bg-s-dark-red
    `;

  const iconStyle = `
        delay-75 transition ease-linear 
        ${type === "grey" ? "fill-s-dark-grey" : type === "red" && "fill-s-white"}
        ${disabled ? "" : type === "grey" && "group-hover:fill-s-white"}
    `;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
                group font-medium text-[18px] rounded-md 
                transition ease-linear delay-75 
                disabled:cursor-not-allowed flex items-center leading-[1.22] 
                ${onlyIcon ? (type === "red" ? "px-[10px]" : type === "grey" ? "px-[9px]" : "") : type === "red" ? "px-[16px]" : type === "grey" ? "px-[15px]" : ""} 
                ${type === "grey" ? greyStyle : type === "red" && redStyle} 
                ${styles}
            `}
    >
      {onlyIcon ? (
        <span className={iconStyle}>{onlyIcon}</span>
      ) : (
        <>
          {iconLeft && <span className={`mr-1 ${iconStyle}`}>{iconLeft}</span>}
          {text && <span>{text}</span>}
          {iconRight && (
            <span className={`ml-1 ${iconStyle}`}>{iconRight}</span>
          )}
        </>
      )}
    </button>
  );
};
