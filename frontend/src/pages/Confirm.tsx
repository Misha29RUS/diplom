import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import LogoSvg from "../img/header_svg/logo_header.svg?react";
import { useState, useRef } from "react";

export function Confirm() {
  const { state } = useLocation();
  const { email, text } = state || "";
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successfully, setSuccessfully] = useState<string | null>(null);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  axios.defaults.withCredentials = true;
  const handleChange = (value: string, index: number) => {
    if (!/^[A-Z0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.toUpperCase();
    setCode(newCode);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newCode.every((char) => char !== "")) {
      sendCode(newCode.join(""));
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && index > 0 && !code[index]) {
      inputsRef.current[index - 1]?.focus();
    }
    const newCode = [...code];
    newCode[index] = "";
    setCode(newCode);
  };

  const clearCode = () => {
    setCode(Array(6).fill(""));
    inputsRef.current[0]?.focus();
  };

  const resendCode = async () => {
    setError(null);
    try {
      setIsSending(true);
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
      console.log(response);
      setSuccessfully("Код отправлен повторно");
      console.log("Код отправлен повторно");
    } catch (err) {
      setError("Ошибка при отправке кода.");
    } finally {
      setIsSending(false);
    }
  };

  const sendCode = async (e: string) => {
    setError(null);
    try {
      setIsSending(true);
      const response = await axios.post(
        ``,
        {
          email: email,
          otp: e,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response) {
        navigate("/successful-action", {
          state: {
            text: `Вы успешно зарегестрировались в системе.`,
          },
        });
      }
    } catch (err) {
      setError("Неверный код. Попробуйте снова.");
      clearCode();
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="bg-white shadow-md rounded-[20px] w-[714px] z-10">
        <div className="bg-black text-white text-center py-4 content-center rounded-t-[20px] flex justify-center">
          <LogoSvg />
        </div>
        <div className="py-[40px]">
          <div className="flex justify-center">
            <h2 className="text-s-black text-[34px] text-center">
              Подтверждение
            </h2>
          </div>
          <p className="text-center mt-[30px]">{text}</p>
          <div className="flex flex-col items-center space-y-4 pt-[10px]">
            <div className="flex space-x-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="w-10 h-10 border border-s-light-grey rounded text-center text-xl uppercase focus:outline-none focus:border-s-black"
                />
              ))}
            </div>
            {error && <p className="text-s-dark-red text-sm">{error}</p>}
            {successfully && (
              <p className="text-s-green text-sm">Код отправлен повторно</p>
            )}
            <button
              onClick={resendCode}
              disabled={isSending}
              className="cursor-pointer text-s-light-grey hover:text-s-dark-grey text-[18px]"
            >
              {isSending ? "Отправка..." : "Отправить повторно"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
