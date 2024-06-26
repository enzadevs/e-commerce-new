"use client";

import { Tab } from "@headlessui/react";
import { baseUrlApi } from "@/utils/Utils";
import { useScopedI18n } from "@/locales/client";
import { useState, Fragment } from "react";
import { IsSignedInStore } from "@/utils/IsSignedIn";
import { SuccessToast, ErrorToast } from "@/components/Functions/Toaster";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const scopedT = useScopedI18n("UnSignedUser");

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
      alert(scopedT("passwordMismatch"));
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
      alert(scopedT("fillOutAllFields"));
      return;
    }

    const userFormData = {
      firstName: firstName,
      phoneNumber: "993" + phoneNumber,
      password: password,
      address: address,
    };

    try {
      const response = await fetch(`${baseUrlApi}/user/signup`, {
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
    } catch (err) {
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
      const response = await fetch(`${baseUrlApi}/user/signin`, {
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
        alert(scopedT("badCredentials"));
      }
    } catch (err) {
      ErrorToast({ errorText: "Ошибка сервера." });
    }
  };

  return (
    <div className="bg-white border border-gallery-100 rounded-md shadow-md flex flex-col gap-4 mt-4 p-4 w-[380px]">
      <h2 className="text-center text-base">{scopedT("welcomeHeader")}</h2>
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
                {scopedT("signUp")}
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
                {scopedT("signIn")}
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
                placeholder={scopedT("firstName")}
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
                  placeholder={scopedT("phoneNumber")}
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
                placeholder={scopedT("createPassword")}
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
                placeholder={scopedT("confirmPassword")}
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
                placeholder={scopedT("address")}
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
                {scopedT("createAccount")}
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
                  placeholder={scopedT("phoneNumber")}
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
                placeholder={scopedT("inputPassword")}
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
                {scopedT("logIn")}
              </button>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
