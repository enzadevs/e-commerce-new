import Link from "next/link";
import useSWR from "swr";
import LoadingBlock from "@/components/Functions/LoadingBlock";
import ErrorBlock from "@/components/Functions/ErrorBlock";
import { baseUrlApi } from "@/utils/Utils";
import { SuccessToast, ErrorToast } from "@/components/Functions/Toaster";
import { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IsSignedInStore } from "@/utils/IsSignedIn";
import { useScopedI18n } from "@/locales/client";
import { usePathname } from "next/navigation";
import { SlPencil } from "react-icons/sl";
import { BiExit } from "react-icons/bi";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProfileInfoContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const firstNameRef = useRef();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();
  const pathname = usePathname();
  const useTmTitles = pathname.includes("/tm");
  const currentUserObject = IsSignedInStore((state) => state.currentUserObject);
  const updateCurrentUserObject = IsSignedInStore(
    (state) => state.updateCurrentUserObject
  );
  const setIsSignedIn = IsSignedInStore((state) => state.setIsSignedIn);
  const scopedT = useScopedI18n("SignedUserOrderPage");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleUpdate = async (e) => {
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
        `${baseUrlApi}/user/update/${currentUserObject.user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userFormData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const user = data?.user;
        updateCurrentUserObject({ user });
        SuccessToast({ successText: scopedT("successFullUpdate") });
      }
    } catch (err) {
      ErrorToast({ errorText: "Вышла Ошибка. Проверьте ваши данные." });
    }
  };

  const { data, isLoading, error } = useSWR(
    `${baseUrlApi}/user/fetch/details/` + currentUserObject?.user?.id,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  if (isLoading) return <LoadingBlock height={"h-20"} width="w-full" />;
  if (error) return <ErrorBlock height={"h-20"} width="" />;

  const { firstName, phoneNumber, address, wishlist, ShoppingCart, Orders } =
    data;

  return (
    <>
      <div className="flex-row-center justify-between">
        <h2 className="text-lg font-bold">{scopedT("profileHeader")}</h2>
        <div className="flex-row-center gap-2">
          <button onClick={openModal} className="button-outline gap-2 px-4">
            <SlPencil className="h-4 w-4" />
            <p className="hidden sm:block">{scopedT("change")}</p>
          </button>
          <button
            onClick={() => {
              updateCurrentUserObject({});
              setIsSignedIn(false);
            }}
            className="button-outline gap-2 px-4"
          >
            <BiExit className="h-4 w-4" />
            <p className="hidden sm:block">{scopedT("logOut")}</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="border rounded-md shadow-md flex flex-col gap-4 p-4 w-full md:w-[50%]">
          <div className="border-b flex-row-center justify-between gap-2 h-8">
            <>{scopedT("firstName")}</>
            <p className="font-bold line-clamp-1">{firstName}</p>
          </div>
          <div className="border-b flex-row-center justify-between gap-2 h-8">
            <>{scopedT("phoneNumber")}</>
            <p className="font-bold line-clamp-1">{phoneNumber}</p>
          </div>
          <div className="border-b flex-row-center justify-between gap-2 h-8">
            <>{scopedT("address")}</>
            <p className="font-bold line-clamp-1">{address}</p>
          </div>
          <div className="border-b flex-row-center justify-between gap-2 h-8">
            <>{scopedT("wishlist")}</>
            <p className="font-bold">{wishlist?.length || 0}</p>
          </div>
          <div className="border-b flex-row-center justify-between gap-2 h-8">
            <>{scopedT("shoppingCart")}</>
            <p className="font-bold">
              {ShoppingCart?.ProductsList?.length || 0}
            </p>
          </div>
          <div className="border-b flex-row-center justify-between gap-2 h-8">
            <>{scopedT("ordersCount")}</>
            <p className="font-bold">{Orders?.length}</p>
          </div>
        </div>
        <div className="border rounded-md shadow-md flex flex-col gap-2 p-4 w-full md:w-[50%]">
          <h2 className="font-bold flex-row-center px-2 h-8">
            {scopedT("orders")}
          </h2>
          {Orders?.map((item) => {
            return (
              <Link
                href={`/profile/orders/` + item.id}
                key={item.id}
                className="border border-gallery-200 rounded-md flex-row-center justify-between transition hover:bg-gallery h-10"
              >
                <div className="border-r flex-row-center justify-between flex-[50%] max-w-[50%] px-2 h-full">
                  {scopedT("orderId")}
                  <p className="font-bold">{item.id}</p>
                </div>
                <div className="border-r center flex-[50%] max-w-[50%] px-2 h-full">
                  <div className="font-bold">
                    {useTmTitles
                      ? item?.OrderStatus?.nameTm
                      : item?.OrderStatus?.nameRu}
                  </div>
                </div>
                <div className="flex-row-center justify-between flex-[50%] max-w-[50%] px-2">
                  {scopedT("orderSum")}
                  <p className="font-bold">{item.sum}М</p>
                </div>
              </Link>
            );
          })}
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
                <Dialog.Panel className="bg-white rounded-md shadow-md flex flex-col gap-4 overflow-hidden transform transition p-4 w-[360px]">
                  <h2 className="text-lg text-center font-bold">
                    {scopedT("changeAccountData")}
                  </h2>
                  <input
                    ref={firstNameRef}
                    name="firstName"
                    type="text"
                    placeholder={firstName}
                    className="input-primary pl-4 text-gallery-800"
                  ></input>
                  <div className="relative">
                    <p className="center absolute text-gallery-800 left-0 px-3 h-full">
                      +993
                    </p>
                    <input
                      ref={phoneNumberRef}
                      name="phoneNumber"
                      type="text"
                      placeholder={phoneNumber?.slice(3)}
                      minLength={8}
                      className="input-primary pl-12 text-gallery-800"
                    ></input>
                  </div>
                  <input
                    ref={passwordRef}
                    name="password"
                    type="password"
                    placeholder={scopedT("enterNewPassword")}
                    minLength={8}
                    className="input-primary pl-4 text-gallery-800"
                  ></input>
                  <input
                    ref={addressRef}
                    name="address"
                    type="text"
                    placeholder={address}
                    className="input-primary pl-4 text-gallery-800"
                  ></input>
                  <button
                    className="button-primary center w-full"
                    onClick={(e) => {
                      handleUpdate(e);
                      closeModal();
                    }}
                  >
                    {scopedT("saveButton")}
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
