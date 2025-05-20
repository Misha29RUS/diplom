import { useLocation, useNavigate } from "react-router-dom";
import LogoSvg from "../img/header_svg/logo_header.svg?react";
import TaskSvg from "../img/header_svg/assignment.svg?react";
import EventSvg from "../img/header_svg/list_alt.svg?react";
import ProfileSvg from "../img/header_svg/account_circle.svg?react";
import ExitSvg from "../img/header_svg/exit_to_app.svg?react";
import { NavButton } from "./UI/NavButton";
import { Button } from "./UI/Button";
import axios from "axios";

export const Header = () => {
  const location = useLocation();
  const lastPartURL =
    location.pathname === "/"
      ? "root"
      : location.pathname.split("/").filter(Boolean).pop();
  const initials_user_name = localStorage.getItem("initials_user_name");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        ``,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      navigate("/login");
    }
  };
  return (
    // @ts-ignore
    <header className="px-[90px] py-[19px] bg-s-black flex items-center h-[80px]">
      <LogoSvg className="mr-auto" />
      <div className="flex items-center">
        <NavButton
          styles="mr-5"
          text="События"
          iconLeft={<EventSvg />}
          to="/events"
          isActive={lastPartURL === "events"}
        />
        <NavButton
          styles="mr-5"
          text="Задачи"
          iconLeft={<TaskSvg />}
          to="/tasks"
          isActive={lastPartURL === "tasks"}
        />
        <Button
          styles="mr-5"
          text={`${initials_user_name}`}
          type="red"
          iconLeft={<ProfileSvg />}
        />
        <Button
          type="grey"
          onlyIcon={<ExitSvg />}
          onClick={() => handleLogout()}
        />
      </div>
    </header>
  );
};
