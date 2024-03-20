import SearchBox from "./SearchBox";
import WishList from "./WishList";
import ShoppingCartPlaceholder from "./ShoppingCartPlaceholder";
import ProfileBoard from "./ProfileBoard";
import CategoriesDropdown from "./CategoriesDropdown";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "../../navigation.js";
import { TbHome } from "react-icons/tb";
import { TbCategory2 } from "react-icons/tb";

export default async function NavBar() {
  return (
    <nav className="flex-row-center px-3 md:gap-4 md:px-0 h-20 max-width">
      <div className="hidden md:block">
        <Link href="/" className="button-primary px-4">
          <h1 className="text-base">Супер Маркет</h1>
        </Link>
      </div>
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
          <ShoppingCartPlaceholder />
        </Link>
        <Link href="/profile" className="nav-button">
          <ProfileBoard />
        </Link>
        <div className="nav-button">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
