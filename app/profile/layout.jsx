export const metadata = {
  title: "Мой профиль",
};

export default function ProfileLayout({ children }) {
  return (
    <div className="px-3 md:px-0 max-width">
      <div className="bg-white rounded-3xl mt-4 p-4 min-h-52">{children}</div>
    </div>
  );
}
