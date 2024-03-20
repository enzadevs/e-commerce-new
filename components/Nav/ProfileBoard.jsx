import { FaRegCircleUser } from "react-icons/fa6";

export default function ProfileBoard() {
  return (
    <button className="flex flex-col items-center nav-button">
      <FaRegCircleUser className="h-6 w-6" />
      <p className="hidden lg:block">Профиль</p>
    </button>
  );
}
