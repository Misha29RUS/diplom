import CloseSvg from "../../img/input_svg/close.svg?react"

type InputProps = {
    placeholder?: string;
    setTakeValue: React.Dispatch<React.SetStateAction<string>> | ((newValue: string) => void);
    value: string;
    styles?: string;
    stylesInput?: string;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export const Input = ({
    placeholder,
    setTakeValue,
    value,
    styles,
    stylesInput,
    onBlur,
    onFocus
}: InputProps) => {
    return (
        <div className={`relative w-full ${styles}`}>
            <input
                onChange={(event) => setTakeValue(event.target.value)}
                value={value}
                placeholder={placeholder}
                type="text"
                onBlur={onBlur}
                onFocus={onFocus}
                className={`border w-full border-s-light-grey rounded-lg text-s-black
                px-4 py-3 pr-9 font-light text-[18px] placeholder:text-s-light-grey
                hover:border-s-dark-grey hover:placeholder:text-s-dark-grey
                outline-none ${stylesInput}`} />
            {value && (
                <CloseSvg className="absolute top-3 right-4 cursor-pointer"
                onClick={() => setTakeValue("")} />
            )}  
        </div>
    )
} 