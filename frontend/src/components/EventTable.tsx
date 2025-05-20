// @ts-ignore
import { useState } from "react";
import { TableTag } from "./UI/TableTag";
import { IUsers } from "../app/services/types";
import { formatPhoneNumber } from "../utils/phoneUtils.ts";

export const EventTable = ({ users }: { users: IUsers | undefined }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [eventID, setEventID] = useState<number | null>(null);

  return (
    <>
      <table className="w-full text-s-black table-fixed">
        <thead className="bg-s-light-grey">
          <tr>
            <th className="font-medium py-2.5 pl-5 text-left w-[6.32%]">ID</th>
            <th className="font-medium py-2.5 pl-5 text-left w-[10.34%]">
              Дата
            </th>
            <th className="font-medium py-2.5 pl-5 text-left w-[16.66%]">
              Инициатор
            </th>
            <th className="font-medium py-2.5 pl-5 text-left w-[16.66%]">
              Клиент
            </th>
            <th className="font-medium py-2.5 pl-5 text-left w-[24.13%}">
              Тип
            </th>
            <th className="font-medium py-2.5 pl-5 text-left w-[16.09%]">
              Статус
            </th>
            <th className="font-medium py-2.5 pl-5 text-left w-[9.77%]">
              Комплектность
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            className={`border-b border-b-s-light-grey
                            hover:bg-s-light-grey cursor-pointer
                          `}
            onClick={() => {}}
          >
            <td className="font-light py-[15px] pl-5 truncate">0000241</td>
            <td className="font-light py-[15px] pl-5 truncate">
              05.04.2025, 15:32
            </td>
            <td className="font-light py-[15px] pl-5 truncate">
              Сидоров Павел Андреевич
            </td>
            <td className="font-light py-[15px] pl-5 truncate">
              ООО «ТехИнвест»
            </td>
            <td className="font-light py-[15px] pl-5 truncate">
              Кредитование юридического лица
            </td>
            <td className="py-[15px] pl-5 truncate">
              <TableTag type={"CREATED"} />
            </td>
            <td className="py-[15px] pl-5 truncate">
              <TableTag type={"FULL"} text={"6/6"} />
            </td>
          </tr>
        </tbody>
      </table>
      {users?.content?.length === 0 && (

        <div className="text-[38px] text-center font-medium text-s-light-grey mt-[100px]">
          События не найдены
        </div>
      )}
      {/*{isSidebarOpen && (*/}
      {/*  <Sidebar*/}
      {/*    eventID={eventID!}*/}
      {/*    onClose={() => {*/}
      {/*      setIsSidebarOpen(!isSidebarOpen);*/}
      {/*      setEventID(null);*/}
      {/*    }}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  );
};
