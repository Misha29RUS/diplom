import { useNavigate } from "react-router-dom";

import LogoSvg from "../img/header_svg/logo_header.svg?react";
import Left404 from "../img/404_left.svg?react";
import Right404 from "../img/404_right.svg?react";
import SadSmile from "../img/mood_bad.svg?react";

import { Button } from "../components/UI/Button.tsx";

export function Page404() {
  const navigate = useNavigate();

  const handleGoHome = () => {

      navigate("/login");

  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="absolute bottom-0 left-0">
        <Left404 />
      </div>
      <div className="bg-white shadow-md rounded-[20px] w-[714px] z-10">
        <div className="bg-black text-white text-center py-4 content-center rounded-t-[20px] flex justify-center">
          <LogoSvg />
        </div>
        <div className="py-[40px]">
          <div className='flex justify-center'>
            <h2 className="text-s-black text-[34px] text-center">404</h2>
              <SadSmile />
          </div>

          <div className="mt-[30px] px-[100px]">
            <p className="text-center">Такой страницы нет.</p>
            <Button
              text="На главную"
              type="red"
              styles="w-[100%] justify-center mt-[30px]"
              onClick={handleGoHome}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0">
        <Right404 />
      </div>
    </div>
  );
}
