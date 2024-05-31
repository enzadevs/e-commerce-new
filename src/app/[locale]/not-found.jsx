import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[400px] w-full">
      <div className="text-4xl font-extrabold font-mono">404</div>
      <p className="text-center">
        Страница, которую Вы искали, нет. Вы можете перейти на
        <Link className="underline pl-2" href="/">
          главную страницу.
        </Link>
      </p>
    </div>
  );
}
