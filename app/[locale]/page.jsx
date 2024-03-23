import VisitorRequest from "components/Containers/VisitorRequest";
import AdsSwiper from "components/Containers/AdsSwiper";
import AsyncProductsFromCategories from "components/Containers/AsyncProductsFromCategories";
import Notification from "components/Containers/Notification";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Pages");

  return (
    <div className="mt-4 flex flex-col gap-4">
      <Notification />
      <VisitorRequest />
      <AdsSwiper />
      <div className="max-width">
        <AsyncProductsFromCategories text={t("showAllProductsLink")} />
      </div>
    </div>
  );
}