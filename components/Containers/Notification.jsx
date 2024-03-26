"use client";

import { SuccessToast } from "components/Functions/Toaster";
import { Transition, Dialog } from "@headlessui/react";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  Fragment,
} from "react";

const ToastContext = createContext({
  lastToastTime: null,
  setLastToastTime: () => {},
});

export default function Notification() {
  const [ordersData, setOrdersData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/banner/fetch");
        const data = await response.json();
        setOrdersData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ToastContext.Provider value={{ ordersData, setOrdersData }}>
      <NotificationContent />
    </ToastContext.Provider>
  );
}

function NotificationContent() {
  const { ordersData, setOrdersData } = useContext(ToastContext);
  const [isOpen, setIsOpen] = useState(false);
  const [lastToastTime, setLastToastTime] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("lastToastTime")
      : null
  );

  useEffect(() => {
    if (!ordersData || ordersData.ordersActive) {
      return;
    }

    const now = Date.now();
    const threeHoursInMs = 3 * 60 * 60 * 1000;

    if (lastToastTime && now - lastToastTime < threeHoursInMs) {
      return;
    }

    setIsOpen(true);
    localStorage.setItem("lastToastTime", now);
  }, [ordersData, lastToastTime]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div
      className="border border-gallery-200 rounded-md cursor-pointer center transition hover:text-blueviolet-700 h-10 w-10 sm:border-0 sm:h-full sm:w-full"
      onClick={openModal}
    >
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {ordersData && (
                    <Dialog.Title
                      as="h3"
                      className="text-lg text-center font-medium text-gray-900 w-full"
                    >
                      {ordersData.text}
                    </Dialog.Title>
                  )}
                  <div className="flex flex-row gap-2 mt-4">
                    <button
                      type="button"
                      className="button-outline center px-4 w-full"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
