import toast from "react-simple-toasts";

export function SuccessToast({ successText }) {
  toast(successText, {
    className:
      "bg-blueviolet rounded-md shadow-sm text-white text-center px-8 h-10 z-10",
    duration: 1750,
  });
}

export function ErrorToast({ errorText }) {
  toast(errorText, {
    className: "bg-red-200 rounded-md text-red-500 center px-8 h-10 z-10",
    duration: 1750,
  });
}
