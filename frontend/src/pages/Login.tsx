import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import LogoSvg from "../img/header_svg/logo_header.svg?react";

import { Input } from "../components/UI/Input.tsx";
import { Button } from "../components/UI/Button.tsx";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isButtonDisabled = !email || !password;
  const [emailError, setEmailError] = useState({
    errorText: "",
    isError: false,
  });
  const [passwordError, setPasswordError] = useState({
    errorText: "",
    isError: false,
  });

  axios.defaults.withCredentials = true;
  const handleClickPrimaryButton = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        ``,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200) {
        const { accessToken } = response.data;
        try {
          const resp = await axios.post(
            ``,
            {},
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
          const user_surname = resp.data.surname;
          const user_name = resp.data.name;
          const user_patronymic = resp.data.patronymic;
          const initials_user_name = `${user_surname} ${user_name[0]}. ${user_patronymic[0]}.`;
          const user_full_name = `${user_surname} ${user_name} ${user_patronymic}`;
          localStorage.setItem("initials_user_name", `${initials_user_name}`);
          localStorage.setItem("user_full_name", `${user_full_name}`);
          navigate("/events");
        } catch (error) {}
      }
    } catch (error) {
      if (error.response.status === 400) {
        if (error.response.data.message === "Invalid credentials") {
          setPasswordError({
            errorText: "Неверная почта или пароль",
            isError: true,
          });
        } else if (error.response.data.message === "Employee is not verified") {
          navigate("/failed-action", {
            state: {
              email: email,
            },
          });
        }
      } else if (error.response.status === 404) {
        if (
          error.response.data.message ===
          "Employee with this email does not exist"
        ) {
          setEmailError({
            errorText: "Почта не зарегистрирована",
            isError: true,
          });
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
          <h2 className="text-s-black text-[34px] text-center">Авторизация</h2>
          <div className="mt-[30px] px-[100px]">
            <form className="" onSubmit={(e) => handleClickPrimaryButton(e)}>
              <div>
                <span className="text-[18px] mb-1">Почта:</span>
                <Input
                  stylesInput={
                    emailError.isError || passwordError.isError
                      ? "border-s-dark-red"
                      : ""
                  }
                  onFocus={() => {
                    setEmailError({ errorText: "", isError: false });
                    setPasswordError({ errorText: "", isError: false });
                  }}
                  placeholder="Введите почту"
                  value={email}
                  setTakeValue={setEmail}
                />
                {emailError.isError && (
                  <p className="text-s-dark-red text-[18px] text-center mt-[10px]">
                    {emailError.errorText}
                  </p>
                )}
              </div>
              <div className="mt-[10px]">
                <span className="text-[18px] mb-1">Пароль:</span>
                <Input
                  stylesInput={passwordError.isError ? "border-s-dark-red" : ""}
                  onFocus={() =>
                    setPasswordError({ errorText: "", isError: false })
                  }
                  placeholder="Введите пароль"
                  value={password}
                  setTakeValue={setPassword}
                />
                {passwordError.isError && (
                  <p className="text-s-dark-red text-[18px] text-center mt-[10px]">
                    {passwordError.errorText}
                  </p>
                )}
              </div>
              <Button
                text="Войти"
                type="red"
                styles="w-[100%] justify-center mt-[30px]"
                disabled={isButtonDisabled}
              />
            </form>
            <div className="mt-[10px] flex flex-col items-center">
              <div>
                <Link to="/registration">
                  <p className="text-s-light-grey hover:text-s-dark-grey text-[18px]">
                    Нет аккаунта?
                  </p>
                </Link>
              </div>
              {/*<div className="mt-[10px]">*/}
              {/*  <Link to="/password-reset">*/}
              {/*    <p className="text-s-light-grey hover:text-s-dark-grey text-[18px]">*/}
              {/*      Забыли пароль?*/}
              {/*    </p>*/}
              {/*  </Link>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
