import { Tab } from "@headlessui/react";
import { SuccessToast, ErrorToast } from "components/Functions/Toaster";
import { IsSignedInStore } from "utils/IsSignedIn";
import { useState, useRef, Fragment } from "react";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const firstNameRef = useRef();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationInputRef = useRef();
  const addressRef = useRef();
  const updateCurrentUserObject = IsSignedInStore(
    (state) => state.updateCurrentUserObject
  );
  const setIsSignedIn = IsSignedInStore((state) => state.setIsSignedIn);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const validatePasswords = () => {
    if (password !== passwordConfirmation) {
      alert("Пароли не совпадают.");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (
      !firstNameRef.current.value ||
      !phoneNumberRef.current.value ||
      !passwordRef.current.value ||
      !passwordConfirmationInputRef.current.value ||
      !addressRef.current.value
    ) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const userFormData = {
      firstName: firstNameRef.current.value,
      phoneNumber: "993" + phoneNumberRef.current.value,
      password: passwordRef.current.value,
      address: addressRef.current.value,
    };

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
      });

      if (response.ok) {
        const res = await response.json();
        updateCurrentUserObject(res);
        setIsSignedIn(true);
        SuccessToast({ successText: "Вы успешно создали аккаунт." });
      } else {
        ErrorToast({ errorText: "Вышла Ошибка. Проверьте ваши данные." });
      }
    } catch (error) {
      ErrorToast({ errorText: "Ошибка сервера." });
    }
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    const userFormData = {
      phoneNumber: "993" + phoneNumberRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await fetch("http://localhost:5000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
      });

      if (response.ok) {
        const res = await response.json();
        updateCurrentUserObject(res);
        setIsSignedIn(true);
      } else {
        alert("Неправильные данные.");
      }
    } catch (error) {
      console.error("Error signing in :", error);
    }
  };

  return (
    <div className="bg-white border border-grey-200 rounded-3xl shadow-md flex flex-col gap-4 mt-4 p-4 w-[360px]">
      <h2 className="text-center text-base">Добро пожаловать!</h2>
      <Tab.Group>
        <Tab.List className="border border-grey-200 rounded-3xl flex gap-4 justify-around p-1 w-full">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected
                    ? "button-outline center shadow-md w-full"
                    : "button-primary center w-full"
                }
              >
                Создать аккаунт
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={
                  selected
                    ? "button-outline center shadow-md w-full"
                    : "button-primary center w-full"
                }
              >
                Войти
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel as={Fragment}>
            <form
              className="flex flex-col gap-4 outline-none w-full"
              onSubmit={handleSignUp}
            >
              <input
                ref={firstNameRef}
                name="firstName"
                type="text"
                placeholder="Ваше имя"
                className="input-primary pl-4"
              ></input>
              <div className="relative">
                <p className="center absolute left-0 px-3 h-full">+993</p>
                <input
                  ref={phoneNumberRef}
                  name="phoneNumber"
                  type="text"
                  placeholder="Номер телефона"
                  className="input-primary pl-14"
                ></input>
              </div>
              <input
                ref={passwordRef}
                value={password}
                onChange={handlePasswordChange}
                name="password"
                type="password"
                placeholder="Создайте пароль"
                minLength={8}
                className="input-primary pl-4"
              ></input>
              <input
                ref={passwordConfirmationInputRef}
                value={passwordConfirmation}
                onChange={handlePasswordConfirmationChange}
                name="password"
                type="password"
                placeholder="Подтвердите пароль"
                minLength={8}
                className="input-primary pl-4"
              ></input>
              <input
                ref={addressRef}
                name="address"
                type="text"
                placeholder="Адрес"
                className="input-primary pl-4"
              ></input>
              <button
                type="submit"
                className="button-primary center w-full"
                onClick={(e) => {
                  if (validatePasswords()) {
                    handleSignUp(e);
                  }
                }}
              >
                Создать аккаунт
              </button>
            </form>
          </Tab.Panel>
          <Tab.Panel>
            <div className="flex flex-col gap-4 w-full">
              <div className="relative">
                <p className="center absolute left-0 px-3 h-full">+993</p>
                <input
                  ref={phoneNumberRef}
                  name="phoneNumber"
                  type="text"
                  placeholder="Номер телефона"
                  className="input-primary pl-14"
                ></input>
              </div>
              <input
                ref={passwordRef}
                value={password}
                onChange={handlePasswordChange}
                name="password"
                type="password"
                placeholder="Введите пароль"
                className="input-primary pl-4"
                autoComplete="password"
              ></input>
              <button
                onClick={handleLogIn}
                type="button"
                className="button-primary center w-full"
              >
                Войти
              </button>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
