import VisitorRequest from "components/Containers/VisitorRequest";
import AdsSwiper from "components/Containers/AdsSwiper";
import AsyncProductsFromCategories from "components/Containers/AsyncProductsFromCategories";

export default async function HomePage() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <VisitorRequest />
      <AdsSwiper />
      <div className="max-width">
        <AsyncProductsFromCategories />
      </div>
    </div>
  );
}
