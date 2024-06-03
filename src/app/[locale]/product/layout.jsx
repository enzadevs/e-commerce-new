import { Provider } from "../provider";

export default function ProductViewLayout({ children, params }) {
  return (
    <div className="mb-4 px-2 md:px-0 max-width">
      <Provider locale={params.locale}>
        <div className="bg-white rounded-md shadow-md mt-4 p-4">{children}</div>
      </Provider>
    </div>
  );
}
