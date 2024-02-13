import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-haze-200 bg-white mt-auto px-3 pb-4 md:px-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between pt-6 pb-16 max-width">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <Link href="/" className="text-fancy-700 text-xl font-bold">
            E-Commerce
          </Link>
          <p>
            Разработано в{" "}
            <Link
              href="https://alemtilsimat.com/"
              className="nav-link font-mono font-bold"
              target="_blank"
            >
              {"'Älem Tilsimat HJ'"}
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-col items-center sm:items-start gap-4">
          <h2 className="footer-header">Услуги</h2>
          <Link href="/advertisement" className="nav-link">
            Реклама
          </Link>
          <Link href="/advertisement#marketing" className="nav-link">
            Маркетинг
          </Link>
          <Link href="/contact#support" className="nav-link">
            Предложить товар
          </Link>
        </div>
        <div className="flex flex-col items-center sm:items-start gap-4">
          <h2 className="footer-header">О нас</h2>
          <Link href="/vacancy" className="nav-link">
            Вакансии
          </Link>
          <Link href="/contact#address" className="nav-link">
            Адрес
          </Link>
          <Link href="/contact" className="nav-link">
            Связаться с нами
          </Link>
        </div>
        <div className="flex flex-col items-center sm:items-start gap-4">
          <h2 className="footer-header">Правила</h2>
          <Link href="/faq" className="nav-link">
            ЧАВО
          </Link>
          <Link href="/privacy" className="nav-link">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
