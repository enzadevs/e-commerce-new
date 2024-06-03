export const metadata = {
  title: "Поиск товаров",
};

import { Provider } from "../provider";

export default function SearchLayout({ children, params }) {
  return (
    <div className="max-width">
      <Provider locale={params.locale}>
        <div className="bg-white rounded-md shadow-md mt-4 p-4">{children}</div>
      </Provider>
    </div>
  );
}
