import AdsSwiper from "components/Containers/AdsSwiper";
import ProductsFromCategories from "components/Containers/ProductsFromCategories";

export default function HomePage() {
  return (
    <div className="mt-4 flex flex-col pb-4">
      <AdsSwiper />
      <div className="max-width">
        <ProductsFromCategories />
      </div>
    </div>
  );
}
