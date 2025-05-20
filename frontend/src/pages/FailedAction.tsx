import {Link, useLocation, useNavigate} from "react-router-dom";

import LogoSvg from "../img/header_svg/logo_header.svg?react";
import BadSmile from "../img/mood_bad.svg?react";

import { Button } from "../components/UI/Button.tsx";
import axios from "axios";

export function FailedAction() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email } = state || "";
  const handleGoHome = () => {
    const resendCode = async () => {
      try {
        const response = await axios.post(
            `/api/auth/send-otp`,
            {
              email: email,
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            },
        );
        console.log(response);
      } catch (err) {
      } finally {
      }
    };
    resendCode()
    navigate("/confirm", {
      state: {
        email: email,
        text: `На ваш электронный почтовый ящик ${email} отправлен код для подтверждения. Пожалуйста, введите этот код в поля ниже.`,
      },
    });
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="bg-white shadow-md rounded-[20px] w-[714px] z-10">
        <div className="bg-black text-white text-center py-4 content-center rounded-t-[20px] flex justify-center">
          <LogoSvg />
        </div>
        <div className="py-[40px]">
          <div className='flex justify-center'>
            <h2 className="text-s-black text-[34px] text-center">Ошибка</h2>
              <BadSmile />
          </div>

          <div className="mt-[30px] px-[100px]">
            <p className="text-center">Вы не подтвердили свой аккаунт. Для подверждения аккаунта необходимо ввести код, полученный на электронную почту.</p>
            <Button
              text="Получить код"
              type="red"
              styles="w-[100%] justify-center mt-[30px]"
              onClick={handleGoHome}
            />
          </div>
          <div className="mt-[10px] flex flex-col items-center">
            <div>
              <Link to="/login">
                <p className="text-s-light-grey hover:text-s-dark-grey text-[18px]">Вернуться ко входу?</p>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
