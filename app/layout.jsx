import { Nunito_Sans } from "next/font/google";
import NavBar from "components/Nav/NavBar";
import Footer from "components/Nav/Footer";
import "./globals.css";

export const metadata = {
  title: "E-Commerce",
  description: "E-Commerce",
  name: "viewport",
  content: "width=device-width, initial-scale=1",
};

const globalFont = Nunito_Sans({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={globalFont.className} suppressHydrationWarning>
      <body className="flex flex-col text-sm min-h-screen w-full">
        <div className="bg-white shadow-md sticky top-0 z-20">
          <NavBar />
        </div>
        <div className="bg-haze-50 h-full w-full">{children}</div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
