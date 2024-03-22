// import createMiddleware from "next-intl/middleware";
// import { locales, localePrefix } from "./navigation";

// export default createMiddleware({
//   defaultLocale: "ru",
//   localePrefix,
//   locales,
// });

// export const config = {
//   matcher: ["/", "/(ru|tm)/:path*"],
// };
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ru", "tm"],
  defaultLocale: "ru",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
