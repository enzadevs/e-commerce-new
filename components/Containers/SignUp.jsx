import { Tab } from "@headlessui/react";
import { SuccessToast, ErrorToast } from "components/Functions/Toaster";
import { IsSignedInStore } from "utils/IsSignedIn";
import { useState, useRef, Fragment } from "react";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

    if (!validatePasswords()) {
      return;
    }

    if (
      !firstName ||
      !phoneNumber ||
      !password ||
      !passwordConfirmation ||
      !address
    ) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const userFormData = {
      firstName: firstName,
      phoneNumber: "993" + phoneNumber,
      password: password,
      address: address,
    };

    try {
      const response = await fetch("http://localhost:3001/auth/signup", {
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
      phoneNumber: "993" + phoneNumber,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3001/auth/signin", {
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
    <div className="bg-white border border-gallery-100 rounded-md shadow-md flex flex-col gap-4 mt-4 p-4 w-[380px]">
      <h2 className="text-center text-base">Добро пожаловать!</h2>
      <Tab.Group>
        <Tab.List className="border border-gallery-100 rounded-md flex gap-4 justify-around p-1 w-full">
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
                name="firstName"
                type="text"
                placeholder="Ваше имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`${
                  firstName.length >= 3
                    ? "input-primary pl-4"
                    : "input-caution pl-4"
                }`}
              />
              <div className="relative">
                <p className="center absolute left-0 px-3 h-full">+993</p>
                <input
                  name="phoneNumber"
                  type="number"
                  placeholder="Номер телефона"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`${
                    phoneNumber.length >= 8
                      ? "input-primary pl-12"
                      : "input-caution pl-12"
                  }`}
                  minLength={8}
                  maxLength={8}
                ></input>
              </div>
              <input
                value={password}
                onChange={handlePasswordChange}
                name="password"
                type="password"
                placeholder="Создайте пароль"
                minLength={8}
                className={`${
                  password.length >= 8
                    ? "input-primary pl-4"
                    : "input-caution pl-4"
                }`}
              ></input>
              <input
                value={passwordConfirmation}
                onChange={handlePasswordConfirmationChange}
                name="password"
                type="password"
                placeholder="Подтвердите пароль"
                minLength={8}
                className={`${
                  passwordConfirmation.length >= 8
                    ? "input-primary pl-4"
                    : "input-caution pl-4"
                }`}
              ></input>
              <input
                name="address"
                type="text"
                placeholder="Адрес"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`${
                  address.length >= 3
                    ? "input-primary pl-4"
                    : "input-caution pl-4"
                }`}
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
                  name="phoneNumber"
                  type="number"
                  placeholder="Номер телефона"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={`${
                    phoneNumber.length >= 8
                      ? "input-primary pl-12"
                      : "input-caution pl-12"
                  }`}
                  minLength={8}
                  maxLength={8}
                ></input>
              </div>
              <input
                value={password}
                onChange={handlePasswordChange}
                name="password"
                type="password"
                placeholder="Введите пароль"
                minLength={8}
                className={`${
                  password.length >= 8
                    ? "input-primary pl-4"
                    : "input-caution pl-4"
                }`}
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
