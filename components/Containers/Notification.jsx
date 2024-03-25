"use client";

import { useState, useEffect, Fragment } from "react";
import useSWR from "swr";
import { Dialog, Transition } from "@headlessui/react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const { data, isLoading, error } = useSWR(
    "http://localhost:3001/banner/fetch",
    fetcher
  );

  useEffect(() => {
    if (!isLoading && !error && data.length > 0) {
      setNotificationText(data.text);
      if (!data.ordersActive) {
        openModal();
      }
    }
  }, [data, isLoading, error]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  if (isLoading) return null;
  if (error) return null;

  return (
    <div>
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium text-gray-900"
                  >
                    {notificationText}
                  </Dialog.Title>
                  <div className="flex flex-row gap-2 mt-4">
                    <button
                      type="button"
                      className="button-primary center px-4 w-full"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      ОК
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
