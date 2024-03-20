export const metadata = {
  title: "Все категории",
};

import { Link } from "navigation";

export default async function CategoriesPage() {
  const response = await fetch("http://localhost:3001/manage/categories/all");
  const categories = await response.json();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Все категории</h2>
      <div className="flex flex-col gap-2 w-fit">
        {categories.map((item) => {
          return (
            <Link
              key={item.id}
              href={"/categories/" + item.id}
              className="button-outline px-4 w-fit"
            >
              {item.titleRu}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
