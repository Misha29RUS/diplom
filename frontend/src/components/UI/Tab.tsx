type TabProps = {
    text?: string;
    select: boolean;
    styles?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Tab = ({
    text,
    select,
    styles,
    onClick
}: TabProps) => {
    return (
        <button onClick={onClick} 
        className={`font-medium text-[18px] text-s-light-grey 
        hover:text-s-black transition ease-linear delay-75 relative   
        ${select && 'text-s-red hover:text-s-red'} 
        ${styles}`}>
            {text}
            <span
                className={`absolute bottom-0 left-1/2 h-[2px] 
                bg-s-red transition-all ease-linear delay-75
                ${select ? 'w-full' : 'w-0'} transform -translate-x-1/2`}
            />
        </button>
    )
}