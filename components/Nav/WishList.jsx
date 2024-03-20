import { AiOutlineHeart } from "react-icons/ai";

export default function WishList() {
  return (
    <button className="flex flex-col items-center">
      <AiOutlineHeart className="h-6 w-6" />
      <p className="hidden lg:block">Избранные</p>
    </button>
  );
}
