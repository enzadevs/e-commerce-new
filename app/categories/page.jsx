import Link from "next/link";

export default async function CategoriesPage() {
  const response = await fetch(
    "http://localhost:5000/manage/category/withsubcategories"
  );
  const categories = await response.json();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Все категории</h2>
      <div className="flex flex-row flex-wrap w-full">
        {categories.map((item) => {
          return (
            <Link key={item.id} href={"" + item.id}>
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
