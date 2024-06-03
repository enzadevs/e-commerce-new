import Link from "next/link";
import { getScopedI18n } from "@/locales/server";

export default async function Footer() {
  const scopedT = await getScopedI18n("Footer");

  return (
    <footer className="border-t border-haze-200 bg-white mt-auto px-3 pb-4 md:px-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between pt-4 pb-16 md:pb-0 max-width">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <Link href="/" className="text-fancy-700 text-xl font-bold">
            Super Market
          </Link>
          <p>
            {scopedT("developedby")}{" "}
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
          <h2 className="footer-header">{scopedT("options")}</h2>
          <Link href="/advertisement" className="nav-link">
            {scopedT("ads")}
          </Link>
          <Link href="/advertisement#marketing" className="nav-link">
            {scopedT("marketing")}
          </Link>
          <Link href="/contact#support" className="nav-link">
            {scopedT("offerproduct")}
          </Link>
        </div>
        <div className="flex flex-col items-center sm:items-start gap-4">
          <h2 className="footer-header">{scopedT("about")}</h2>
          <Link href="/vacancy" className="nav-link">
            {scopedT("vaccancy")}
          </Link>
          <Link href="/contact#address" className="nav-link">
            {scopedT("address")}
          </Link>
          <Link href="/contact" className="nav-link">
            {scopedT("contact")}
          </Link>
        </div>
        <div className="flex flex-col items-center sm:items-start gap-4">
          <h2 className="footer-header">{scopedT("rules")}</h2>
          <Link href="/faq" className="nav-link">
            {scopedT("faq")}
          </Link>
          <Link href="/privacy" className="nav-link">
            {scopedT("policy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
