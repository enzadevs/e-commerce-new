import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import { SuccessToast, ErrorToast } from "components/Functions/Toaster";
import { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UseFetcher } from "components/Functions/UseFetcher";
import { IsSignedInStore } from "utils/IsSignedIn";
import { SlPencil } from "react-icons/sl";
import { BiExit } from "react-icons/bi";

export default function ProfileInfoContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const firstNameRef = useRef();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const updateCurrentUserObject = IsSignedInStore(
    (state) => state.updateCurrentUserObject
  );
  const setIsSignedIn = IsSignedInStore((state) => state.setIsSignedIn);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userFormData = {
      firstName: firstNameRef.current.value,
      phoneNumber:
        phoneNumberRef.current.value.trim() === ""
          ? ""
          : "993" + phoneNumberRef.current.value,
      password: passwordRef.current.value,
      address: addressRef.current.value,
    };

    try {
      const response = await fetch(
        `http://localhost:5000/users/update/${currentUserObject.user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userFormData),
        }
      );

      if (response.ok) {
        const user = await response.json();
        updateCurrentUserObject({ user });
        SuccessToast({ successText: "Вы успешно обновили данные." });
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      ErrorToast({ errorText: "Вышла Ошибка. Проверьте ваши данные." });
    }
  };

  const { data, isLoading, error } = UseFetcher(
    `http://localhost:5000/users/get/` + currentUserObject.user.id
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="" />;

  const { firstName, phoneNumber, address, wishList, shoppingCart, orders } =
    data;

  return (
    <>
      <div className="flex-row-center justify-between">
        <h2 className="text-lg font-bold">Профиль</h2>
        <div className="flex-row-center gap-2">
          <button onClick={openModal} className="button-outline gap-2 px-4">
            <SlPencil className="h-4 w-4" />
            <p className="hidden sm:block">Изменить</p>
          </button>
          <button
            onClick={() => {
              updateCurrentUserObject({});
              setIsSignedIn(false);
            }}
            className="button-outline gap-2 px-4"
          >
            <BiExit className="h-4 w-4" />
            <p className="hidden sm:block">Выйти</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="border rounded-3xl shadow-md flex flex-col gap-4 p-4 w-full sm:w-[50%]">
          <div className="border-b flex-row-center justify-between gap-2 h-8">
            <>Имя:</>
            <p className="font-bold line-clamp-1">{firstName}</p>
          </div>
          <div className="border-b flex-row-center justify-between gap-2 h-8">
            <>Номер телефона:</>
            <p className="font-bold line-clamp-1">{phoneNumber}</p>
          </div>
          <div className="border-b flex-row-center justify-between gap-2 h-8">
            <>Адрес:</>
            <p className="font-bold line-clamp-1">{address}</p>
          </div>
        </div>
        <div className="border rounded-3xl shadow-md flex flex-col gap-4 p-4 w-full sm:w-[50%]">
          <div className="border-b flex-row-center justify-between gap-2 h-8">
            <>Избранные:</>
            <p className="font-bold">{wishList?.length}</p>
          </div>
          <div className="border-b flex-row-center justify-between gap-2 h-8">
            <>Корзина:</>
            <p className="font-bold">{shoppingCart?.length}</p>
          </div>
          <div className="border-b flex-row-center justify-between gap-2 h-8">
            <>Заказы:</>
            <p className="font-bold">{orders?.length}</p>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="center min-h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white rounded-3xl shadow-md flex flex-col gap-4 overflow-hidden transform  transition p-4 w-[360px]">
                  <h2 className="text-lg text-center font-bold">
                    Изменить данные аккаунта
                  </h2>
                  <input
                    ref={firstNameRef}
                    name="firstName"
                    type="text"
                    placeholder={firstName}
                    className="input-primary pl-4 text-grey-900"
                  ></input>
                  <div className="relative">
                    <p className="center absolute text-grey-900 left-0 px-3 h-full">
                      +993
                    </p>
                    <input
                      ref={phoneNumberRef}
                      name="phoneNumber"
                      type="text"
                      placeholder={phoneNumber.slice(3)}
                      minLength={8}
                      className="input-primary pl-12 text-grey-900"
                    ></input>
                  </div>
                  <input
                    ref={passwordRef}
                    name="password"
                    type="password"
                    placeholder="Введите новый пароль"
                    minLength={8}
                    className="input-primary pl-4 text-grey-900"
                  ></input>
                  <input
                    ref={addressRef}
                    name="address"
                    type="text"
                    placeholder={address}
                    className="input-primary pl-4 text-grey-900"
                  ></input>
                  <button
                    className="button-primary center w-full"
                    onClick={(e) => {
                      handleSubmit(e);
                      closeModal();
                    }}
                  >
                    Сохранить
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
