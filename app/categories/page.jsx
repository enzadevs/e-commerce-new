import Link from "next/link";

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Все категории</h2>
      <div className="flex flex-row flex-wrap w-full">
        <ul className="flex flex-col gap-1 w-[50%] sm:w-[25%]">
          <Link href="/" className="nav-link text-lg font-bold w-fit">
            Категория
          </Link>
          <Link href="/" className="nav-link h-6">
            Под категория
          </Link>
          <Link href="/" className="nav-link h-6">
            Под категория
          </Link>
          <Link href="/" className="nav-link h-6">
            Под категория
          </Link>
          <Link href="/" className="nav-link h-6">
            Под категория
          </Link>
        </ul>
      </div>
    </div>
  );
}
