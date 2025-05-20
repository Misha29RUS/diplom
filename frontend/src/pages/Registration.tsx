import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "../components/UI/Input.tsx";
import { Button } from "../components/UI/Button.tsx";
import LogoSvg from "../img/header_svg/logo_header.svg?react";

export function Registration() {
  axios.defaults.withCredentials = true;

  // Состояния для полей
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  // Состояния для ошибок
  const [emailError, setEmailError] = useState({ errorText: "", isError: false });
  const [passwordError, setPasswordError] = useState({ errorText: "", isError: false });
  const [confirmPasswordError, setConfirmPasswordError] = useState({ errorText: "", isError: false });

  // Состояние для блокировки кнопки
  const isButtonDisabled = !email || !password || !confirmedPassword || (password !== confirmedPassword);

  const navigate = useNavigate();

  const handleClickPrimaryButton = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
          ``,
          {
            email: email,
            password: confirmedPassword,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          },
      );
      if (response.status === 200) {
        navigate("/confirm", {
          state: {
            email: email,
            text: `На ваш электронный почтовый ящик ${email} отправлен код для подтверждения. Пожалуйста, введите этот код в поля ниже.`,
          },
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        const message = error.response.data.message;
        if (message === "Employee already exists") {
          setEmailError({ errorText: "Данная почта уже зарегистрирована", isError: true });
        } else if (message === "Employee not approved by company") {
          setEmailError({ errorText: "Почты нет в системе", isError: true });
        } else if (
            error.response.data.password ===
            "Password must contain at least one digit, one lowercase, one uppercase, one special character and should be 8 characters long"
        ) {
          setPasswordError({
            errorText:
                "Пароль не проходит валидацию: Пароль должен содержать как минимум одну цифру, одну строчную букву, одну заглавную букву, один специальный символ и состоять из 8 символов",
            isError: true,
          });
        }
      }
    }
  };

  const handlePasswordBlur = () => {
    if (password !== confirmedPassword) {
      setConfirmPasswordError({ errorText: "Пароли не совпадают", isError: true });
    } else {
      setConfirmPasswordError({ errorText: "", isError: false });
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-md rounded-[20px] w-[714px]">
          <div className="bg-black text-white text-center py-4 rounded-t-[20px] flex justify-center">
            <LogoSvg />
          </div>
          <div className="py-[40px]">
            <h2 className="text-s-black text-[34px] text-center">Регистрация</h2>
            <div className="mt-[30px] px-[100px]">
              <form className="" onSubmit={(e) => handleClickPrimaryButton(e)}>
                <div>
                  <span className="text-[18px] mb-1">Почта:</span>
                  <Input
                      placeholder="Введите почту"
                      value={email}
                      setTakeValue={setEmail}
                      stylesInput={emailError.isError ? "border-s-dark-red" : ""}
                      onFocus={() => setEmailError({ errorText: "", isError: false })}
                  />
                  {emailError.isError && <p className="text-s-dark-red text-[18px] text-center mt-[10px]">{emailError.errorText}</p>}
                </div>
                <div className="mt-[10px]">
                  <span className="text-[18px] mb-1">Пароль:</span>
                  <Input
                      placeholder="Введите пароль"
                      value={password}
                      setTakeValue={setPassword}
                      stylesInput={passwordError.isError ? "border-s-dark-red" : ""}
                      onFocus={() => setPasswordError({ errorText: "", isError: false })}
                      onBlur={() => setPasswordError({ errorText: "", isError: false })}
                  />
                  {passwordError.isError && <p className="text-s-dark-red text-[18px] text-center mt-[10px]">{passwordError.errorText}</p>}
                </div>
                <div className="mt-[10px]">
                  <span className="text-[18px] mb-1">Подтверждение пароля:</span>
                  <Input
                      placeholder="Введите пароль ещё раз"
                      value={confirmedPassword}
                      setTakeValue={setConfirmedPassword}
                      stylesInput={confirmPasswordError.isError ? "border-s-dark-red" : ""}
                      onFocus={() => setConfirmPasswordError({ errorText: "", isError: false })}
                      onBlur={handlePasswordBlur}
                  />
                  {confirmPasswordError.isError && (
                      <p className="text-s-dark-red text-[18px] mt-[10px]">{confirmPasswordError.errorText}</p>
                  )}
                </div>
                <Button
                    text="Зарегистрироваться"
                    type="red"
                    styles="w-[100%] justify-center mt-[30px]"
                    disabled={isButtonDisabled}
                />
              </form>
              <div className="mt-[10px] flex flex-col items-center">
                <div>
                  <Link to="/login">
                    <p className="text-s-light-grey hover:text-s-dark-grey text-[18px]">Есть аккаунт?</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
