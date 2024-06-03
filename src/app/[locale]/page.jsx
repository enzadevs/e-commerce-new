import AdsSwiper from "@/components/Containers/AdsSwiper";
import ProductsList from "@/components/Containers/ProductsList";
import { getScopedI18n } from "@/locales/server";

export default async function HomePage() {
  const scopedT = await getScopedI18n("Pages");

  return (
    <div className="flex flex-col gap-4 mt-4 h-full">
      <AdsSwiper />
      <div className="max-width">
        <ProductsList text={scopedT("showAllProductsLink")} />
      </div>
    </div>
  );
}
