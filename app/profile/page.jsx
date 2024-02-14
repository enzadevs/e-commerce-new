import { BsPencilSquare } from "react-icons/bs";

export default function ProfilePage() {
  return (
    <div className="flex flex-col">
      <div className="flex-row-center justify-between">
        <h2 className="text-xl font-bold">Мой профиль</h2>
        <button className="nav-link flex-row-center gap-2 text-base">
          <BsPencilSquare className="h-4 w-4" />
          <>Изменить</>
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="info-holder">
          <p>Имя :</p>
          <p className="bg-haze-100 rounded-3xl flex-row-center px-4 h-8">
            Сковородка Утюжин
          </p>
        </div>
        <div className="info-holder">
          <p>Номер телефона :</p>
          <p className="bg-haze-100 rounded-3xl flex-row-center px-4 h-8">
            +99365666768
          </p>
        </div>
        <div className="info-holder">
          <p>Адрес :</p>
          <p className="bg-haze-100 rounded-3xl flex-row-center px-4 h-8">
            Lorem Loremovich
          </p>
        </div>
      </div>
    </div>
  );
}
