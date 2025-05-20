import {useLocation, useNavigate} from "react-router-dom";

import LogoSvg from "../img/header_svg/logo_header.svg?react";
import GoodSmile from "../img/mood.svg?react";

import { Button } from "../components/UI/Button.tsx";

export function SuccessfulAction() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { text } = state || "";
  const handleGoHome = () => {
      navigate("/login");
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="bg-white shadow-md rounded-[20px] w-[714px] z-10">
        <div className="bg-black text-white text-center py-4 content-center rounded-t-[20px] flex justify-center">
          <LogoSvg />
        </div>
        <div className="py-[40px]">
          <div className='flex justify-center'>
            <h2 className="text-s-black text-[34px] text-center">Успешно</h2>
              <GoodSmile />
          </div>

          <div className="mt-[30px] px-[100px]">
            <p className="text-center">{text}</p>
            <Button
              text="Вернуться ко входу"
              type="red"
              styles="w-[100%] justify-center mt-[30px]"
              onClick={handleGoHome}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
