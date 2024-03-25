import SearchBox from "./SearchBox";
import WishList from "./WishList";
import ShoppingCartPlaceholder from "./ShoppingCartPlaceholder";
import ProfileBoard from "./ProfileBoard";
import CategoriesDropdown from "./CategoriesDropdown";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "../../navigation.js";
import SendVisitorRequest from "components/Functions/SendVisitorRequest";
import { useTranslations } from "next-intl";
import { TbHome } from "react-icons/tb";
import { TbCategory2 } from "react-icons/tb";

export default function NavBar() {
  const t = useTranslations("Navbar");

  return (
    <nav className="flex flex-col gap-2 md:flex-row items-center px-3 md:gap-4 md:px-0 p-2 md:h-20 max-width">
      <div className="hidden md:block">
        <SendVisitorRequest />
      </div>
      <div className="flex-row-center justify-between h-10 w-full md:hidden">
        <SendVisitorRequest />
        <div className="center ml-auto h-10 w-10">
          <LanguageSwitcher text={t("lang")} />
        </div>
      </div>
      <div className="hidden md:block">
        <CategoriesDropdown title={t("categories")} />
      </div>
      <SearchBox placeholder={t("searchPlaceholder")} />
      <div className="nav-bar-buttons-container">
        <Link href="/" className="nav-button md:hidden">
          <TbHome className="h-6 w-6" />
        </Link>
        <Link href="/categories" className="nav-button md:hidden">
          <TbCategory2 className="h-6 w-6" />
        </Link>
        <Link href="/profile/wishlist" className="nav-button">
          <WishList text={t("wishlist")} />
        </Link>
        <Link href="/profile/cart" className="nav-button">
          <ShoppingCartPlaceholder text={t("shoppingcart")} />
        </Link>
        <Link href="/profile" className="nav-button">
          <ProfileBoard text={t("profile")} />
        </Link>
        <div className="hidden md:block md:nav-button">
          <LanguageSwitcher text={t("lang")} />
        </div>
      </div>
    </nav>
  );
}
