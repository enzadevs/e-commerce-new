import { Provider } from "../provider";

export default function CategoriesLayout({ children, params }) {
  return (
    <div className="px-2 md:px-0 max-width">
      <Provider locale={params.locale}>
        <div className="bg-white rounded-md shadow-md my-4 p-4">{children}</div>
      </Provider>
    </div>
  );
}
