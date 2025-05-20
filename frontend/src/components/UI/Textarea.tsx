import CloseSvg from "../../img/input_svg/close.svg?react"

type TextareaProps = {
    placeholder?: string;
    setTakeValue: React.Dispatch<React.SetStateAction<string>> | ((newValue: string) => void);
    value: string;
    styles?: string;
};

export const Textarea = ({
    placeholder,
    setTakeValue,
    value,
    styles
}: TextareaProps) => {
    return (
        <div className={`relative w-full ${styles}`}>
            <textarea
                onChange={(event) => setTakeValue(event.target.value)}
                value={value}
                placeholder={placeholder}
                maxLength={100}
                className={`border w-full border-s-light-grey rounded-lg text-s-black
                px-4 py-3 pr-9 font-light text-[18px] placeholder:text-s-light-grey
                hover:border-s-dark-grey hover:placeholder:text-s-dark-grey
                outline-none resize-none`} />
            {value && (
                <CloseSvg className="absolute top-3 right-4 cursor-pointer"
                onClick={() => setTakeValue("")} />
            )}
        </div>
    )
} 