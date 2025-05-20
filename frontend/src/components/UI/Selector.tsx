import { useState, useEffect, useRef } from "react";
import ArrowSvg from "../../img/selectors_svg/keyboard_arrow_down.svg?react";
import CloseSvg from "../../img/selectors_svg/close.svg?react";
import { getValueByPath } from "../../utils/getValueByPath";

type SelectorProps = {
  placeholder: string;
  selectList: any[];
  setTakeValue: React.Dispatch<React.SetStateAction<any>>;
  value: any;
  labelKey: keyof any;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
  styles?: string;
};

export const Selector = <T extends object>({
  placeholder,
  selectList,
  setTakeValue,
  value,
  labelKey,
  searchQuery,
  setSearchQuery,
  type,
  styles,
}: SelectorProps) => {
  const [selectedData, setSelectedData] = useState<T | string | null>(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [list, setList] = useState(selectList);
  useEffect(() => {
    setSearchQuery(value.name);
  }, []);
  useEffect(() => {
    setList(selectList);
  }, [selectList]);

  // Ввод в инпут
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Закрытие выпадающего списка при клике вне элемента
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
  const [initialValue, setInitialValue] = useState<any>(value.name || "");
  return (
    <div className={`relative group w-full ${styles}`} ref={dropdownRef}>
      <input
        onChange={handleChange}
        onFocus={() => {
          setSearchQuery("");
          setShowDropdown(true);
        }}
        onBlur={() => {
          if (!searchQuery) setSearchQuery(initialValue || "");
        }}
        value={searchQuery}
        className={`py-3 px-4 pr-[60px] w-full outline-none border font-light text-[18px] 
                ${
                  showDropdown
                    ? `rounded-t-lg ${type ? "border-s-white" : "border-s-dark-grey"} `
                    : `rounded-lg ${type ? "border-s-white" : "border-s-light-grey"}`
                }
                ${
                  type
                    ? "border-s-white text-s-white placeholder:text-s-white group-hover:border-s-white group-hover:text-s-white"
                    : "placeholder:text-s-light-grey group-hover:border-s-dark-grey group-hover:text-s-dark-grey"
                }
                ${
                  type === "ACTIVE"
                    ? "bg-s-red"
                    : type === "HIDDEN" || type === "DELETED"
                      ? "bg-s-black"
                      : type === "more" && "bg-s-dark-grey"
                }`}
        placeholder={placeholder}
        id="input"
      />
      {selectedData && (
        <CloseSvg
          className={`absolute top-3.5 right-[38px] cursor-pointer
                ${type ? "fill-s-white" : "fill-s-black"}`}
          onClick={() => {
            setSearchQuery("");
          }}
        />
      )}
      <ArrowSvg
        onClick={() => {
          if (showDropdown) {
            setShowDropdown(false); // Закрываем, если список уже открыт
          } else {
            setSearchQuery(""); // Очищаем `searchQuery` для отображения полного списка
            setShowDropdown(true); // Открываем список
          }
        }}
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
          {list?.map((data, index) => (
            <li
              onClick={(): any => {
                setSearchQuery(data.name);
                setInitialValue(data.name);
                setSelectedData(data);
                setTakeValue(data);
                setShowDropdown(false);
              }}
              key={index}
              className={`py-3 px-4 transition-colors cursor-pointer
                            ${!type && "hover:bg-s-light-grey"}
                            ${
                              type === "ACTIVE"
                                ? "bg-s-red"
                                : type === "HIDDEN" || type === "DELETED"
                                  ? "bg-s-black"
                                  : type === "more" && "bg-s-dark-grey"
                            }`}
            >
              <p
                className={`font-light text-[18px]
                            ${type && "text-s-white"}`}
              >
                {String(getValueByPath(data, labelKey as string))}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
