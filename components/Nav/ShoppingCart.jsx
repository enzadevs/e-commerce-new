import { HiOutlineShoppingCart } from "react-icons/hi";

export default function ShoppingCart() {
  return (
    <div className="flex flex-col items-center">
      <HiOutlineShoppingCart className="h-6 w-6 md:icons" />
      <p className="text-sm hidden lg:block">Корзина</p>
    </div>
  );
}
