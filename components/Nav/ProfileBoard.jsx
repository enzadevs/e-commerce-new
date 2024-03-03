import { TbMoodKid } from "react-icons/tb";

export default function ProfileBoard() {
  return (
    <button className="flex flex-col items-center nav-button">
      <TbMoodKid className="h-6 w-6 md:icons" />
      <p className="text-sm hidden lg:block">Профиль</p>
    </button>
  );
}
