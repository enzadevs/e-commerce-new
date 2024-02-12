import { TbMoodKid } from "react-icons/tb";

export default function ProfileBoard() {
  return (
    <div className="flex flex-col items-center">
      <TbMoodKid className="h-6 w-6 md:icons" />
      <p className="text-sm hidden lg:block">Профиль</p>
    </div>
  );
}
