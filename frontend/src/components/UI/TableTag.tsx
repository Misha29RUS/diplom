import Created from "../../img/tag_table_svg/created.svg?react";
import Work from "../../img/tag_table_svg/work.svg?react";
import Fixed from "../../img/tag_table_svg/fixed.svg?react";
import Without from "../../img/tag_table_svg/without.svg?react";

type TableTagProps = {
  type: string;
  text?: string | number;
  styles?: string;
};

export const TableTag = ({ type, text, styles }: TableTagProps) => {
  const textMap: { [key: string]: string } = {
    CREATED: "Создана задача",
    WORK: "Задача в работе",
    FIXED: "Проблема решена",
    WITHOUT: "Без вмешательства",
  };

  const Text = textMap[type] || text;

  const iconMap: { [key: string]: JSX.Element } = {
    CREATED: <Created className="fill-s-white" />,
    WORK: <Work className="fill-s-white" />,
    FIXED: <Fixed className="fill-s-white" />,
    WITHOUT: <Without className="fill-s-white" />,
  };
  const Icon = iconMap[type] || null;

  return (
    <div
      className={`inline-flex items-center text-[18px] rounded-[10px] whitespace-nowrap
         ${type === "CREATED" || type === "WORK" || type === "FIXED" || type === "WITHOUT" ? "py-[4px] px-[6px]" : "py-[3px] px-[6px]"}
        ${
          type === "CREATED" || type === "WORK"
            ? "text-s-white bg-s-yellow"
            : type === "WITHOUT" || type === "FIXED"
              ? "text-s-white bg-s-green"
              : type === "FULL"
                ? "text-s-green border border-s-green"
                : type === "INCOMPLETE"
                  ? "text-s-red border border-s-red"
                  : ""
        } ${styles}`}
    >
      {Icon && <span className={`mr-1.5`}>{Icon}</span>}
      <span className="truncate">{Text}</span>
    </div>
  );
};
