import Link from "next/link";
import ProductContainer from "./ProductContainer";

export default function ProductsFromCategories() {
  const array = [1, 2, 3, 4];

  return (
    <div className="bg-white rounded-3xl flex flex-col gap-4 mt-4 p-4 min-h-72 max-width">
      <div className="flex-row-center justify-between">
        <h2 className="text-xl font-bold">Электроника</h2>
        <Link href={""} className="nav-link text-base w-fit">
          <p>Показать все</p>
        </Link>
      </div>
      <div className="index-products-grid">
        {array.map((item) => {
          return <ProductContainer key={item.id} />;
        })}
      </div>
    </div>
  );
}
