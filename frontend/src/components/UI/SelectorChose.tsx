import { useState, useEffect, useRef } from "react";
import ArrowSvg from "../../img/selectors_svg/keyboard_arrow_down.svg?react";
import CloseSvg from "../../img/selectors_svg/close.svg?react";

type SelectorProps<T> = {
    placeholder: string;
    selectList: T[];
    setTakeValue: React.Dispatch<React.SetStateAction<T>>;
    value: T;
    labelKey?: keyof T;
    type?: string;
    styles?: string;
};

export const SelectorChose = <T extends object | number>({
                                                        placeholder,
                                                        selectList,
                                                        setTakeValue,
                                                        value,
                                                        labelKey,
                                                        type,
                                                        styles,
                                                    }: SelectorProps<T>) => {
    const [selectedData, setSelectedData] = useState<T | null>(value);
    const [showDropdown, setShowDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        // Обновляем локальное состояние, когда пропс value изменяется
        setSelectedData(value);
    }, [value]);
    return (
        <div className={`relative group w-full ${styles}`} ref={dropdownRef}>
            <input
                readOnly
                value={
                    typeof selectedData === "object" && labelKey
                        ? String(selectedData[labelKey])
                        : String(selectedData ?? "")
                }
                onClick={() => setShowDropdown((prev) => !prev)}
                className={`py-3 px-4 pr-[60px] w-full outline-none border font-light text-[18px] 
                ${
                    showDropdown
                        ? `rounded-t-lg ${type ? "border-s-white" : "border-s-dark-grey"} `
                        : `rounded-lg ${type ? "border-s-white" : "border-s-light-grey"}`
                }
                ${type ? "text-s-white" : "text-s-dark-grey"}
                ${type === "ACTIVE" ? "bg-s-red" : type === "HIDDEN" ? "bg-s-black" : ""}`}
                placeholder={placeholder}
            />
            {selectedData && (
                <CloseSvg
                    className={`absolute top-3.5 right-[38px] cursor-pointer ${
                        type ? "fill-s-white" : "fill-s-black"
                    }`}
                    onClick={() => {
                        setSelectedData(null);
                        setTakeValue(null as T); // Очистка выбранного значения
                    }}
                />
            )}
            <ArrowSvg
                onClick={() => setShowDropdown((prev) => !prev)}
                className={`absolute top-3.5 cursor-pointer right-4 
                ${type ? "group-hover:fill-s-white" : "group-hover:fill-s-dark-grey"}
                ${
                    showDropdown
                        ? `rotate-180 ${type ? "fill-s-white" : "fill-s-dark-grey"}`
                        : `${type ? "fill-s-white" : "fill-s-light-grey"}`
                }`}
            />

            {showDropdown && (
                <ul
                    className={`absolute left-0 right-0 max-h-[200px]
                overflow-y-auto border rounded-b-lg z-10 w-full
                ${type ? "border-s-white" : "border-s-dark-grey bg-white"}`}
                >
                    {selectList?.map((data, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setSelectedData(data);
                                setTakeValue(data);
                                setShowDropdown(false);
                            }}
                            className={`py-3 px-4 transition-colors cursor-pointer
                            ${!type && "hover:bg-s-light-grey"}
                            ${
                                type === "ACTIVE"
                                    ? "bg-s-red"
                                    : type === "HIDDEN"
                                        ? "bg-s-black"
                                        : ""
                            }`}
                        >
                            <p
                                className={`font-light text-[18px] ${
                                    type && "text-s-white"
                                }`}
                            >
                                {typeof data === "object" && labelKey
                                    ? String(data[labelKey])
                                    : String(data)}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
