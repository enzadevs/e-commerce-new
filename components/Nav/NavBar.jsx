import BrandLogo from "assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBox";
import WishList from "./WishList";
import ShoppingCart from "./ShoppingCart";
import ProfileBoard from "./ProfileBoard";
import CategoriesDropdown from "./CategoriesDropdown";
import { TbHome } from "react-icons/tb";
import { TbCategory2 } from "react-icons/tb";

export default async function NavBar() {
  return (
    <nav className="flex-row-center px-3 md:gap-4 md:px-0 h-20 max-width">
      <Link href="/" className="hidden md:block">
        <Image
          src={BrandLogo}
          alt="brand logo"
          height={0}
          width={0}
          style={{ height: "44px", width: "auto" }}
          priority
          sizes="50vw"
        ></Image>
      </Link>
      <div className="hidden md:block">
        <CategoriesDropdown />
      </div>
      <SearchBox />
      <div className="nav-bar-buttons-container">
        <Link href="/" className="nav-button md:hidden">
          <TbHome className="h-6 w-6" />
        </Link>
        <Link href="/categories" className="nav-button md:hidden">
          <TbCategory2 className="h-6 w-6" />
        </Link>
        <Link href="/profile/wishlist" className="nav-button">
          <WishList />
        </Link>
        <Link href="/profile/cart" className="nav-button">
          <ShoppingCart />
        </Link>
        <Link href="/profile" className="nav-button">
          <ProfileBoard />
        </Link>
      </div>
    </nav>
  );
}
