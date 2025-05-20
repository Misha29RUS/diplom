import { Link } from "react-router-dom"

type NavButtonProps = {
    text?: string;
    styles?: string;
    isActive?: boolean;
    to?: string;
    iconLeft?: React.ReactNode; 
    iconRight?: React.ReactNode; 
    onlyIcon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

export const NavButton = ({
    text, 
    styles,
    isActive, 
    to,
    iconLeft,
    iconRight,
    onlyIcon,
    onClick
}: NavButtonProps) => {
    return (
        <Link 
            to={to!}
            onClick={onClick}
            className={`group font-medium text-[18px] 
            transition ease-linear delay-75 flex items-center
            ${isActive ? 'text-s-red' : 'text-s-white hover:text-s-dark-grey'}
             ${styles}`}>
                {onlyIcon ? (
                    <span className={`delay-75 transition ease-linear
                    ${isActive ? 'fill-s-red' : 'fill-s-white hover:fill-s-dark-grey'}`}>
                        {onlyIcon}
                    </span>
                ) : (
                    <>
                        {iconLeft && <span 
                        className={`mr-1 delay-75 transition ease-linear
                        ${isActive ? 'fill-s-red' : 'fill-s-white group-hover:fill-s-dark-grey'}`}>
                            {iconLeft}
                        </span>}
                        {text && <span>{text}</span>}
                        {iconRight && <span 
                        className={`ml-1 delay-75 transition ease-linear
                        ${isActive ? 'fill-s-red' : 'fill-s-white group-hover:fill-s-dark-grey'}`}>
                            {iconRight}
                        </span>}
                    </>
                )}
        </Link>
    )
}