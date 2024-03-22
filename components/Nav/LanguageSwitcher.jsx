"use client";

import { useState } from "react";
import { useRouter, usePathname } from "../../navigation.js";
import { LiaGlobeEuropeSolid } from "react-icons/lia";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function LanguageSwitcher({ text }) {
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="cursor-pointer nav-button" onClick={openModal}>
      <div className="flex flex-col items-center">
        <LiaGlobeEuropeSolid className="h-6 w-6" />
        <p className="hidden lg:block">{text}</p>
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
                    Выберите язык
                  </Dialog.Title>
                  <div className="flex flex-row gap-2 mt-4">
                    <button
                      type="button"
                      className="button-outline px-4"
                      onClick={() => {
                        router.push(pathname, { locale: "ru" });
                        closeModal();
                      }}
                    >
                      Русский
                    </button>
                    <button
                      type="button"
                      className="button-outline px-4"
                      onClick={() => {
                        router.push(pathname, { locale: "tm" });
                        closeModal();
                      }}
                    >
                      Türkmen
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
