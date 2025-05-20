import { useState, useEffect, useRef } from "react";
import ArrowSvg from "../../img/selectors_svg/keyboard_arrow_down.svg?react";
import CloseSvg from "../../img/selectors_svg/close.svg?react";
import { getValueByPath } from "../../utils/getValueByPath";

type SelectorPropsMock = {
  placeholder: string;
  selectList: any[]; // Используем any для упрощения
  setTakeValue: React.Dispatch<React.SetStateAction<any>>;
  value: any;
  labelKey: any;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
  styles?: string;
};

export const SelectorMock = ({
  placeholder,
  selectList,
  setTakeValue,
  value,
  labelKey,
  type,
  styles,
}: SelectorPropsMock) => {
  const [selectedData, setSelectedData] = useState<any>(value);
  const [showDropdown, setShowDropdown] = useState(false);
  const [list, setList] = useState<any[]>(selectList);

  useEffect(() => {
    setSelectedData(value);
  }, [value]);

  const handleSearch = (search: string) => {
    if (search !== "") {
      const filteredData = selectList.filter((item) =>
        String(getValueByPath(item, labelKey))
          .toLowerCase()
          .startsWith(search.toLowerCase()),
      );
      setList(filteredData);
    } else {
      setList(selectList);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedData(e.target.value);
    handleSearch(e.target.value);
  };

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

  return (
    <div className={`relative group w-full ${styles}`} ref={dropdownRef}>
      <input
        onChange={handleChange}
        onFocus={() => setShowDropdown(true)}
        value={
          typeof selectedData === "object" && selectedData !== null
            ? String(getValueByPath(selectedData, labelKey))
            : selectedData || ""
        }
        className={`py-3 px-4 pr-[60px] w-full outline-none border font-light text-[18px] 
                ${
                  showDropdown
                    ? `rounded-t-lg ${
                        type ? "border-s-white" : "border-s-dark-grey"
                      } `
                    : `rounded-lg ${
                        type ? "border-s-white" : "border-s-light-grey"
                      }`
                }
                ${
                  type
                    ? "border-s-white text-s-white placeholder:text-s-white group-hover:border-s-white group-hover:text-s-white"
                    : "placeholder:text-s-light-grey group-hover:border-s-dark-grey group-hover:text-s-dark-grey"
                }
                ${
                  type === "ACTIVE"
                    ? "bg-s-red"
                    : type === "HIDDEN"
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
            setSelectedData("");
            setTakeValue("");
            setList(selectList);
          }}
        />
      )}
      <ArrowSvg
        onClick={() => setShowDropdown(!showDropdown)}
        className={`absolute top-3.5 cursor-pointer right-4 
                ${
                  type
                    ? "group-hover:fill-s-white"
                    : "group-hover:fill-s-dark-grey"
                }
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
          {list?.slice(0, 10).map((data, index) => (
            <li
              onClick={() => {
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
                                : type === "HIDDEN"
                                  ? "bg-s-black"
                                  : type === "more" && "bg-s-dark-grey"
                            }`}
            >
              <p
                className={`font-light text-[18px]
                            ${type && "text-s-white"}`}
              >
                {String(getValueByPath(data, labelKey))}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
