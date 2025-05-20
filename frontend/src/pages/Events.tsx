import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";
import { MultiSelector } from "../components/UI/MultiSelector";
import FilterSvg from "../img/filter_alt.svg?react";
import { useState } from "react";
import { EventTable } from "../components/EventTable.tsx";


export const Events = () => {
  const [isFiltersOpen, setIsFiltersIsOpen] = useState(false);


  return (
    <div className="grow px-[90px] py-10 overflow-y-auto">
      <div className="flex items-center mb-2.5">
        <div className="flex items-center mr-auto">
          <h2 className="text-[34px] text-s-black mr-3">События</h2>
        </div>
        <Button
          type="red"
          text={0}
          iconRight={<FilterSvg className="w-[22px] h-[22px]" />}
          onClick={() => setIsFiltersIsOpen(!isFiltersOpen)}
        />
      </div>
      <div
        className={`mb-[30px] transition-all duration-300 ease-out transform ${
          isFiltersOpen
            ? "opacity-100 max-h-screen translate-y-0"
            : "opacity-0 max-h-0 overflow-hidden translate-y-4"
        }`}
      >
        <div className="flex gap-[30px] mb-2.5">
          <Input placeholder="Введите ID" />
          <MultiSelector placeholder="Выбирите типы" labelKey="name" />
          <MultiSelector placeholder="Выбирите статусы" labelKey="name" />
        </div>
        <div className="flex items-center gap-[30px] mb-2.5">
          <Input placeholder="Введите дату" />
          <Input placeholder="Введите инициатора" />
          <Input placeholder="Введите клиента" />
        </div>
        <div className="flex items-center">
          <Button
            type="red"
            text="Применить"
            styles="mr-[30px]"
          />
          <Button type="grey" text="Очистить" />
        </div>
      </div>
      <EventTable />
    </div>
  );
};
