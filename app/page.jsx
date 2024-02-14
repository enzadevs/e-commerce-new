import AdsSwiper from "components/Containers/AdsSwiper";
import ProductsFromCategories from "components/Containers/ProductsFromCategories";

export default function HomePage() {
  return (
    <div className="mt-4 flex flex-col pb-4">
      <AdsSwiper />
      <div className="px-3 md:px-0">
        <ProductsFromCategories />
        <ProductsFromCategories />
        <ProductsFromCategories />
        <ProductsFromCategories />
        <ProductsFromCategories />
      </div>
    </div>
  );
}
