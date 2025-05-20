import CancelSvg from "../../img/select_item_svg/cancel.svg?react"
import { getValueByPath } from "../../utils/getValueByPath"

type SelectElementProps<T> = {
    handleSelect: (data: T) => void;
    data: T;
    data_name: string;
    styles?: string;
}

export const SelectElement = <T, >({handleSelect, data, data_name, styles}: SelectElementProps<T>) => {
    return (
        <div className={`flex items-center p-1.5
        bg-s-light-grey rounded-lg ${styles}`}>
            <CancelSvg onClick={() => handleSelect(data)}
            className="mr-1.5 w-4 h-4 cursor-pointer" />
            <span className="font-light text-[14px]">
                {String(getValueByPath(data, data_name as string))}
            </span>
        </div>
    )
}