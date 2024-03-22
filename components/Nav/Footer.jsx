import { Link } from "../../navigation.js";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-haze-200 bg-white mt-auto px-3 pb-4 md:px-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between pt-6 pb-16 max-width">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <Link href="/" className="text-fancy-700 text-xl font-bold">
            Super Market
          </Link>
          <p>
            {t("developedby")}{" "}
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
          <h2 className="footer-header">{t("options")}</h2>
          <Link href="/advertisement" className="nav-link">
            {t("ads")}
          </Link>
          <Link href="/advertisement#marketing" className="nav-link">
            {t("marketing")}
          </Link>
          <Link href="/contact#support" className="nav-link">
            {t("offerproduct")}
          </Link>
        </div>
        <div className="flex flex-col items-center sm:items-start gap-4">
          <h2 className="footer-header">{t("about")}</h2>
          <Link href="/vacancy" className="nav-link">
            {t("vaccancy")}
          </Link>
          <Link href="/contact#address" className="nav-link">
            {t("address")}
          </Link>
          <Link href="/contact" className="nav-link">
            {t("contact")}
          </Link>
        </div>
        <div className="flex flex-col items-center sm:items-start gap-4">
          <h2 className="footer-header">{t("rules")}</h2>
          <Link href="/faq" className="nav-link">
            {t("faq")}
          </Link>
          <Link href="/privacy" className="nav-link">
            {t("policy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
