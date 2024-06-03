import "@/styles/global.css";
import { Nunito_Sans } from "next/font/google";
import NavBar from "@/components/Nav/NavBar";
import Footer from "@/components/Nav/Footer";

export const metadata = {
  title: "Super Market",
  description: "Super Market",
  name: "viewport",
  content: "width=device-width, initial-scale=1",
};

const globalFont = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  adjustFontFallback: false,
});

export default function RootLayout({ children, params }) {
  return (
    <html
      lang={params.locale}
      className={globalFont.className}
      suppressHydrationWarning
    >
      <body className="flex flex-col text-sm min-h-screen w-full">
        <div className="bg-white shadow-md sticky top-0 z-20">
          <NavBar />
        </div>
        <div className="bg-gallery grow min-h-[65vh] w-full">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
