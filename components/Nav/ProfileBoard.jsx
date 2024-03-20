import { AiOutlineUser } from "react-icons/ai";

export default function ProfileBoard() {
  return (
    <button className="flex flex-col items-center">
      <AiOutlineUser className="h-6 w-6" />
      <p className="hidden lg:block">Профиль</p>
    </button>
  );
}
