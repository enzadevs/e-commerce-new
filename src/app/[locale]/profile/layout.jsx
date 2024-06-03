export const metadata = {
  title: "Мой профиль",
};

export default function ProfileLayout({ children, params }) {
  return (
    <div className="px-2 md:px-0 max-width">
      <div className="bg-white rounded-md shadow-md mt-4 p-4">{children}</div>
    </div>
  );
}
