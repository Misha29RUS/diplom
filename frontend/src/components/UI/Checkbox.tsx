import CheckSvg from "../../img/checkbox_svg/check.svg?react"

export const Checkbox = ({filterChecked}: {filterChecked: boolean}) => {
    return (
        <div className="inline-flex items-center">
            <label className="relative flex items-center
            rounded-full cursor-pointer"
            htmlFor="custom">
                <input checked={filterChecked}
                onChange={() => {}}  
                placeholder="checkbox" type="checkbox"
                className="peer relative appearance-none w-6 h-6
                border rounded border-black
                cursor-pointer transition-all before:content['']
                before:block before:bg-black
                before:w-6 before:h-6 before:rounded
                before:absolute before:top-2/4 before:left-2/4
                before:-translate-y-2/4 before:-translate-x-2/4
                before:opacity-0 hover:before:opacity-10
                before:transition-opacity checked:bg-black
                checked:border-black checked:before:bg-black"
                id="custom"/>
                <span className="absolute text-white transition-opacity
                opacity-0 pointer-events-none top-2/4 left-2/4
                -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <CheckSvg className="fill-white w-4 h-4" />
                </span>
            </label>
        </div>               
    )
}