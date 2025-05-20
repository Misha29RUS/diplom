import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Input } from "../components/UI/Input.tsx";
import { Button } from "../components/UI/Button.tsx";

import LogoSvg from "../img/header_svg/logo_header.svg?react";

export function ResetPassEnterEmail() {
  axios.defaults.withCredentials = true;
  // const [errorText, setErrorText] = useState("");
  const [email, setEmail] = useState("");
  // const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleClickPrimaryButton = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        ``,
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
      if (response.status === 200) {
      }
    } catch (error) {
      if (error.response.status === 400) {
        // console.log(error);
        if (error.response.data.detail === "LOGIN_USER_NOT_VERIFIED") {
          // navigate('/verify-error', {
          //     state: {
          //         email: email.value,
          //     },
          // });
        } else if (error.response.data.detail === "LOGIN_BAD_CREDENTIALS") {
          // setErrorText('Неверная почта или пароль');
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-[20px] w-[714px]">
        <div className="bg-black text-white text-center py-4 rounded-t-[20px] flex justify-center">
          <LogoSvg />
        </div>
        <div className="py-[40px]">
          <h2 className="text-s-black text-[34px] text-center">Восстановление доступа</h2>
          <div className="mt-[30px] px-[100px]">
            <form className="" onSubmit={(e) => handleClickPrimaryButton(e)}>
              <div>
                <span className="text-[18px] mb-1">Почта:</span>
                <Input
                  placeholder="Введите почту"
                  value={email}
                  setTakeValue={setEmail}
                />
              </div>
              <Button
                text="Отправить код"
                type="red"
                styles="w-[100%] justify-center mt-[30px]"
              />
            </form>
            <div className="mt-[10px] flex flex-col items-center">
              <div>
                <Link to="/login">
                  <p className="text-s-light-grey hover:text-s-dark-grey text-[18px]">
                    Вспомнили пароль?
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
